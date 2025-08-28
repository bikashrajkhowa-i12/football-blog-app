"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

import { useAuth } from "@/contexts/auth/AuthContext";
import { useLoader } from "@/contexts/LoaderContext";

import GlobalLoader from "../GlobalLoader";
import AdminLayout from "./AdminLayout";
import PublicLayout from "./PublicLayout";

const AppRedirect = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();

  const { user = {}, isAuthenticated = false } = useAuth() || {};
  const { loading, prompt, startLoading, stopLoading } = useLoader();
  const isAdmin = false; //isAuthenticated && user?.role === "admin";

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
      <GlobalLoader loading={loading} prompt={prompt} />
      {isAdmin ? (
        <AdminLayout>{children}</AdminLayout>
      ) : (
        <PublicLayout>{children}</PublicLayout>
      )}
    </>
  );
};

export default AppRedirect;
