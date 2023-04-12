import { useSupabase } from "@/lib/supabase-provider";
import { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { Database } from "@/lib/database.types";

export function useSupabaseSession() {
  const { supabase } = useSupabase();
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, s) => {
      setSession(s);
    });
  }, [supabase]);

  return session;
}

export function useUserProfile() {
  const { supabase } = useSupabase();
  const session = useSupabaseSession();

  const [user, setUser] = useState<
    Database["public"]["Tables"]["profile"]["Row"] | null
  >(null);
  useEffect(() => {
    if (session) {
      supabase
        .from("profile")
        .select("*")
        .eq("id", session.user.id)
        .limit(1)
        .then(({ data, error }) => {
          if (error) {
            // console.log(error);
          }
          if (data) {
            // console.log(data);
            setUser(data[0]);
          }
        });
    }
  }, [session, supabase]);

  return user;
}
