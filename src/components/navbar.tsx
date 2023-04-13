"use client";

import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { classNames } from "@/utils/misc";
import { useSupabase } from "@/lib/supabase-provider";
import { useAuth } from "@/utils/hooks";
import Link from "next/link";

const userNavigation = [
  { name: "Profile", href: "#" },
  { name: "Settings", href: "#" },
];

export default function Navbar() {
  const { supabase } = useSupabase();
  const { session, profile } = useAuth();

  return (
    <Disclosure
      as="nav"
      className="sticky top-0 backdrop-blur-md from-gray-300/50 to-gray-100/50 bg-gradient-to-r border-gray-400/10 border-b z-50 dark:from-gray-700/50 dark:to-gray-800/50"
    >
      {({ open }) => (
        <>
          <div className="container mx-auto">
            <div
              className={classNames(
                "flex h-16 items-center",
                session ? "justify-evenly" : "justify-between"
              )}
            >
              <div className="flex items-center">
                <a href="/">
                  <div className="flex-shrink-0 bg-gray-300/50 hover:bg-gray-300 dark:bg-gray-700/50 dark:hover:bg-gray-700 rounded-md px-3 py-2">
                    {/* <img
                        className="h-8 w-8"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                        alt="Particle"
                      /> */}
                    <span className="sr-only">Logo</span>📌
                  </div>
                </a>
              </div>
              {session ? (
                <>
                  <form className="mb-0 flex px-4 w-full sm:mx-16 md:mx-auto md:max-w-xl lg:mx-auto">
                    <div className="relative w-full">
                      <input
                        className="h-10 rounded-lg w-full border border-gray-400/30 pr-10 text-sm placeholder-gray-400 focus:z-10 bg-white/40 focus:bg-white dark:border-gray-700/30 dark:bg-black/40 dark:text-white"
                        placeholder="Search..."
                        type="text"
                      />
                      <button
                        type="submit"
                        className="absolute inset-y-0 right-0 rounded-r-lg p-2 text-gray-600 dark:text-gray-400"
                      >
                        <span className="sr-only">Submit Search</span>
                        <MagnifyingGlassIcon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                      </button>
                    </div>
                  </form>
                  <div className="hidden md:block">
                    <div className="flex items-center">
                      <Menu as="div" className="relative ml-3">
                        <div>
                          <Menu.Button className="flex max-w-xs items-center rounded-full bg-gray-300/50 hover:bg-gray-300 dark:bg-gray-700/50 dark:hover:bg-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="sr-only">Open user menu</span>
                            {/* <img className="h-8 w-8 rounded-full" src={user.imageUrl} alt="" /> */}
                            <div className="h-8 w-8 inline-flex items-center justify-center">
                              <span>👱‍♂️</span>
                            </div>
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-10 mt-2 min-w-fit max-w-sm origin-top-right rounded-md bg-white dark:bg-gray-950 py-1 shadow-md focus:outline-none">
                            <Menu.Item>
                              <div className="px-4 py-2">
                                <div className="text-base font-medium leading-none text-gray-900 dark:text-gray-100 pb-1">
                                  {profile?.first_name ?? "User"}{" "}
                                  {profile?.last_name ?? ""}
                                </div>
                                <div className="text-sm font-medium leading-none text-gray-700 dark:text-gray-300">
                                  {session.user.email}
                                </div>
                              </div>
                            </Menu.Item>
                            <hr className="border-gray-100 dark:border-gray-900 pb-2" />
                            {userNavigation.map((item) => (
                              <Menu.Item key={item.name}>
                                {({ active }) => (
                                  <a
                                    href={item.href}
                                    className={classNames(
                                      active
                                        ? "bg-gray-100 dark:bg-gray-800"
                                        : "",
                                      "block px-4 py-2 text-sm text-gray-800 dark:text-gray-200 rounded-md mx-2"
                                    )}
                                  >
                                    {item.name}
                                  </a>
                                )}
                              </Menu.Item>
                            ))}
                            <Menu.Item>
                              {({ active }) => (
                                <a
                                  href="#"
                                  onClick={() => supabase.auth.signOut()}
                                  className={classNames(
                                    active
                                      ? "bg-gray-100 dark:bg-gray-800"
                                      : "",
                                    "block px-4 py-2 text-sm text-gray-800 dark:text-gray-200 rounded-md mx-2"
                                  )}
                                >
                                  Logout
                                </a>
                              )}
                            </Menu.Item>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>
                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gray-300/50 p-2 text-gray-700 hover:bg-gray-300 hover:text-gray-900 dark:bg-gray-700/50 dark:hover:bg-gray-700 dark:text-gray-300">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                </>
              ) : (
                <>
                  <div className="block">
                    <div className="flex items-center">
                      <Link
                        href="/login"
                        className="rounded-md border border-transparent bg-emerald-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                      >
                        Login / Register
                      </Link>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {session && (
            <Disclosure.Panel className="md:hidden">
              <div className="pb-3 pt-4">
                <div className="flex items-center px-5">
                  <div className="flex-shrink-0">
                    {/* <img className="h-10 w-10 rounded-full" src={user.imageUrl} alt="" /> */}
                    <span className="sr-only">Profile</span>
                    <div className="h-8 w-8 inline-flex items-center justify-center">
                      <span>👱‍♂️</span>
                    </div>
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium leading-none text-gray-900 dark:text-gray-100">
                      {profile?.first_name ?? "User"} {profile?.last_name ?? ""}
                    </div>
                    <div className="text-sm font-medium leading-none text-gray-700 dark:text-gray-300">
                      {session?.user.email}
                    </div>
                  </div>
                </div>
                <div className="mt-3 space-y-1 px-2">
                  {userNavigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-300 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-gray-100"
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                  <Disclosure.Button
                    as="a"
                    onClick={() => {
                      supabase.auth.signOut();
                    }}
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-300 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-gray-100"
                  >
                    Logout
                  </Disclosure.Button>
                </div>
              </div>
            </Disclosure.Panel>
          )}
        </>
      )}
    </Disclosure>
  );
}
