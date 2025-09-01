"use client";

import {
  ArrowLeftRight,
  LayoutDashboard,
  LogOut,
  Settings,
  TableOfContents,
  Users,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import { useAuth } from "@/contexts/auth/AuthContext";
import { redirect, usePathname } from "next/navigation";
import Link from "next/link";
import LiveDateTime from "../LiveTime";
import { Button } from "../ui/button";

const AdminSidebar = () => {
  const { user = {}, logout } = useAuth();
  const pathname = usePathname();

  const switchToApp = () => {
    redirect("/home");
  };

  const items = [
    {
      title: "Dashboard",
      url: "/admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Content-Management",
      url: "/admin/content-management",
      icon: TableOfContents,
    },
    {
      title: "Users",
      url: "/admin/users",
      icon: Users,
    },
    {
      title: "Settings",
      url: "/admin/settings",
      icon: Settings,
    },
  ];

  return (
    <Sidebar>
      <SidebarHeader className="bg-gray-300 rounded-xs mb-0.5">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-gray-800">Manage App</h1>
          <div className="text-relaxed text-xs flex flex-col gap-0.5">
            <p>Email: {user?.email}</p>
            <p>Role: {user?.role}</p>
            <p>Name: {user?.name || "No name"}</p>
            <LiveDateTime />
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="bg-gray-300 rounded-xs">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span
                        className={`${
                          pathname === item.url ? "text-indigo-600" : ""
                        } font-bold text-gray-700 text-md`}
                      >
                        {item.title}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="bg-gray-300 rounded-xs my-0.5">
        <Button
          variant="outline"
          className="bg-transparent"
          onClick={switchToApp}
        >
          <ArrowLeftRight />
          Switch to Appview
        </Button>
        <Button
          variant="dark"
          onClick={() => {
            logout();
            switchToApp();
          }}
        >
          <LogOut /> Logout
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AdminSidebar;
