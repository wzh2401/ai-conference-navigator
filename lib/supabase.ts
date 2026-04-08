import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Debug: log first few chars to verify env vars are loaded
if (typeof window !== 'undefined') {
  console.log('[Supabase] URL:', supabaseUrl.substring(0, 30) || '(empty)');
  console.log('[Supabase] Key:', supabaseKey.substring(0, 15) || '(empty)');
}

let _supabase: SupabaseClient | null = null;

try {
  if (supabaseUrl.startsWith('https://') && supabaseKey.length > 10) {
    _supabase = createClient(supabaseUrl, supabaseKey);
  }
} catch (e) {
  console.error('[Supabase] Failed to create client:', e);
}

export const supabase = _supabase;
export const isSupabaseConfigured = _supabase !== null;
