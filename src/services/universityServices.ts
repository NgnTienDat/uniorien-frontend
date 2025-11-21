// COMPLETED REFACTORING WITH NEXT.JS BEST PRACTICES 
// NGUYEN TIEN DAT 21-11-2025
import { ApiResponse } from "@/types/response";

export interface University {
  id: string;
  universityCode: string;
  universityName: string;
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




// ============================================
// SERVER-SIDE FUNCTIONS (for Server Components)
// ============================================

/**
 * Fetch universities directly from Spring Boot
 * Used in Server Components
 */

export async function getUniversities(): Promise<University[]> {
  try {
    console.log("process.env.BACKEND_URL:", process.env.BACKEND_URL);

    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/uni/`,
      {
        // Next.js caching options
        next: {
          revalidate: 3600, // Revalidate every hour
          tags: ['universities'] // Tag for on-demand revalidation
        },
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch universities: ${response.statusText}`);
    }

    const data: ApiResponse<University[]> = await response.json();

    if (data.code !== 200) {
      throw new Error(data.message || "API returned unsuccessful response");
    }

    return data.result;

  } catch (error) {
    console.error('Error fetching universities:', error);
    throw new Error(
      error instanceof Error
        ? error.message
        : "Failed to fetch universities"
    );
  }
}

/**
 * Fetch university admission details from Spring Boot (SERVER-SIDE)
 * Used in Server Components for initial page load
 */
export async function getUniversityAdmissionDetails(
  code: string,
  year?: string,
  admissionMethod?: string
): Promise<UniversityAdmissionDetail> {
  try {
    // Build query params
    const params = new URLSearchParams();
    if (year) params.append('year', year);
    if (admissionMethod) params.append('admissionMethod', admissionMethod);

    const queryString = params.toString();
    const url = `${process.env.BACKEND_URL}/api/v1/uni/benchmarks/${code}${queryString ? `?${queryString}` : ''}`;

    const response = await fetch(url, {
      next: {
        revalidate: 86400, // Revalidate once per day
        tags: ['admissions', `admission-${code}`]
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch admission details: ${response.statusText}`);
    }

    const data: ApiResponse<UniversityAdmissionDetail> = await response.json();

    if (data.code !== 200) {
      throw new Error(data.message || "Failed to fetch admission details");
    }

    return data.result;
  } catch (error) {
    console.error('Error fetching admission details:', error);
    throw new Error(
      error instanceof Error
        ? error.message
        : "Failed to fetch university admission details"
    );
  }
}



// ============================================
// CLIENT-SIDE FUNCTIONS (for Client Components)
// ============================================

/**
 * Fetch university admission details via Next.js API Route (CLIENT-SIDE)
 * Used in Client Components for dynamic data loading
 */
export async function fetchAdmissionDetailsClient(
  code: string,
  year?: string,
  admissionMethod?: string
): Promise<UniversityAdmissionDetail> {
  try {
    // Build query params
    const params = new URLSearchParams();
    if (year) params.append('year', year);
    if (admissionMethod) params.append('admissionMethod', admissionMethod);

    const queryString = params.toString();
    const url = `/api/universities/${code}/admissions${queryString ? `?${queryString}` : ''}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch admission details');
    }

    const data: UniversityAdmissionDetail = await response.json();
    return data;

  } catch (error) {
    console.error('Error fetching admission details (client):', error);
    throw new Error(
      error instanceof Error
        ? error.message
        : "Failed to fetch university admission details"
    );
  }
}