import { Database } from "@/lib/database.types";
import { generateEmbeddings } from "@/utils/ai";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  const supabase = createRouteHandlerClient<Database>({
    cookies,
  });
  const session = await supabase.auth.getSession();

  if (!session.data.session) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 403,
    });
  }

  if (!id || id.trim().length === 0) {
    return new Response(JSON.stringify({ message: "Bad request" }), {
      status: 400,
    });
  }

  const { data } = await supabase
    .from("particle")
    .select("title, content, description")
    .match({ id })
    .single();

  if (!data) {
    return new Response(JSON.stringify({ message: "Particle not found" }), {
      status: 404,
    });
  }

  const { title, content, description } = data;

  const embedding = await generateEmbeddings(
    `${title} ${content} ${description}`
  );

  const res = await supabase
    .from("particle")
    // @ts-ignore
    .update({ embedding: embedding })
    .match({ id });

  return new Response(
    JSON.stringify({
      message: "Embedding updated",
    })
  );
}
