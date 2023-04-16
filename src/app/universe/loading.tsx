import { classNames } from "@/utils/misc";

export default function UniverseLoading() {
  return (
    <>
      <p className="text-center text-xl font-light text-gray-500">
        Scanning the universe...
      </p>
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="text-gray-800 dark:text-gray-200">
          <div
            className={classNames(
              "rounded-lg border text-black dark:text-white my-4 px-4 py-4 transition bg-gradient-to-br hover:shadow-sm",
              "from-particle-50/10 to-particle-50/0 hover:to-particle-50/10",
              "dark:from-particle-950/10 dark:to-particle-950/0 dark:hover:to-particle-950/10",
              "border-particle-600/20 hover:border-particle-600",
              "dark:border-particle-400/10 dark:hover:border-particle-400"
            )}
          >
            <div className="animate-pulse flex w-full space-x-4">
              <div className="flex-1 space-y-6 py-1">
                <div className="h-2 bg-gray-300 dark:bg-gray-700 rounded"></div>
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="h-2 bg-gray-300 dark:bg-gray-700 rounded col-span-2"></div>
                    <div className="h-2 bg-gray-300 dark:bg-gray-700 rounded col-span-1"></div>
                  </div>
                  <div className="h-2 bg-gray-300 dark:bg-gray-700 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
