import type { Medication } from '@/types/database.types';
import { supabase, isSupabaseConfigured } from '@/services/supabase/client';

const INITIAL_MEDS: Medication[] = [
  {
    id: 'med-1',
    patient_id: 'dev-patient-1',
    name: 'Metformin 500mg',
    dosage: '1 tablet after breakfast',
    schedule_time: '08:30 AM',
    taken: true,
    last_taken_at: new Date(Date.now() - 14400000).toISOString(),
    created_at: new Date().toISOString()
  },
  {
    id: 'med-2',
    patient_id: 'dev-patient-1',
    name: 'Amlodipine 5mg',
    dosage: '1 tablet with water',
    schedule_time: '01:00 PM',
    taken: false,
    last_taken_at: null,
    created_at: new Date().toISOString()
  },
  {
    id: 'med-3',
    patient_id: 'dev-patient-1',
    name: 'Atorvastatin 10mg',
    dosage: '1 tablet at bedtime',
    schedule_time: '09:00 PM',
    taken: false,
    last_taken_at: null,
    created_at: new Date().toISOString()
  }
];

export class MedicationService {
  private static getStored(): Medication[] {
    try {
      const val = localStorage.getItem('aroggya_meds');
      if (val) return JSON.parse(val);
    } catch {
      // fallback
    }
    localStorage.setItem('aroggya_meds', JSON.stringify(INITIAL_MEDS));
    return INITIAL_MEDS;
  }

  private static saveStored(meds: Medication[]) {
    localStorage.setItem('aroggya_meds', JSON.stringify(meds));
  }

  public static async getMedications(patientId: string): Promise<Medication[]> {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase
        .from('medications')
        .select('*')
        .eq('patient_id', patientId);

      if (!error && data) return data as Medication[];
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
      id: `med-${Date.now()}`,
      patient_id: patientId,
      name,
      dosage,
      schedule_time: scheduleTime,
      taken: false,
      created_at: new Date().toISOString()
    };

    const current = this.getStored();
    const updated = [...current, newMed];
    this.saveStored(updated);

    if (isSupabaseConfigured) {
      try {
        await supabase.from('medications').insert(newMed);
      } catch (err) {
        console.error('Supabase med insert failed:', err);
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
        console.error('Supabase med toggle failed:', err);
      }
    }

    return target;
  }
}
