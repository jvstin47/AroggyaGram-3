import { SafetyEngine } from '@/services/safety/safetyEngine';
import type {
  PersonContext,
  HealthContext,
  ImmediateNeed,
  TimeSensitivity,
  CareCaseCategory
} from '@/types/careCase.types';

export interface ExtractedSituation {
  personContext: PersonContext;
  healthContext: HealthContext;
  immediateNeed: ImmediateNeed;
  constraints: string[];
  safetyDirectives: string[];
  recommendedUrgency: TimeSensitivity;
  isEmergencyOverride: boolean;
}

import { AIKeyService } from './aiKey.service';

export class SituationEngine {
  private static getApiKey(): string {
    return AIKeyService.getApiKey();
  }

  /**
   * Primary entrypoint: turn raw unstructured text or voice transcript
   * into a fully structured Situation context with deterministic safety enforcement.
   */
  public static async analyzeSituation(
    rawText: string,
    callerProfile?: { name?: string; phone?: string; language?: string }
  ): Promise<ExtractedSituation> {
    const apiKey = this.getApiKey();

    let extracted: ExtractedSituation;

    if (apiKey) {
      try {
        extracted = await this.extractWithGemini(rawText, callerProfile);
      } catch (err) {
        console.warn('Gemini extraction failed, falling back to local NLP heuristics:', err);
        extracted = this.extractWithLocalNLP(rawText, callerProfile);
      }
    } else {
      extracted = this.extractWithLocalNLP(rawText, callerProfile);
    }

    // ALWAYS run SafetyEngine deterministic evaluation on top of whatever was extracted
    const safety = SafetyEngine.evaluateImmediateSafety(
      rawText,
      extracted.personContext,
      extracted.healthContext
    );

    if (safety.isEmergency) {
      extracted.isEmergencyOverride = true;
      extracted.healthContext.riskLevel = 'CRITICAL';
      extracted.healthContext.requiresImmediateClinicalCare = true;
      extracted.recommendedUrgency = 'IMMEDIATE_LIFE_SAFETY';
      extracted.immediateNeed.category = 'acute_medical_emergency';
      extracted.safetyDirectives = safety.immediateDirectives;
    } else {
      extracted.healthContext.riskLevel = safety.riskLevel;
      extracted.safetyDirectives = safety.immediateDirectives;
    }

    // Merge safety warnings into constraints
    extracted.constraints = Array.from(new Set([...extracted.constraints, ...safety.safetyWarnings]));

    return extracted;
  }

