// import { AuthProvider } from "./auth/AuthContext";
import { AuthModalProvider } from "./auth/AuthModalContext";
import { LoaderProvider } from "./LoaderContext";
import { ToastProvider } from "./ToastContext";

export const AppProviders = ({ children }) => {
  return (
    <LoaderProvider>
      <ToastProvider>
        {/* <AuthProvider> */}
        <AuthModalProvider>{children}</AuthModalProvider>
        {/* </AuthProvider> */}
      </ToastProvider>
    </LoaderProvider>
  );
};
