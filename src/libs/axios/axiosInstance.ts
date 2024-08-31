import { removeTokens } from "@/utils/authTokenStorage";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");
  config.headers.Authorization = `bearer ${accessToken}`;

  return config;
});

axiosInstance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;
    const refreshToken = localStorage.getItem("refreshToken");
    if (error.response?.status === 401 && refreshToken) {
      let res;
      try {
        res = await axiosInstance.post("auth/refresh-token", {
          refreshToken,
        });
      } catch {
        removeTokens();
        return Promise.reject(error);
      }
      const accessToken: string = res.data.accessToken;
      localStorage.setItem("accessToekn", accessToken);
      return axiosInstance(originalRequest);
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
