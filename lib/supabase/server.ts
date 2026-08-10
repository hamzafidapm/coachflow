import 'server-only';
import { createClient } from '@supabase/supabase-js';

// Server-only client — uses the service role key, which bypasses row-level
// security. Never import this from a Client Component or expose the key to
// the browser.
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);
