"use client";

import { Spinner } from "@/components/ui/shadcn-io/spinner";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-1000 bg-black/70 min-h-screen flex justify-center">
      <div className="flex flex-col items-center justify-center gap-4">
        <Spinner className="text-white" size="64" />
        <span className="text-muted-foreground text-sm text-sky-500">
          Loading...
        </span>
      </div>
    </div>
  );
}
