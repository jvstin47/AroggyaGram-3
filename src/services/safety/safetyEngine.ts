import type { RiskLevel } from '@/types/ai.types';
import type { PersonContext, HealthContext } from '@/types/careCase.types';

export interface SafetyAssessment {
  isEmergency: boolean;
  emergencyCategory: string | null;
  riskLevel: RiskLevel;
  safetyWarnings: string[];
  immediateDirectives: string[];
  dispatchRecommended: 'emergency_108' | 'urgent_clinic' | 'volunteer_support' | 'routine';
  bypassVolunteerMatching: boolean;
  vulnerabilityAdjustmentScore: number;
}

export class SafetyEngine {
  // Acute life-safety patterns (deterministic triggers)
  private static readonly CARDIAC_TRIGGERS = [
    'chest pain', 'crushing chest', 'heart attack', 'pain in left arm',
    'pressure in chest', 'tightness in chest', 'jaw pain', 'cardiac arrest'
  ];

  private static readonly RESPIRATORY_TRIGGERS = [
    'cannot breathe', "can't breathe", 'gasping for air', 'difficulty breathing',
    'choking', 'turning blue', 'severe asthma attack', 'stridor'
  ];

  private static readonly NEURO_STROKE_TRIGGERS = [
    'stroke', 'face drooping', 'facial droop', 'slurred speech', 'cannot speak',
    'one side weak', 'unconscious', 'passed out', 'unresponsive', 'seizure',
    'fainted', 'loss of consciousness', 'blackout'
  ];

  private static readonly TRAUMA_FALL_TRIGGERS = [
    'fell and cannot get up', "can't get up", 'fallen and unable to stand',
    'severe bleeding', 'arterial bleeding', 'blood pouring', 'head injury',
    'skull injury', 'deep wound', 'broken bone', 'fracture', 'severe burn'
  ];

  private static readonly TOXIC_ALLERGY_TRIGGERS = [
    'swallowed poison', 'poisoning', 'snake bite', 'insect sting throat swelling',
    'anaphylaxis', 'tongue swelling', 'throat closing'
  ];

  /**
   * Deterministic clinical triage that cannot be overridden by conversational AI
   */
  public static evaluateImmediateSafety(
    rawText: string,
    personContext?: Partial<PersonContext>,
    healthContext?: Partial<HealthContext>
  ): SafetyAssessment {
    const text = rawText.toLowerCase();

    // Check acute trigger categories
    const hasCardiac = this.CARDIAC_TRIGGERS.some(t => text.includes(t));
    const hasRespiratory = this.RESPIRATORY_TRIGGERS.some(t => text.includes(t));
    const hasNeuro = this.NEURO_STROKE_TRIGGERS.some(t => text.includes(t));
    const hasTrauma = this.TRAUMA_FALL_TRIGGERS.some(t => text.includes(t));
    const hasToxic = this.TOXIC_ALLERGY_TRIGGERS.some(t => text.includes(t));

    const isAcuteEmergency = hasCardiac || hasRespiratory || hasNeuro || hasTrauma || hasToxic;

    // Vulnerability multipliers
    let vulnerabilityScore = 0;
    const warnings: string[] = [];
    const directives: string[] = [];

    if (personContext?.livingSituation === 'lives_alone') {
      vulnerabilityScore += 25;
      warnings.push('Patient lives alone without immediate co-located supervision.');
    }
    if (personContext?.age && personContext.age >= 70) {
      vulnerabilityScore += 20;
      warnings.push(`Geriatric patient (Age: ${personContext.age}) with elevated fall and complication risk.`);
    }
    if (personContext?.mobilityLevel === 'bedridden' || personContext?.mobilityLevel === 'wheelchair_bound') {
      vulnerabilityScore += 25;
      warnings.push('Impaired mobility complicates independent evacuation or self-care.');
    }

    // Evaluate known conditions
    const conditions = healthContext?.knownConditions?.map(c => c.toLowerCase()) || [];
    if (conditions.some(c => c.includes('diabet') || c.includes('sugar'))) {
      if (text.includes('missed') || text.includes('insulin') || text.includes('shivering') || text.includes('sweating')) {
        vulnerabilityScore += 30;
        warnings.push('Diabetic patient reporting medication interruption or hypoglycemia warning signs.');
      }
    }
    if (conditions.some(c => c.includes('hypertension') || c.includes('bp') || c.includes('blood pressure'))) {
      if (text.includes('headache') || text.includes('dizziness') || text.includes('blurred')) {
        vulnerabilityScore += 25;
        warnings.push('Hypertensive patient exhibiting acute neurological or visual warning symptoms.');
      }
    }

    // Acute Emergency Rule
    if (isAcuteEmergency) {
      let category = 'Medical Emergency';
      if (hasCardiac) category = 'Acute Cardiac Symptoms';
      else if (hasRespiratory) category = 'Severe Respiratory Distress';
      else if (hasNeuro) category = 'Acute Neurological / Stroke Signs';
      else if (hasTrauma) category = 'Major Trauma / Fall with Inability to Stand';
      else if (hasToxic) category = 'Toxic Ingestion / Acute Anaphylaxis';

      directives.push('Immediately initiate 108 Emergency Medical Services dispatch.');
      directives.push('Alert designated family caregivers and nearby ASHA community health worker.');
      directives.push('Keep patient in a secure, seated or side-lying recovery position. Do not leave unattended.');

      return {
        isEmergency: true,
        emergencyCategory: category,
        riskLevel: 'CRITICAL',
        safetyWarnings: [
          `CRITICAL ALERT: Detected symptoms consistent with ${category}.`,
          ...warnings
        ],
        immediateDirectives: directives,
        dispatchRecommended: 'emergency_108',
        bypassVolunteerMatching: true, // Emergency path only
        vulnerabilityAdjustmentScore: Math.min(100, vulnerabilityScore + 50)
      };
    }

    // High Vulnerability or Moderately Concerning
    if (vulnerabilityScore >= 50 || text.includes('fever') || text.includes('vomiting') || text.includes('pain')) {
      const riskLevel: RiskLevel = vulnerabilityScore >= 60 ? 'HIGH' : 'MODERATE';
      directives.push('Assign primary verification to nearest accredited community health worker or verified volunteer.');
      directives.push('Verify vital signs (temperature, pulse, hydration level).');

      return {
        isEmergency: false,
        emergencyCategory: null,
        riskLevel,
        safetyWarnings: warnings,
        immediateDirectives: directives,
        dispatchRecommended: 'urgent_clinic',
        bypassVolunteerMatching: false,
        vulnerabilityAdjustmentScore: vulnerabilityScore
      };
    }

    // Routine community assistance
    directives.push('Match with accredited community volunteer within 5 km radius.');
    directives.push('Confirm delivery timeline and contact recipient prior to dispatch.');

    return {
      isEmergency: false,
      emergencyCategory: null,
      riskLevel: 'LOW',
      safetyWarnings: warnings,
      immediateDirectives: directives,
      dispatchRecommended: 'volunteer_support',
      bypassVolunteerMatching: false,
      vulnerabilityAdjustmentScore: vulnerabilityScore
    };
  }
}
