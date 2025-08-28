import axios from "axios";

// In raw JS-memory access token (lost on page reload)
let accessToken = null,
  onAuthUpdate = null;

export const setAuthHandler = (callback) => {
  onAuthUpdate = callback;
};

export const setAccessToken = (token) => {
  accessToken = token;
};

const apiClient = axios.create({
  baseURL: "/api",
  headers: { "Content-Type": "application/json" },
  withCredentials: true, // allows sending refresh token cookie
});

// Request interceptor → attach access token if present
apiClient.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// Response interceptor → handle expired access token
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/auth/refresh")
    ) {
      originalRequest._retry = true;

      try {
        const refreshResponse = await axios.post(
          "/api/auth/refresh",
          {},
          { withCredentials: true }
        );

        const newAccessToken = refreshResponse.data?.accessToken;
        if (newAccessToken) {
          setAccessToken(newAccessToken);
          if (onAuthUpdate) onAuthUpdate(refreshResponse.data);
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return apiClient(originalRequest);
        }
      } catch (refreshError) {
        console.error("Refresh token failed:", refreshError);
        if (onAuthUpdate) onAuthUpdate(null); //logout in case of refreshToken failure
      }
    }

    return Promise.reject(error);
  }
);

const callApi = async ({ method = "GET", url, data = {}, params, headers }) => {
  try {
    const response = await apiClient({
      method,
      url,
      data,
      params,
      headers,
    });
    return {
      data: response.data,
      status: response.status,
      headers: response.headers,
    };
  } catch (error) {
    const message =
      error.response?.data?.message || error.message || "API Error";
    throw new Error(message);
  }
};

export default callApi;
