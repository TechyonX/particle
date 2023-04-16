"use client";

import Particles from "./components/particles";

export default function Universe({
  searchParams: { query },
}: {
  searchParams: { query: string };
}) {
  return <Particles filter={{ search: query }} />;
}
