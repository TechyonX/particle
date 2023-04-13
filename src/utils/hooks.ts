import { useSupabase } from "@/lib/supabase-provider";
import { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { Database } from "@/lib/database.types";

export function useAuth() {
  const { supabase } = useSupabase();
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<
    Database["public"]["Tables"]["profile"]["Row"] | null
  >(null);

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, s) => {
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

  return { session, profile };
}
