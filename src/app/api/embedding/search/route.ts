import { Database } from "@/lib/database.types";
import { generateEmbeddings } from "@/utils/ai";
import { createRouteHandlerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { cookies, headers } from "next/headers";

export const revalidate = 0;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const text = searchParams.get("text");

  const supabase = createRouteHandlerSupabaseClient<Database>({
    headers,
    cookies,
  });
  const session = await supabase.auth.getSession();

  if (!session.data.session) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 403,
    });
  }

  if (text && text.trim().length > 0) {
    const embeddings = await generateEmbeddings(text);
    let { data, error } = await supabase.rpc("match_particles", {
      match_count: 10,
      query_embedding: JSON.stringify(embeddings),
      similarity_threshold: 0.75,
      uid: session.data.session?.user.id,
    });
    return new Response(JSON.stringify({ data, error, text }));
  }
  return new Response(JSON.stringify({ message: "Bad request" }), {
    status: 400,
  });
}
