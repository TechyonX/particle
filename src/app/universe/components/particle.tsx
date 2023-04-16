import { Database } from "@/lib/database.types";
import { urlExtractor } from "@/utils/misc";
import Link from "next/link";
import { classNames } from "react-cmdk";

export default function ParticleCard({
  particle,
}: {
  particle: Database["public"]["Tables"]["particle"]["Row"];
}) {
  const url = urlExtractor(particle.content);
  const isLink = particle.type === 1 && url && url.length > 0;
  return isLink ? (
    <a href={isLink ? url[0] : "#"} target={isLink ? "_blank" : undefined}>
      <ParticleCardContent particle={particle} />
    </a>
  ) : (
    <Link href={"/universe/observe/" + particle.id}>
      <ParticleCardContent particle={particle} />
    </Link>
  );
}

function ParticleCardContent({
  particle,
}: {
  particle: Database["public"]["Tables"]["particle"]["Row"];
}) {
  return (
    <div
      className={classNames(
        "rounded-lg border text-black dark:text-white my-4 px-4 py-4 transition bg-gradient-to-br hover:shadow-sm",
        "from-particle-50/10 to-particle-50/0 hover:to-particle-50/10",
        "dark:from-particle-950/10 dark:to-particle-950/0 dark:hover:to-particle-950/10",
        "border-particle-600/20 hover:border-particle-600",
        "dark:border-particle-400/10 dark:hover:border-particle-400"
      )}
    >
      <h1 className="text-lg font-bold">{particle.title}</h1>
      <p className="text-sm">{particle.description}</p>
      <p>{particle.content}</p>
      <p>Archived: {particle.is_archived && "1"}</p>
      <p>Public: {particle.is_public && "1"}</p>
      <p>Removed: {particle.is_trashed && "1"}</p>
    </div>
  );
}
