import type { HealthAnalysisResult, RequestIntentClassification } from '@/types/ai.types';
import { AIKeyService } from './aiKey.service';

export class AIService {
  private static getApiKey(): string {
    return AIKeyService.getApiKey();
  }

  /**
   * Deterministic safety check to catch emergency triggers instantly.
   * This executes BEFORE or in parallel with AI.
   */
  public static checkEmergencyKeywords(input: string): boolean {
    const text = input.toLowerCase();
    const emergencyTerms = [
      'fell', 'fall', 'cannot get up', "can't get up",
      'chest pain', 'heart attack', 'stroke',
      'bleeding', 'unconscious', 'passed out',
      'choking', 'difficulty breathing', 'cannot breathe', "can't breathe",
      'poison', 'seizure', 'severe burn', 'accident'
    ];
    return emergencyTerms.some((term) => text.includes(term));
  }

  /**
   * Analyze health concern / symptoms with structured clinical guidance
   */
  public static async analyzeHealthConcern(
    userMessage: string,
    language: string = 'en'
  ): Promise<HealthAnalysisResult> {
    const apiKey = this.getApiKey();
    const isEmergency = this.checkEmergencyKeywords(userMessage);

    // Fallback if offline or no API key configured
    if (!apiKey) {
      if (isEmergency) {
        return {
          possible_condition: 'Possible Acute Medical Emergency',
          risk_level: 'CRITICAL',
          emergency_warning: 'Immediate medical assistance required. Do not wait.',
          explanation: 'Your description indicates potentially critical symptoms that require immediate evaluation by emergency healthcare personnel.',
          immediate_actions: [
            'Press the Emergency SOS button immediately to alert caregivers',
            'Call 108 or 112 emergency services',
            'Sit or lie down in a safe position and keep doors unlocked for responders'
          ],
          warning_signs: ['Loss of consciousness', 'Worsening chest pain', 'Sudden shortness of breath'],
          recommendation: 'Seek emergency medical attention at once.',
          requires_immediate_care: true,
          language
        };
      }

      return {
        possible_condition: 'General Health Concern / Mild Discomfort',
        risk_level: 'MODERATE',
        emergency_warning: null,
        explanation: 'Based on your description, this requires careful monitoring. Please check your temperature and vital signs.',
        immediate_actions: [
          'Rest in a well-ventilated, comfortable space',
          'Keep yourself hydrated with warm water or electrolyte fluids',
          'Note down when symptoms started and monitor if they worsen'
        ],
        warning_signs: ['High fever above 102°F', 'Persistent vomiting', 'Sudden severe weakness'],
        recommendation: 'Consult your local community health worker (ASHA) or primary health center if symptoms persist past 24 hours.',
        requires_immediate_care: false,
        language
      };
    }

    try {
      const prompt = `You are AroggyaGram AI, an expert rural healthcare assistant.
Analyze this user query: "${userMessage}"
Target user language: "${language}"

Respond ONLY with valid JSON in this exact structure without markdown backticks:
{
  "possible_condition": "Short condition name",
  "risk_level": "LOW" | "MODERATE" | "HIGH" | "CRITICAL",
  "emergency_warning": "Warning message if serious or null",
  "explanation": "Clear plain language explanation",
  "immediate_actions": ["Action 1", "Action 2"],
  "warning_signs": ["Sign 1", "Sign 2"],
  "recommendation": "Recommendation to seek professional care",
  "requires_immediate_care": boolean,
  "language": "${language}"
}`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { responseMimeType: 'application/json' }
          })
        }
      );

      if (!response.ok) throw new Error(`Gemini API error: ${response.status}`);
      const data = await response.json();
      const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      const parsed: HealthAnalysisResult = JSON.parse(rawText);

      // Enforce deterministic override if critical symptoms detected
      if (isEmergency && parsed.risk_level !== 'CRITICAL') {
        parsed.risk_level = 'CRITICAL';
        parsed.requires_immediate_care = true;
      }
      return parsed;
    } catch (err) {
      console.warn('AI analysis fallback:', err);
      return {
        possible_condition: isEmergency ? 'Acute Emergency Event' : 'Symptom Review Needed',
        risk_level: isEmergency ? 'CRITICAL' : 'MODERATE',
        emergency_warning: isEmergency ? 'Please contact emergency services immediately.' : null,
        explanation: 'We could not reach the cloud AI analysis, but local assessment indicates you should review these symptoms.',
        immediate_actions: [
          isEmergency ? 'Trigger SOS to alert nearby contacts' : 'Take prescribed rest and drink clean water',
          'Reach out to a family caregiver'
        ],
        warning_signs: ['Difficulty breathing', 'Severe pain'],
        recommendation: 'Please visit your local clinic or contact a medical provider.',
        requires_immediate_care: isEmergency,
        language
      };
    }
  }

  /**
   * Natural language intent extraction for requests
   */
  public static async classifyRequest(text: string): Promise<RequestIntentClassification> {
    const isEmergency = this.checkEmergencyKeywords(text);
    const lower = text.toLowerCase();

    // Deterministic override for emergencies
    if (isEmergency) {
      return {
        intent: 'medical_emergency',
        category: 'health_check',
        urgency: 'critical',
        extracted_task: text,
        is_emergency: true,
        suggested_pathway: 'emergency_pathway'
      };
    }

    // Heuristics for offline / local fast-path
    if (lower.includes('medicine') || lower.includes('pharmacy') || lower.includes('prescription')) {
      return {
        intent: 'pharmacy_pickup',
        category: 'medicine_pickup',
        urgency: lower.includes('urgent') || lower.includes('now') ? 'critical' : 'today',
        extracted_task: text,
        is_emergency: false,
        suggested_pathway: 'volunteer_assistance_pathway'
      };
    }

    if (lower.includes('clinic') || lower.includes('hospital') || lower.includes('doctor') || lower.includes('transport')) {
      return {
        intent: 'medical_transport',
        category: 'transportation',
        urgency: lower.includes('today') ? 'today' : 'scheduled',
        extracted_task: text,
        is_emergency: false,
        suggested_pathway: 'volunteer_assistance_pathway'
      };
    }

    if (lower.includes('grocery') || lower.includes('food') || lower.includes('ration') || lower.includes('shop')) {
      return {
        intent: 'grocery_pickup',
        category: 'grocery_pickup',
        urgency: 'today',
        extracted_task: text,
        is_emergency: false,
        suggested_pathway: 'volunteer_assistance_pathway'
      };
    }

    return {
      intent: 'general_assistance',
      category: 'custom',
      urgency: 'today',
      extracted_task: text,
      is_emergency: false,
      suggested_pathway: 'volunteer_assistance_pathway'
    };
  }

  /**
   * Multilingual medical translation using Gemini
   */
  public static async translateMedicalText(
    text: string,
    sourceLang: string,
    targetLang: string
  ): Promise<string> {
    const apiKey = this.getApiKey();
    if (!apiKey || sourceLang === targetLang) return text;

    try {
      const prompt = `Translate the following medical/health instruction accurately from ${sourceLang} to ${targetLang}. Preserve medical precision, dosage, and emergency context. Output ONLY the translated text.\n\n"${text}"`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }]
          })
        }
      );

      if (!response.ok) throw new Error('Translation failed');
      const data = await response.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || text;
    } catch {
      return text;
    }
  }
}
