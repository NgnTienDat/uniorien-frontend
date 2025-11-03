import { SPRING_API } from "@/lib/axiosConfig"
import { springEndpoint } from "@/lib/helper"

interface Role {
  roleName: string;
  description: string;
}

interface User {
  id: string;
  fullName: string;
  email: string;
  role: Role;
}

interface OAuthResult {
  authenticated: boolean;
  user: User;
  token: string;
}

interface OAuthResponse {
  code: number;
  message: string;
  result: OAuthResult;
}

/**
 * Gọi API backend để xác thực Google OAuth code và nhận token
 * @param code Authorization code được Google trả về
 */
export async function loginOauth(code: string): Promise<OAuthResult | null> {
  try {
    const res = await SPRING_API.post<OAuthResponse>(
      `${springEndpoint.TOKEN_OUTBOUND}?code=${code}`
    );

    console.log(res.data?.result);

    if (res.data.code === 200 && res.data.result) {
      return res.data.result;
    }

    return null;
  } catch (error: any) {
    console.error("OAuth login error:", error);
    throw new Error(error.response?.data?.message || "Không thể đăng nhập bằng Google");
  }
}