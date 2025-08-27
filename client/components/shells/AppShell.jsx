"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

import { useAuth } from "@/contexts/auth/AuthContext";
import { useLoader } from "@/contexts/LoaderContext";

import Loader from "../Loader";
import AdminShell from "./AdminShell";
import PublicShell from "./PublicShell";

const AppShell = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();

  const { user = {}, isAuthenticated = false } = useAuth() || {};
  const { loading, prompt, startLoading, stopLoading } = useLoader();
  const isAdmin = isAuthenticated && user?.role === "admin";

  useEffect(() => {
    const validatePath = pathname.startsWith("/admin");

    if (isAdmin && pathname !== "/admin/dashboard") {
      startLoading({ prompt: "Switching to admin workspace, please wait..." });
      router.replace("/admin/dashboard");
      stopLoading();
    } else if (!isAdmin && validatePath) {
      startLoading({ prompt: "Switching to user workspace, please wait..." });
      router.replace("/home");
      stopLoading();
    }
  }, [user, isAuthenticated, pathname]);

  return (
    <>
      <Loader loading={loading} prompt={prompt} />
      {isAdmin ? (
        <AdminShell>{children}</AdminShell>
      ) : (
        <PublicShell>{children}</PublicShell>
      )}
    </>
  );
};

export default AppShell;
