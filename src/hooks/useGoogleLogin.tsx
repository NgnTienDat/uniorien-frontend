"use client";

import { OAuthConfig } from "@/lib/helper";
import { setAccessToken } from "@/lib/token";
import { loginOauth } from "@/services/authServices";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";


export function useGoogleLogin() {
  const router = useRouter();

  const { isPending, mutate: googleLogin } = useMutation({
    mutationFn: (code: string) => loginOauth(code),
    onSuccess: (user: any) => {
      console.log("token oauth: ", user);
      setAccessToken(user.token);
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


      console.log("callback url: ", callbackUrl)
      console.log("callback url: ", authUrl)
      console.log("callback url: ", googleClientId)

       if (!authUrl || !googleClientId) {
        console.error("OAuth configuration is missing authUri or clientId");
        return;
      }

      const targetUrl = `${authUrl}?redirect_uri=${encodeURIComponent(
        callbackUrl
      )}&response_type=code&client_id=${googleClientId}&scope=openid%20email%20profile`;

      console.log("targetUrl: ", targetUrl)

      window.location.href = targetUrl;
    } catch (err: any) {
    //   toast.error(err.message);
        console.error("Loi dang nhap GG: ", err.message)
    }
  }

  return { redirectGoogleLogin, getOauthAuthorizationCode, googleLogin, isPending };
}

export default useGoogleLogin;
// export function useGoogleLogin() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const queryClient = useQueryClient();

//   const { isPending, mutate: googleLogin } = useMutation<
//     { token: string },
//     Error,
//     string
//   >({
//     mutationFn: async (code: string) => {
//       const response = await loginOauth(code);
//       if (!response) throw new Error('Login failed');
//       return response;
//     },
//     onSuccess: (user: { token: string }) => {
//       console.log("token oauth:", user);
//       setAccessToken(user.token);
//       router.push("/"); 
//     },
//     onError: (err: any) => {
//       router.push("/auth/login");
//       console.error(err);
//     },
//   });

//   // Lấy mã "code" từ URL callback (sử dụng useSearchParams)
//   function getOauthAuthorizationCode(): string | null {
//     const code = searchParams.get("code");
//     console.log("OAuth code:", code);
//     return code;
//   }

//   function redirectGoogleLogin(): void {
//     try {
//       const callbackUrl = OAuthConfig.redirectUri ?? "";
//       const authUrl = OAuthConfig.authUri ?? "";
//       const googleClientId = OAuthConfig.clientId ?? "";

//       if (!authUrl || !googleClientId) {
//         console.error("OAuth configuration is missing authUri or clientId");
//         return;
//       }

//       const targetUrl = `${authUrl}?redirect_uri=${encodeURIComponent(
//         callbackUrl
//       )}&response_type=code&client_id=${googleClientId}&scope=openid%20email%20profile`;

//       console.log("Redirecting to:", targetUrl);
//       window.location.href = targetUrl;
//     } catch (err: any) {
//       console.error(err.message ?? "Không thể khởi tạo đăng nhập Google");
//     }
//   }

//   return { redirectGoogleLogin, getOauthAuthorizationCode, googleLogin, isPending };
// }
