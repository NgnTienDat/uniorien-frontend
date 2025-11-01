import { NEXT_API, SPRING_API } from "@/lib/axiosConfig";
import { nextEndpoint, springEndpoint } from "@/lib/helper";
import { AxiosError } from "axios";
import next from "next";

export interface Score {
  year: number;
  score: number;
  subjectCombinations: string;
}

export interface MajorDetail {
  majorName: string;
  subjectCombinations: string;
  scores: Score[];
}

export interface MajorSearchItem {
  universityName: string;
  majorDetails: MajorDetail[];
}




interface ApiResponse<T> {
    code: number;
    message: string;
    result: T;
}

export async function getMajorGroups() {
    const res = await NEXT_API.get(nextEndpoint.MAJOR_LIST);

    if (res.status !== 200) {
        throw new Error(`Failed to fetch major groups: ${res.status}`);
    }

    return res.data.result;
}



export async function getMajorRelatedMajorSearching(
    majorName: string,
    admissionMethod?: string,
    location?: string,
): Promise<MajorSearchItem[]> {
    const isServer = typeof window === "undefined";


    try {
        const queryParams = { majorName, admissionMethod, location };

        const res = await SPRING_API.get<ApiResponse<MajorSearchItem[]>>(
            springEndpoint.MAJORS_SEARCH,
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