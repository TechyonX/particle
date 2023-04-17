"use client";

import Particles from "./components/particles";

export default function Universe({
  searchParams: { query, tags },
}: {
  searchParams: { query: string, tags: string };
}) {
  return <Particles filter={{ search: query, tags: tags }} />;
}
