import type {
  CareCase,
  CareCaseStatus,
  CareCaseEvent,
  ResponsePlan,
  ResponsePlanStep,
  AssignedVolunteer,
  AssignedFacility
} from '@/types/careCase.types';
import type { ExtractedSituation } from '@/services/ai/situationEngine';

const STORAGE_KEY = 'aroggyagram_care_cases_v1';

export class ResponseOrchestrator {
  /**
   * Generate an intelligent, multi-step Response Plan based on clinical triage and situation context.
   */
  public static generatePlan(situation: ExtractedSituation, locationName: string = 'Local Community'): ResponsePlan {
    const isEmergency = situation.isEmergencyOverride || situation.healthContext.riskLevel === 'CRITICAL';
    const steps: ResponsePlanStep[] = [];
    const planId = `plan-${Date.now()}`;

    if (isEmergency) {
      steps.push({
        id: `${planId}-1`,
        sequenceOrder: 1,
        title: 'Emergency 108 Ambulance Dispatch Alert',
        description: 'Transmitting patient GPS coordinates, acute symptoms, and emergency contact to 108 dispatch.',
        assignedActorRole: 'emergency_services',
        actionType: 'dispatch_emergency_108',
        status: 'in_progress',
        startedAt: new Date().toISOString()
      });

      steps.push({
        id: `${planId}-2`,
        sequenceOrder: 2,
        title: 'Notify Designated Caregivers & ASHA Worker',
        description: 'Triggering urgent SMS and phone alert with map coordinates to registered family and community health worker.',
        assignedActorRole: 'family_caregiver',
        actionType: 'notify_caregiver',
        status: 'pending'
      });

      steps.push({
        id: `${planId}-3`,
        sequenceOrder: 3,
        title: 'Coordinate Bed & Triage at Nearest Emergency Hospital',
        description: 'Transmitting pre-arrival patient summary to local Taluk / District Hospital emergency room.',
        assignedActorRole: 'healthcare_facility',
        actionType: 'route_to_healthcare_facility',
        status: 'pending'
      });

      steps.push({
        id: `${planId}-4`,
        sequenceOrder: 4,
        title: '24-Hour Clinical Follow-up & Discharge Check',
        description: 'Schedule ASHA worker welfare check post-stabilization to verify home recovery conditions.',
        assignedActorRole: 'community_health_worker',
        actionType: 'post_resolution_follow_up',
        status: 'pending'
      });

      return {
        id: planId,
        summary: 'Emergency Life-Safety Protocol Initiated: Priority 1 dispatch and caregiver mobilization.',
        steps,
        estimatedResolutionMins: 20,
        safetyWarnings: [
          'CRITICAL: Acute life-safety protocol triggered. Do not wait for standard volunteer matching.',
          ...situation.safetyDirectives
        ],
        rationale: 'Deterministic safety rules detected life-threatening symptoms. Protocol routes directly to emergency services.'
      };
    }

    // High urgency or vulnerable clinical need (e.g. medication or clinic transport)
    const isHighRisk = situation.healthContext.riskLevel === 'HIGH' || situation.personContext.vulnerabilityScore >= 50;

    steps.push({
      id: `${planId}-1`,
      sequenceOrder: 1,
      title: 'Safety Evaluation & Triage Confirmation',
      description: `Verified no acute emergency red flags. Vulnerability index rated at ${situation.personContext.vulnerabilityScore}/100.`,
      assignedActorRole: 'system',
      actionType: 'safety_emergency_override',
      status: 'completed',
      completedAt: new Date().toISOString(),
      resultNotes: 'Deterministic safety rules cleared for community volunteer assistance.'
    });

    steps.push({
      id: `${planId}-2`,
      sequenceOrder: 2,
      title: 'Multi-Factor Volunteer Match & Dispatch',
      description: `Locate closest verified volunteer possessing required skills: ${situation.immediateNeed.requiredSkills.join(', ') || 'community assistance'}.`,
      assignedActorRole: 'verified_volunteer',
      actionType: 'match_verified_volunteer',
      status: 'in_progress',
      startedAt: new Date().toISOString()
    });

    steps.push({
      id: `${planId}-3`,
      sequenceOrder: 3,
      title: 'Task Execution & Physical Verification',
      description: `Volunteer delivers ${situation.immediateNeed.title} and checks in on patient comfort.`,
      assignedActorRole: 'verified_volunteer',
      actionType: 'medication_delivery_dispatch',
      status: 'pending'
    });

    steps.push({
      id: `${planId}-4`,
      sequenceOrder: 4,
      title: 'Post-Care Health & Satisfaction Verification',
      description: 'System triggers automated check-in 2 hours post-delivery to confirm symptom relief and adherence.',
      assignedActorRole: 'system',
      actionType: 'post_resolution_follow_up',
      status: 'pending'
    });

    return {
      id: planId,
      summary: `${isHighRisk ? 'Priority' : 'Standard'} Community Health-Response Plan: Coordinated volunteer assistance in ${locationName}.`,
      steps,
      estimatedResolutionMins: isHighRisk ? 45 : 90,
      safetyWarnings: situation.safetyDirectives,
      rationale: `Matched for ${situation.immediateNeed.category} with multi-factor skills scoring.`
    };
  }

