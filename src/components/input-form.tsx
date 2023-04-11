import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import {
  HashtagIcon,
  PaperClipIcon,
  TagIcon,
  CheckIcon,
} from "@heroicons/react/20/solid";
import { classNames, colorVariants } from "@/utils/misc";

const types = [
  { name: "💭 Text", value: "text" },
  { name: "🖼️ Image", value: "image" },
  { name: "🔗 URL", value: "url" },
];

const tags = [
  { name: "🖌️ #design", color: "pink" },
  { name: "🧑‍💻 #cs", color: "teal" },
  { name: "#linux", color: "indigo" },
  { name: "#macos", color: null },
  { name: "⚙️ #devops", color: "red" },
  { name: "#javascript", color: null },
  { name: "#particle", color: "emerald" },
];

export default function InputForm() {
  const [selectedType, setSelectedType] = useState(types[0]);
  const [selectedTags, setSelectedTags] = useState<{ [key: string]: string }[]>(
    []
  );

  return (
    <form action="#" className="relative">
      <div className="overflow-hidden rounded-lg border border-gray-300 dark:border-gray-700 shadow-sm dark:shadow-gray-800 dark:bg-gray-950 focus-within:border-emerald-500 dark:focus-within:border-emerald-300 focus-within:ring-1 focus-within:ring-emerald-500 dark:focus-within:ring-emerald-300">
        <label htmlFor="title" className="sr-only">
          Title
        </label>
        <input
          type="text"
          name="title"
          id="title"
          className="block w-full border-0 pt-2.5 text-lg font-medium placeholder-gray-500 focus:ring-0 dark:text-gray-50 dark:bg-gray-950"
          placeholder="Title"
        />
        <label htmlFor="description" className="sr-only">
          Description
        </label>
        <textarea
          rows={2}
          name="description"
          id="description"
          className="block w-full resize-none border-0 py-0 placeholder-gray-500 focus:ring-0 sm:text-sm dark:text-gray-50 dark:bg-gray-950"
          placeholder="Write a description..."
          defaultValue={""}
        />

        {/* Spacer element to match the height of the toolbar */}
        <div aria-hidden="true">
          <div className="py-2">
            <div className="h-9" />
          </div>
          <div className="h-px" />
          <div className="py-2">
            <div className="py-px">
              <div className="h-9" />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-px bottom-0">
        {/* Actions: These are just examples to demonstrate the concept, replace/wire these up however makes sense for your project. */}
        <div className="flex flex-nowrap justify-end space-x-2 py-2 px-2 sm:px-3">
          <Listbox
            as="div"
            value={selectedType}
            onChange={setSelectedType}
            className="flex-shrink-0"
          >
            {({ open }) => (
              <>
                <Listbox.Label className="sr-only"> Type </Listbox.Label>
                <div className="relative">
                  <Listbox.Button className="relative inline-flex items-center whitespace-nowrap rounded-full bg-gray-50 dark:bg-gray-800 py-2 px-2 text-sm font-medium text-gray-500 dark:text-gray-200 hover:bg-gray-100 sm:px-3">
                    <TagIcon
                      className="h-5 w-5 flex-shrink-0 sm:-ml-1"
                      aria-hidden="true"
                    />
                    <span className="hidden truncate sm:ml-2 sm:block">
                      {selectedType.value === null
                        ? "No type"
                        : selectedType.name}
                    </span>
                  </Listbox.Button>

                  <Transition
                    show={open}
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="absolute right-0 z-10 mt-1 max-h-56 w-52 overflow-auto rounded-lg bg-white dark:bg-gray-950 py-3 text-base shadow ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {types.map((type) => (
                        <Listbox.Option
                          key={type.value}
                          className={({ active, selected }) =>
                            classNames(
                              active ? "bg-gray-100 dark:bg-gray-800" : "",
                              selected ? "font-bold" : "font-medium",
                              "relative cursor-default select-none py-2 px-3 text-gray-800 dark:text-gray-200"
                            )
                          }
                          value={type}
                        >
                          {({ selected }) => (
                            <div className="flex items-center">
                              <span className="block truncate">
                                {type.name}
                                {selected && (
                                  <CheckIcon className="h-4 w-4 inline-block" />
                                )}
                              </span>
                            </div>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </>
            )}
          </Listbox>

          <Listbox
            as="div"
            value={selectedTags}
            onChange={setSelectedTags}
            className="flex-shrink-0"
            multiple
          >
            {({ open }) => (
              <>
                <Listbox.Label className="sr-only"> Add tags </Listbox.Label>
                <div className="relative">
                  <Listbox.Button className="relative inline-flex items-center whitespace-nowrap rounded-full bg-gray-50 dark:bg-gray-800 py-2 px-2 text-sm font-medium text-gray-500 dark:text-gray-200 hover:bg-gray-100 sm:px-3">
                    <HashtagIcon
                      className="h-5 w-5 flex-shrink-0 sm:-ml-1"
                      aria-hidden="true"
                    />
                    <span className="hidden truncate sm:ml-2 sm:block">
                      {selectedTags.length} tags
                    </span>
                  </Listbox.Button>

                  <Transition
                    show={open}
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="absolute right-0 z-10 mt-1 max-h-56 w-52 overflow-auto rounded-lg bg-white dark:bg-gray-950 py-3 text-base shadow ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {tags.map((tag) => (
                        <Listbox.Option
                          key={tag.name}
                          className={({ active, selected }) =>
                            classNames(
                              active ? "bg-gray-100 dark:bg-gray-800" : "",
                              selected ? "font-bold" : "font-medium",
                              "relative cursor-default select-none py-2 px-3 text-gray-800 dark:text-gray-200"
                            )
                          }
                          value={tag}
                        >
                          {({ selected }) => (
                            <div className="flex items-center">
                              <span className="block truncate">
                                <span
                                  className={classNames(
                                    tag.color
                                      ? colorVariants[tag.color]
                                      : colorVariants["gray"],
                                    "inline-flex items-center rounded-full px-2 py-0.5 text-sm font-medium mr-1"
                                  )}
                                >
                                  {tag.name}
                                </span>
                                {selected && (
                                  <CheckIcon className="h-4 w-4 inline-block" />
                                )}
                              </span>
                            </div>
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
        <div className="flex items-center justify-between space-x-3 border-t border-gray-200 dark:border-gray-700 px-2 py-2 sm:px-3">
          <div className="flex">
            <button
              type="button"
              className="group -my-2 -ml-2 inline-flex items-center rounded-full px-3 py-2 text-left text-gray-400"
            >
              <PaperClipIcon
                className="-ml-1 mr-2 h-5 w-5 group-hover:text-gray-500"
                aria-hidden="true"
              />
              <span className="text-sm italic text-gray-500 group-hover:text-gray-600">
                Attach a file
              </span>
            </button>
          </div>
          <div className="flex-shrink-0">
            <button
              type="submit"
              className="inline-flex items-center rounded-md border border-transparent bg-emerald-200 dark:bg-emerald-600 px-4 py-2 text-sm font-medium text-black dark:text-white shadow-sm hover:bg-emerald-300 dark:hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-300 dark:focus:ring-emerald-600 focus:ring-offset-2"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
