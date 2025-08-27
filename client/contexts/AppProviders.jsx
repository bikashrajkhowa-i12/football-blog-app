import { AuthModalProvider } from "./auth/AuthModalContext";

export const AppProviders = ({ children }) => {
  return <AuthModalProvider>{children}</AuthModalProvider>;
};
