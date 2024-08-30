import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

axiosInstance.interceptors.response.use(res => res, async (error) => {
  const originalRequest = error.config;
  if(error.response?.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;
    await axiosInstance.post("auth/refresh-token", null);
    return axiosInstance(originalRequest);
  }

  return Promise.reject(error);
})

export default axiosInstance;
