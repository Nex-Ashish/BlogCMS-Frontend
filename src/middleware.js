import { NextResponse } from "next/server";

function decodeToken(token) {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload;
  } catch {
    return null;
  }
}

export async function middleware(request) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  const isPublic = pathname === "/user/about" || pathname.startsWith("/user/legal");
  const isUserRoute = pathname.startsWith("/user/");
  const isAdminRoute = pathname.startsWith("/admin");
  const isAdminRootOnly = pathname === "/admin";

  if (!token) {
    if (isPublic) return NextResponse.next();
    if (isAdminRootOnly) return NextResponse.next();
    if (isUserRoute || isAdminRoute) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
    return NextResponse.next();
  }

  const payload = decodeToken(token);

  if (!payload) {
    const response = NextResponse.redirect(new URL("/auth/login", request.url));
    response.cookies.delete("token");
    return response;
  }

  const role = payload?.role?.toLowerCase();

  if (isAdminRoute && !isAdminRootOnly && role !== "admin") {
    return NextResponse.redirect(new URL("/user", request.url));
  }

  if (isUserRoute && !isPublic && !role) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/user/:path*", "/admin/:path*"],
};