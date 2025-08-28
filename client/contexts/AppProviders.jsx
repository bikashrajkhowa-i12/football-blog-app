import { AuthProvider } from "./auth/AuthContext";
import { AuthModalProvider } from "./auth/AuthModalContext";
import { LoaderProvider } from "./LoaderContext";
import { ToastProvider } from "./ToastContext";

export const AppProviders = ({ children }) => {
  return (
    <LoaderProvider>
      <ToastProvider>
        <AuthModalProvider>
          <AuthProvider>{children}</AuthProvider>
        </AuthModalProvider>
      </ToastProvider>
    </LoaderProvider>
  );
};
