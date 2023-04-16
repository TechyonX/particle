"use client";

import Particles from "../components/particles";

export default function UniverseTrash() {
  return <Particles filter={{ isTrashed: true }} />;
}
