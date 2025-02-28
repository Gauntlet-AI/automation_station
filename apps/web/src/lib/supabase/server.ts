import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { Database } from "@/types/supabase";

export function createClient() {
  const cookieStore = cookies();
  
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: { path: string; maxAge: number; domain?: string; sameSite?: string }) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name: string, options: { path: string; domain?: string; sameSite?: string }) {
          cookieStore.set({ name, value: "", ...options });
        },
      },
    }
  );
} 