import { createClient } from "@supabase/supabase-js";

export function isSupabaseConfigured() {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}

function createSupabaseClient(key: string | undefined) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const supabaseKey = key?.trim();

  if (!url || !supabaseKey) {
    return null;
  }

  try {
    new URL(url);

    return createClient(url, supabaseKey, {
      auth: {
        persistSession: false
      }
    });
  } catch {
    return null;
  }
}

export function createServerSupabase() {
  return createSupabaseClient(process.env.SUPABASE_SERVICE_ROLE_KEY);
}

export function createPublicSupabase() {
  return createSupabaseClient(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}
