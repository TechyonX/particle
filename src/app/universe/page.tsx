"use client";

import AuthLayout from "@/components/auth-layout";
import InputForm from "@/components/input-form";
import ParticleCard from "@/components/particle";
import SideNav from "@/components/sidenav";
import { Database } from "@/lib/database.types";
import { useSupabase } from "@/lib/supabase-provider";
import { useAuth } from "@/utils/hooks";
import { useEffect, useState } from "react";
import { useHandleOpenCommandPalette } from "react-cmdk";

export default function Universe() {
  const { supabase } = useSupabase();
  const { session } = useAuth();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useHandleOpenCommandPalette(setIsOpen);
  const [particles, setParticles] = useState<
    Database["public"]["Tables"]["particle"]["Row"][]
  >([]);

  useEffect(() => {
    const particleChannel = supabase
      .channel("particle_channel")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "particle",
        },
        (payload) => {
          console.log("Change received!", payload);

          let newParticle:
            | Database["public"]["Tables"]["particle"]["Row"]
            | null = null;
          if (payload.eventType == "INSERT" || payload.eventType == "UPDATE") {
            newParticle = {
              content: payload.new.content,
              created_at: payload.new.created_at,
              description: payload.new.description,
              id: payload.new.id,
              image: payload.new.image,
              is_archived: payload.new.is_archived,
              is_public: payload.new.is_public,
              title: payload.new.title,
              type: payload.new.type,
              updated_at: payload.new.updated_at,
              user_id: payload.new.user_id,
            };
          }
          switch (payload.eventType) {
            case "INSERT":
              if (newParticle) {
                setParticles([newParticle, ...particles]);
              }
              break;
            case "UPDATE":
              if (newParticle) {
                setParticles(
                  particles.map((particle) =>
                    newParticle && particle.id === newParticle.id
                      ? newParticle
                      : particle
                  )
                );
              }
              break;
            case "DELETE":
              setParticles(
                particles.filter((particle) => particle.id !== payload.old.id)
              );
              break;
            default:
              break;
          }
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(particleChannel);
    };
  }, [particles, session?.user.id, supabase]);

  useEffect(() => {
    const getParticles = async () => {
      const { data, error } = await supabase
        .from("particle")
        .select("*")
        .filter("user_id", "eq", session?.user.id)
        .order("created_at", { ascending: false });
      if (error) {
        console.log(error);
      } else {
        setParticles(data);
      }
    };

    if (session) {
      getParticles();
    }
  }, [session, supabase]);
  return (
    <AuthLayout>
      <div className="container mx-auto py-6 flex-1">
        <div className="flex flex-row">
          <div className="hidden md:block w-1/4">
            <SideNav />
          </div>
          <div className="mx-auto w-full md:w-3/4 sm:mx-4 md:mx-0">
            <InputForm />
            <div className="columns-1 gap-3 py-8">
              {particles.map((particle) => (
                <ParticleCard key={particle.id} particle={particle} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
