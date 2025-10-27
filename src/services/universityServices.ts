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
    try {
        const queryParams = { code, year, admissionMethod };
        const res = await NEXT_API.get<ApiResponse<UniversityAdmissionDetail>>(
            nextEndpoint.UNIVERSITY_BENCHMARKS,
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


// export async function getDetailUniversityAdmission(
//     code: string,
//     year?: string,
//     admissionMethod?: string
// ): Promise<UniversityAdmissionDetail> {
//     try {
//         const queryParams: { year?: string; admissionMethod?: string } = {};
//         if (year) {
//             queryParams.year = year;
//         }
//         if (admissionMethod) {
//             queryParams.admissionMethod = admissionMethod;
//         }
//         const res = await SPRING_API.get<ApiResponse<UniversityAdmissionDetail>>(
//             `/uni/benchmarks/${code}`, { params: queryParams,  }, 
//         );

//         if (res.data.code !== 200) {
//             throw new Error(res.data.message || "Unknown API error");
//         }

//         return res.data.result;
//     } catch (error) {
//         const err = error as AxiosError<{ message?: string }>;
//         const message =
//             err.response?.data?.message ||
//             err.message ||
//             "Failed to fetch university admission details";
//         throw new Error(message);
//     }
// }

// services/universityServices.ts


// export async function getDetailUniversityAdmission(
//     code: string,
//     year?: string,
//     admissionMethod?: string
// ): Promise<UniversityAdmissionDetail> {
//     // Tạo query string
//     const queryParams = new URLSearchParams();
//     if (year) queryParams.append("year", year);
//     if (admissionMethod) queryParams.append("admissionMethod", admissionMethod);

//     // Gọi trực tiếp backend bằng fetch (tận dụng SSR cache)
//     const res = await fetch(
//         `${process.env.BACKEND_URL}/uni/benchmarks/${code}?${queryParams.toString()}`,
//         {
//             next: { revalidate: 3600 }, // Cache 1 giờ
//         }
//     );

//     if (!res.ok) {
//         throw new Error(`Failed to fetch university admission: ${res.statusText}`);
//     }

//     const data: ApiResponse<UniversityAdmissionDetail> = await res.json();

//     if (data.code !== 200) {
//         throw new Error(data.message || "Unknown API error");
//     }

//     return data.result;
// }
