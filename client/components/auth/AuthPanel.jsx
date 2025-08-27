"use client";

import React from "react";

import { useAuthModal } from "@/contexts/auth/AuthModalContext";

import Login from "./Login";
import Signup from "./Signup";
import ForgotPassword from "./ForgotPassword";

const AuthPanel = () => {
  const { modalType } = useAuthModal();

  const mapComp = {
    login: Login,
    signup: Signup,
    forgot_password: ForgotPassword,
  };

  const DisplayComp = mapComp[modalType];

  return DisplayComp ? <DisplayComp /> : <></>;
};

export default AuthPanel;
