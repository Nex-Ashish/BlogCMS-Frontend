import { NextResponse } from "next/server";

export async function middleware(request) {
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  const isPublic = pathname === "/user/about" || pathname.startsWith("/user/legal");
  const isProtected = pathname.startsWith("/user/") || pathname.startsWith("/admin");

  if (!token && isProtected  && !isPublic) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/user/:path*", "/admin/:path*"],
};