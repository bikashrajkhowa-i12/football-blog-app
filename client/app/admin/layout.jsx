import { redirect } from "next/navigation";

import { checkAdmin, isAuthenticatedUser } from "@/lib/authServer";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AdminSidebar from "@/components/admin/AdminSidebar";
import Breadcrumbs from "@/components/Breadcrumbs";

export default async function AdminLayout({ children }) {
  const isAuthenticated = isAuthenticatedUser();
  const isAdmin = checkAdmin();

  if (isAuthenticated && isAdmin) {
    return (
      <SidebarProvider>
        <AdminSidebar />
        <main className="md:px-4 p-2 flex flex-col w-screen">
          <div className="flex gap-10">
            <SidebarTrigger />
            <Breadcrumbs />
          </div>
          <section className="flex flex-col max-w-6xl w-full h-full mx-auto min-h-screen overflow-x-hidden">
            {children}
          </section>
        </main>
      </SidebarProvider>
    );
  } else {
    redirect("/home");
  }
}
