import { Database } from "@/lib/database.types";
import { generateEmbeddings } from "@/utils/ai";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const revalidate = 0;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const text = searchParams.get("text");
  const similarity = searchParams.get("similarity");
  const limit = searchParams.get("limit");

  const supabase = createRouteHandlerClient<Database>({
    cookies,
  });
  const session = await supabase.auth.getSession();

  if (!session.data.session) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 403,
    });
  }

  if (text && text.trim().length > 0) {
    let matchCount = limit ? parseInt(limit) : 10;
    let similarityThreshold = similarity ? parseFloat(similarity) : 0.75;
    matchCount = matchCount > 0 ? matchCount : 10;
    similarityThreshold = similarityThreshold > 0 ? similarityThreshold : 0.75;
    const embeddings = await generateEmbeddings(text);
    let { data, error } = await supabase.rpc("match_particles", {
      match_count: matchCount,
      query_embedding: JSON.stringify(embeddings),
      similarity_threshold: similarityThreshold,
      uid: session.data.session?.user.id,
    });
    return new Response(JSON.stringify({ data, error, text }));
  }
  return new Response(JSON.stringify({ message: "Bad request" }), {
    status: 400,
  });
}
