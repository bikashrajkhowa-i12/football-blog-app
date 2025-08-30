// app/unauthorized/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { LockKeyhole, AlertTriangle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function UnauthorizedPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-50 to-red-100 p-6">
      <Card className="max-w-md w-full border-red-300 shadow-lg rounded-2xl">
        <CardHeader className="flex flex-col items-center space-y-2">
          <LockKeyhole className="h-12 w-12 text-red-600" />
          <CardTitle className="text-2xl font-bold text-gray-900 uppercase tracking-wide">
            Unauthorized Access
          </CardTitle>
          <p className="text-gray-700 font-medium text-center">
            You do not have permission to view this page.
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Strict Rules */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-red-700">
              <AlertTriangle className="h-5 w-5" />
              <h2 className="text-lg font-semibold">Mandatory Rules 🚫</h2>
            </div>
            <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
              <li>Only authorized personnel may access this section.</li>
              <li>Attempting to bypass restrictions will be logged.</li>
              <li>Respect role-based permissions at all times.</li>
              <li>Contact an administrator if you believe this is an error.</li>
            </ul>
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-center gap-4">
            <Button
              variant="outline"
              onClick={() => router.back()}
              className="flex items-center gap-2 border-red-400 text-red-700 hover:text-red-700"
            >
              <ArrowLeft className="h-4 w-4" />
              Go Back
            </Button>

            <Button variant="destructive" onClick={() => router.push("/")}>
              Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
