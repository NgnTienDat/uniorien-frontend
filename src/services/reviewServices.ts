import { NEXT_API, SPRING_API } from "@/lib/axiosConfig";
import { nextEndpoint, springEndpoint } from "@/lib/helper";
import { AxiosError } from "axios";

export interface University {
  id: string;
  universityCode: string;
  universityName: string;
  logo: string;
  description: string;
  location: string;
}



interface ApiResponse<T> {
  code: number;
  message: string;
  result: T;
}


export async function getUniversityReviews(): Promise<University[]> {
  try {
    const res = await NEXT_API.get<ApiResponse<University[]>>(nextEndpoint.ALL_UNI_REVIEW_LIST);

    if (res.data.code !== 200) {
      throw new Error(res.data.message || "API returned unsuccessful response");
    }


    return res.data.result;
  } catch (error) {
    const err = error as AxiosError<{ message?: string }>;
    const message =
      err.response?.data?.message ||
      err.message ||
      "Failed to fetch universities";
    throw new Error(message);
  }
}


