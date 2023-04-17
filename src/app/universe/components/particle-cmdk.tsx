import CommandPalette from "react-cmdk";
import {
  CubeTransparentIcon,
  HashtagIcon,
  TagIcon,
} from "@heroicons/react/24/outline";
import { useSupabase } from "@/lib/supabase-provider";
import { useAuth } from "@/utils/hooks";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Alert, { AlertType } from "@/components/alert";
import { StatusType, StatusTypeItem, statusTypes } from "@/components/cmdk";
import { hashTagExtractor, urlExtractor } from "@/utils/misc";
import { Database } from "@/lib/database.types";
import { Session, SupabaseClient } from "@supabase/supabase-js";

enum ParticleType {
  Text = "text",
  Link = "link",
  Image = "image",
}

interface ParticleTypeRow {
  id: number;
  name: string;
  emoji?: string;
}

const particleTypes: { [key: string]: ParticleTypeRow } = {
  [ParticleType.Link]: {
    id: 1,
    name: "URL",
    emoji: "🔗",
  },
  [ParticleType.Image]: {
    id: 2,
    name: "Image",
    emoji: "🖼️",
  },
  [ParticleType.Text]: {
    id: 3,
    name: "Text",
    emoji: "💭",
  },
};

export default function SpawnParticleCmdKPage({
  id,
  text,
  onSpawn,
  onBack,
  status,
  setStatus,
  page,
}: {
  id: string;
  text?: string;
  onSpawn?: () => void;
  onBack?: () => void;
  status: StatusTypeItem;
  setStatus: Dispatch<SetStateAction<StatusTypeItem>>;
  page: "root" | "particles" | "spawn";
}) {
  const { supabase } = useSupabase();
  const { session } = useAuth();
  const urls = urlExtractor(text || "");
  const hashTags = hashTagExtractor(text || "", false);
  const type =
    urls?.length === 1
      ? particleTypes[ParticleType.Link]
      : particleTypes[ParticleType.Text];
  const [alert, setAlert] = useState<{
    type: AlertType;
    message: string;
  } | null>(null);

  useEffect(() => {
    if (page === "spawn") {
      if (text && text.trim().length > 0) {
        setStatus({
          ...statusTypes[StatusType.Ready],
          message: "Ready to spawn a particle",
        });
      } else {
        setStatus({
          ...statusTypes[StatusType.Error],
          message: "Particle cannot be empty",
        });
      }
    }
  }, [page, text]);

  async function handleSpawn() {
    if (text && text.trim().length > 0) {
      if (session) {
        setStatus({
          ...statusTypes[StatusType.Loading],
          message: "Spawning particle...",
        });
        const res = await supabase
          .from("particle")
          .insert({
            content: text,
            type: type.id,
            user_id: session.user.id,
          })
          .select("id");
        if (res.status === 201) {
          if (res.data) {
            const tagHandler = async () => {
              const tagIds = await findOrCreateTags(
                supabase,
                session,
                hashTags || []
              );
              if (tagIds.length > 0) {
                return supabase.from("particle_tag").insert(
                  tagIds.map((id) => ({
                    particle_id: res.data[0].id,
                    tag_id: id,
                  }))
                );
              }
              return null;
            };

            const values = await Promise.all([
              tagHandler(),
              fetch(`/api/embedding/update?id=${res.data[0].id}`, {
                method: "POST",
              }),
            ]);

            const tagRelResponse = values[0];
            const embeddingRes = values[1];
            if (tagRelResponse && tagRelResponse.error) {
              console.log(
                "Error occured while applying tags",
                tagRelResponse.error
              );
            }
            if (embeddingRes.status !== 200) {
              console.log("Error occured while updating embedding");
            }
          }
          console.log("Particle spawned");
          setStatus({
            ...statusTypes[StatusType.Success],
            message: "Particle spawned",
          });
        } else {
          console.log(res);
          // setAlert({ type: AlertType.Error, message: "Error occured" });
          setStatus({
            ...statusTypes[StatusType.Error],
            message: "Error occured",
          });
          return;
        }
      }
    } else {
      // setAlert({
      //   type: AlertType.Warning,
      //   message: "Particle cannot be empty",
      // });
      setStatus({
        ...statusTypes[StatusType.Error],
        message: "Particle cannot be empty",
      });
      return;
    }
    onSpawn && onSpawn();
  }

  return (
    <CommandPalette.Page id={id} onEscape={onBack}>
      {alert && <Alert type={alert.type} message={alert.message} />}
      {/* {text && text.trim().length > 0 && ( */}
      <CommandPalette.List key="input" heading="Particle proterties">
        <ParticleProperties
          text={text || ""}
          type={type}
          hashTags={hashTags || []}
        />
      </CommandPalette.List>
      {/* )} */}
      <CommandPalette.List key="action" heading="Action">
        <CommandPalette.ListItem
          index={0}
          icon="PlusIcon"
          closeOnSelect={false}
          onClick={handleSpawn}
        >
          Spawn
        </CommandPalette.ListItem>
        <CommandPalette.ListItem
          index={1}
          icon="ArrowLeftIcon"
          closeOnSelect={false}
          onClick={onBack}
        >
          Back
        </CommandPalette.ListItem>
      </CommandPalette.List>
    </CommandPalette.Page>
  );
}

function ParticleProperties({
  text,
  type,
  hashTags,
}: {
  text: string;
  type: ParticleTypeRow;
  hashTags: string[];
}) {
  return (
    <div className="px-3.5 text-gray-800 dark:text-gray-200">
      <div className="flex flex-row justify-stretch my-2">
        <div className="px-4 py-1">
          <CubeTransparentIcon className="w-5 h-5" />
        </div>
        <div className="border-l border-gray-600 pl-2">{text}</div>
      </div>
      <div className="flex flex-row justify-stretch my-2">
        <div className="px-4 py-1">
          <TagIcon className="w-5 h-5" />
        </div>
        <div className="border-l border-gray-600 pl-2">
          {type.emoji} {type.name}
        </div>
      </div>
      <div className="flex flex-row justify-stretch my-2">
        <div className="px-4 py-1">
          <HashtagIcon className="w-5 h-5" />
        </div>
        <div className="border-l border-gray-600 pl-2 flex-wrap">
          {hashTags && hashTags.length > 0 ? (
            hashTags.map((tag) => (
              <span key={tag} className="pr-2 inline-block">
                {tag}
              </span>
            ))
          ) : (
            <span className="italic text-gray-600 dark:text-gray-400">
              No tags
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

async function findOrCreateTags(
  supabase: SupabaseClient<Database>,
  session: Session,
  tags: string[]
): Promise<string[]> {
  if (tags.length === 0) {
    return [];
  }
  let tagIds: string[] = [];
  const existingTags = await supabase
    .from("tag")
    .select("*")
    .eq("user_id", session.user.id);

  const tagsToCreate = tags.filter((tag) => {
    return !existingTags.data?.some(
      (t) => t.name.toLowerCase() === tag.toLowerCase()
    );
  });

  tags.forEach((tag) => {
    const matched = existingTags.data?.find(
      (t) => t.name.toLowerCase() === tag.toLowerCase()
    );
    if (matched) {
      tagIds.push(matched.id);
    }
  });

  if (tagsToCreate.length > 0) {
    const tagRes = await supabase
      .from("tag")
      .insert(
        tagsToCreate.map((tag) => {
          return {
            name: tag.replace("#", ""),
            user_id: session.user.id,
          };
        })
      )
      .select("id");
    if (tagRes.data) {
      tagIds = [...tagIds, ...tagRes.data.map((t) => t.id)];
    }
  }
  return tagIds;
}
