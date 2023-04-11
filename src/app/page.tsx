"use client";
import Navbar from "@/components/navbar";
import SideNav from "@/components/sidenav";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { Fragment, useState } from "react";

const types = [
  { name: "💭 Text", value: "text" },
  { name: "🖼️ Image", value: "image" },
  { name: "🔗 URL", value: "url" },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  const [selectedType, setSelectedType] = useState(types[0]);

  return (
    <>
      <div className="min-h-full">
        <Navbar />

        <main>
          <div className="container mx-auto py-6">
            <div className="flex flex-row">
              <div className="hidden md:block w-1/4">
                <SideNav />
              </div>
              <div className="mx-auto w-full md:w-3/4 sm:mx-4">
                <div className="rounded-md border-2 mb-4">
                  <p className="text-gray-500 italic my-4 mx-2">
                    Insert new particle...
                  </p>
                  <div className="flex items-center justify-between p-2">
                    <div className="flex">
                      <Listbox value={selectedType} onChange={setSelectedType}>
                        {({ open }) => (
                          <>
                            <Listbox.Label className="block text-sm font-medium leading-6 text-gray-900">
                              Type
                            </Listbox.Label>
                            <div className="relative mt-2">
                              <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                                <span className="flex items-center">
                                  <span className="ml-3 block truncate">
                                    {selectedType.name}
                                  </span>
                                </span>
                                <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                                  <ChevronUpDownIcon
                                    className="h-5 w-5 text-gray-400"
                                    aria-hidden="true"
                                  />
                                </span>
                              </Listbox.Button>

                              <Transition
                                show={open}
                                as={Fragment}
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                              >
                                <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                  {types.map((type) => (
                                    <Listbox.Option
                                      key={type.value}
                                      className={({ active }) =>
                                        classNames(
                                          active
                                            ? "bg-indigo-600 text-white"
                                            : "text-gray-900",
                                          "relative cursor-default select-none py-2 pl-3 pr-9"
                                        )
                                      }
                                      value={type}
                                    >
                                      {({ selected, active }) => (
                                        <>
                                          <div className="flex items-center">
                                            <span
                                              className={classNames(
                                                selected
                                                  ? "font-semibold"
                                                  : "font-normal",
                                                "ml-3 block truncate"
                                              )}
                                            >
                                              {type.name}
                                            </span>
                                          </div>

                                          {selected ? (
                                            <span
                                              className={classNames(
                                                active
                                                  ? "text-white"
                                                  : "text-indigo-600",
                                                "absolute inset-y-0 right-0 flex items-center pr-4"
                                              )}
                                            >
                                              <CheckIcon
                                                className="h-5 w-5"
                                                aria-hidden="true"
                                              />
                                            </span>
                                          ) : null}
                                        </>
                                      )}
                                    </Listbox.Option>
                                  ))}
                                </Listbox.Options>
                              </Transition>
                            </div>
                          </>
                        )}
                      </Listbox>
                    </div>
                    <div className="flex">
                      <button>Save</button>
                    </div>
                  </div>
                </div>
                <div className="columns-3xs gap-3">
                  {Array.from({ length: 100 }, (v, k) => k).map((number) => (
                    <div
                      key={number}
                      className="w-full bg-slate-200 hover:bg-slate-300"
                    >
                      <p>{number} random text</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