  /**
   * Create a new CareCase instance from an extracted situation.
   */
  public static createCareCase(
    situation: ExtractedSituation,
    requester: { id: string; name: string; phone: string },
    location: { address: string; latitude?: number | null; longitude?: number | null }
  ): CareCase {
    const trackingNum = `ARG-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const caseId = `case-${Date.now()}`;
    const plan = this.generatePlan(situation, location.address || 'Kottayam District');

    const initialStatus: CareCaseStatus = situation.isEmergencyOverride ? 'ESCALATED' : 'ACTION_REQUIRED';

    const events: CareCaseEvent[] = [
      {
        id: `evt-${Date.now()}-1`,
        caseId,
        eventType: 'CREATED',
        title: 'Care Need Registered',
        description: `Case initiated for ${situation.personContext.fullName} via natural language intake.`,
        actorRole: 'requester',
        actorName: requester.name,
        timestamp: new Date().toISOString()
      },
      {
        id: `evt-${Date.now()}-2`,
        caseId,
        eventType: 'SITUATION_PARSED',
        title: 'Situation Context Synthesized',
        description: `Identified need: "${situation.immediateNeed.title}". Vulnerability score: ${situation.personContext.vulnerabilityScore}/100.`,
        actorRole: 'system',
        timestamp: new Date().toISOString()
      },
      {
        id: `evt-${Date.now()}-3`,
        caseId,
        eventType: situation.isEmergencyOverride ? 'EMERGENCY_OVERRIDE_TRIGGERED' : 'SAFETY_CHECKED',
        title: situation.isEmergencyOverride ? 'Emergency Red Flags Triggered' : 'Safety Engine Guardrails Passed',
        description: situation.isEmergencyOverride
          ? 'Emergency keywords detected; routed immediately to 108 Emergency Response Pathway.'
          : 'Deterministic safety rules passed with zero critical cardiac/stroke contraindications.',
        actorRole: 'system',
        timestamp: new Date().toISOString()
      },
      {
        id: `evt-${Date.now()}-4`,
        caseId,
        eventType: 'PLAN_GENERATED',
        title: 'Coordinated Response Plan Generated',
        description: plan.summary,
        actorRole: 'system',
        timestamp: new Date().toISOString()
      }
    ];

    const careCase: CareCase = {
      id: caseId,
      trackingNumber: trackingNum,
      requesterId: requester.id,
      requesterName: requester.name,
      requesterPhone: requester.phone,
      address: location.address,
      latitude: location.latitude,
      longitude: location.longitude,
      personContext: situation.personContext,
      healthContext: situation.healthContext,
      immediateNeed: situation.immediateNeed,
      constraints: situation.constraints,
      status: initialStatus,
      responsePlan: plan,
      assignedVolunteer: null,
      assignedFacility: null,
      events,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.saveCareCase(careCase);
    return careCase;
  }

  /**
   * Advance the Care Case state machine cleanly
   */
  public static advanceStatus(
    careCase: CareCase,
    newStatus: CareCaseStatus,
    note?: string,
    actorRole: CareCaseEvent['actorRole'] = 'system',
    actorName?: string
  ): CareCase {
    const updated: CareCase = {
      ...careCase,
      status: newStatus,
      updatedAt: new Date().toISOString()
    };

    // Update response plan step statuses accordingly
    if (newStatus === 'MATCHING') {
      const step = updated.responsePlan.steps.find(s => s.actionType === 'match_verified_volunteer');
      if (step) step.status = 'in_progress';
    } else if (newStatus === 'ASSIGNED') {
      const step = updated.responsePlan.steps.find(s => s.actionType === 'match_verified_volunteer');
      if (step) {
        step.status = 'completed';
        step.completedAt = new Date().toISOString();
      }
      const nextStep = updated.responsePlan.steps.find(s => s.actionType === 'medication_delivery_dispatch');
      if (nextStep) nextStep.status = 'in_progress';
    } else if (newStatus === 'IN_PROGRESS') {
      const step = updated.responsePlan.steps.find(s => s.actionType === 'medication_delivery_dispatch');
      if (step) step.status = 'in_progress';
    } else if (newStatus === 'COMPLETED') {
      const step = updated.responsePlan.steps.find(s => s.actionType === 'medication_delivery_dispatch');
      if (step) {
        step.status = 'completed';
        step.completedAt = new Date().toISOString();
      }
      const followUp = updated.responsePlan.steps.find(s => s.actionType === 'post_resolution_follow_up');
      if (followUp) followUp.status = 'in_progress';
    } else if (newStatus === 'RESOLVED') {
      updated.responsePlan.steps.forEach(s => {
        if (s.status === 'in_progress' || s.status === 'pending') s.status = 'completed';
      });
    }

    const eventTitleMap: Record<CareCaseStatus, string> = {
      DRAFT: 'Case Drafted',
      ANALYZING: 'Synthesizing Situation Context',
      ASSESSED: 'Clinical Triage Completed',
      ACTION_REQUIRED: 'Action Plan Approved',
      MATCHING: 'Searching for Closest Verified Responder',
      ASSIGNED: 'Responder Assigned & Confirmed',
      IN_PROGRESS: 'Responder En Route to Patient',
      COMPLETED: 'Task Successfully Delivered',
      FOLLOW_UP: 'Post-Care Verification Initiated',
      RESOLVED: 'Case Resolved and Closed',
      ESCALATED: 'Urgent Emergency Escalation',
      CANCELLED: 'Case Cancelled'
    };

    const eventTypeMap: Record<CareCaseStatus, CareCaseEvent['eventType']> = {
      DRAFT: 'CREATED',
      ANALYZING: 'SITUATION_PARSED',
      ASSESSED: 'SAFETY_CHECKED',
      ACTION_REQUIRED: 'PLAN_GENERATED',
      MATCHING: 'VOLUNTEER_MATCHED',
      ASSIGNED: 'VOLUNTEER_ACCEPTED',
      IN_PROGRESS: 'RESPONDER_EN_ROUTE',
      COMPLETED: 'TASK_FULFILLED',
      FOLLOW_UP: 'FOLLOW_UP_COMPLETED',
      RESOLVED: 'CASE_CLOSED',
      ESCALATED: 'CASE_ESCALATED',
      CANCELLED: 'CASE_CLOSED'
    };

    const newEvent: CareCaseEvent = {
      id: `evt-${Date.now()}`,
      caseId: careCase.id,
      eventType: eventTypeMap[newStatus],
      title: eventTitleMap[newStatus],
      description: note || `Transitioned status to ${newStatus}.`,
      actorRole,
      actorName,
      timestamp: new Date().toISOString()
    };

    updated.events = [newEvent, ...updated.events];
    this.saveCareCase(updated);
    return updated;
  }

  /**
   * Assign a volunteer to the Care Case
   */
  public static assignVolunteer(careCase: CareCase, volunteer: AssignedVolunteer): CareCase {
    const updated: CareCase = {
      ...careCase,
      assignedVolunteer: volunteer,
      status: 'ASSIGNED',
      updatedAt: new Date().toISOString()
    };

    // Update the matching step in response plan
    const matchStep = updated.responsePlan.steps.find(s => s.actionType === 'match_verified_volunteer');
    if (matchStep) {
      matchStep.status = 'completed';
      matchStep.actorName = volunteer.fullName;
      matchStep.actorPhone = volunteer.phone;
      matchStep.resultNotes = volunteer.matchExplanation;
      matchStep.completedAt = new Date().toISOString();
    }

    const nextStep = updated.responsePlan.steps.find(s => s.actionType === 'medication_delivery_dispatch');
    if (nextStep) {
      nextStep.status = 'in_progress';
      nextStep.actorName = volunteer.fullName;
      nextStep.actorPhone = volunteer.phone;
    }

    const event: CareCaseEvent = {
      id: `evt-${Date.now()}`,
      caseId: careCase.id,
      eventType: 'VOLUNTEER_ACCEPTED',
      title: `${volunteer.fullName} Accepted Dispatch`,
      description: `${volunteer.fullName} is ${volunteer.distanceKm} km away. Match Score: ${volunteer.matchScore}/100. ${volunteer.matchExplanation}`,
      actorRole: 'verified_volunteer',
      actorName: volunteer.fullName,
      timestamp: new Date().toISOString()
    };

    updated.events = [event, ...updated.events];
    this.saveCareCase(updated);
    return updated;
  }

  /**
   * Complete follow-up checklist
   */
  public static completeFollowUp(
    careCase: CareCase,
    checklist: { symptomsImproved: boolean; medicationsReceived: boolean; patientComfortable: boolean; notes?: string }
  ): CareCase {
    const updated: CareCase = {
      ...careCase,
      followUpChecklist: checklist,
      status: 'RESOLVED',
      updatedAt: new Date().toISOString()
    };

    const event: CareCaseEvent = {
      id: `evt-${Date.now()}`,
      caseId: careCase.id,
      eventType: 'FOLLOW_UP_COMPLETED',
      title: 'Follow-Up Health Check Completed',
      description: `Patient well-being verified: Symptoms improved: ${checklist.symptomsImproved ? 'Yes' : 'No'}, Prescriptions confirmed: ${checklist.medicationsReceived ? 'Yes' : 'No'}. Case safely archived.`,
      actorRole: 'system',
      timestamp: new Date().toISOString()
    };

    updated.events = [event, ...updated.events];
    this.saveCareCase(updated);
    return updated;
  }

  // --- Local Persistence & Pre-loaded Mock Cases ---

  public static getCareCases(): CareCase[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // ignore
    }
    const initial = this.getSampleCareCases();
    this.saveAllCareCases(initial);
    return initial;
  }

  public static getCareCaseById(id: string): CareCase | undefined {
    const all = this.getCareCases();
    return all.find(c => c.id === id || c.trackingNumber === id);
  }

  public static saveCareCase(careCase: CareCase): void {
    const all = this.getCareCases();
    const index = all.findIndex(c => c.id === careCase.id);
    if (index >= 0) {
      all[index] = careCase;
    } else {
      all.unshift(careCase);
    }
    this.saveAllCareCases(all);
  }

  private static saveAllCareCases(cases: CareCase[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cases));
    } catch {
      // storage full or disabled
    }
  }

  /**
   * High-fidelity initial demo cases showcasing the 12 capabilities
   */
  public static getSampleCareCases(): CareCase[] {
    return [
      {
        id: 'case-demo-1',
        trackingNumber: 'ARG-2026-8812',
        requesterId: 'patient-lakshmi',
        requesterName: 'Lakshmi Amma',
        requesterPhone: '+91 98470 12345',
        address: 'House #42, River Road, Kanjirappally, Kottayam',
        latitude: 9.5560,
        longitude: 76.7870,
        personContext: {
          fullName: 'Lakshmi Amma',
          age: 74,
          gender: 'female',
          livingSituation: 'lives_alone',
          primaryLanguage: 'ml',
          mobilityLevel: 'uses_cane_or_walker',
          emergencyContactName: 'Geetha (Daughter in Kochi)',
          emergencyContactPhone: '+91 98471 99882',
          vulnerabilityScore: 78,
          notes: 'Geriatric resident living independently. Daughter resides 80km away in Ernakulam.'
        },
        healthContext: {
          knownConditions: ['Hypertension', 'Type 2 Diabetes', 'Osteoarthritis'],
          currentMedications: ['Amlodipine 5mg', 'Metformin 500mg', 'Paracetamol PRN'],
          knownAllergies: ['Sulfa antibiotics'],
          reportedSymptoms: ['Dizziness', 'Mild headache upon standing'],
          riskLevel: 'MODERATE',
          requiresImmediateClinicalCare: false,
          vitalSigns: {
            bloodPressure: '148/92 mmHg',
            pulseRate: 76
          },
          clinicalObservations: 'Patient ran out of morning antihypertensive medicine 2 days ago.'
        },
        immediateNeed: {
          category: 'medication_urgent_refill',
          title: 'Urgent Amlodipine Refill from Neethi Medicals',
          description: 'Lakshmi Amma missed her morning BP medicine. Needs 1 strip of Amlodipine 5mg picked up from Neethi Co-op Medical Store (1.2 km away) and delivered home before 2:00 PM.',
          rawUserInput: 'My name is Lakshmi Amma, I am 74 years old and live alone near River Road. I have run out of my blood pressure tablets since yesterday and feeling a bit dizzy. Can someone get my medicine from Neethi medical store?',
          timeSensitivity: 'CRITICAL_SAME_DAY',
          requiredSkills: ['vehicle_transport', 'pharmacy_access'],
          estimatedDurationMins: 35
        },
        constraints: [
          'Patient cannot walk far due to knee osteoarthritis',
          'Prefers Malayalam communication',
          'Exact change Rs 120 ready at door'
        ],
        status: 'IN_PROGRESS',
        responsePlan: {
          id: 'plan-demo-1',
          summary: 'Priority Medication Dispatch: Same-day pharmacy pickup and safe drop-off.',
          estimatedResolutionMins: 40,
          safetyWarnings: [
            'Monitor for sudden worsening of dizziness or chest tightness',
            'Ensure volunteer verifies dosage label (Amlodipine 5mg) before handing over'
          ],
          rationale: 'Hypertension patient with 48h medication lapse and mild presyncope symptoms.',
          steps: [
            {
              id: 's-1',
              sequenceOrder: 1,
              title: 'Clinical Safety Clear',
              description: 'Assessed absence of chest pain, focal weakness, or dyspnea.',
              assignedActorRole: 'system',
              actionType: 'safety_emergency_override',
              status: 'completed',
              completedAt: '2026-09-15T07:10:00Z'
            },
            {
              id: 's-2',
              sequenceOrder: 2,
              title: 'Match Nearby Certified Responder',
              description: 'Matched with Rahul Nair (Community First Responder, 1.4 km away).',
              assignedActorRole: 'verified_volunteer',
              actionType: 'match_verified_volunteer',
              status: 'completed',
              completedAt: '2026-09-15T07:18:00Z',
              actorName: 'Rahul Nair',
              actorPhone: '+91 94471 22334'
            },
            {
              id: 's-3',
              sequenceOrder: 3,
              title: 'Pharmacy Pickup & Delivery En Route',
              description: 'Rahul has purchased the prescription and is traveling towards River Road.',
              assignedActorRole: 'verified_volunteer',
              actionType: 'medication_delivery_dispatch',
              status: 'in_progress',
              startedAt: '2026-09-15T07:35:00Z',
              actorName: 'Rahul Nair',
              actorPhone: '+91 94471 22334'
            },
            {
              id: 's-4',
              sequenceOrder: 4,
              title: 'Post-Delivery Health Confirmation',
              description: 'Automated verification check-in on BP symptom relief.',
              assignedActorRole: 'system',
              actionType: 'post_resolution_follow_up',
              status: 'pending'
            }
          ]
        },
        assignedVolunteer: {
          id: 'vol-rahul',
          fullName: 'Rahul Nair',
          phone: '+91 94471 22334',
          rating: 4.9,
          tasksCompleted: 48,
          skills: ['vehicle_owner', 'first_aid_certified', 'malayalam_fluent'],
          distanceKm: 1.4,
          matchScore: 94,
          matchExplanation: 'Rahul is 1.4 km away, has two-wheeler transport, first-aid certification, and fluent Malayalam.',
          verificationBadge: 'Community Health First Responder',
          avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
        },
        assignedFacility: {
          id: 'fac-kanjirappally',
          name: 'Taluk Headquarters Hospital, Kanjirappally',
          type: 'General Hospital',
          address: 'Hospital Junction, Kanjirappally',
          phone: '+91 4828 202345',
          distanceKm: 2.1,
          hasEmergency: true
        },
        events: [
          {
            id: 'evt-1',
            caseId: 'case-demo-1',
            eventType: 'RESPONDER_EN_ROUTE',
            title: 'Rahul Nair Picked Up Prescription',
            description: 'Medication secured from Neethi Medicals. En route to Lakshmi Amma (ETA 8 mins).',
            actorRole: 'verified_volunteer',
            actorName: 'Rahul Nair',
            timestamp: new Date(Date.now() - 12 * 60000).toISOString()
          },
          {
            id: 'evt-2',
            caseId: 'case-demo-1',
            eventType: 'VOLUNTEER_ACCEPTED',
            title: 'Rahul Nair Accepted Dispatch',
            description: 'Volunteer accepted task with 94/100 match compatibility.',
            actorRole: 'verified_volunteer',
            actorName: 'Rahul Nair',
            timestamp: new Date(Date.now() - 25 * 60000).toISOString()
          },
          {
            id: 'evt-3',
            caseId: 'case-demo-1',
            eventType: 'PLAN_GENERATED',
            title: '4-Step Health-Response Plan Built',
            description: 'Orchestrator calculated 40-minute resolution trajectory.',
            actorRole: 'system',
            timestamp: new Date(Date.now() - 32 * 60000).toISOString()
          },
          {
            id: 'evt-4',
            caseId: 'case-demo-1',
            eventType: 'CREATED',
            title: 'Voice Request Ingested',
            description: 'Lakshmi Amma audio intake transcribed and analyzed.',
            actorRole: 'requester',
            actorName: 'Lakshmi Amma',
            timestamp: new Date(Date.now() - 35 * 60000).toISOString()
          }
        ],
        createdAt: new Date(Date.now() - 35 * 60000).toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 'case-demo-2',
        trackingNumber: 'ARG-2026-9041',
        requesterId: 'patient-joseph',
        requesterName: 'K. V. Joseph',
        requesterPhone: '+91 94460 77889',
        address: 'St. Marys Lane, Ponkunnam',
        latitude: 9.5630,
        longitude: 76.7620,
        personContext: {
          fullName: 'K. V. Joseph',
          age: 69,
          gender: 'male',
          livingSituation: 'with_elderly_spouse',
          primaryLanguage: 'ml',
          mobilityLevel: 'wheelchair_bound',
          vulnerabilityScore: 65,
          notes: 'Recent orthopedic surgery (hip replacement 3 weeks ago).'
        },
        healthContext: {
          knownConditions: ['Post-Op Total Hip Replacement', 'Mild Asthma'],
          currentMedications: ['Cefuroxime', 'Tramadol', 'Calcium Vit-D3'],
          knownAllergies: [],
          reportedSymptoms: ['Surgical site dressing check required'],
          riskLevel: 'LOW',
          requiresImmediateClinicalCare: false
        },
        immediateNeed: {
          category: 'clinical_transportation',
          title: 'Wheelchair Transport to PHC for Stitch Inspection',
          description: 'Requires assisted ground-floor vehicle transport to Ponkunnam Community Health Centre for routine 3-week post-op wound review at 10:30 AM.',
          rawUserInput: 'Need help with wheelchair-friendly auto or car to visit Ponkunnam health center tomorrow morning for dressing check.',
          timeSensitivity: 'TODAY',
          requiredSkills: ['wheelchair_assist', 'vehicle_owner'],
          estimatedDurationMins: 90
        },
        constraints: [
          'Needs low-entry vehicle or wheelchair ramp',
          'Wife Mary cannot lift heavy objects'
        ],
        status: 'ACTION_REQUIRED',
        responsePlan: {
          id: 'plan-demo-2',
          summary: 'Assisted Mobility Transport: Wheelchair-capable vehicle match and clinic accompaniment.',
          estimatedResolutionMins: 90,
          safetyWarnings: ['Ensure hip flexion is maintained under 90 degrees during transfer.'],
          rationale: 'Post-operative mobility limitation requiring assisted transport.',
          steps: [
            {
              id: 'p2-1',
              sequenceOrder: 1,
              title: 'Verify Mobility Constraints',
              description: 'Confirmed wheelchair ramp requirement and vehicle accessibility.',
              assignedActorRole: 'system',
              actionType: 'safety_emergency_override',
              status: 'completed',
              completedAt: new Date(Date.now() - 40 * 60000).toISOString()
            },
            {
              id: 'p2-2',
              sequenceOrder: 2,
              title: 'Dispatch Accessible Volunteer Vehicle',
              description: 'Broadcasting to volunteers with ramp or spacious SUV/Auto.',
              assignedActorRole: 'verified_volunteer',
              actionType: 'match_verified_volunteer',
              status: 'in_progress'
            },
            {
              id: 'p2-3',
              sequenceOrder: 3,
              title: 'Clinic Transfer & Return Escort',
              description: 'Pick up Mr. Joseph, escort to OPD, and transport home safely.',
              assignedActorRole: 'verified_volunteer',
              actionType: 'medication_delivery_dispatch',
              status: 'pending'
            }
          ]
        },
        assignedVolunteer: null,
        assignedFacility: {
          id: 'fac-ponkunnam',
          name: 'Community Health Centre, Ponkunnam',
          type: 'Primary Health Centre',
          address: 'Main Town Road, Ponkunnam',
          phone: '+91 4828 221234',
          distanceKm: 1.8,
          hasEmergency: false
        },
        events: [
          {
            id: 'evt-201',
            caseId: 'case-demo-2',
            eventType: 'PLAN_GENERATED',
            title: 'Assisted Transport Plan Formatted',
            description: 'Matched with local accessible transit protocol.',
            actorRole: 'system',
            timestamp: new Date(Date.now() - 40 * 60000).toISOString()
          },
          {
            id: 'evt-202',
            caseId: 'case-demo-2',
            eventType: 'CREATED',
            title: 'Transport Request Registered',
            description: 'Request submitted for clinic appointment.',
            actorRole: 'requester',
            actorName: 'Mary Joseph',
            timestamp: new Date(Date.now() - 45 * 60000).toISOString()
          }
        ],
        createdAt: new Date(Date.now() - 45 * 60000).toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];
  }
}
