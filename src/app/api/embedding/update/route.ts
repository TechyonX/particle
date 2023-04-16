import { Database } from "@/lib/database.types";
import { generateEmbeddings } from "@/utils/ai";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  console.log("Webhook body", request);

  const token = request.headers.get("TOKEN");

  if (!token || token.trim().length === 0) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 403,
    });
  }

  if (token !== process.env.SUPABASE_NEXT_AUTH_KEY) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 403,
    });
  }

  if (!id || id.trim().length === 0) {
    return new Response(JSON.stringify({ message: "Bad request" }), {
      status: 400,
    });
  }

  const supabase = createClient<Database>(
    process.env.SUPABASE_URL || "",
    process.env.SUPABASE_KEY || ""
  );

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
