import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Supabase configuration - loaded from environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if Supabase is configured
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

let supabase: SupabaseClient | null = null;

if (isSupabaseConfigured) {
    supabase = createClient(supabaseUrl, supabaseAnonKey);
    console.log('Supabase initialized successfully');
} else {
    console.warn('Supabase not configured. Running in offline mode. Configure .env to enable Supabase features.');
}

export { supabase };
