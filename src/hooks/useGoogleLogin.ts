// hooks/useGoogleLogin.ts - SECURE VERSION
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export function useGoogleLogin() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { isPending, mutate: googleLogin } = useMutation({
    mutationFn: async (code: string) => {
      // ✅ Call Next.js API route, NOT Spring Boot directly
      const response = await fetch('/api/auth/oauth/callback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });

      if (!response.ok) {
        throw new Error('Authentication failed');
      }

      return response.json();
    },

    onSuccess: (data) => {
      // ✅ Token is already stored in HttpOnly cookie by the server
      // ✅ Only store non-sensitive user data in React Query
      queryClient.setQueryData(['user'], data.user);
      
      router.push("/");
      router.refresh(); // Refresh server components
    },

    onError: (err: any) => {
      console.error('Login error:', err);
      alert("Đăng nhập thất bại")
      router.push("/");
    },
  });

  async function getOauthAuthorizationCode(): Promise<string | null> {
    const params = new URLSearchParams(window.location.search);
    return params.get("code");
  }

  async function redirectGoogleLogin(): Promise<void> {
    const callbackUrl = process.env.NEXT_PUBLIC_REDIRECT_URI || "";
    const authUrl = process.env.NEXT_PUBLIC_AUTH_URI;
    const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;

    if (!authUrl || !clientId) {
      console.error("OAuth configuration missing");
      return;
    }

    const targetUrl = `${authUrl}?redirect_uri=${encodeURIComponent(
      callbackUrl
    )}&response_type=code&client_id=${clientId}&scope=openid%20email%20profile`;

    window.location.href = targetUrl;
  }

  return { 
    redirectGoogleLogin, 
    getOauthAuthorizationCode, 
    googleLogin, 
    isPending 
  };
}