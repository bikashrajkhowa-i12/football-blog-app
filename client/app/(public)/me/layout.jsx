import { isAuthenticatedUser } from "@/lib/authServer";
import Unauthorized from "../../../components/UnAuthorized";

const ProfileLayout = async ({ children }) => {
  const isAuthenticated = await isAuthenticatedUser();
  return !isAuthenticated ? <Unauthorized></Unauthorized> : <>{children}</>;
};

export default ProfileLayout;
