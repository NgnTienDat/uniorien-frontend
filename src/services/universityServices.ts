import { NEXT_API, SPRING_API } from "@/lib/axiosConfig";
import { nextEndpoint, springEndpoint } from "@/lib/helper";
import { AxiosError } from "axios";

export interface University {
  id: string;
  universityCode: string;
  universityName: string;
  website: string;
}

export interface Benchmark {
  majorCode: string;
  score: number;
  note: string;
  subjectCombinations: string;
  major: string;
}

export interface Admission {
  admissionMethod: string;
  admissionYear: string;
  benchmarkList: Benchmark[];
}

export interface UniversityAdmissionDetail {
  universityCode: string;
  universityName: string;
  website: string;
  admissionList: Admission[];
}

interface ApiResponse<T> {
  code: number;
  message: string;
  result: T;
}


export async function getUniversities(): Promise<University[]> {
  try {
    const res = await NEXT_API.get<ApiResponse<University[]>>(nextEndpoint.UNIVERSITY_LIST);

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



export async function getDetailUniversityAdmission(
  code: string,
  year?: string,
  admissionMethod?: string
): Promise<UniversityAdmissionDetail> {
  const isServer = typeof window === "undefined";

  console.log("isServer:", isServer);
  console.log("Fetching admission details for:", { code, year, admissionMethod });

  try {
    const queryParams = { code, year, admissionMethod };
    const api = isServer ? NEXT_API : SPRING_API;

    const res = await api.get<ApiResponse<UniversityAdmissionDetail>>(
      isServer ? nextEndpoint.UNIVERSITY_BENCHMARKS : `${springEndpoint.UNIVERSITY_BENCHMARKS}${code}`,
      { params: queryParams }
    );

    if (res.data.code !== 200) {
      throw new Error(res.data.message || "Unknown API error");
    }

    

    return res.data.result;
  } catch (error) {
    const err = error as AxiosError<{ message?: string }>;
    const message =
      err.response?.data?.message ||
      err.message ||
      "Failed to fetch university admission details";
    throw new Error(message);
  }
}

