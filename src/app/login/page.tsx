"use client";

import Link from "next/link";
import Image from "next/image";
import { useSupabase } from "../../lib/supabase-provider";
import { FormEvent, useState } from "react";
import { Transition } from "@headlessui/react";
import Alert, { AlertType } from "@/components/alert";
import { AuthError, Provider } from "@supabase/supabase-js";

export default function Page() {
  const { supabase } = useSupabase();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<{
    type: AlertType;
    message: string;
  } | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginWithMagicLink();
  };
  const handleError = (error: AuthError | null): boolean => {
    if (error) {
      setAlert({
        type: AlertType.Error,
        message: error.message,
      });
      return true;
    }
    return false;
  };

  const loginWithOAuth = async (provider: Provider) => {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: provider,
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
    if (!handleError(error)) {
      setAlert({
        type: AlertType.Info,
        message: "Redirecting...",
      });
    }
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setLoading(false);
  };

  const loginWithMagicLink = async () => {
    if (!email) return;
    if (email.trim() === "") return;
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithOtp({
      email: email,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });
    await new Promise((resolve) => setTimeout(resolve, 1000));
    if (!handleError(error)) {
      setAlert({
        type: AlertType.Success,
        message: "Check your email for a magic link!",
      });
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex flex-1 h-full flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full sm:mx-auto sm:w-full sm:max-w-md my-auto">
          <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 py-8 px-4 shadow rounded-lg sm:px-10">
            <Transition
              show={loading}
              enter="transition-opacity duration-75"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity duration-150"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="absolute rounded-lg inset-0 z-10 flex items-center justify-center transition-all duration-200 ease-in-out bg-gray-50/20 dark:bg-gray-950/10 backdrop-blur-sm">
                <svg
                  aria-hidden="true"
                  className="w-8 h-8 text-gray-300 animate-spin dark:text-gray-600 fill-particle-600 dark:fill-particle-400"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
              </div>
            </Transition>
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
              <Image
                className="h-16 w-16 mx-auto"
                src="/particle-standalone.svg"
                alt="Particle Logo"
                width={64}
                height={64}
              />
              <h2 className="mt-4 text-center text-2xl font-light tracking-tight text-gray-900 dark:text-gray-300">
                Login to Particle
              </h2>
            </div>
            <Transition
              show={alert !== null}
              enter="transform transition duration-150 ease-in-out"
              enterFrom="opacity-0 scale-105"
              enterTo="opacity-100 scale-100"
              leave="transform transition duration-150 ease-in-out"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-105"
            >
              <Alert
                type={alert?.type ?? AlertType.Neutral}
                message={alert?.message ?? ""}
                onDismiss={() => setAlert(null)}
                className="mt-4"
              />
            </Transition>
            <div className="mt-6">
              <div className="mt-6 grid grid-cols-2 gap-3">
                <div>
                  <button
                    onClick={() => loginWithOAuth("google")}
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
                  </button>
                </div>
                <div>
                  <button
                    onClick={() => loginWithOAuth("github")}
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
                  </button>
                </div>
              </div>
            </div>
            <div className="flex text-sm my-6 font-light justify-evenly items-center">
              <span className="border-t border-gray-300 dark:border-gray-800 w-1/2 mr-1"></span>
              <span className="text-gray-400">or</span>
              <span className="border-t border-gray-300 dark:border-gray-800 w-1/2 ml-1"></span>
            </div>
            <form className="space-y-4 mb-4" onSubmit={handleSubmit}>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email address"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 dark:border-gray-600 dark:bg-gray-900 dark:focus:bg-gray-950 dark:text-gray-200 shadow-sm focus:border-particle-500 focus:outline-none focus:ring-particle-500 sm:text-sm"
                />
              </div>
              <div className="w-full text-center">
                <button
                  type="submit"
                  className="rounded-md border border-transparent bg-particle-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-particle-700 focus:outline-none focus:ring-2 focus:ring-particle-500 focus:ring-offset-2"
                >
                  Send Magic Link
                </button>
              </div>
            </form>
          </div>
          <div className="w-full text-center pt-6">
            <p>
              <Link
                href="/"
                className="text-particle-600 dark:text-particle-200 text-sm hover:underline hover:bg-particle-100/20"
              >
                ← Back to Homepage
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
