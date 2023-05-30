import CommandPalette from "react-cmdk";
import {
  CubeTransparentIcon,
  HashtagIcon,
  TagIcon,
} from "@heroicons/react/24/outline";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Alert, { AlertType } from "@/components/alert";
import { StatusType, StatusTypeItem, statusTypes } from "@/components/cmdk";
import { hashTagExtractor, urlExtractor } from "@/utils/misc";
import { Database } from "@/lib/database.types";
import { Session, SupabaseClient } from "@supabase/supabase-js";
import {
  ParticleType,
  ParticleTypeRow,
  particleTypes,
} from "@/utils/constants";

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
          message: "Please enter a text to spawn a particle",
        });
      }
    }
  }, [page, text]);

  async function handleSpawn() {
    console.log("handleSpawn");
    if (!text || (text && text.trim().length <= 0)) {
      setStatus({
        ...statusTypes[StatusType.Error],
        message: "Please enter a text to spawn a particle",
      });
      return;
    }
    setStatus({
      ...statusTypes[StatusType.Loading],
      message: "Spawning particle...",
    });
    const response = await fetch("/api/universe/spawn", {
      method: "POST",
      body: JSON.stringify({ text: text }),
    });
    if (response.status === 201) {
      console.log("Particle spawned");
      setStatus({
        ...statusTypes[StatusType.Success],
        message: "Particle spawned",
      });
    } else {
      console.log(response);
      setStatus({
        ...statusTypes[StatusType.Error],
        message: "Error occured",
      });
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
            name: tag,
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
