import { useSupabase } from "@/lib/supabase-provider";
import { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { Database } from "@/lib/database.types";
import { SupabaseAuthClient } from "@supabase/supabase-js/dist/module/lib/SupabaseAuthClient";
import Cookies from "js-cookie";

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

export function useTheme() {
  const initialTheme: "light" | "dark" =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";

  const [theme, setTheme] = useState<"light" | "dark">(initialTheme);

  useEffect(() => {
    const theme = Cookies.get("theme") || initialTheme;
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
    setTheme(theme as "light" | "dark");
  }, [initialTheme]);

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
    Cookies.set("theme", theme, { sameSite: "Strict" });
  }, [theme]);

  return { theme, setTheme };
}
