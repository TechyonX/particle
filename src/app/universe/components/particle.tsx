import { Database } from "@/lib/database.types";
import { useSupabase } from "@/lib/supabase-provider";
import { urlExtractor } from "@/utils/misc";
import {
  ArchiveBoxIcon,
  ArrowUturnLeftIcon,
  LockClosedIcon,
  UserGroupIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { classNames } from "react-cmdk";

export default function ParticleCard({
  particle,
}: {
  particle: Database["public"]["Tables"]["particle"]["Row"];
}) {
  const url = urlExtractor(particle.content);
  const isLink = particle.type === 1 && url && url.length > 0;
  return isLink ? (
    <>
      <a href={isLink ? url[0] : "#"} target={isLink ? "_blank" : undefined}>
        <ParticleCardContent particle={particle} />
      </a>
      <ParticleCardActions particle={particle} />
    </>
  ) : (
    <>
      <Link href={"/universe/observe/" + particle.id}>
        <ParticleCardContent particle={particle} />
      </Link>
      <ParticleCardActions particle={particle} />
    </>
  );
}

function ParticleCardContent({
  particle,
}: {
  particle: Database["public"]["Tables"]["particle"]["Row"];
}) {
  const hasTitle = particle.title && particle.title.trim().length > 0;

  return (
    <div
      className={classNames(
        "rounded-tl-lg rounded-tr-lg border text-black dark:text-white mt-4 px-4 py-4 transition bg-gradient-to-br hover:shadow-sm",
        "from-particle-50/10 to-particle-50/0 hover:to-particle-50/10",
        "dark:from-particle-950/10 dark:to-particle-950/0 dark:hover:to-particle-950/10",
        "border-particle-600/20 hover:border-particle-600",
        "dark:border-particle-400/10 dark:hover:border-particle-400"
      )}
    >
      <h1
        className={classNames(
          "text-lg font-bold pb-1",
          !hasTitle && "text-gray-500"
        )}
      >
        {hasTitle ? particle.title : "-"}
      </h1>
      <p className="text-sm pb-1 italic">{particle.description}</p>
      <p>{particle.content}</p>
      <p className="text-xs text-gray-600 dark:text-gray-400 pt-2">
        {
          new Date(particle.created_at)
            .toISOString()
            .split("T")
            .join(" ")
            .split(".")[0]
        }
      </p>
    </div>
  );
}

export function ParticleCardActions({
  particle,
}: {
  particle: Database["public"]["Tables"]["particle"]["Row"];
}) {
  const { supabase, particleTypes } = useSupabase();
  const particleType = particleTypes.find((t) => t.id === particle.type);
  function togglePublic() {
    supabase
      .from("particle")
      .update({ is_public: !particle.is_public })
      .eq("id", particle.id)
      .then(({ data, error }) => {
        if (error) {
          console.error(error);
        }
      });
  }
  function toggleArchive() {
    supabase
      .from("particle")
      .update({ is_archived: !particle.is_archived })
      .eq("id", particle.id)
      .then(({ data, error }) => {
        if (error) {
          console.error(error);
        }
      });
  }
  function toggleTrashed() {
    supabase
      .from("particle")
      .update({ is_trashed: !particle.is_trashed })
      .eq("id", particle.id)
      .then(({ data, error }) => {
        if (error) {
          console.error(error);
        }
      });
  }
  function deleteParticle() {
    supabase
      .from("particle")
      .delete()
      .eq("id", particle.id)
      .then(({ data, error }) => {
        if (error) {
          console.error(error);
        }
      });
  }
  return (
    <div className="rounded-br-lg opacity-50 hover:opacity-100 rounded-bl-lg border-b border-l border-r text-black dark:text-white mb-4 px-4 py-2 transition bg-gradient-to-br border-particle-600/20 dark:border-particle-400/10">
      <div className="flex flex-row justify-between items-center">
        <div className="flex text-xs text-gray-500">
          Type: {particleType?.emoji} {particleType?.name}
        </div>
        <div className="flex flex-row items-center justify-center">
          {!particle.is_trashed && (
            <>
              <button
                className="flex flex-row items-center action-btn hover:text-emerald-600 dark:hover:text-emerald-400"
                onClick={togglePublic}
              >
                {particle.is_public ? (
                  <UserGroupIcon className="w-4 h-4 flex mr-2 text-emerald-600 dark:text-emerald-400" />
                ) : (
                  <LockClosedIcon className="w-4 h-4 flex mr-2" />
                )}
                <span>{particle.is_public ? "Public" : "Private"}</span>
              </button>
              <button
                className="flex flex-row items-center action-btn hover:text-indigo-600 dark:hover:text-indigo-400"
                onClick={toggleArchive}
              >
                <ArchiveBoxIcon className="w-4 h-4 flex mr-2" />
                <span>{particle.is_archived ? "Unarchive" : "Archive"}</span>
              </button>
            </>
          )}
          {particle.is_trashed && (
            <button
              className="flex flex-row items-center action-btn hover:text-red-600 dark:hover:text-red-400"
              onClick={deleteParticle}
            >
              <XMarkIcon className="w-4 h-4 flex mr-2" />
              <span>Delete permanently</span>
            </button>
          )}
          <button
            className={classNames(
              "flex flex-row items-center action-btn",
              particle.is_trashed
                ? "text-emerald-500 dark:text-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400"
                : "hover:text-red-600 dark:hover:text-red-400"
            )}
            onClick={toggleTrashed}
          >
            {particle.is_trashed ? (
              <ArrowUturnLeftIcon className="w-4 h-4 flex mr-2" />
            ) : (
              <XMarkIcon className="w-4 h-4 flex mr-2" />
            )}
            <span>{particle.is_trashed ? "Restore" : "Delete"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
