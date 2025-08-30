import { isAuthenticatedUser } from "@/lib/authServer";
import { AuthProvider } from "./auth/AuthContext";
import { AuthModalProvider } from "./auth/AuthModalContext";
import { LoaderProvider } from "./LoaderContext";
import { ToastProvider } from "./ToastContext";

export const AppProviders = async ({ children }) => {
  const isAuthenticated = (await isAuthenticatedUser()) || false;

  return (
    <LoaderProvider>
      <ToastProvider>
        <AuthProvider initialAuth={isAuthenticated}>
          <AuthModalProvider>{children}</AuthModalProvider>
        </AuthProvider>
      </ToastProvider>
    </LoaderProvider>
  );
};
