import type { EmergencyEvent } from '@/types/database.types';
import { supabase, isSupabaseConfigured } from '@/services/supabase/client';

export interface LocationResult {
  latitude: number | null;
  longitude: number | null;
  accuracy: number | null;
  method: 'gps' | 'manual' | 'unavailable';
  error?: string;
}

export class EmergencyService {
  /**
   * Acquire current GPS with timeout. Never throw or block emergency dispatch.
   */
  public static async getCurrentLocation(timeoutMs: number = 6000): Promise<LocationResult> {
    if (!navigator.geolocation) {
      return {
        latitude: null,
        longitude: null,
        accuracy: null,
        method: 'unavailable',
        error: 'Geolocation not supported by device'
      };
    }

    return new Promise((resolve) => {
      const timer = setTimeout(() => {
        resolve({
          latitude: null,
          longitude: null,
          accuracy: null,
          method: 'unavailable',
          error: 'Location request timed out'
        });
      }, timeoutMs);

      navigator.geolocation.getCurrentPosition(
        (position) => {
          clearTimeout(timer);
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
            method: 'gps'
          });
        },
        (err) => {
          clearTimeout(timer);
          resolve({
            latitude: null,
            longitude: null,
            accuracy: null,
            method: 'unavailable',
            error: err.message
          });
        },
        { enableHighAccuracy: true, timeout: timeoutMs, maximumAge: 10000 }
      );
    });
  }

  /**
   * Create emergency event record in Supabase or local persistence
   */
  public static async recordEmergencyEvent(
    patientId: string,
    location: LocationResult,
    caregivers: string[]
  ): Promise<EmergencyEvent> {
    const event: EmergencyEvent = {
      id: `sos-${Date.now()}`,
      patient_id: patientId,
      triggered_at: new Date().toISOString(),
      latitude: location.latitude,
      longitude: location.longitude,
      location_method: location.method,
      caregivers_notified: caregivers,
      status: 'active'
    };

    if (isSupabaseConfigured) {
      try {
        await supabase.from('emergency_events').insert(event);
      } catch (err) {
        console.error('Failed to log emergency event to Supabase:', err);
      }
    }

    // Save to local emergency audit log
    try {
      const stored = JSON.parse(localStorage.getItem('aroggya_sos_history') || '[]');
      stored.unshift(event);
      localStorage.setItem('aroggya_sos_history', JSON.stringify(stored.slice(0, 20)));
    } catch {
      // Ignore local storage write errors
    }

    return event;
  }

  /**
   * Formats the emergency SMS link with maps coordinates if available
   */
  public static formatEmergencySms(
    patientName: string,
    location: LocationResult,
    customNote?: string
  ): string {
    let body = `EMERGENCY ALERT: ${patientName} has triggered an SOS alert via AroggyaGram.`;

    if (location.latitude && location.longitude) {
      body += `\nLocation: https://maps.google.com/?q=${location.latitude},${location.longitude}`;
    } else {
      body += `\nLocation: GPS coordinates unavailable. Please contact the patient immediately.`;
    }

    if (customNote) {
      body += `\nNote: ${customNote}`;
    }

    return encodeURIComponent(body);
  }
}
