const cookieBaseOptions = {
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  path: "/", // explicitly set so clear works reliably
};

const setAuthCookies = (res, refreshToken) => {
  res.cookie("refreshToken", refreshToken, {
    ...cookieBaseOptions,
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  // Non-HttpOnly hint cookie for frontend session check
  res.cookie("session", true, {
    ...cookieBaseOptions,
    httpOnly: false,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
};

const clearAuthCookies = (res) => {
  res.clearCookie("refreshToken", {
    ...cookieBaseOptions,
    httpOnly: true,
  });

  res.clearCookie("session", {
    ...cookieBaseOptions,
    httpOnly: false,
  });
};

module.exports = {
  setAuthCookies,
  clearAuthCookies,
};
