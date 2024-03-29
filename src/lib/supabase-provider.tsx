"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

import type { SupabaseClient } from "@supabase/auth-helpers-nextjs";
import type { Database } from "./database.types";

type SupabaseContext = {
  supabase: SupabaseClient<Database>;
  particleTypes: Database["public"]["Tables"]["type"]["Row"][];
};

const Context = createContext<SupabaseContext | undefined>(undefined);

export default function SupabaseProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [supabase] = useState(() => createClientComponentClient<Database>());
  const [particleTypes, setParticleTypes] = useState<
    Database["public"]["Tables"]["type"]["Row"][]
  >([]);
  const router = useRouter();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      switch (event) {
        case "SIGNED_IN":
          router.push("/universe");
          break;
        case "SIGNED_OUT":
          router.push("/login");
          break;
        default:
          router.refresh();
          break;
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router, supabase]);

  useEffect(() => {
    supabase
      .from("type")
      .select("*")
      .then(({ data, error }) => {
        if (error) {
        }
        if (data) {
          setParticleTypes(data);
        }
      });
  }, [supabase]);

  return (
    <Context.Provider value={{ supabase, particleTypes }}>
      <>{children}</>
    </Context.Provider>
  );
}

export const useSupabase = () => {
  const context = useContext(Context);

  if (context === undefined) {
    throw new Error("useSupabase must be used inside SupabaseProvider");
  }

  return context;
};
