import { NEXT_API } from "@/lib/axiosConfig";
import { SPRING_API } from "@/lib/axiosConfig";
import { AxiosError } from "axios";

export interface University {
    id: string;
    universityCode: string;
    universityName: string;
    website: string;
}

export interface Benchmark {
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
    success: boolean;
    code: number;
    message: string;
    result: T;
}


export async function getUniversities(): Promise<University[]> {
    try {
        const res = await NEXT_API.get<ApiResponse<University[]>>("/api/universities");

        if (!res.data.success) {
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
    code: string
): Promise<UniversityAdmissionDetail> {
    try {
        const res = await SPRING_API.get<ApiResponse<UniversityAdmissionDetail>>(
            `/uni/benchmarks/${code}`
        );

        if (!res.data.success) {
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
