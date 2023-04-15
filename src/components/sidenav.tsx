import { classNames, colorVariants } from "@/utils/misc";
import { ArchiveBoxIcon, HomeIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  { name: "Home", icon: HomeIcon, href: "/universe", current: true },
  {
    name: "Archive",
    icon: ArchiveBoxIcon,
    href: "/universe/archive",
    current: false,
  },
];

const tags = [
  { name: "🖌️ #design", color: "pink", count: 10 },
  { name: "🧑‍💻 #cs", color: "teal", count: 4 },
  { name: "#linux", color: "indigo", count: 6 },
  { name: "#macos", color: null, count: 3 },
  { name: "⚙️ #devops", color: "red", count: 1 },
  { name: "#javascript", color: null, count: 13 },
  { name: "#particle", color: "fuchsia", count: 7 },
];

export default function SideNav() {
  const pathName = usePathname();

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
                <a key={tag.name} href="#">
                  <span
                    className={classNames(
                      tag.color
                        ? colorVariants[tag.color]
                        : colorVariants["gray"],
                      "inline-flex items-center rounded-full px-3 py-0.5 text-sm font-medium hover:underline m-0.5"
                    )}
                  >
                    {tag.name}{" "}
                    <span className="bg-neutral-950/5 dark:bg-neutral-500/20 rounded-md px-1 ml-1 text-xs">
                      {tag.count}
                    </span>
                  </span>{" "}
                </a>
              ))}
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}
