"use client";

import * as React from "react";
import { isEmpty } from "lodash";

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
import { useLoader } from "@/contexts/LoaderContext";
import callApi from "@/lib/callApi";
import { useAuth } from "@/contexts/auth/AuthContext";
import GoogleButton from "./GoogleButton";

const Login = () => {
  const { modalType, isOpen, openModal, closeModal, setIsOpen } =
    useAuthModal();
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={modalType === "login" && isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Welcome Back!</DialogTitle>
            <DialogDescription>Login to see the latest news!</DialogDescription>
          </DialogHeader>
          <LoginForm openModal={openModal} closeModal={closeModal} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={modalType === "login" && isOpen} onOpenChange={setIsOpen}>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Welcome Back!</DrawerTitle>
          <DrawerDescription>Login to see the latest news!</DrawerDescription>
        </DrawerHeader>
        <LoginForm
          className="px-4"
          openModal={openModal}
          closeModal={closeModal}
        />
      </DrawerContent>
    </Drawer>
  );
};

const LoginForm = ({ className, openModal, closeModal }) => {
  const { login } = useAuth() || {};
  const { startLoading, stopLoading } = useLoader();
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const onClickLogin = async (e) => {
    e.preventDefault();

    if (isEmpty(formData)) return;

    try {
      startLoading({ prompt: "Logging in..." });
      const response = await callApi({
        method: "POST",
        url: "/auth/login",
        data: formData,
      });
      login(response?.data?.user, response?.data?.accessToken);
      closeModal();
    } catch (error) {
      console.log("Error: ", error?.message);
    } finally {
      stopLoading();
    }
  };

  return (
    <div>
      <form
        onSubmit={onClickLogin}
        className={cn(
          "flex flex-col gap-6 w-full max-w-[360px] mx-auto mb-6 ",
          className
        )}
      >
        <div className="relative w-full">
          <Input
            id="email"
            type="email"
            value={formData?.email || ""}
            onChange={handleChange}
            placeholder=" "
            autoComplete="email"
            className="peer block w-full appearance-none border-b-2 border-gray-300 bg-transparent p-2 text-gray-900 focus:outline-none focus:border-blue-600 focus:ring-0 sm:text-sm rounded-sm"
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
            value={formData?.password || ""}
            onChange={handleChange}
            placeholder=" "
            autoComplete="current-password"
            className="peer block w-full appearance-none border-b-2 border-gray-300 bg-transparent p-2 text-gray-900 focus:outline-none focus:border-blue-600 focus:ring-0 sm:text-sm rounded-sm"
          />
          <Label
            htmlFor="password"
            className="absolute left-2 top-0 -translate-y-5 scale-75 transform origin-[0] bg-white px-1 text-sm text-gray-600 transition-all peer-placeholder-shown:translate-y-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-400 peer-focus:-translate-y-3 peer-focus:scale-75 peer-focus:text-gray-600"
          >
            Password
          </Label>
        </div>
        <div className="flex items-center">
          <div className="flex w-full space-x-2">
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

          <div className="flex justify-end w-full">
            <Label
              onClick={() => openModal("forgot_password")}
              className="text-sm text-end text-gray-600 hover:text-gray-700 cursor-pointer"
            >
              Forgot Password?
            </Label>
          </div>
        </div>
        <Button type="submit" variant="success" size="lg" className="mt-4">
          Login
        </Button>
      </form>

      <div className="my-5 space-y-5">
        <p className="text-center text-gray-600">Or</p>
        {/* <GoogleButton /> */}
        <GoogleButton />
        <p className="text-center text-gray-500 text-sm my-6">
          Don&apos;t have an account?{" "}
          <strong
            onClick={() => openModal("signup")}
            className="text-green-900 cursor-pointer hover:underline"
          >
            Signup
          </strong>
        </p>
      </div>
    </div>
  );
};

export default Login;
