import { isAuthenticatedUser } from "@/lib/authServer";
import { AuthProvider } from "./auth/AuthContext";
import { AuthModalProvider } from "./auth/AuthModalContext";
import { LoaderProvider } from "./LoaderContext";

export const AppProviders = async ({ children }) => {
  const isAuthenticated = (await isAuthenticatedUser()) || false;

  return (
    <LoaderProvider>
      <AuthProvider initialAuth={isAuthenticated}>
        <AuthModalProvider>{children}</AuthModalProvider>
      </AuthProvider>
    </LoaderProvider>
  );
};
