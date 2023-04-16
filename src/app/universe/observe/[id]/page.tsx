import { Database } from "@/lib/database.types";
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { cookies, headers } from "next/headers";
import { classNames } from "@/utils/misc";
import { XMarkIcon } from "@heroicons/react/24/outline";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const supabase = createServerComponentSupabaseClient<Database>({
    cookies: cookies,
    headers: headers,
  });

  const { data: particle, error } = await supabase
    .from("particle")
    .select("*")
    .eq("id", params.id)
    .single();
  if (particle) {
    return {
      title:
        "Particle - " +
        (particle?.title && particle.title.trim().length > 0
          ? particle.title
          : "Untitled"),
      description: particle?.description,
    };
  }
  return {
    title: "Particle - Not Found",
    description: "Particle you are looking for does not exist.",
  };
}

export default async function Observe({ params }: { params: { id: string } }) {
  const supabase = createServerComponentSupabaseClient<Database>({
    cookies: cookies,
    headers: headers,
  });

  const { data: particle, error } = await supabase
    .from("particle")
    .select("*")
    .eq("id", params.id)
    .single();

  return (
    <>
      {particle ? (
        <div
          className={classNames(
            "rounded-lg border text-black dark:text-white my-4 px-4 py-4 transition bg-gradient-to-br hover:shadow-sm",
            "from-particle-50/10 to-particle-50/0",
            "dark:from-particle-950/10 dark:to-particle-950/0",
            "border-particle-600/20",
            "dark:border-particle-400/10"
          )}
        >
          {particle.title && particle.title.trim().length > 0 ? (
            <h1 className="text-2xl font-bold pb-1">{particle.title}</h1>
          ) : (
            <h1 className="text-2xl font-bold pb-1 italic text-gray-500">
              Untitled
            </h1>
          )}
          <p className="text-sm pb-1 italic">{particle.description}</p>
          <p>{particle.content}</p>
          <p className="text-xs text-gray-600 dark:text-gray-400 pt-4">
            {
              new Date(particle.created_at)
                .toISOString()
                .split("T")
                .join(" ")
                .split(".")[0]
            }
          </p>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <XMarkIcon className="h-16 w-16 text-gray-500 my-8" />
          <p className="text-3xl font-light text-gray-500">
            Oops, no observable particle found.
          </p>
        </div>
      )}
    </>
  );
}
