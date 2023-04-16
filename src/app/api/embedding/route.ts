import { Database } from "@/lib/database.types";
import { generateEmbeddings } from "@/utils/ai";
import { createRouteHandlerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { cookies, headers } from "next/headers";

export const revalidate = 0;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const text = searchParams.get("text");
  return null;

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
    return new Response(JSON.stringify({ text, embeddings }));
  }
  return new Response(JSON.stringify({ message: "Bad request" }), {
    status: 400,
  });
}
