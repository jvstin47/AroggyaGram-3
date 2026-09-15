import { createClient } from '@supabase/supabase-js';

function normalizeSupabaseUrl(url: string): string {
  if (!url) return '';
  const trimmed = url.trim();
  // If user pasted dashboard project URL like https://supabase.com/dashboard/project/avnhryhhblqfnvhfyrrn
  const match = trimmed.match(/supabase\.com\/dashboard\/project\/([a-zA-Z0-9_-]+)/);
  if (match && match[1]) {
    return `https://${match[1]}.supabase.co`;
  }
  return trimmed;
}

const rawSupabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseUrl = normalizeSupabaseUrl(rawSupabaseUrl);
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
