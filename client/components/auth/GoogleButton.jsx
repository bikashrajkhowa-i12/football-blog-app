import { useEffect } from "react";

import callApi from "../../api/callApi";
import { useLoader } from "../../context/LoaderContext";
import { useAuth } from "../../context/auth/AuthContext";

const GoogleButton = ({ setError, onClose, toast = () => "" }) => {
  const { startLoading, stopLoading } = useLoader();
  const { login } = useAuth();

  useEffect(() => {
    /* global google */ // only needed if you load the script via index.html
    setError(null);
    try {
      if (!window.google) throw new Error("Google script not loaded");

      google.accounts.id.initialize({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        callback: handleCredentialResponse,
        auto_select: false, //disables auto selects on previous login/signup
      });

      google.accounts.id.renderButton(document.getElementById("googleBtn"), {
        theme: "outline",
        size: "large",
        text: "continue_with",
      });
    } catch (err) {
      setError(err);
    }
  }, [setError]);

  const handleCredentialResponse = async (response) => {
    setError(null);
    startLoading({ type: "global", prompt: "Signing you in...Please wait" });
    try {
      const res = await callApi({
        url: "/auth/google",
        method: "POST",
        data: { credential: response.credential },
      });

      login(res?.data?.user, res?.data?.accessToken);
      toast();
      onClose();
    } catch (error) {
      setError(error);
    } finally {
      stopLoading({ type: "global" });
    }
  };

  return <div id="googleBtn" onClick={() => setError(null)}></div>;
};

export default GoogleButton;
