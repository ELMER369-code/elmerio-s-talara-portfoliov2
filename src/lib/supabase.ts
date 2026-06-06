import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

let supabase: ReturnType<typeof createClient>;

try {
    if (supabaseUrl && supabaseAnonKey) {
        supabase = createClient(supabaseUrl, supabaseAnonKey);
    } else {
        console.warn('Supabase env vars not set — running without database.');
        supabase = createClient('https://placeholder.supabase.co', 'placeholder-key');
    }
} catch {
    console.warn('Supabase init failed — running without database.');
    supabase = createClient('https://placeholder.supabase.co', 'placeholder-key');
}

export { supabase };
