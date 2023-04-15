import InputForm from "@/components/input-form";
import ParticleCard from "@/app/universe/components/particle";
import { Database } from "@/lib/database.types";
import { useSupabase } from "@/lib/supabase-provider";
import { useAuth } from "@/utils/hooks";
import { useEffect, useState } from "react";

interface Filter {
  search?: string;
  type?: string;
  isPublic?: boolean;
  isArchived?: boolean;
  tags?: string[];
}

export default function Particles({ filter }: { filter?: Filter }) {
  const { supabase } = useSupabase();
  const { session } = useAuth();
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
              fts: payload.new.fts,
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
      let query = supabase
        .from("particle")
        .select("*")
        .filter("user_id", "eq", session?.user.id);
      if (filter?.search && filter.search.trim() !== "") {
        query = query.textSearch("fts", filter.search);
      }
      if (filter?.type && filter.type.trim() !== "") {
        query = query.eq("type", filter.type);
      }
      if (filter?.isArchived !== undefined) {
        query = query.eq("is_archived", filter.isArchived);
      }
      if (filter?.isPublic !== undefined) {
        query = query.eq("is_public", filter.isPublic);
      }
      query = query.order("created_at", { ascending: false });

      const { data, error } = await query;
      if (error) {
        console.log(error);
      } else {
        setParticles(data);
      }
    };

    if (session) {
      getParticles();
    }
  }, [filter, session, supabase]);
  return (
    <>
      {particles.map((particle) => (
        <ParticleCard key={particle.id} particle={particle} />
      ))}
    </>
  );
}
