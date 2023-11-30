import refreshToken from "./refreshToken";
import { userInfo } from "./auth";
import axios from "axios";

const axiosPrivate = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

axiosPrivate.interceptors.request.use(
  (config) => {
    if (!config.headers["Authorization"]) {
      config.headers["Authorization"] = `Bearer ${userInfo?.accessToken}`;
      return config;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosPrivate.interceptors.response.use(
  (response) => response,
  async (error) => {
    const prevRequest = error?.config;
    if (error?.response.status === 403 && !prevRequest.sent) {
      prevRequest.sent = true;
      const newAccessToken = await refreshToken();
      prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
      return axiosPrivate(prevRequest);
    }
    return Promise.reject(error);
  }
);

export default axiosPrivate;
