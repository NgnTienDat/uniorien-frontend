import Cookies from "universal-cookie";

const cookies = new Cookies();

const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";

export const getAccessToken = (): string | undefined => {
    return cookies.get(ACCESS_TOKEN_KEY);
};

export const setAccessToken = (token: string) => {
    cookies.set(ACCESS_TOKEN_KEY, token, {
        path: "/",
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
    });
};

export const removeAccessToken = () => {
    cookies.remove(ACCESS_TOKEN_KEY, { path: "/" });
};

export const getRefreshToken = (): string | undefined => {
    return cookies.get(REFRESH_TOKEN_KEY);
};

export const setRefreshToken = (token: string) => {
    cookies.set(REFRESH_TOKEN_KEY, token, {
        path: "/",
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
    });
};

export const removeRefreshToken = () => {
    cookies.remove(REFRESH_TOKEN_KEY, { path: "/" });
};
