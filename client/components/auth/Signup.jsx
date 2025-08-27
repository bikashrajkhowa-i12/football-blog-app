"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@/hooks/use-media-query";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import GoogleButton from "../GoogleButton";
import { useAuthModal } from "@/contexts/auth/AuthModalContext";

const Signup = () => {
  const { modalType, isOpen, openModal, setIsOpen } = useAuthModal();
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog
        open={modalType && modalType === "signup" && isOpen}
        onOpenChange={setIsOpen}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Greetings!</DialogTitle>
            <DialogDescription>
              Sign up and join us to see the latest news!
            </DialogDescription>
          </DialogHeader>
          <SignupForm openModal={openModal} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer
      open={modalType && modalType === "signup" && isOpen}
      onOpenChange={setIsOpen}
    >
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Greetings!</DrawerTitle>
          <DrawerDescription>
            Signup and join us to see the latest news!
          </DrawerDescription>
        </DrawerHeader>
        <SignupForm className="px-4" openModal={openModal} />
      </DrawerContent>
    </Drawer>
  );
};

const SignupForm = ({ className, openModal }) => {
  return (
    <div>
      <form
        className={cn(
          "flex flex-col gap-6 w-full max-w-[360px] mx-auto mb-6 ",
          className
        )}
      >
        <div className="relative w-full">
          <Input
            id="username"
            type="text"
            placeholder=" "
            autoComplete="username"
            className="peer block w-full appearance-none border-b-2 border-gray-300 bg-transparent py-2 px-0 text-gray-900 focus:outline-none focus:border-blue-600 focus:ring-0 sm:text-sm rounded-sm"
          />
          <Label
            htmlFor="username"
            className="absolute left-2 top-0 -translate-y-5 scale-75 transform origin-[0] bg-white px-1 text-sm text-gray-600 transition-all peer-placeholder-shown:translate-y-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-400 peer-focus:-translate-y-3 peer-focus:scale-75 peer-focus:text-gray-600"
          >
            Username
          </Label>
        </div>
        <div className="relative w-full">
          <Input
            id="email"
            type="email"
            placeholder=" "
            autoComplete="email"
            className="peer block w-full appearance-none border-b-2 border-gray-300 bg-transparent py-2 px-0 text-gray-900 focus:outline-none focus:border-blue-600 focus:ring-0 sm:text-sm rounded-sm"
          />
          <Label
            htmlFor="email"
            className="absolute left-2 top-0 -translate-y-5 scale-75 transform origin-[0] bg-white px-1 text-sm text-gray-600 transition-all peer-placeholder-shown:translate-y-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-400 peer-focus:-translate-y-3 peer-focus:scale-75 peer-focus:text-gray-600"
          >
            Email
          </Label>
        </div>
        <div className="relative w-full">
          <Input
            id="password"
            type="password"
            placeholder=" "
            autoComplete="password"
            className="peer block w-full appearance-none border-b-2 border-gray-300 bg-transparent py-2 px-0 text-gray-900 focus:outline-none focus:border-blue-600 focus:ring-0 sm:text-sm rounded-sm"
          />
          <Label
            htmlFor="password"
            className="absolute left-2 top-0 -translate-y-5 scale-75 transform origin-[0] bg-white px-1 text-sm text-gray-600 transition-all peer-placeholder-shown:translate-y-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-400 peer-focus:-translate-y-3 peer-focus:scale-75 peer-focus:text-gray-600"
          >
            Create password
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <input
            id="remember"
            type="checkbox"
            className="border-gray-300 rounded cursor-pointer"
          />
          <Label
            htmlFor="remember"
            className="text-sm text-gray-700 cursor-pointer"
          >
            Remember Me
          </Label>
        </div>
        <Button type="submit" variant="success" size="lg" className="mt-4">
          Signup
        </Button>
      </form>
      <div className="my-5 space-y-5">
        <p className="text-center text-gray-600">Or</p>
        <GoogleButton />
        <p className="text-center text-gray-500 text-sm my-6">
          Already have an account?{" "}
          <strong
            onClick={() => openModal("login")}
            className="font-bold text-green-900 cursor-pointer hover:underline"
          >
            Login
          </strong>
        </p>
      </div>
    </div>
  );
};

export default Signup;
