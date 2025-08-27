"use client";

import { createContext, useContext, useState } from "react";

const LoaderContext = createContext();

export const LoaderProvider = ({ children }) => {
  const [loaderState, setLoaderState] = useState({
    loading: false,
    prompt: "Loading...",
  });

  const startLoading = ({ prompt = "Loading..." }) => {
    setLoaderState({ loading: true, prompt });
  };

  const stopLoading = () => {
    setLoaderState({ loading: false });
  };

  return (
    <LoaderContext.Provider
      value={{ ...loaderState, startLoading, stopLoading }}
    >
      {children}
    </LoaderContext.Provider>
  );
};

export const useLoader = () => useContext(LoaderContext);
