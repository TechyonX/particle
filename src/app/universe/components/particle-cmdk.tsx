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
  const hashTags = hashTagExtractor(text || "");
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
  }, [text]);

  async function handleSpawn() {
    if (text && text.trim().length > 0) {
      if (session) {
        setStatus({
          ...statusTypes[StatusType.Loading],
          message: "Spawning particle...",
        });
        const res = await supabase.from("particle").insert({
          content: text,
          type: type.id,
          user_id: session.user.id,
        });
        if (res.status === 201) {
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

function urlExtractor(text: string) {
  const urls = text.match(/((http|https)?:\/\/[^\s]+)/gi);
  return urls;
}

function hashTagExtractor(text: string) {
  const hashTags = text.match(/#[a-z0-9]+/gi);
  return hashTags;
}
