import { API_AUTH, NEXT_API, SPRING_API } from "@/lib/axiosConfig";
import { nextEndpoint, springEndpoint } from "@/lib/helper";
import { ApiResponse } from "@/types/response";
import { CommentResponse, University, UniversityDetail } from "@/types/review";
import { AxiosError } from "axios";






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



export async function getUniversityComments(
  universityCode: string
): Promise<CommentResponse[]> {
  try {
    const res = await SPRING_API.get<ApiResponse<CommentResponse[]>>(
      springEndpoint.ALL_COMMENT(universityCode)
    );

    if (res.data.code !== 200) {
      throw new Error(res.data.message || "API returned unsuccessful response");
    }

    return res.data.result;
  } catch (error) {
    const err = error as AxiosError<{ message?: string }>;
    const message =
      err.response?.data?.message ||
      err.message ||
      "Failed to fetch university reviews";
    throw new Error(message);
  }
}

export async function addUniversityComment(
  universityId: string,
  content: string
): Promise<void> {
  try {
    const res = await API_AUTH.post<ApiResponse<null>>(
      springEndpoint.ADD_COMMENT,
      { universityId, content }
    );

    if (res.data.code !== 201) {
      throw new Error(res.data.message || "API returned unsuccessful response");
    }
  } catch (error) {
    const err = error as AxiosError<{ message?: string }>;
    const message =
      err.response?.data?.message ||
      err.message ||
      "Failed to add comment";

    throw new Error(message);
  }
}


export async function getUniversityDetail(
  universityCode: string
): Promise<UniversityDetail> {
  try {
    const res = await SPRING_API.get<ApiResponse<UniversityDetail>>(
      springEndpoint.UNIVERSITY_DETAIL(universityCode)
    );
    if (res.data.code !== 200) {
      throw new Error(res.data.message || "API returned unsuccessful response");
    }
    return res.data.result;
  } catch (error) {
    const err = error as AxiosError<{ message?: string }>;
    const message =
      err.response?.data?.message ||
      err.message ||
      "Failed to fetch university detail";
    throw new Error(message);
  }
}