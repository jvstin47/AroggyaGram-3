import type { RequestItem, RequestStatus } from '@/types/database.types';
import { supabase, isSupabaseConfigured } from '@/services/supabase/client';

const SEED_REQUESTS: RequestItem[] = [
  {
    id: 'req-101',
    requester_id: 'dev-patient-1',
    category: 'medicine_pickup',
    intent: 'pharmacy_pickup',
    urgency: 'today',
    title: 'Blood Pressure & Diabetes Refill',
    description: 'Need Metformin 500mg and Amlodipine 5mg from Jan Aushadhi Pharmacy near Town Hall.',
    address: 'Near St. Mary Church, Kanjirappally',
    latitude: 9.5562,
    longitude: 76.7874,
    status: 'submitted',
    created_at: new Date(Date.now() - 3600000).toISOString(),
    updated_at: new Date(Date.now() - 3600000).toISOString()
  },
  {
    id: 'req-102',
    requester_id: 'dev-patient-2',
    category: 'transportation',
    intent: 'medical_transport',
    urgency: 'scheduled',
    title: 'Ride to Primary Health Centre',
    description: 'Assistance needed for morning health checkup and routine blood tests at PHC tomorrow 9:30 AM.',
    address: 'Petta Junction, Ward 4',
    latitude: 9.5540,
    longitude: 76.7895,
    status: 'submitted',
    created_at: new Date(Date.now() - 7200000).toISOString(),
    updated_at: new Date(Date.now() - 7200000).toISOString()
  },
  {
    id: 'req-103',
    requester_id: 'dev-patient-1',
    category: 'grocery_pickup',
    intent: 'grocery_pickup',
    urgency: 'today',
    title: 'Essential Groceries & Milk',
    description: '1 packet Milma milk, 2kg rice, and oats from the cooperative store.',
    address: 'House #42, Village Road',
    latitude: 9.5570,
    longitude: 76.7860,
    status: 'completed',
    created_at: new Date(Date.now() - 86400000).toISOString(),
    updated_at: new Date(Date.now() - 43200000).toISOString()
  }
];

export class RequestService {
  private static getLocalRequests(): RequestItem[] {
    try {
      const stored = localStorage.getItem('aroggya_requests');
      if (stored) return JSON.parse(stored);
    } catch {
      // fallback
    }
    localStorage.setItem('aroggya_requests', JSON.stringify(SEED_REQUESTS));
    return SEED_REQUESTS;
  }

  private static saveLocalRequests(reqs: RequestItem[]) {
    localStorage.setItem('aroggya_requests', JSON.stringify(reqs));
  }

  public static async getRequests(): Promise<RequestItem[]> {
    if (!isSupabaseConfigured) {
      return this.getLocalRequests();
    }

    const { data, error } = await supabase
      .from('requests')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('Supabase fetch failed, falling back to local cache:', error);
      return this.getLocalRequests();
    }

    return data as RequestItem[];
  }

  public static async getRequestById(id: string): Promise<RequestItem | null> {
    const all = await this.getRequests();
    return all.find((r) => r.id === id) || null;
  }

  public static async createRequest(
    payload: Omit<RequestItem, 'id' | 'created_at' | 'updated_at'>
  ): Promise<RequestItem> {
    const newItem: RequestItem = {
      ...payload,
      id: `req-${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    if (isSupabaseConfigured) {
      try {
        await supabase.from('requests').insert(newItem);
      } catch (err) {
        console.error('Failed to create in Supabase:', err);
      }
    }

    const existing = this.getLocalRequests();
    const updated = [newItem, ...existing];
    this.saveLocalRequests(updated);

    return newItem;
  }

  public static async updateStatus(
    id: string,
    status: RequestStatus,
    volunteerId?: string | null
  ): Promise<RequestItem> {
    const existing = this.getLocalRequests();
    const target = existing.find((r) => r.id === id);
    if (!target) throw new Error('Request not found');

    target.status = status;
    target.updated_at = new Date().toISOString();
    if (volunteerId !== undefined) {
      target.volunteer_id = volunteerId;
    }

    this.saveLocalRequests(existing);

    if (isSupabaseConfigured) {
      try {
        await supabase
          .from('requests')
          .update({
            status,
            updated_at: target.updated_at,
            ...(volunteerId !== undefined ? { volunteer_id: volunteerId } : {})
          })
          .eq('id', id);
      } catch (err) {
        console.error('Supabase update failed:', err);
      }
    }

    return target;
  }
}
