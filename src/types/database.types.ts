export type UserRole = 'patient' | 'volunteer' | 'caregiver' | 'admin';

export type VerificationState = 'unverified' | 'identity_verified' | 'community_verified' | 'org_verified';

export type RequestCategory =
  | 'medicine_pickup'
  | 'clinic_visit'
  | 'hospital_visit'
  | 'prescription_assistance'
  | 'health_check'
  | 'caregiver_assistance'
  | 'grocery_pickup'
  | 'pharmacy_pickup'
  | 'transportation'
  | 'household_assistance'
  | 'technology_assistance'
  | 'document_assistance'
  | 'companionship'
  | 'welfare_check'
  | 'custom';

export type RequestUrgency = 'critical' | 'today' | 'scheduled' | 'ongoing';

export type RequestStatus =
  | 'draft'
  | 'submitted'
  | 'matching'
  | 'accepted'
  | 'in_progress'
  | 'completed'
  | 'follow_up'
  | 'closed'
  | 'cancelled';

export interface Profile {
  id: string;
  role: UserRole;
  full_name: string;
  phone: string | null;
  language: 'en' | 'ml' | 'hi' | 'ta' | 'bn';
  avatar_url: string | null;
  accessibility_settings?: {
    fontSize?: 'normal' | 'large' | 'xlarge';
    highContrast?: boolean;
    reducedMotion?: boolean;
  };
  created_at: string;
  updated_at: string;
}

export interface VolunteerProfile {
  id: string;
  skills: string[];
  verification_state: VerificationState;
  service_radius_km: number;
  bio?: string;
  completed_tasks: number;
  average_rating: number;
  is_available: boolean;
  created_at: string;
}

export interface RequestItem {
  id: string;
  requester_id: string;
  volunteer_id?: string | null;
  category: RequestCategory;
  intent?: string;
  urgency: RequestUrgency;
  title: string;
  description: string;
  voice_transcript?: string;
  address?: string;
  latitude?: number | null;
  longitude?: number | null;
  status: RequestStatus;
  created_at: string;
  updated_at: string;
}

export interface RequestStatusHistory {
  id: string;
  request_id: string;
  status: RequestStatus;
  note?: string;
  changed_by: string;
  created_at: string;
}

export interface Medication {
  id: string;
  patient_id: string;
  name: string;
  dosage: string;
  schedule_time: string; // e.g. "08:00 AM"
  frequency?: string;
  taken: boolean;
  last_taken_at?: string | null;
  created_at: string;
}

export interface CaregiverRelationship {
  id: string;
  patient_id: string;
  name: string;
  phone: string;
  relationship: string;
  notification_permissions: ('sos' | 'high_risk' | 'request_status' | 'medication_alerts')[];
  is_active: boolean;
  created_at: string;
}

export interface EmergencyEvent {
  id: string;
  patient_id: string;
  triggered_at: string;
  latitude?: number | null;
  longitude?: number | null;
  location_method: 'gps' | 'manual' | 'unavailable';
  caregivers_notified: string[];
  status: 'active' | 'resolved';
  resolved_at?: string | null;
  notes?: string;
}

export interface HealthcareFacility {
  id: string;
  name: string;
  type: 'hospital' | 'clinic' | 'pharmacy' | 'emergency';
  address: string;
  latitude: number;
  longitude: number;
  phone: string;
  has_emergency: boolean;
  distance_km?: number;
}
