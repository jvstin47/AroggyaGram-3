import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

import WebSocket from 'ws';

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key',
  {
    auth: { persistSession: typeof window !== 'undefined' },
    realtime: {
      params: {
        eventsPerSecond: 10
      },
      transport: typeof window === 'undefined' ? (WebSocket as any) : undefined
    }
  }
);
