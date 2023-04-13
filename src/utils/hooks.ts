import { useSupabase } from "@/lib/supabase-provider";
import { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { Database } from "@/lib/database.types";
import { SupabaseAuthClient } from "@supabase/supabase-js/dist/module/lib/SupabaseAuthClient";

export function useAuth() {
  const { supabase } = useSupabase();
  const [auth, setAuth] = useState<SupabaseAuthClient>(supabase.auth);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<
    Database["public"]["Tables"]["profile"]["Row"] | null
  >(null);

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, s) => {
      setAuth(supabase.auth);
      setSession(s);
    });
  }, [supabase]);

  useEffect(() => {
    if (session) {
      supabase
        .from("profile")
        .select("*")
        .eq("id", session.user.id)
        .limit(1)
        .then(({ data, error }) => {
          if (error) {
          }
          if (data) {
            setProfile(data[0]);
          }
        });
    }
  }, [session, supabase]);

  return { auth, session, profile };
}
