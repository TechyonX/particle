"use client";

import Particles from "../components/particles";

export default function UniverseArchive() {
  return <Particles filter={{ isArchived: true }} />;
}
