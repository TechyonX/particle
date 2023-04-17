import ParticleCard from "@/app/universe/components/particle";
import { Database } from "@/lib/database.types";
import { useSupabase } from "@/lib/supabase-provider";
import { useAuth } from "@/utils/hooks";
import { useEffect, useState } from "react";
import { ArchiveBoxXMarkIcon } from "@heroicons/react/24/outline";
import UniverseLoading from "../loading";

interface Filter {
  search?: string;
  type?: string;
  isPublic?: boolean;
  isArchived?: boolean;
  isTrashed?: boolean;
  tags?: string;
}

export default function Particles({ filter }: { filter?: Filter }) {
  const { supabase } = useSupabase();
  const { session } = useAuth();
  const [loading, setLoading] = useState(true);
  const [particles, setParticles] = useState<
    Database["public"]["Tables"]["particle"]["Row"][]
  >([]);

  const tagIds = filter?.tags?.split(",");

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
              is_trashed: payload.new.is_trashed,
              embedding: payload.new.embedding,
            };
          }
          switch (payload.eventType) {
            case "INSERT":
              if (newParticle) {
                if (
                  filter?.search &&
                  filter.search.trim() !== "" &&
                  newParticle.is_trashed === filter?.isTrashed &&
                  newParticle.is_archived === filter?.isArchived
                ) {
                  setParticles([newParticle, ...particles]);
                }
              }
              break;
            case "UPDATE":
              if (newParticle) {
                if (newParticle.is_trashed && !filter?.isTrashed) {
                  setParticles(
                    particles.filter(
                      (particle) => particle.id !== newParticle?.id
                    )
                  );
                  return;
                }
                if (newParticle.is_archived && !filter?.isArchived) {
                  setParticles(
                    particles.filter(
                      (particle) => particle.id !== newParticle?.id
                    )
                  );
                  return;
                }
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
      let similaritySearch: string[] = [];
      if (filter?.search && filter.search.trim() !== "") {
        const res = await fetch(
          `/api/embedding/search?text=${filter.search}&limit=30`
        );
        const json = await res.json();
        if (json.data && json.data.length > 0) {
          json.data.map((item: { particle_id: string }) => {
            similaritySearch.push(item.particle_id);
          });
        }
      }
      if (tagIds) {
        const { data, error } = await supabase
          .from("particle_tag")
          .select("*")
          .in("tag_id", tagIds);
        if (data) {
          if (similaritySearch.length > 0) {
            similaritySearch = similaritySearch.filter((id) =>
              data.find((item) => item.particle_id === id)
            );
          } else {
            similaritySearch = data.map((item) => item.particle_id);
          }
        }
      }
      let query = supabase
        .from("particle")
        .select(
          "content,created_at,description,id,image,is_archived,is_public,is_trashed,title,type,updated_at,user_id"
        )
        .filter("user_id", "eq", session?.user.id);
      if (filter?.isTrashed !== undefined) {
        query = query.eq("is_trashed", filter.isTrashed);
      } else {
        query = query.eq("is_trashed", false);
      }
      // if (filter?.search && filter.search.trim() !== "") {
      //   query = query.textSearch("fts", filter.search, { type: "plain" });
      // }
      if (filter?.type && filter.type.trim() !== "") {
        query = query.eq("type", filter.type);
      }
      if (filter?.isArchived !== undefined) {
        query = query.eq("is_archived", filter.isArchived);
      }
      if (filter?.isPublic !== undefined) {
        query = query.eq("is_public", filter.isPublic);
      }
      if (similaritySearch.length > 0) {
        query = query.in("id", similaritySearch);
      }
      if (
        similaritySearch.length === 0 ||
        (filter?.search && filter.search.trim() !== "")
      ) {
        query = query.order("created_at", { ascending: false });
      }

      const { data, error } = await query;
      if (error) {
        console.log(error);
      } else {
        if (similaritySearch.length > 0) {
          const result = similaritySearch.map<
            Database["public"]["Tables"]["particle"]["Row"] | null
          >((id) => {
            const particle = data.find((particle) => particle.id === id);
            if (particle) {
              return { embedding: null, fts: null, ...particle };
            }
            return null;
          });
          setParticles(
            result.filter(
              (particle) => particle !== null
            ) as Database["public"]["Tables"]["particle"]["Row"][]
          );
        } else {
          const result = data.map<
            Database["public"]["Tables"]["particle"]["Row"]
          >((particle) => ({ embedding: null, fts: null, ...particle }));
          setParticles(result);
        }
      }
      setLoading(false);
    };

    if (session) {
      getParticles();
    }
  }, [filter, session, supabase]);

  if (loading) {
    return <UniverseLoading />;
  }

  return (
    <>
      {filter?.search && filter.search.trim() !== "" && (
        <div className="text-gray-700 dark:text-gray-300 italic text-lg">
          Results for{" "}
          <span className="font-medium text-gray-800 dark:text-gray-200">
            &quot;{filter?.search}&quot;
          </span>
        </div>
      )}
      {particles.length > 0 ? (
        particles.map((particle) => (
          <ParticleCard key={particle.id} particle={particle} />
        ))
      ) : (
        <div className="flex flex-col items-center justify-center">
          <ArchiveBoxXMarkIcon className="h-16 w-16 text-gray-500 my-8" />
          <p className="text-3xl font-light text-gray-500">
            Oops, this universe is empty!
          </p>
        </div>
      )}
    </>
  );
}
