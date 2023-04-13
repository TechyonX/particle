import { createMiddlewareSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";
import { Database } from "./lib/database.types";
import { NextURL } from "next/dist/server/web/next-url";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareSupabaseClient<Database>({ req, res });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  console.log("middleware", req.nextUrl.pathname);
  if (session) {
    switch (req.nextUrl.pathname) {
      case "/login":
      case "/":
        return NextResponse.redirect(new NextURL("/universe", req.nextUrl));
    }
  } else {
    if (req.nextUrl.pathname.startsWith("/universe")) {
      return NextResponse.redirect(new NextURL("/login", req.nextUrl));
    }
  }

  return res;
}
