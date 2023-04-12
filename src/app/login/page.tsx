"use client";

import { useSupabase } from "../../lib/supabase-provider";

export default function Page() {
  const { supabase } = useSupabase();
  return (
    <div>
      <main className="h-screen">
        <div className="flex min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
          <div className="w-full sm:mx-auto sm:w-full sm:max-w-md my-auto">
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
              <div className="sm:mx-auto sm:w-full sm:max-w-md">
                {/* <img
                  className="mx-auto h-12 w-auto"
                  src="https://tailwindui.com/img/logos/mark.svg?color=emerald&shade=600"
                  alt="Particle"
                /> */}
                <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                  Log in to Particle
                </h2>
              </div>
              <div className="mt-6">
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div>
                    <a
                      href="#"
                      className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-600 shadow-sm hover:bg-gray-50 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-950"
                    >
                      <span className="sr-only">Sign in with Google</span>
                      <svg
                        fill="currentColor"
                        className="h-5 w-5"
                        aria-hidden="true"
                      >
                        <path
                          // fill="#4285F4"
                          d="M19.854 10.22c0-.648-.053-1.3-.165-1.939h-9v3.675h5.154a4.417 4.417 0 0 1-1.908 2.9v2.384h3.075c1.806-1.662 2.844-4.116 2.844-7.02Z"
                        />
                        <path
                          // fill="#34A853"
                          d="M10.687 19.543c2.573 0 4.744-.845 6.325-2.304l-3.075-2.385c-.856.583-1.96.912-3.247.912-2.49 0-4.6-1.68-5.358-3.937H2.16v2.457a9.544 9.544 0 0 0 8.527 5.257Z"
                        />
                        <path
                          // fill="#FBBC04"
                          d="M5.33 11.829a5.716 5.716 0 0 1 0-3.654V5.717H2.16a9.55 9.55 0 0 0 0 8.57l3.17-2.458Z"
                        />
                        <path
                          // fill="#EA4335"
                          d="M10.687 4.235a5.185 5.185 0 0 1 3.66 1.43l2.725-2.724A9.171 9.171 0 0 0 10.687.458a9.54 9.54 0 0 0-8.528 5.26l3.17 2.458c.754-2.262 2.868-3.941 5.358-3.941Z"
                        />
                      </svg>
                    </a>
                  </div>
                  <div>
                    <a
                      href="#"
                      className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-600 shadow-sm hover:bg-gray-50 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-950"
                    >
                      <span className="sr-only">Sign in with GitHub</span>
                      <svg
                        className="h-5 w-5"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
              <div className="relative text-center text-sm my-6 font-light">
                <span className="text-gray-500 dark:text-gray-400">- or -</span>
              </div>
              <form className="space-y-4 mb-8" action="#" method="POST">
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email address"
                    autoComplete="email"
                    required
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 dark:border-gray-600 dark:bg-gray-900 dark:focus:bg-gray-950 dark:text-gray-200 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-emerald-500 sm:text-sm"
                  />
                </div>
                <div className="w-full text-center">
                  <button
                    type="submit"
                    className="rounded-md border border-transparent bg-emerald-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                  >
                    Send Magic Link
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
