import { createBrowserClient } from '@supabase/ssr';
import type { Database } from '../types';
import type { SupabaseClient } from '@supabase/supabase-js';

export function createClient() {
  // Create a supabase client on the browser with project's credentials
  return createBrowserClient<SupabaseClient<Database>>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
