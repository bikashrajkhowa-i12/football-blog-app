"use client";

import React, { useState } from "react";
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
import { useAuthModal } from "@/contexts/auth/AuthModalContext";

const ForgotPassword = () => {
  const { modalType, isOpen, openModal, setIsOpen } = useAuthModal();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const isForgotPasswordOpen = modalType === "forgot_password" && isOpen;

  const ModalWrapper = isDesktop ? Dialog : Drawer;
  const ContentWrapper = isDesktop ? DialogContent : DrawerContent;
  const HeaderWrapper = isDesktop ? DialogHeader : DrawerHeader;
  const TitleWrapper = isDesktop ? DialogTitle : DrawerTitle;
  const DescriptionWrapper = isDesktop ? DialogDescription : DrawerDescription;

  return (
    <ModalWrapper open={isForgotPasswordOpen} onOpenChange={setIsOpen}>
      <ContentWrapper className="sm:max-w-[425px]">
        <HeaderWrapper className={isDesktop ? "" : "text-left"}>
          <TitleWrapper>Recovery</TitleWrapper>
          <DescriptionWrapper>
            Enter your email associated with your account and we will send you
            steps to reset.
          </DescriptionWrapper>
        </HeaderWrapper>
        <ForgotPasswordForm
          className={isDesktop ? "" : "px-4"}
          openModal={openModal}
        />
      </ContentWrapper>
    </ModalWrapper>
  );
};

const ForgotPasswordForm = ({ className, openModal }) => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email }); // log form values
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className={cn(
          "flex flex-col gap-6 w-full max-w-[360px] mx-auto mb-6",
          className
        )}
      >
        <div className="relative w-full">
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder=" "
            autoComplete="email"
            className="peer block w-full appearance-none border-b-2 border-gray-300 bg-transparent p-2 text-gray-900 focus:outline-none focus:border-blue-600 focus:ring-0 sm:text-sm rounded-sm"
            required
          />
          <Label
            htmlFor="email"
            className="absolute left-2 top-0 -translate-y-5 scale-75 transform origin-[0] bg-white px-1 text-sm text-gray-600 transition-all peer-placeholder-shown:translate-y-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-400 peer-focus:-translate-y-3 peer-focus:scale-75 peer-focus:text-gray-600"
          >
            Email
          </Label>
        </div>
        <Button
          type="submit"
          size="lg"
          className="mt-4 bg-orange-500 hover:bg-orange-600 cursor-pointer"
        >
          Get Reset Link
        </Button>
      </form>

      <p className="text-center text-gray-500 text-sm my-6">
        {"< "}
        <strong
          onClick={() => openModal("login")}
          className="font-semibold text-green-900 cursor-pointer hover:underline"
        >
          Back to Login
        </strong>
      </p>
    </div>
  );
};

export default ForgotPassword;
