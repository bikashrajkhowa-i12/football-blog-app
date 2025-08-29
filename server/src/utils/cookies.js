const cookieBaseOptions = {
  path: "/", // explicit path so clear works
  secure: process.env.NODE_ENV === "production", // HTTPS only in prod
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // cross-site in prod
  domain:
    process.env.NODE_ENV === "production"
      ? process.env.COOKIE_DOMAIN // e.g. ".your-frontend.com"
      : "localhost",
};

const setAuthCookies = (res, accessToken, refreshToken) => {
  // HttpOnly access token
  res.cookie("accessToken", accessToken, {
    ...cookieBaseOptions,
    httpOnly: true,
    maxAge: 15 * 60 * 1000, // 15 min
  });

  // HttpOnly refresh token
  res.cookie("refreshToken", refreshToken, {
    ...cookieBaseOptions,
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  // Non-httpOnly session hint for frontend
  res.cookie("session", true, {
    ...cookieBaseOptions,
    httpOnly: false,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
};

const clearAuthCookies = (res) => {
  res.clearCookie("accessToken", {
    ...cookieBaseOptions,
    httpOnly: true,
  });

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
