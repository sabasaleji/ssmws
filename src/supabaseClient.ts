import { createClient } from '@supabase/supabase-js';

// These come from your Supabase project (Settings → API). Put them in
// .env.local — NEVER commit that file. The anon key is safe to ship to the
// browser: it only grants the access your Row-Level Security policies allow.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  // Surface a clear message instead of a cryptic network error later.
  throw new Error(
    'Missing Supabase config. Copy .env.example to .env.local and set ' +
    'VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY (see SUPABASE_SETUP.md).'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});
