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
import { isEmpty } from "lodash";
import { useLoader } from "@/contexts/LoaderContext";
import callApi from "@/lib/callApi";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AlertCircleIcon } from "lucide-react";
import { useAuth } from "@/contexts/auth/AuthContext";

const Signup = () => {
  const { modalType, isOpen, openModal, closeModal, setIsOpen } =
    useAuthModal();
  const [error, setError] = React.useState(null);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const isActive = modalType === "signup" && isOpen;

  const content = (
    <SignupForm
      className={isDesktop ? undefined : "px-4"}
      openModal={openModal}
      closeModal={closeModal}
      setError={setError}
    />
  );

  const alert = error && (
    //TODO: Create error mapping based on backend error codes
    <Alert variant="destructive" className="text-start">
      <AlertCircleIcon />
      <AlertTitle>Unable to signup</AlertTitle>
      <AlertDescription>
        <ul className="list-inside list-disc text-sm">
          <li>{error?.message || ""}</li>
        </ul>
      </AlertDescription>
    </Alert>
  );

  return isDesktop ? (
    <Dialog open={isActive} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Greetings!</DialogTitle>
          <DialogDescription>
            Sign up and join us to see the latest news!
          </DialogDescription>
          {alert}
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
          {alert}
        </DrawerHeader>
        {content}
      </DrawerContent>
    </Drawer>
  );
};

const SignupForm = ({ className, openModal, closeModal, setError }) => {
  const { login } = useAuth() || {};
  const { loading, startLoading, stopLoading } = useLoader();
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
    confirm_password: "",
  });

  const handleChange = (e) => {
    setError(null);
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onClickSignup = async (e) => {
    setError(null);
    e.preventDefault();

    startLoading({ prompt: "Signing you in ..." });

    if (!formData || isEmpty(formData)) return;

    try {
      const response = await callApi({
        method: "POST",
        url: "/auth/signup",
        data: formData,
      });
      login(response?.data?.user, response?.data.accessToken);
      closeModal();
    } catch (error) {
      setError(error);
    } finally {
      stopLoading();
    }
  };

  const inputClasses =
    "peer block w-full appearance-none border-b-2 border-gray-400 bg-transparent p-2 text-gray-900 focus:outline-none focus:border-blue-600 focus:ring-0 sm:text-sm rounded-sm";

  const labelClasses =
    "absolute left-2 top-0 -translate-y-5 scale-75 transform origin-[0] bg-white px-1 text-sm text-gray-600 transition-all peer-placeholder-shown:translate-y-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-400 peer-focus:-translate-y-3 peer-focus:scale-75 peer-focus:text-gray-600";

  return (
    <div>
      <form
        className={cn(
          "flex flex-col gap-6 w-full max-w-[360px] mx-auto mb-6",
          className
        )}
        onSubmit={onClickSignup}
      >
        <div className="relative w-full">
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
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
            value={formData.password}
            onChange={handleChange}
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
            value={formData.confirm_password}
            onChange={handleChange}
            placeholder=" "
            autoComplete="new-password"
            className={inputClasses}
          />
          <Label htmlFor="confirm_password" className={labelClasses}>
            Confirm password
          </Label>
        </div>

        <Button disabled={loading} type="submit" size="lg" className="mt-4">
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