  /**
   * High-capability Gemini extraction using structured schema output
   */
  private static async extractWithGemini(
    rawText: string,
    caller?: { name?: string; phone?: string; language?: string }
  ): Promise<ExtractedSituation> {
    const prompt = `You are the Situation Engine for AroggyaGram, an intelligent community health-response platform in India.
Analyze this user request/voice transcript:
"${rawText}"

Caller metadata (if any): ${JSON.stringify(caller || {})}

Extract and return ONLY a JSON object with this exact schema:
{
  "personContext": {
    "fullName": "Name of person who needs care or extracted caller name",
    "age": 0 or null,
    "gender": "male" | "female" | "other" | "unknown",
    "livingSituation": "lives_alone" | "with_elderly_spouse" | "with_family" | "care_facility" | "unknown",
    "primaryLanguage": "en" | "ml" | "hi" | "ta" | "bn",
    "mobilityLevel": "fully_mobile" | "uses_cane_or_walker" | "wheelchair_bound" | "bedridden",
    "emergencyContactPhone": "phone or null",
    "emergencyContactName": "name or null",
    "vulnerabilityScore": 0 to 100,
    "notes": "key observations"
  },
  "healthContext": {
    "knownConditions": ["e.g. Hypertension", "Type 2 Diabetes"],
    "currentMedications": ["e.g. Metformin 500mg"],
    "knownAllergies": [],
    "reportedSymptoms": ["e.g. Dizziness", "Chest pain", "Fever"],
    "riskLevel": "LOW" | "MODERATE" | "HIGH" | "CRITICAL",
    "requiresImmediateClinicalCare": false
  },
  "immediateNeed": {
    "category": "acute_medical_emergency" | "medication_urgent_refill" | "clinical_transportation" | "post_discharge_support" | "vulnerable_elderly_check" | "nutrition_essential_supplies" | "mental_health_companionship" | "specialized_caregiver_relief" | "custom_community_need",
    "title": "Concise summary title (under 8 words)",
    "description": "Clear actionable summary of the assistance required",
    "rawUserInput": "${rawText.replace(/"/g, '\\"')}",
    "timeSensitivity": "IMMEDIATE_LIFE_SAFETY" | "CRITICAL_SAME_DAY" | "TODAY" | "SCHEDULED" | "FLEXIBLE",
    "requiredSkills": ["e.g. vehicle_owner", "first_aid_certified", "kannada_speaker"],
    "estimatedDurationMins": 45
  },
  "constraints": ["e.g. needs wheelchair accessible vehicle", "cannot climb stairs"],
  "safetyDirectives": [],
  "recommendedUrgency": "TODAY",
  "isEmergencyOverride": false
}`;

    const model = AIKeyService.getModel();
    let response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${this.getApiKey()}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { responseMimeType: 'application/json' }
        })
      }
    );

    if (response.status === 404 && model !== 'gemini-2.5-flash') {
      response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${this.getApiKey()}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { responseMimeType: 'application/json' }
          })
        }
      );
    }

    if (!response.ok) throw new Error(`Gemini HTTP ${response.status}`);
    const data = await response.json();
    const rawContent = data.candidates?.[0]?.content?.parts?.[0]?.text;
    const parsed: ExtractedSituation = JSON.parse(rawContent);
    return parsed;
  }

  /**
   * Deterministic local NLP heuristics for offline, low-connectivity, or fallback operation.
   */
  public static extractWithLocalNLP(
    rawText: string,
    caller?: { name?: string; phone?: string; language?: string }
  ): ExtractedSituation {
    const text = rawText.toLowerCase();

    // 1. Extract Age if present (e.g. "74 years old", "(age 74)", "(74)", "age 82")
    let age: number | undefined;
    const ageMatch = text.match(/(?:age\s*[:=]?\s*|(?:\(|\s))(\d{1,3})(?:\s*years?|\s*yr|\)|\s*yo)/i) ||
                     text.match(/\b(\d{2})\b\s*(?:year-old|years-old|year old|yo)/i);
    if (ageMatch && ageMatch[1]) {
      const parsedAge = parseInt(ageMatch[1], 10);
      if (parsedAge > 0 && parsedAge < 120) age = parsedAge;
    }

    // 2. Extract Living Situation
    let livingSituation: PersonContext['livingSituation'] = 'unknown';
    if (text.includes('lives alone') || text.includes('living alone') || text.includes('by myself') || text.includes('on my own')) {
      livingSituation = 'lives_alone';
    } else if (text.includes('elderly spouse') || text.includes('with my husband') || text.includes('with my wife')) {
      livingSituation = 'with_elderly_spouse';
    } else if (text.includes('with family') || text.includes('with my children') || text.includes('daughter') || text.includes('son')) {
      livingSituation = 'with_family';
    }

    // 3. Extract Mobility
    let mobilityLevel: PersonContext['mobilityLevel'] = 'fully_mobile';
    if (text.includes('bedridden') || text.includes('cannot leave bed') || text.includes('bed bound')) {
      mobilityLevel = 'bedridden';
    } else if (text.includes('wheelchair')) {
      mobilityLevel = 'wheelchair_bound';
    } else if (text.includes('cane') || text.includes('walker') || text.includes('walking stick') || text.includes('difficulty walking')) {
      mobilityLevel = 'uses_cane_or_walker';
    }

    // 4. Extract Known Conditions
    const knownConditions: string[] = [];
    if (text.includes('diabet') || text.includes('sugar')) knownConditions.push('Type 2 Diabetes');
    if (text.includes('hypertension') || text.includes('bp') || text.includes('blood pressure')) knownConditions.push('Hypertension');
    if (text.includes('heart') || text.includes('cardiac')) knownConditions.push('Cardiovascular Disease');
    if (text.includes('asthma') || text.includes('wheezing') || text.includes('inhaler')) knownConditions.push('Bronchial Asthma');
    if (text.includes('arthritis') || text.includes('joint pain')) knownConditions.push('Osteoarthritis');

    // 5. Extract Current Medications
    const currentMedications: string[] = [];
    if (text.includes('insulin')) currentMedications.push('Insulin Regular/NPH');
    if (text.includes('metformin')) currentMedications.push('Metformin');
    if (text.includes('amlodipine') || text.includes('bp pill') || text.includes('bp tablet')) currentMedications.push('Amlodipine / Antihypertensive');
    if (text.includes('aspirin') || text.includes('blood thinner')) currentMedications.push('Aspirin 75mg');
    if (text.includes('inhaler')) currentMedications.push('Salbutamol Inhaler');

    // 6. Extract Reported Symptoms
    const reportedSymptoms: string[] = [];
    if (text.includes('chest pain')) reportedSymptoms.push('Acute Chest Pain');
    if (text.includes('cannot breathe') || text.includes('shortness of breath')) reportedSymptoms.push('Dyspnea / Shortness of Breath');
    if (text.includes('dizzy') || text.includes('faint') || text.includes('giddiness')) reportedSymptoms.push('Dizziness / Presyncope');
    if (text.includes('fell') || text.includes('fall')) reportedSymptoms.push('Recent Mechanical Fall');
    if (text.includes('fever') || text.includes('high temperature')) reportedSymptoms.push('Fever');
    if (text.includes('bleeding')) reportedSymptoms.push('Active Bleeding');

    // 7. Extract Name if mentioned (e.g. "Lakshmi Amma", "Mr. Joseph", "neighbor Lakshmi Amma")
    let extractedName = '';
    const nameMatch = rawText.match(/(?:for\s+|patient\s+is\s+|my\s+name\s+is\s+|helping\s+(?:my\s+(?:neighbor|neighbour|mother|father|friend|relative)\s+)?|mr\.\s+|mrs\.\s+|amma\s+)([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)/i);
    if (nameMatch && nameMatch[1]) {
      extractedName = nameMatch[1].trim();
      // Handle prefix if matched
      if (rawText.toLowerCase().includes('mr. ' + extractedName.toLowerCase())) {
        extractedName = 'Mr. ' + extractedName;
      }
    } else if (caller?.name) {
      extractedName = caller.name;
    } else {
      extractedName = 'Resident in Need';
    }

    // 8. Determine Category & Time Sensitivity
    let category: CareCaseCategory = 'custom_community_need';
    let timeSensitivity: TimeSensitivity = 'TODAY';
    let title = 'Community Support Request';
    const requiredSkills: string[] = [];

    if (text.includes('medicine') || text.includes('pharmacy') || text.includes('refill') || text.includes('prescription') || text.includes('insulin')) {
      category = 'medication_urgent_refill';
      title = `Medication Refill for ${extractedName}`;
      requiredSkills.push('pharmacy_access', 'vehicle_transport');
      timeSensitivity = text.includes('urgent') || text.includes('today') || text.includes('ran out') ? 'CRITICAL_SAME_DAY' : 'TODAY';
    } else if (text.includes('transport') || text.includes('clinic') || text.includes('hospital') || text.includes('doctor visit')) {
      category = 'clinical_transportation';
      title = `Clinic Transport for ${extractedName}`;
      requiredSkills.push('driver_license', 'vehicle_owner');
      timeSensitivity = 'TODAY';
    } else if (text.includes('elderly') || text.includes('check on') || text.includes('welfare') || text.includes('alone')) {
      category = 'vulnerable_elderly_check';
      title = `Welfare Check for ${extractedName}`;
      requiredSkills.push('empathy_caregiver', 'first_responder');
      timeSensitivity = 'CRITICAL_SAME_DAY';
    } else if (text.includes('grocery') || text.includes('food') || text.includes('ration') || text.includes('water')) {
      category = 'nutrition_essential_supplies';
      title = `Essential Supplies Delivery`;
      requiredSkills.push('logistics_pickup');
      timeSensitivity = 'TODAY';
    }

    // 9. Extract Constraints
    const constraints: string[] = [];
    if (text.includes('cannot walk') || mobilityLevel !== 'fully_mobile') {
      constraints.push('Patient has limited mobility — ground floor assistance only.');
    }
    if (text.includes('malayalam') || text.includes('hindi') || text.includes('tamil')) {
      constraints.push('Prefers vernacular language communication.');
    }
    if (text.includes('no stairs') || text.includes('cannot climb')) {
      constraints.push('Cannot climb stairs — accessible vehicle needed.');
    }

    const vulnerabilityScore = (age && age >= 75 ? 30 : 10) +
      (livingSituation === 'lives_alone' ? 30 : 0) +
      (mobilityLevel !== 'fully_mobile' ? 25 : 0) +
      (knownConditions.length * 10);

    return {
      personContext: {
        fullName: extractedName,
        age,
        livingSituation,
        primaryLanguage: caller?.language || 'en',
        mobilityLevel,
        vulnerabilityScore: Math.min(100, vulnerabilityScore),
        notes: `Extracted via local NLP engine. Living situation: ${livingSituation}.`
      },
      healthContext: {
        knownConditions,
        currentMedications,
        knownAllergies: [],
        reportedSymptoms,
        riskLevel: 'LOW', // will be adjusted by SafetyEngine
        requiresImmediateClinicalCare: false
      },
      immediateNeed: {
        category,
        title,
        description: rawText,
        rawUserInput: rawText,
        timeSensitivity,
        requiredSkills,
        estimatedDurationMins: 45
      },
      constraints,
      safetyDirectives: [],
      recommendedUrgency: timeSensitivity,
      isEmergencyOverride: false
    };
  }
}
