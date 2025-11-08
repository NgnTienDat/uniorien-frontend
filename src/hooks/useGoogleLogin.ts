"use client";

import { OAuthConfig } from "@/lib/helper";
import { setAccessToken } from "@/lib/token";
import { loginOauth } from "@/services/authServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export function useGoogleLogin() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { isPending, mutate: googleLogin } = useMutation({
    mutationFn: (code: string) => loginOauth(code),

    onSuccess: (data) => {
      if (!data) return;

      console.log("token oauth: ", data);

      setAccessToken(data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      queryClient.setQueryData(['user'], data.user);
      queryClient.setQueryData(['auth'], data);

      router.push("/");
    },

    onError: (err: any) => {
      router.push("/");
      console.error(err);
      //   toast.error(err.response?.data?.message || "Đăng nhập thất bại");
    },
  });

  async function getOauthAuthorizationCode(): Promise<string | null> {
    const hashParams = new URLSearchParams(window.location.search);
    return hashParams.get("code");
  }

  async function redirectGoogleLogin(): Promise<void> {
    try {
      const callbackUrl = OAuthConfig.redirectUri || "";
      const authUrl = OAuthConfig.authUri;
      const googleClientId = OAuthConfig.clientId;

      if (!authUrl || !googleClientId) {
        console.error("OAuth configuration is missing authUri or clientId");
        return;
      }

      const targetUrl = `${authUrl}?redirect_uri=${encodeURIComponent(
        callbackUrl
      )}&response_type=code&client_id=${googleClientId}&scope=openid%20email%20profile`;

      console.log("targetUrl: ", targetUrl);

      window.location.href = targetUrl;
    } catch (err: any) {
      //   toast.error(err.message);
      console.error("Loi dang nhap GG: ", err.message);
    }
  }

  return { redirectGoogleLogin, getOauthAuthorizationCode, googleLogin, isPending };
}

export default useGoogleLogin;
