import "@/styles/cmdk.css";
import { Dispatch, SetStateAction, useState } from "react";
import CommandPalette, {
  filterItems,
  getItemIndex,
  useHandleOpenCommandPalette,
} from "react-cmdk";
import { useAuth, useTheme } from "@/utils/hooks";

export default function CmdK({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const [page, setPage] = useState<"root" | "particles">("root");
  const [search, setSearch] = useState("");
  const [placeholder, setPlaceholder] = useState(
    "Search for a particle or action..."
  );
  // const [isOpen, setIsOpen] = useState(false);
  const { auth, session } = useAuth();
  const { setTheme } = useTheme();

  useHandleOpenCommandPalette(setIsOpen);

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
                href: "#",
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
                keywords: ["home", "observe", "list"],
              },
              {
                id: "universe.archive",
                children: "Go to Archive",
                icon: "ArchiveBoxIcon",
                iconType: "outline",
                href: "/universe",
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
              {
                id: "user.profile",
                children: "Profile",
                icon: "UserIcon",
                iconType: "outline",
                href: "#",
                keywords: ["profile", "user", "account"],
              },
              {
                id: "user.settings",
                children: "Settings",
                icon: "Cog6ToothIcon",
                iconType: "outline",
                href: "#",
                keywords: ["settings", "user", "account", "preferences"],
              },
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

      <CommandPalette.Page id="particles" searchPrefix={["Particle"]} onEscape={() => setPage("root")}>
        <CommandPalette.List key="particles" heading="Particles">
          <CommandPalette.ListItem
            key="particle-1"
            index={0}
            icon="CircleStackIcon"
            closeOnSelect={false}
            href="#"
            onClick={() => {
              setPage("root");
            }}
          >
            Title
          </CommandPalette.ListItem>
        </CommandPalette.List>
        <CommandPalette.List key="action" heading="Action">
          <CommandPalette.ListItem
            key="back"
            index={1}
            icon="ArrowLeftIcon"
            closeOnSelect={false}
            onClick={() => {
              setPage("root");
            }}
            keywords={["list", "particles", "spawned"]}
          >
            Back
          </CommandPalette.ListItem>
        </CommandPalette.List>
      </CommandPalette.Page>
    </CommandPalette>
  );
}
