import { Database } from "@/lib/database.types";

export default function ParticleCard({
  particle,
}: {
  particle: Database["public"]["Tables"]["particle"]["Row"];
}) {
  return (
    <div className="text-black dark:text-white my-4">
      <h1 className="text-lg font-bold">{particle.title}</h1>
      <p className="text-sm">{particle.description}</p>
      <p>{particle.content}</p>
    </div>
  );
}
