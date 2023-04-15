import "@/styles/cmdk.css";
import "@/styles/globals.css";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import CommandPalette, {
  filterItems,
  getItemIndex,
  useHandleOpenCommandPalette,
} from "react-cmdk";
import { useAuth, useTheme } from "@/utils/hooks";
import SpawnParticleCmdKPage from "@/app/universe/components/particle-cmdk";
import { classNames } from "@/utils/misc";
import Link from "next/link";

export enum StatusType {
  Ready = "ready",
  Loading = "loading",
  Error = "error",
  Success = "success",
}

export interface StatusTypeItem {
  bgColor: string;
  indicatorColor: string;
  message: string;
}

export const statusTypes: { [key: string]: StatusTypeItem } = {
  [StatusType.Ready]: {
    bgColor: "bg-gradient-to-r from-particle-400/10 to-particle-100/0",
    indicatorColor: "bg-particle-400 dark:bg-particle-400",
    message: "Waiting for your command...",
  },
  [StatusType.Loading]: {
    bgColor: "bg-gradient-to-r from-amber-400/10 to-amber-100/0",
    indicatorColor: "bg-orange-400 dark:bg-orange-400",
    message: "Loading...",
  },
  [StatusType.Error]: {
    bgColor: "bg-gradient-to-r from-red-400/10 to-red-100/0",
    indicatorColor: "bg-red-400 dark:bg-red-400",
    message: "Error occurred",
  },
  [StatusType.Success]: {
    bgColor: "bg-gradient-to-r from-emerald-400/10 to-emerald-100/0",
    indicatorColor: "bg-emerald-400 dark:bg-emerald-400",
    message: "Success",
  },
};

