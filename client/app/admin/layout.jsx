import { checkAdmin } from "@/lib/authServer";
import { redirect } from "next/navigation";

const AdminLayout = async ({ children }) => {
  const isAdmin = await checkAdmin();

  if (!isAdmin) {
    redirect("/home");
  }

  return <>{children}</>;
};

export default AdminLayout;
