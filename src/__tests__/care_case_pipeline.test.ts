import { describe, it, expect } from 'vitest';
import { SafetyEngine } from '../services/safety/safetyEngine';
import { SituationEngine } from '../services/ai/situationEngine';
import { ResponseOrchestrator } from '../services/orchestration/orchestrator.service';
import type { AssignedVolunteer } from '../types/careCase.types';

describe('AroggyaGram Care Case & Safety Pipeline', () => {
  it('SafetyEngine deterministically flags acute triggers and mandates 108 emergency dispatch', () => {
    const acuteInput = 'Grandmother has severe crushing chest pain radiating to left jaw and feels dizzy';
    const assessment = SafetyEngine.evaluateImmediateSafety(acuteInput, {
      age: 78,
      livingSituation: 'lives_alone'
    });

    expect(assessment.isEmergency).toBe(true);
    expect(assessment.riskLevel).toBe('CRITICAL');
    expect(assessment.dispatchRecommended).toBe('emergency_108');
    expect(assessment.bypassVolunteerMatching).toBe(true);
    expect(assessment.emergencyCategory).toContain('Cardiac');
  });

  it('SituationEngine extracts structured person, health, and need contexts from colloquial speech', async () => {
    const rawSpeech = 'Helping my neighbor Lakshmi Amma (age 74). She lives alone on River Road, has diabetes and high blood pressure. She ran out of insulin and amlodipine tablets this morning and needs urgent pharmacy delivery.';
    
    const situation = await SituationEngine.analyzeSituation(rawSpeech, {
      name: 'Geetha',
      phone: '+91 98471 99882',
      language: 'ml'
    });

    expect(situation.personContext.fullName).toBe('Lakshmi Amma');
    expect(situation.personContext.age).toBe(74);
    expect(situation.personContext.livingSituation).toBe('lives_alone');
    expect(situation.healthContext.knownConditions).toContain('Type 2 Diabetes');
    expect(situation.healthContext.knownConditions).toContain('Hypertension');
    expect(situation.healthContext.currentMedications).toContain('Insulin Regular/NPH');
    expect(situation.immediateNeed.category).toBe('medication_urgent_refill');
    expect(situation.isEmergencyOverride).toBe(false); // Not an acute cardiac/stroke collapse
    expect(situation.personContext.vulnerabilityScore).toBeGreaterThan(50);
  });

  it('ResponseOrchestrator generates appropriate multi-step response plan and advances state machine', async () => {
    const rawInput = 'Need help transporting Mr. Joseph (69) to Ponkunnam PHC for surgical dressing check tomorrow. Wheelchair user.';
    const situation = await SituationEngine.analyzeSituation(rawInput);
    
    const careCase = ResponseOrchestrator.createCareCase(
      situation,
      { id: 'user-mary', name: 'Mary Joseph', phone: '+91 94460 11223' },
      { address: 'Ponkunnam, Kottayam', latitude: 9.56, longitude: 76.76 }
    );

    expect(careCase.trackingNumber).toMatch(/^ARG-\d{4}-\d{4}$/);
    expect(careCase.status).toBe('ACTION_REQUIRED');
    expect(careCase.responsePlan.steps.length).toBeGreaterThanOrEqual(3);
    expect(careCase.events.length).toBeGreaterThanOrEqual(4);

    // Advance to MATCHING
    const matchingCase = ResponseOrchestrator.advanceStatus(careCase, 'MATCHING', 'Search initiated for wheelchair-accessible vehicle');
    expect(matchingCase.status).toBe('MATCHING');
    expect(matchingCase.events[0].eventType).toBe('VOLUNTEER_MATCHED');

    // Assign Volunteer
    const mockVolunteer: AssignedVolunteer = {
      id: 'vol-arun',
      fullName: 'Arun Varghese',
      phone: '+91 94470 55667',
      rating: 4.95,
      tasksCompleted: 34,
      skills: ['wheelchair_assist', 'vehicle_owner'],
      distanceKm: 1.2,
      matchScore: 96,
      matchExplanation: 'Closest volunteer with ramp-fitted vehicle.',
      verificationBadge: 'Verified Community Volunteer'
    };

    const assignedCase = ResponseOrchestrator.assignVolunteer(matchingCase, mockVolunteer);
    expect(assignedCase.status).toBe('ASSIGNED');
    expect(assignedCase.assignedVolunteer?.fullName).toBe('Arun Varghese');
    expect(assignedCase.events[0].eventType).toBe('VOLUNTEER_ACCEPTED');

    // Complete Follow-up
    const resolvedCase = ResponseOrchestrator.completeFollowUp(assignedCase, {
      symptomsImproved: true,
      medicationsReceived: true,
      patientComfortable: true,
      notes: 'Successfully returned home, dressing clean and intact.'
    });

    expect(resolvedCase.status).toBe('RESOLVED');
    expect(resolvedCase.followUpChecklist?.symptomsImproved).toBe(true);
  });
});
