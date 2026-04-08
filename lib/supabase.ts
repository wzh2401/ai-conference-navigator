import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Only create client when properly configured (not placeholder values)
export const supabase: SupabaseClient | null =
  supabaseUrl.startsWith('https://') && supabaseKey.length > 10
    ? createClient(supabaseUrl, supabaseKey)
    : null;

export const isSupabaseConfigured = supabase !== null;
