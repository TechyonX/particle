import { ArchiveBoxIcon, HomeIcon } from "@heroicons/react/24/outline";

const navigation = [
  { name: "Home", icon: HomeIcon, href: "#", current: true },
  { name: "Archive", icon: ArchiveBoxIcon, href: "#", current: false },
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

const colorVariants: { [key: string]: string } = {
  slate: "bg-slate-200 text-slate-800 dark:bg-slate-800 dark:text-slate-200",
  gray: "bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-gray-200",
  zinc: "bg-zinc-200 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200",
  neutral:
    "bg-neutral-200 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200",
  stone: "bg-stone-200 text-stone-800 dark:bg-stone-800 dark:text-stone-200",
  red: "bg-red-100 text-red-900 dark:bg-red-900 dark:text-red-100",
  orange:
    "bg-orange-100 text-orange-900 dark:bg-orange-900 dark:text-orange-100",
  amber: "bg-amber-100 text-amber-900 dark:bg-amber-900 dark:text-amber-100",
  yellow:
    "bg-yellow-100 text-yellow-900 dark:bg-yellow-900 dark:text-yellow-100",
  lime: "bg-lime-100 text-lime-900 dark:bg-lime-900 dark:text-lime-100",
  green: "bg-green-100 text-green-900 dark:bg-green-900 dark:text-green-100",
  emerald:
    "bg-emerald-100 text-emerald-900 dark:bg-emerald-900 dark:text-emerald-100",
  teal: "bg-teal-100 text-teal-900 dark:bg-teal-900 dark:text-teal-100",
  cyan: "bg-cyan-100 text-cyan-900 dark:bg-cyan-900 dark:text-cyan-100",
  sky: "bg-sky-100 text-sky-900 dark:bg-sky-900 dark:text-sky-100",
  blue: "bg-blue-100 text-blue-900 dark:bg-blue-900 dark:text-blue-100",
  indigo:
    "bg-indigo-100 text-indigo-900 dark:bg-indigo-900 dark:text-indigo-100",
  violet:
    "bg-violet-100 text-violet-900 dark:bg-violet-900 dark:text-violet-100",
  purple:
    "bg-purple-100 text-purple-900 dark:bg-purple-900 dark:text-purple-100",
  fuchsia:
    "bg-fuchsia-100 text-fuchsia-900 dark:bg-fuchsia-900 dark:text-fuchsia-100",
  pink: "bg-pink-100 text-pink-900 dark:bg-pink-900 dark:text-pink-100",
  rose: "bg-rose-100 text-rose-900 dark:bg-rose-900 dark:text-rose-100",
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function SideNav() {
  return (
    <div className="flex flex-grow flex-col overflow-y-auto border-r border-gray-200 dark:border-gray-700 pt-5 pb-4">
      <div className="flex flex-grow flex-col">
        <nav className="flex-1 space-y-8 px-2" aria-label="Sidebar">
          <div className="space-y-1">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={classNames(
                  item.current
                    ? " text-gray-900 bg-gray-200 dark:text-gray-100 dark:bg-gray-800"
                    : "text-gray-600 hover:bg-gray-200 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-100",
                  "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                )}
              >
                <item.icon
                  className={classNames(
                    item.current
                      ? "text-gray-500 dark:text-gray-400"
                      : "text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-400",
                    "mr-3 flex-shrink-0 h-6 w-6"
                  )}
                  aria-hidden="true"
                />
                {item.name}
              </a>
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
