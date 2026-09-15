import type { RiskLevel } from './ai.types';

export type CareCaseStatus =
  | 'DRAFT'
  | 'ANALYZING'
  | 'ASSESSED'
  | 'ACTION_REQUIRED'
  | 'MATCHING'
  | 'ASSIGNED'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'FOLLOW_UP'
  | 'RESOLVED'
  | 'ESCALATED'
  | 'CANCELLED';

export type TimeSensitivity =
  | 'IMMEDIATE_LIFE_SAFETY' // Under 15 mins (Emergency dispatch)
  | 'CRITICAL_SAME_DAY'    // Under 2 hours (e.g. vital insulin, oxygen)
  | 'TODAY'                // Same day within 6 hours
  | 'SCHEDULED'            // Planned routine care (next 24-48h)
  | 'FLEXIBLE';            // Community support

export type CareCaseCategory =
  | 'acute_medical_emergency'
  | 'medication_urgent_refill'
  | 'clinical_transportation'
  | 'post_discharge_support'
  | 'vulnerable_elderly_check'
  | 'nutrition_essential_supplies'
  | 'mental_health_companionship'
  | 'specialized_caregiver_relief'
  | 'custom_community_need';

export interface PersonContext {
  fullName: string;
  age?: number;
  gender?: string;
  livingSituation: 'lives_alone' | 'with_elderly_spouse' | 'with_family' | 'care_facility' | 'unknown';
  primaryLanguage: string;
  mobilityLevel: 'fully_mobile' | 'uses_cane_or_walker' | 'wheelchair_bound' | 'bedridden';
  emergencyContactPhone?: string;
  emergencyContactName?: string;
  vulnerabilityScore: number; // 0 to 100
  notes?: string;
}

export interface HealthContext {
  knownConditions: string[];
  currentMedications: string[];
  knownAllergies: string[];
  reportedSymptoms: string[];
  riskLevel: RiskLevel;
  requiresImmediateClinicalCare: boolean;
  vitalSigns?: {
    bloodPressure?: string;
    pulseRate?: number;
    bloodGlucose?: string;
    temperatureF?: number;
    oxygenSaturation?: number;
  };
  clinicalObservations?: string;
}

export interface ImmediateNeed {
  category: CareCaseCategory;
  title: string;
  description: string;
  rawUserInput: string;
  timeSensitivity: TimeSensitivity;
  requiredSkills: string[];
  estimatedDurationMins?: number;
}

export type ResponseActor =
  | 'system'
  | 'emergency_services'
  | 'family_caregiver'
  | 'community_health_worker' // ASHA / ANM
  | 'verified_volunteer'
  | 'healthcare_facility';

export type ResponseActionType =
  | 'safety_emergency_override'
  | 'notify_caregiver'
  | 'dispatch_emergency_108'
  | 'match_verified_volunteer'
  | 'route_to_healthcare_facility'
  | 'medication_delivery_dispatch'
  | 'health_check_in'
  | 'post_resolution_follow_up';

export interface ResponsePlanStep {
  id: string;
  sequenceOrder: number;
  title: string;
  description: string;
  assignedActorRole: ResponseActor;
  actionType: ResponseActionType;
  status: 'pending' | 'in_progress' | 'completed' | 'skipped' | 'failed';
  startedAt?: string;
  completedAt?: string;
  actorName?: string;
  actorPhone?: string;
  resultNotes?: string;
}

export interface ResponsePlan {
  id: string;
  summary: string;
  steps: ResponsePlanStep[];
  estimatedResolutionMins: number;
  safetyWarnings: string[];
  rationale: string;
}

export interface CareCaseEvent {
  id: string;
  caseId: string;
  eventType:
    | 'CREATED'
    | 'SITUATION_PARSED'
    | 'SAFETY_CHECKED'
    | 'EMERGENCY_OVERRIDE_TRIGGERED'
    | 'PLAN_GENERATED'
    | 'VOLUNTEER_MATCHED'
    | 'VOLUNTEER_ACCEPTED'
    | 'RESPONDER_EN_ROUTE'
    | 'TASK_FULFILLED'
    | 'FOLLOW_UP_COMPLETED'
    | 'CASE_CLOSED'
    | 'CASE_ESCALATED';
  title: string;
  description: string;
  actorRole: ResponseActor | 'requester';
  actorName?: string;
  timestamp: string;
  metadata?: Record<string, unknown>;
}

export interface AssignedVolunteer {
  id: string;
  fullName: string;
  phone: string;
  rating: number;
  tasksCompleted: number;
  skills: string[];
  distanceKm: number;
  matchScore: number;
  matchExplanation: string;
  verificationBadge: string;
  avatarUrl?: string;
}

export interface AssignedFacility {
  id: string;
  name: string;
  type: string;
  address: string;
  phone: string;
  distanceKm: number;
  hasEmergency: boolean;
}

export interface CareCase {
  id: string;
  trackingNumber: string; // e.g. ARG-2026-9041
  requesterId: string;
  requesterName: string;
  requesterPhone: string;
  address: string;
  latitude?: number | null;
  longitude?: number | null;
  personContext: PersonContext;
  healthContext: HealthContext;
  immediateNeed: ImmediateNeed;
  constraints: string[];
  status: CareCaseStatus;
  responsePlan: ResponsePlan;
  assignedVolunteer?: AssignedVolunteer | null;
  assignedFacility?: AssignedFacility | null;
  events: CareCaseEvent[];
  createdAt: string;
  updatedAt: string;
  followUpChecklist?: {
    symptomsImproved: boolean | null;
    medicationsReceived: boolean | null;
    patientComfortable: boolean | null;
    notes?: string;
  };
}
