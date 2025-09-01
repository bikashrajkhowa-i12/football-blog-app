import { redirect } from "next/navigation";

import { checkAdmin, isAuthenticatedUser } from "@/lib/authServer";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AdminSidebar from "@/components/admin/AdminSidebar";
import Breadcrumbs from "@/components/Breadcrumbs";

const AdminLayout = async ({ children }) => {
  const isAuthenticated = isAuthenticatedUser();
  const isAdmin = checkAdmin();

  if (isAuthenticated && isAdmin) {
    return (
      <SidebarProvider>
        <AdminSidebar />
        <main className="md:px-4 p-2 flex flex-col">
          <div className="flex gap-10">
            <SidebarTrigger />
            <Breadcrumbs />
          </div>
          {children}
        </main>
      </SidebarProvider>
    );
  } else {
    redirect("/home");
  }
};

export default AdminLayout;
