"use client";

import React, { createContext, useContext, useState } from "react";

const AuthModalContext = createContext();

export const AuthModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState(null); //login, signup, forgot_password

  const openModal = (type) => {
    setIsOpen(true);
    setModalType(type);
  };

  return (
    <AuthModalContext.Provider
      value={{ isOpen, modalType, openModal, setIsOpen }}
    >
      {children}
    </AuthModalContext.Provider>
  );
};

export const useAuthModal = () => useContext(AuthModalContext);
