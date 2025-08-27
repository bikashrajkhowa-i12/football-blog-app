"use client";

import * as React from "react";
import Link from "next/link";
import { useAuthModal } from "@/contexts/auth/AuthModalContext";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react"; // install with: npm install lucide-react

const Navbar = () => {
  const { openModal } = useAuthModal();
  const links = [
    { title: "Home", path: "/" },
    { title: "Feeds", path: "/feeds" },
    { title: "Latest", path: "/latest" },
    { title: "Leagues", path: "/leagues" },
    { title: "Teams", path: "/teams" },
    { title: "Contact", path: "/contact" },
    { title: "About", path: "/about" },
  ];

  const AppLogo = () => {
    return (
      <div className="text-3xl md:text-[48px] font-poppins tracking-tighter">
        <span className="font-light">foot</span>
        <span className="font-extrabold text-gray-900">scribe</span>
        <span className="font-extrabold text-green-900">90</span>
      </div>
    );
  };

  return (
    <header className="fixed top-0 w-screen flex justify-center">
      <nav className="bg-white border-b md:border-gray-300 w-full">
        <div className="max-w-screen-xl mx-auto px-4 py-4 flex items-center justify-between space-x-5">
          {/* Mobile Sheet */}
          <div className="md:hidden">
            <Sheet>
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
                  {links.map((link) => (
                    <Link
                      key={link.title}
                      href={link.path}
                      className="text-base font-medium hover:text-blue-600"
                    >
                      {link.title}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>

          {/* App logo */}
          <div className="w-full">
            <div className="font-bold text-xl pl-10 md:pl-0">
              <AppLogo />
            </div>
          </div>

          {/* Desktop Links */}
          <ul className="hidden md:flex gap-6 items-center">
            {links.map((link) => (
              <li key={link.title}>
                <Link
                  href={link.path}
                  className="text-sm font-medium hover:text-gray-600 transition-colors"
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
          <Button
            className="ml-2"
            variant="success"
            onClick={() => openModal("login")}
          >
            Login
          </Button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
