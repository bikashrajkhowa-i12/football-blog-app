"use client";

import { Spinner } from "@/components/ui/shadcn-io/spinner";

const Loader = ({ loading = false, prompt = "Loading..." }) => {
  return loading ? (
    <div className="absolute inset-0 z-20 bg-white/80 rounded-md flex items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-4">
        <Spinner variant={"bars"} className="text-black" size={35} />
        <span className="text-muted-foreground text-sm text-black">
          {prompt || "Loading..."}
        </span>
      </div>
    </div>
  ) : null;
};

export default Loader;
