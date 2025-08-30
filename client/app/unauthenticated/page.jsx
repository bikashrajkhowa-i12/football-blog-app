// app/unauthenticated/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { ShieldAlert, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthModal } from "@/contexts/auth/AuthModalContext";

export default function UnauthenticatedPage() {
  const router = useRouter();
  const { openModal } = useAuthModal();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-300 p-6 text-center">
      <div className="max-w-md bg-white shadow-md rounded-2xl p-8 space-y-6">
        {/* Icon + Title */}
        <div className="flex flex-col items-center space-y-2">
          <ShieldAlert className="h-12 w-12 text-yellow-600" />
          <h1 className="text-2xl font-extrabold text-yellow-600">
            Access Restricted
          </h1>
          <p className="text-gray-600">
            You’re not signed in yet. Don’t worry — you’re just one step away!
          </p>
        </div>

        {/* Rules Section */}
        <div className="text-left space-y-2">
          <h2 className="text-lg font-semibold text-gray-700">
            Mandatory Rules 📜
          </h2>
          <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
            <li>Use your real account credentials only.</li>
            <li>Respect community guidelines at all times.</li>
            <li>No sharing of login details with others.</li>
            <li>Report any suspicious activity immediately.</li>
          </ul>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-center gap-4">
          <Button
            variant="outline"
            onClick={() => router.back()}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </Button>

          <Button onClick={() => openModal("login")}>Login</Button>
        </div>
      </div>
    </main>
  );
}
