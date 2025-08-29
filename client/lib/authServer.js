import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { isEmpty } from "lodash";

export const getCurrentUser = async () => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore?.get("accessToken")?.value;

    if (!token) return null;

    const user = jwt.verify(token, process.env.JWT_SECRET);

    if (!user || typeof user !== "object") return null;
    if (!user.id || !user.role || !user.email) return null;

    return {
      id: user.id,
      role: user.role,
      email: user.email,
    };
  } catch (error) {
    console.warn("getCurrentUser failed:", error?.message || error);
    return null;
  }
};

export const checkAdmin = async () => {
  try {
    const user = (await getCurrentUser()) || {};
    return Boolean(!isEmpty(user) && user?.role === "admin");
  } catch (error) {
    console.warn("isAdmin check failed:", error?.message || error);
    return false;
  }
};

export const isAuthenticatedUser = async () => {
  try {
    const user = (await getCurrentUser()) || {};
    if (isEmpty(user) && !user?.role) return false;
    return user.role;
  } catch (error) {
    console.warn("isAuthenticatedUser check failed:", error?.message || error);
    return false;
  }
};
