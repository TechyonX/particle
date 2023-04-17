import { Database } from "@/lib/database.types";
import { useSupabase } from "@/lib/supabase-provider";
import { useAuth } from "@/utils/hooks";
import { classNames, colorVariants } from "@/utils/misc";
import {
  ArchiveBoxIcon,
  HomeIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navigation = [
  { name: "Home", icon: HomeIcon, href: "/universe", current: true },
  {
    name: "Archive",
    icon: ArchiveBoxIcon,
    href: "/universe/archive",
    current: false,
  },
  {
    name: "Trash",
    icon: TrashIcon,
    href: "/universe/trash",
    current: false,
  },
];

export default function SideNav() {
  const pathName = usePathname();
  const { supabase } = useSupabase();
  const { session } = useAuth();
  const [tags, setTags] = useState<
    Database["public"]["Functions"]["get_tags_with_particle_count"]["Returns"]
  >([]);

  useEffect(() => {
    const getTags = async () => {
      if (session) {
        const { data, error } = await supabase
          .rpc("get_tags_with_particle_count", { uid: session?.user?.id })
          .order("particle_count", { ascending: false });
        if (error) {
          console.error(error);
        }
        if (data) {
          setTags(data);
        }
      }
    };
    getTags();
  }, [supabase, session]);

  return (
    <div className="flex flex-grow flex-col overflow-y-auto border-r border-gray-200 dark:border-gray-700 pt-5 pb-4 mr-4">
      <div className="flex flex-grow flex-col">
        <nav className="flex-1 space-y-8 px-2" aria-label="Sidebar">
          <div className="space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={classNames(
                  pathName === item.href
                    ? " text-gray-900 bg-gray-200 dark:text-gray-100 dark:bg-gray-800"
                    : "text-gray-600 hover:bg-gray-200 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-100",
                  "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                )}
              >
                <item.icon
                  className={classNames(
                    pathName === item.href
                      ? "text-gray-500 dark:text-gray-400"
                      : "text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-400",
                    "mr-3 flex-shrink-0 h-6 w-6"
                  )}
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            ))}
          </div>
          <div className="space-y-1">
            <h3
              className="px-3 text-sm font-medium text-gray-500 dark:text-gray-400"
              id="projects-headline"
            >
              Tags
            </h3>
            <div
              className="space-y-1"
              role="group"
              aria-labelledby="projects-headline"
            >
              {tags.map((tag) => (
                <Link key={tag.name} href={`/universe?tags=${tag.id}`}>
                  <span
                    className={classNames(
                      tag.color
                        ? colorVariants[tag.color]
                        : colorVariants["gray"],
                      "inline-flex items-center rounded-full px-3 py-0.5 text-sm font-medium hover:underline m-0.5"
                    )}
                  >
                    {"#"}
                    {tag.name}{" "}
                    <span className="bg-neutral-950/5 dark:bg-neutral-500/20 rounded-md px-1 ml-1 text-xs">
                      {tag.particle_count}
                    </span>
                  </span>{" "}
                </Link>
              ))}
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}
