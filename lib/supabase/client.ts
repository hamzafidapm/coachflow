import { createClient } from '@supabase/supabase-js';

// Browser-safe client — uses the public anon key. Prisma remains the primary
// way this app reads/writes the schema; this is here for Supabase Auth or
// Storage if those get wired in later.
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);
