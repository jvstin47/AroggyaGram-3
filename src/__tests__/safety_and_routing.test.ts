import { describe, it, expect } from 'vitest';
import { AIService } from '../services/ai/ai.service';
import { MatchingService } from '../services/matching/matching.service';
import { EmergencyService } from '../services/emergency/emergency.service';
import type { RequestItem, VolunteerProfile } from '../types/database.types';

describe('AroggyaGram Deterministic Safety & Routing Tests', () => {
  it('should detect emergency keywords deterministically and never allow volunteer diversion', async () => {
    const criticalCases = [
      'I fell down and cannot get up',
      'Having unbearable chest pain since 15 mins',
      'Severe bleeding from leg injury after accident',
      'Feeling dizzy and cannot breathe properly'
    ];

    for (const phrase of criticalCases) {
      const isEmergency = AIService.checkEmergencyKeywords(phrase);
      expect(isEmergency).toBe(true);

      const classification = await AIService.classifyRequest(phrase);
      expect(classification.is_emergency).toBe(true);
      expect(classification.urgency).toBe('critical');
      expect(classification.suggested_pathway).toBe('emergency_pathway');
    }
  });

  it('should route non-critical tasks to the volunteer assistance pathway', async () => {
    const dailyAssistanceCase = 'Please pick up my blood pressure medication from Jan Aushadhi pharmacy';
    const classification = await AIService.classifyRequest(dailyAssistanceCase);

    expect(classification.is_emergency).toBe(false);
    expect(classification.category).toBe('medicine_pickup');
    expect(classification.suggested_pathway).toBe('volunteer_assistance_pathway');
  });

  it('should format emergency SMS correctly with and without GPS location', () => {
    const patientName = 'Lakshmi Amma';

    // With GPS
    const smsWithGps = EmergencyService.formatEmergencySms(patientName, {
      latitude: 9.5550,
      longitude: 76.7885,
      accuracy: 8,
      method: 'gps'
    });
    expect(decodeURIComponent(smsWithGps)).toContain('https://maps.google.com/?q=9.555,76.7885');

    // Without GPS (graceful fallback)
    const smsWithoutGps = EmergencyService.formatEmergencySms(patientName, {
      latitude: null,
      longitude: null,
      accuracy: null,
      method: 'unavailable'
    });
    expect(decodeURIComponent(smsWithoutGps)).toContain('GPS coordinates unavailable');
    expect(decodeURIComponent(smsWithoutGps)).toContain('Lakshmi Amma');
  });

  it('should compute explainable matching scores with distance, verified skills, and reliability', () => {
    const mockRequest: RequestItem = {
      id: 'req-1',
      requester_id: 'p-1',
      category: 'medicine_pickup',
      urgency: 'today',
      title: 'Medicine Refill',
      description: 'Amlodipine refill',
      status: 'submitted',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    const mockVolunteer: VolunteerProfile = {
      id: 'vol-1',
      skills: ['healthcare_first_responder'],
      verification_state: 'community_verified',
      service_radius_km: 10,
      completed_tasks: 12,
      average_rating: 4.8,
      is_available: true,
      created_at: new Date().toISOString()
    };

    const match = MatchingService.calculateMatchScore(mockRequest, mockVolunteer, 'Rahul Nair', 1.5);

    expect(match.totalScore).toBeGreaterThan(60);
    expect(match.breakdown.skillsScore).toBe(30); // Awarded maximum skill bonus for first responder
    expect(match.explanation).toContain('Rahul Nair');
    expect(match.explanation).toContain('1.5 km away');
  });
});
