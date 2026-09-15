import type { CaregiverRelationship } from '@/types/database.types';

const INITIAL_CAREGIVERS: CaregiverRelationship[] = [
  {
    id: 'cg-1',
    patient_id: 'dev-patient-1',
    name: 'Primary Caregiver',
    phone: '9539141210',
    relationship: 'Family Caregiver',
    notification_permissions: ['sos', 'high_risk', 'request_status', 'medication_alerts'],
    is_active: true,
    created_at: new Date().toISOString()
  },
  {
    id: 'cg-2',
    patient_id: 'dev-patient-1',
    name: 'Community Health Worker (ASHA)',
    phone: '+91 9XXX XX XXXX',
    relationship: 'ASHA Worker',
    notification_permissions: ['sos', 'high_risk'],
    is_active: true,
    created_at: new Date().toISOString()
  }
];

export class CaregiverService {
  private static getStored(): CaregiverRelationship[] {
    try {
      const val = localStorage.getItem('aroggya_caregivers');
      if (val) return JSON.parse(val);
    } catch {
      // fallback
    }
    localStorage.setItem('aroggya_caregivers', JSON.stringify(INITIAL_CAREGIVERS));
    return INITIAL_CAREGIVERS;
  }

  public static async getCaregivers(_patientId?: string): Promise<CaregiverRelationship[]> {
    return this.getStored();
  }

  public static getPrimaryCaregiver(): CaregiverRelationship {
    const list = this.getStored();
    return list[0] || INITIAL_CAREGIVERS[0];
  }

  public static async addCaregiver(
    patientId: string,
    name: string,
    phone: string,
    relationship: string,
    permissions: ('sos' | 'high_risk' | 'request_status' | 'medication_alerts')[]
  ): Promise<CaregiverRelationship> {
    const list = this.getStored();
    const newCg: CaregiverRelationship = {
      id: `cg-${Date.now()}`,
      patient_id: patientId,
      name,
      phone,
      relationship,
      notification_permissions: permissions,
      is_active: true,
      created_at: new Date().toISOString()
    };
    list.push(newCg);
    localStorage.setItem('aroggya_caregivers', JSON.stringify(list));
    return newCg;
  }

  public static async removeCaregiver(id: string): Promise<void> {
    const list = this.getStored().filter((c) => c.id !== id);
    localStorage.setItem('aroggya_caregivers', JSON.stringify(list));
  }
}
