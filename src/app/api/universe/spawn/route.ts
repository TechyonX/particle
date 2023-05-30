import { Database } from "@/lib/database.types";
import { generateEmbeddings } from "@/utils/ai";
import { ParticleType, particleTypes } from "@/utils/constants";
import { hashTagExtractor, urlExtractor } from "@/utils/misc";
import {
  Session,
  SupabaseClient,
  createRouteHandlerSupabaseClient,
} from "@supabase/auth-helpers-nextjs";
import { cookies, headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const supabase = createRouteHandlerSupabaseClient<Database>({
    headers,
    cookies,
  });
  const session = (await supabase.auth.getSession()).data.session;
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  if (!body.text) {
    return NextResponse.json({ message: "Text is required" }, { status: 400 });
  }

  const text = body.text;
  const hashTags = hashTagExtractor(text || "", false);
  const urls = urlExtractor(text || "");
  const type =
    urls?.length === 1
      ? particleTypes[ParticleType.Link]
      : particleTypes[ParticleType.Text];

  const res = await supabase
    .from("particle")
    .insert({
      content: text,
      type: type.id,
      user_id: session.user.id,
    })
    .select("id");
  if (res.status === 201) {
    const errors: string[] = [];
    const id = res.data ? res.data[0].id : null;
    if (id) {
      const tagHandler = async () => {
        const tagIds = await findOrCreateTags(
          supabase,
          session,
          hashTags || []
        );
        if (tagIds.length > 0) {
          return supabase.from("particle_tag").insert(
            tagIds.map((id) => ({
              particle_id: id,
              tag_id: id,
            }))
          );
        }
        return null;
      };

      const values = await Promise.all([
        tagHandler(),
        generateEmbeddings(`${text}`),
      ]);

      const tagRelResponse = values[0];
      const embedding = values[1];

      if (embedding) {
        await supabase
          .from("particle")
          // @ts-ignore
          .update({ embedding: embedding })
          .match({ id });
      } else {
        errors.push("Error occured while generating embeddings");
      }

      if (tagRelResponse && tagRelResponse.error) {
        console.log("Error occured while applying tags", tagRelResponse.error);
        errors.push("Error occured while applying tags");
      }
    }
    return NextResponse.json(
      {
        message: "Particle spawned",
        id: id,
        errors: errors,
      },
      { status: 201 }
    );
  } else {
    return NextResponse.json(
      { message: "Error occured", errors: [res.error?.message] },
      { status: 500 }
    );
  }
}

async function findOrCreateTags(
  supabase: SupabaseClient<Database>,
  session: Session,
  tags: string[]
): Promise<string[]> {
  if (tags.length === 0) {
    return [];
  }
  let tagIds: string[] = [];
  const existingTags = await supabase
    .from("tag")
    .select("id, name")
    .eq("user_id", session.user.id);

  const tagsToCreate = tags.filter((tag) => {
    return !existingTags.data?.some(
      (t) => t.name.toLowerCase() === tag.toLowerCase()
    );
  });

  tags.forEach((tag) => {
    const matched = existingTags.data?.find(
      (t) => t.name.toLowerCase() === tag.toLowerCase()
    );
    if (matched) {
      tagIds.push(matched.id);
    }
  });

  if (tagsToCreate.length > 0) {
    const tagRes = await supabase
      .from("tag")
      .insert(
        tagsToCreate.map((tag) => {
          return {
            name: tag,
            user_id: session.user.id,
          };
        })
      )
      .select("id");
    if (tagRes.data) {
      tagIds = [...tagIds, ...tagRes.data.map((t) => t.id)];
    }
  }
  return tagIds;
}
