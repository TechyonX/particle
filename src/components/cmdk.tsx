import "react-cmdk/dist/cmdk.css";
import { useState } from "react";
import CommandPalette, {
  filterItems,
  getItemIndex,
  useHandleOpenCommandPalette,
} from "react-cmdk";
import { useAuth } from "@/utils/hooks";

export default function CmdK() {
  const [page, setPage] = useState<"root" | "particles">("root");
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { auth } = useAuth();

  useHandleOpenCommandPalette(setIsOpen);

  const filteredItems = filterItems(
    [
      {
        heading: "Universe",
        id: "universe",
        items: [
          {
            id: "search",
            children: "Search particles",
            icon: "MagnifyingGlassIcon",
            closeOnSelect: false,
            onClick: () => {
              setPage("particles");
            },
            keywords: ["list", "particles", "spawned", "search", "find"],
          },
          {
            id: "home",
            children: "Home",
            icon: "HomeIcon",
            href: "/universe",
            keywords: ["home", "observe", "list"],
          },
          {
            id: "new",
            children: "Spawn new particle",
            icon: "PlusCircleIcon",
            href: "#",
            keywords: ["new", "spawn", "particle", "create"],
          },
        ],
      },
      {
        heading: "User",
        id: "user",
        items: [
          {
            id: "user-profile",
            children: "Profile",
            icon: "UserIcon",
            href: "#",
            keywords: ["profile", "user", "account"],
          },
          {
            id: "user-settings",
            children: "Settings",
            icon: "Cog6ToothIcon",
            href: "#",
            keywords: ["settings", "user", "account", "preferences"],
          },
          {
            id: "log-out",
            children: "Log out",
            icon: "ArrowLeftOnRectangleIcon",
            onClick: () => {
              auth.signOut();
            },
            keywords: ["log out", "sign out", "logout", "signout"],
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

      <CommandPalette.Page id="particles" searchPrefix={["Particle"]}>
        <CommandPalette.List key="particles" heading="Particles">
          <CommandPalette.ListItem
            key="particle-1"
            index={0}
            icon="CircleStackIcon"
            closeOnSelect={false}
            href="#"
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