export default function CmdK({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const [page, setPage] = useState<"root" | "particles" | "spawn">("root");
  const [search, setSearch] = useState("");
  const [placeholder, setPlaceholder] = useState(
    "Search for a particle or action..."
  );
  const [status, setStatus] = useState<StatusTypeItem>(
    statusTypes[StatusType.Error]
  );
  const { auth, session } = useAuth();
  const { setTheme } = useTheme();

  useHandleOpenCommandPalette(setIsOpen);

  useEffect(() => {
    setPage("root");
    setSearch("");
    setStatus(statusTypes[StatusType.Ready]);
  }, [isOpen]);

  const filteredItems = session
    ? filterItems(
        [
          {
            heading: "Universe",
            id: "universe",
            items: [
              {
                id: "universe.new",
                children: "Spawn new particle",
                icon: "PlusCircleIcon",
                iconType: "outline",
                closeOnSelect: false,
                onClick: () => {
                  setPlaceholder("Type or paste your particle here...");
                  if (search && search.trim().length > 0) {
                    setSearch("");
                  }
                  try {
                    navigator.clipboard.readText().then((text) => {
                      setSearch(text);
                    });
                  } catch (e) {}
                  setPage("spawn");
                },
                keywords: ["new", "spawn", "particle", "create"],
              },
              {
                id: "universe.search",
                children: "Search particles",
                icon: "MagnifyingGlassIcon",
                iconType: "outline",
                closeOnSelect: false,
                onClick: () => {
                  setPage("particles");
                },
                keywords: ["list", "particles", "spawned", "search", "find"],
              },
              {
                id: "universe.home",
                children: "Go to Home",
                icon: "HomeIcon",
                iconType: "outline",
                href: "/universe",
                renderLink: (props) =>
                  props.children &&
                  props.href && (
                    <Link {...props} href={props.href} ref={null}>
                      {props.children}
                    </Link>
                  ),
                keywords: ["home", "observe", "list"],
              },
              {
                id: "universe.archive",
                children: "Go to Archive",
                icon: "ArchiveBoxIcon",
                iconType: "outline",
                href: "/universe/archive",
                renderLink: (props) =>
                  props.children &&
                  props.href && (
                    <Link {...props} href={props.href} ref={null}>
                      {props.children}
                    </Link>
                  ),
                keywords: ["archive", "observe", "list"],
              },
            ],
          },
          {
            heading: "Theme",
            id: "theme",
            items: [
              {
                id: "theme.dark-mode",
                children: "Dark mode",
                icon: "MoonIcon",
                iconType: "outline",
                onClick: () => setTheme("dark"),
                keywords: ["theme", "dark", "mode"],
              },
              {
                id: "theme.light-mode",
                children: "Light mode",
                icon: "SunIcon",
                iconType: "outline",
                onClick: () => setTheme("light"),
                keywords: ["theme", "light", "mode"],
              },
            ],
          },
          {
            heading: "User",
            id: "user",
            items: [
              // {
              //   id: "user.profile",
              //   children: "Profile",
              //   icon: "UserIcon",
              //   iconType: "outline",
              //   href: "#",
              //   keywords: ["profile", "user", "account"],
              // },
              // {
              //   id: "user.settings",
              //   children: "Settings",
              //   icon: "Cog6ToothIcon",
              //   iconType: "outline",
              //   href: "#",
              //   keywords: ["settings", "user", "account", "preferences"],
              // },
              {
                id: "user.logout",
                children: "Logout",
                icon: "ArrowLeftOnRectangleIcon",
                iconType: "outline",
                onClick: () => {
                  auth.signOut();
                },
                keywords: ["log out", "sign out", "logout", "signout"],
              },
            ],
          },
        ],
        search
      )
    : filterItems(
        [
          {
            heading: "User",
            id: "user",
            items: [
              {
                id: "user.login",
                children: "Login / Register",
                icon: "ArrowRightOnRectangleIcon",
                iconType: "outline",
                href: "/login",
                keywords: [
                  "login",
                  "signin",
                  "signup",
                  "sign up",
                  "sign in",
                  "register",
                ],
              },
            ],
          },
          {
            heading: "Theme",
            id: "theme",
            items: [
              {
                id: "theme.dark-mode",
                children: "Dark mode",
                icon: "MoonIcon",
                iconType: "outline",
                onClick: () => setTheme("dark"),
                keywords: ["theme", "dark", "mode"],
              },
              {
                id: "theme.light-mode",
                children: "Light mode",
                icon: "SunIcon",
                iconType: "outline",
                onClick: () => setTheme("light"),
                keywords: ["theme", "light", "mode"],
              },
            ],
          },
        ],
        search
      );

  return (
    <CommandPalette
      onChangeSearch={setSearch}
      onChangeOpen={setIsOpen}
      search={search}
      isOpen={isOpen}
      page={page}
      placeholder={placeholder}
      footer={
        <div
          className={classNames(
            "flex flex-row py-3 px-3.5 text-gray-700 dark:text-gray-300 text-sm items-center transition-colors",
            status.bgColor
          )}
        >
          <span
            className={classNames(
              "relative inline-flex rounded-full h-2 w-2 mr-3 transition-colors",
              status.indicatorColor
            )}
          ></span>{" "}
          {status.message}
        </div>
      }
    >
      <CommandPalette.Page id="root">
        {filteredItems.length ? (
          filteredItems.map((list) => (
            <CommandPalette.List key={list.id} heading={list.heading}>
              {list.items.map(({ id, ...rest }) => (
                <CommandPalette.ListItem
                  key={id}
                  index={getItemIndex(filteredItems, id)}
                  {...rest}
                />
              ))}
            </CommandPalette.List>
          ))
        ) : (
          <CommandPalette.FreeSearchAction />
        )}
      </CommandPalette.Page>

      <CommandPalette.Page id="particles" onEscape={() => setPage("root")}>
        <CommandPalette.List key="action" heading="Action">
          <CommandPalette.ListItem
            key="search"
            index={0}
            icon="MagnifyingGlassIcon"
            closeOnSelect={false}
            onClick={() => {
              if (search && search.trim().length > 0) {
                setStatus(statusTypes[StatusType.Success]);
                setIsOpen(false);
                setPage("root");
              } else {
                setStatus({
                  ...statusTypes[StatusType.Error],
                  message: "Please enter a search term",
                });
              }
            }}
          >
            Search
          </CommandPalette.ListItem>
          <CommandPalette.ListItem
            key="back"
            index={1}
            icon="ArrowLeftIcon"
            closeOnSelect={false}
            onClick={() => {
              setStatus(statusTypes[StatusType.Ready]);
              setPage("root");
            }}
          >
            Back
          </CommandPalette.ListItem>
        </CommandPalette.List>
      </CommandPalette.Page>
      <SpawnParticleCmdKPage
        id="spawn"
        text={search}
        onSpawn={() => {
          setStatus(statusTypes[StatusType.Ready]);
          setIsOpen(false);
        }}
        onBack={() => {
          setSearch("");
          setStatus(statusTypes[StatusType.Ready]);
          setPage("root");
        }}
        status={status}
        setStatus={setStatus}
        page={page}
      />
    </CommandPalette>
  );
}
