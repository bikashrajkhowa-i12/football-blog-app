"use client";

import { useAuthModal } from "@/contexts/auth/AuthModalContext";
import { Button } from "./ui/button";
import { IconHomeFilled } from "@tabler/icons-react";
import Link from "next/link";

const Unauthorized = () => {
  const { openModal } = useAuthModal();

  return (
    <div className="p-20 text-center space-y-10">
      <div>
        <div className="flex justify-center text-2xl text-yellow-500 font-bold">
          <span>🔒 Unauthorized Access</span>
        </div>
        <p className="text-sm text-muted-foreground">
          Please login to access this page.
        </p>
      </div>

      <div className="space-x-5">
        <Link href="/home">
          <Button variant="ghost">
            <IconHomeFilled />
            Home
          </Button>
        </Link>
        <Button onClick={() => openModal("login")}>Login</Button>
      </div>
    </div>
  );
};

export default Unauthorized;
