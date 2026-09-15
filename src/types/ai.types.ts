export type RiskLevel = 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';

export interface HealthAnalysisResult {
  possible_condition: string;
  risk_level: RiskLevel;
  emergency_warning: string | null;
  explanation: string;
  immediate_actions: string[];
  warning_signs: string[];
  recommendation: string;
  requires_immediate_care: boolean;
  language: string;
}

export interface RequestIntentClassification {
  intent: string;
  category: string;
  urgency: 'critical' | 'today' | 'scheduled' | 'ongoing';
  extracted_task: string;
  is_emergency: boolean;
  suggested_pathway:
    | 'emergency_pathway'
    | 'caregiver_pathway'
    | 'volunteer_assistance_pathway'
    | 'ai_health_pathway'
    | 'healthcare_facility_pathway';
}
