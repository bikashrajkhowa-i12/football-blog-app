"use client";

import { FcGoogle } from "react-icons/fc";

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
const GOOGLE_REDIRECT_URI = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI;

export default function GoogleButton() {
  const handleLogin = async () => {
    const res = await fetch("/api/auth/google-state"); //nextjs server
    const data = await res.json();
    const state = data.state;

    const googleAuthUrl =
      `https://accounts.google.com/o/oauth2/v2/auth?` +
      new URLSearchParams({
        client_id: GOOGLE_CLIENT_ID,
        redirect_uri: GOOGLE_REDIRECT_URI,
        response_type: "code",
        scope: "openid email profile",
        access_type: "offline",
        prompt: "consent",
        state,
      }).toString();

    window.location.href = googleAuthUrl;
  };

  return (
    <button
      onClick={handleLogin}
      className="w-full bg-white text-md flex justify-center gap-3 px-4 py-2 rounded-lg shadow-lg opacity-70 cursor-pointer
                 hover:opacity-80 hover:bg-gray-300 active:opacity-100 active:bg-gray-300 transition duration-300"
    >
      <FcGoogle className="text-[22px] mt-[3.6px]" /> Continue with Google
    </button>
  );
}
