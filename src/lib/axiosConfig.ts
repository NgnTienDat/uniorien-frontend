import axios from "axios";
import {
    getAccessToken,
    getRefreshToken,
    setAccessToken,
    removeAccessToken,
    removeRefreshToken,
} from "@/lib/token";
import { BASE_URL } from "@/lib/constant";





export const SPRING_API = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});


export const NEXT_API = axios.create({
    baseURL: process.env.NEXT_PUBLIC_FRONTEND_URL,
    headers: {
        "x-internal-key": process.env.INTERNAL_SECRET_KEY!,
    },
});


export const API_AUTH = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});



// Request Interceptor: thêm token vào header
API_AUTH.interceptors.request.use(
    (config) => {
        const token = getAccessToken();
        if (token) config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    (error) => Promise.reject(error)
);

// Response Interceptor: tự refresh token nếu bị 401
API_AUTH.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        const status = error?.response?.status;

        if (status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const refreshToken = getRefreshToken();

            if (!refreshToken) {
                removeAccessToken();
                removeRefreshToken();
                return Promise.reject(error);
            }

            try {
                const res = await axios.post(
                    `${process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080/api"}/auth/refresh`,
                    { refreshToken }
                );

                const newAccessToken = res.data?.data?.accessToken;
                if (newAccessToken) {
                    setAccessToken(newAccessToken);
                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                    return API_AUTH(originalRequest); // Retry request
                }
            } catch (refreshError) {
                removeAccessToken();
                removeRefreshToken();
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

