import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex flex-1 h-full flex-col items-center justify-center">
          <div className="relative text-gray-800 dark:text-gray-200 text-center py-16">
            <h1 className="text-5xl font-bold">Particle</h1>
            <p className="text-xl">Build your own universe!</p>
            <div className="mt-4">
              <Link href="/login">
                <div className="rounded-md p-1 text-lg bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-emerald-700 via-emerald-600 to-cyan-700 hover:to-emerald-700 hover:via-emerald-600 hover:from-cyan-700 transform hover:scale-105 transition ease-in-out">
                  <div className="rounded-md h-full w-full px-8 py-4 bg-gray-900/90">
                  Get started
                  </div>
                </div>
              </Link>
            </div>
          </div>
      </main>
    </div>
  );
}
