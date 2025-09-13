"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useAuth } from "@/contexts/auth/AuthContext";
import { useAuthModal } from "@/contexts/auth/AuthModalContext";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Menu, ShieldUser, UserRound } from "lucide-react";
import { HiOutlinePencilSquare } from "react-icons/hi2";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { IconLogout } from "@tabler/icons-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import AppLogo from "./AppLogo";

const Navbar = () => {
  const { isAuthenticated = false, user = {}, logout } = useAuth() || {};
  const { openModal } = useAuthModal();
  const [isSheetOpen, setIsSheetOpen] = React.useState(false);
  const pathname = usePathname();

  const links = [
    { title: "Home", path: "/home" },
    { title: "Latest", path: "/latest" },
    { title: "Leagues", path: "/leagues" },
    { title: "Teams", path: "/teams" },
    { title: "Contact", path: "/contact" },
    { title: "About", path: "/about" },
  ];

  const ProfilePopOver = () => {
    const optionStyles = `flex items-center gap-2 rounded-lg cursor-pointer 
               data-[highlighted]:text-white
               data-[highlighted]:bg-zinc-800
               transition-colors duration-200`;
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="h-8 w-8 md:h-11 md:w-11 rounded-full cursor-pointer">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>ER</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-40 bg-zinc-950 text-white border-none"
          align="start"
        >
          <DropdownMenuGroup>
            {isAuthenticated && user?.role === "admin" && (
              <DropdownMenuItem asChild>
                <Link href="/admin" className={optionStyles}>
                  <ShieldUser size={16} /> Admin view
                </Link>
              </DropdownMenuItem>
            )}

            <DropdownMenuItem asChild>
              <Link href="/me" className={optionStyles}>
                <UserRound size={16} /> Profile
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem
              className={optionStyles}
              onSelect={() => logout()}
            >
              <IconLogout size={16} /> Logout
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  return (
    <header className="fixed top-0 w-screen z-50 flex justify-center">
      <nav className="backdrop-blur-lg bg-gray-200/50 w-full">
        <div className="max-w-screen-xl mx-auto px-4 py-0.5 flex items-center justify-between space-x-5">
          {/* Mobile Sheet */}
          <div className="md:hidden">
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" aria-label="Open menu">
                  <Menu />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-64"
                aria-describedby="sheet-description"
              >
                <SheetHeader>
                  <SheetTitle>
                    <AppLogo />
                  </SheetTitle>
                  <SheetDescription id="sheet-description" className="sr-only">
                    Navigation links and actions for your sports blog.
                  </SheetDescription>
                </SheetHeader>
                <nav className="flex flex-col gap-4 px-4 py-2">
                  {links.map((link) => {
                    const isActive = pathname === link.path;
                    return (
                      <Link
                        key={link.title}
                        href={link.path}
                        className={`text-base font-medium transition-colors ${
                          isActive
                            ? "text-blue-600 font-semibold"
                            : "text-gray-800 hover:text-blue-600"
                        }`}
                        onClick={() => setIsSheetOpen(false)} // ✅ closes drawer
                      >
                        {link.title}
                      </Link>
                    );
                  })}
                </nav>
              </SheetContent>
            </Sheet>
          </div>

          {/* App logo */}
          <div className="font-bold text-xl pl-10 md:pl-0">
            <AppLogo />
          </div>

          {/* Desktop Links */}
          <ul className="hidden md:flex gap-6 items-center">
            {links.map((link) => {
              const isActive = pathname === link.path;
              return (
                <li key={link.title}>
                  <Link
                    href={link.path}
                    className={`relative text-lg font-medium transition-colors pb-1 ${
                      isActive
                        ? "text-blue-600 font-semibold after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-blue-600"
                        : "text-gray-800 hover:text-blue-600"
                    }`}
                  >
                    {link.title}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex justify-center items-center gap-4 md:gap-10">
            {/** Write a blog icon */}

            <Link href={"/blog/create"}>
              <HiOutlinePencilSquare
                size={28}
                className="opacity-70 hover:opacity-100 cursor-pointer"
                title="Write a blog"
              />
            </Link>

            {/* Auth section */}
            {isAuthenticated ? (
              <ProfilePopOver />
            ) : (
              <Button
                className="ml-2"
                variant="dark"
                onClick={() => openModal("login")}
              >
                Login
              </Button>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
