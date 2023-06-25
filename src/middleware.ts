import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient<any>({ req, res });
  const { data, error } = await supabase.auth.getSession();
  const url = req.url.split("/");
  if (req.url.includes("reset")) {
    return res;
  }
  // redirect to login page if no session and not on login page
  if (!data.session && req.nextUrl.pathname !== "/" && !url.includes("_next")) {
    return NextResponse.redirect(req.nextUrl.origin + "/");

    // redirect to fixtures page if session and on login page
  } else if (data.session && req.nextUrl.pathname === "/") {
    return NextResponse.redirect(req.nextUrl.origin + "/fixtures");

    // carry on
  } else {
    return res;
  }
}
