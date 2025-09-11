import { NextResponse } from "next/server";
import crypto from "node:crypto";

export async function GET() {
  const state = crypto.randomBytes(32).toString("hex");
  const res = NextResponse.json({ state });

  res.cookies.set({
    name: "oauth_state",
    value: state,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    path: "/",
    maxAge: 5 * 60, // 5 minutes
  });

  return res;
}
