export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export function urlExtractor(text: string) {
  const urls = text.match(/((http|https)?:\/\/[^\s]+)/gi);
  return urls;
}

export function hashTagExtractor(text: string) {
  const hashTags = text.match(/#[a-z0-9]+/gi);
  return hashTags;
}

export const colorVariants: { [key: string]: string } = {
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
