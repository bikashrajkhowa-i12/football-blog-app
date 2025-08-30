import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const ADMIN_ROUTES = ["/admin"];
const LOGIN_ROUTES = ["/me"];

// Helper to verify JWT asynchronously
const verifyToken = async (token) => {
  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );
    return payload;
  } catch {
    return null;
  }
};

export const middleware = async (req) => {
  const url = req.nextUrl.clone();
  const { pathname } = url;
  const token = req.cookies.get("accessToken")?.value;

  const user = token ? await verifyToken(token) : null;

  const isAdminRoute = ADMIN_ROUTES.some((route) => pathname.startsWith(route));
  const isLoginRoute = LOGIN_ROUTES.some((route) => pathname === route);

  if (isAdminRoute) {
    if (!user) {
      url.pathname = "/unauthenticated";
      return NextResponse.redirect(url);
    }
    if (user.role !== "admin") {
      url.pathname = "/unauthorized";
      return NextResponse.redirect(url);
    }
  }

  if (isLoginRoute) {
    if (!user) {
      url.pathname = "/unauthenticated";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
};

export const config = {
  matcher: ["/admin/:path*", "/me", "/unauthorized", "/unauthenticated"],
};
