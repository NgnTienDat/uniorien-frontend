import { API_AUTH, SPRING_API } from "@/lib/axiosConfig"
import { springEndpoint } from "@/lib/helper"
import { getAccessToken } from "@/lib/token";

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

export async function logoutApi(): Promise<void> {
  try {
    await API_AUTH.post(`${springEndpoint.LOGOUT}`, {
      token: getAccessToken(),
    });  
  } catch (error: any) {
    console.error("Logout API error:", error);
    throw new Error(error.response?.data?.message || "Không thể đăng xuất");
  }
}


export async function getCurrentUser(token: string): Promise<User | null> {
  try {
    const res = await API_AUTH.get<{ code: number; message: string; result: User }>(
      springEndpoint.MY_INFO);
    if (res.data.code === 200 && res.data.result) {
      return res.data.result;
    }
    return null;
  } catch (error: any) {
    console.error("Get current user error:", error);
    throw new Error(error.response?.data?.message || "Không thể lấy thông tin người dùng");
  }
}

