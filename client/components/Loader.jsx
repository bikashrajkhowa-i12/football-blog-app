"use client";

import { Spinner } from "@/components/ui/shadcn-io/spinner";

const Loader = ({ loading = false, prompt = "Loading" }) => {
  return loading ? (
    <div className="fixed inset-0">
      <div className="flex flex-col items-center justify-center gap-4">
        <Spinner variant={"default"} />
        <span className="font-mono text-muted-foreground text-xs">
          {prompt || "Loading..."}
        </span>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default Loader;
