"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@/hooks/use-media-query";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import GoogleButton from "./GoogleButton";
import { useAuthModal } from "@/contexts/auth/AuthModalContext";

const Signup = () => {
  const { modalType, isOpen, openModal, closeModal, setIsOpen } =
    useAuthModal();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const isActive = modalType === "signup" && isOpen;

  const content = (
    <SignupForm
      className={isDesktop ? undefined : "px-4"}
      openModal={openModal}
      closeModal={closeModal}
    />
  );

  return isDesktop ? (
    <Dialog open={isActive} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Greetings!</DialogTitle>
          <DialogDescription>
            Sign up and join us to see the latest news!
          </DialogDescription>
        </DialogHeader>
        {content}
      </DialogContent>
    </Dialog>
  ) : (
    <Drawer open={isActive} onOpenChange={setIsOpen}>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Greetings!</DrawerTitle>
          <DrawerDescription>
            Sign up and join us to see the latest news!
          </DrawerDescription>
        </DrawerHeader>
        {content}
      </DrawerContent>
    </Drawer>
  );
};

const SignupForm = ({ className, openModal }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const values = Object.fromEntries(formData.entries());
    console.log(values);
  };

  const inputClasses =
    "peer block w-full appearance-none border-b-2 border-gray-300 bg-transparent p-2 text-gray-900 focus:outline-none focus:border-blue-600 focus:ring-0 sm:text-sm rounded-sm";

  const labelClasses =
    "absolute left-2 top-0 -translate-y-5 scale-75 transform origin-[0] bg-white px-1 text-sm text-gray-600 transition-all peer-placeholder-shown:translate-y-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-400 peer-focus:-translate-y-3 peer-focus:scale-75 peer-focus:text-gray-600";

  return (
    <div>
      <form
        className={cn(
          "flex flex-col gap-6 w-full max-w-[360px] mx-auto mb-6",
          className
        )}
        onSubmit={handleSubmit}
      >
        <div className="relative w-full">
          <Input
            id="email"
            name="email"
            type="email"
            placeholder=" "
            autoComplete="email"
            className={inputClasses}
          />
          <Label htmlFor="email" className={labelClasses}>
            Email
          </Label>
        </div>
        <div className="relative w-full">
          <Input
            id="password"
            name="password"
            type="password"
            placeholder=" "
            autoComplete="new-password"
            className={inputClasses}
          />
          <Label htmlFor="password" className={labelClasses}>
            Create password
          </Label>
        </div>
        <div className="relative w-full">
          <Input
            id="confirm_password"
            name="confirm_password"
            type="password"
            placeholder=" "
            autoComplete="new-password"
            className={inputClasses}
          />
          <Label htmlFor="confirm_password" className={labelClasses}>
            Confirm password
          </Label>
        </div>
        <Button type="submit" variant="success" size="lg" className="mt-4">
          Sign up
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
