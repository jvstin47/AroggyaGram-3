import type { Medication } from '@/types/database.types';
import { supabase, isSupabaseConfigured } from '@/services/supabase/client';

const STORAGE_KEY = 'aroggya_meds_v2';

const INITIAL_MEDS: Medication[] = [
  {
    id: 'med-1',
    patient_id: 'citizen-user',
    name: 'Metformin 500mg',
    dosage: '1 Tablet • After Breakfast',
    schedule_time: '08:30 AM',
    taken: true,
    last_taken_at: new Date(Date.now() - 14400000).toISOString(),
    created_at: new Date().toISOString()
  },
  {
    id: 'med-2',
    patient_id: 'citizen-user',
    name: 'Amlodipine 5mg',
    dosage: '1 Tablet • After Lunch',
    schedule_time: '01:00 PM',
    taken: false,
    last_taken_at: null,
    created_at: new Date().toISOString()
  },
  {
    id: 'med-3',
    patient_id: 'citizen-user',
    name: 'Atorvastatin 10mg',
    dosage: '1 Tablet • Bedtime',
    schedule_time: '09:00 PM',
    taken: false,
    last_taken_at: null,
    created_at: new Date().toISOString()
  }
];

export class MedicationService {
  public static getStored(): Medication[] {
    try {
      const val = localStorage.getItem(STORAGE_KEY);
      if (val) {
        const parsed = JSON.parse(val);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // fallback
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_MEDS));
    return INITIAL_MEDS;
  }

  public static saveStored(meds: Medication[]) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(meds));
    } catch (err) {
      console.warn('Failed to save medications to localStorage:', err);
    }
  }

  public static async getMedications(patientId: string): Promise<Medication[]> {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from('medications')
          .select('*')
          .order('schedule_time', { ascending: true });

        if (!error && data && data.length > 0) {
          this.saveStored(data as Medication[]);
          return data as Medication[];
        }
      } catch (err) {
        console.warn('Supabase fetch failed, using local store:', err);
      }
    }
    return this.getStored();
  }

  public static async addMedication(
    patientId: string,
    name: string,
    dosage: string,
    scheduleTime: string
  ): Promise<Medication> {
    const newMed: Medication = {
      id: `med-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      patient_id: patientId || 'citizen-user',
      name: name.trim(),
      dosage: dosage.trim(),
      schedule_time: scheduleTime,
      taken: false,
      last_taken_at: null,
      created_at: new Date().toISOString()
    };

    const current = this.getStored();
    const updated = [newMed, ...current];
    this.saveStored(updated);

    if (isSupabaseConfigured) {
      try {
        await supabase.from('medications').insert(newMed);
      } catch (err) {
        console.error('Supabase med insert error:', err);
      }
    }

    return newMed;
  }

  public static async toggleTaken(id: string, taken: boolean): Promise<Medication> {
    const list = this.getStored();
    const target = list.find((m) => m.id === id);
    if (!target) throw new Error('Medication not found');

    target.taken = taken;
    target.last_taken_at = taken ? new Date().toISOString() : null;
    this.saveStored(list);

    if (isSupabaseConfigured) {
      try {
        await supabase
          .from('medications')
          .update({ taken, last_taken_at: target.last_taken_at })
          .eq('id', id);
      } catch (err) {
        console.error('Supabase med toggle error:', err);
      }
    }

    return target;
  }

  public static async deleteMedication(id: string): Promise<void> {
    const list = this.getStored().filter((m) => m.id !== id);
    this.saveStored(list);

    if (isSupabaseConfigured) {
      try {
        await supabase.from('medications').delete().eq('id', id);
      } catch (err) {
        console.error('Supabase med delete error:', err);
      }
    }
  }
}
