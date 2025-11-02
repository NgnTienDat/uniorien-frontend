import { SPRING_API } from "@/lib/axiosConfig"
import { springEndpoint } from "@/lib/helper"


interface OAuthUserResponse {
  token: string;
  [key: string]: any; // các trường phụ khác, nếu có
}

/**
 * Gọi API backend để xác thực Google OAuth code và nhận token
 * @param code Authorization code được Google trả về
 */
export async function loginOauth(code: string): Promise<OAuthUserResponse | null> {
  try {
    const res = await SPRING_API.post(`${springEndpoint.TOKEN_OUTBOUND}?code=${code}`);
    console.log(res.data?.result)
    return res.data?.result || null;
  } catch (error: any) {
    console.error("OAuth login error:", error);
    throw new Error(error.response?.data?.message || "Không thể đăng nhập bằng Google");
  }
}