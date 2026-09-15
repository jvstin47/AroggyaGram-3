import type { RequestItem, VolunteerProfile } from '@/types/database.types';

export interface ScoredMatch {
  volunteerId: string;
  volunteerName: string;
  distanceKm: number;
  totalScore: number;
  breakdown: {
    distanceScore: number;
    skillsScore: number;
    availabilityScore: number;
    reliabilityScore: number;
  };
  explanation: string;
}

export class MatchingService {
  /**
   * Explainable match scoring algorithm based on distance, verified skills, and reliability
   */
  public static calculateMatchScore(
    request: RequestItem,
    volunteer: VolunteerProfile,
    volunteerName: string,
    estimatedDistanceKm: number
  ): ScoredMatch {
    // 1. Distance score (max 40 pts)
    const distanceScore = Math.max(0, Math.round((1 - estimatedDistanceKm / volunteer.service_radius_km) * 40));

    // 2. Skill match (max 30 pts)
    let skillsScore = 15;
    if (request.category === 'medicine_pickup' && volunteer.skills.includes('healthcare_first_responder')) {
      skillsScore = 30;
    } else if (request.category === 'transportation' && volunteer.skills.includes('vehicle_owner')) {
      skillsScore = 30;
    }

    // 3. Availability score (max 15 pts)
    const availabilityScore = volunteer.is_available ? 15 : 5;

    // 4. Reliability score (max 15 pts)
    const reliabilityScore = Math.min(15, Math.round(volunteer.average_rating * 3));

    const totalScore = distanceScore + skillsScore + availabilityScore + reliabilityScore;

    const explanation = `${volunteerName}: ${estimatedDistanceKm.toFixed(1)} km away • ${volunteer.is_available ? 'Available now' : 'On call'} • ${volunteer.verification_state.replace('_', ' ')} • ${volunteer.completed_tasks} tasks fulfilled`;

    return {
      volunteerId: volunteer.id,
      volunteerName,
      distanceKm: estimatedDistanceKm,
      totalScore,
      breakdown: {
        distanceScore,
        skillsScore,
        availabilityScore,
        reliabilityScore
      },
      explanation
    };
  }
}
