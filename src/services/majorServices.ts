// COMPLETED REFACTORING WITH NEXT.JS BEST PRACTICES 
// NGUYEN TIEN DAT 21-11-2025

import { MajorGroup, MajorSearchItem } from "@/types/major";
import { ApiResponse } from "@/types/response";


// ============================================
// SERVER-SIDE FUNCTIONS (for Server Components)
// ============================================

/**
 * Fetch major groups directly from Spring Boot
 * Used in Server Component: /majors/page.tsx
 */
export async function getMajorGroups(): Promise<MajorGroup[]> {
    try {
        const response = await fetch(
            `${process.env.BACKEND_URL}/api/v1/majors/major-groups`,
            {
                next: {
                    revalidate: 3600, // Cache for 1 hour
                    tags: ['major-groups']
                },
            }
        );

        if (!response.ok) {
            throw new Error(`Failed to fetch major groups: ${response.statusText}`);
        }

        const data: ApiResponse<MajorGroup[]> = await response.json();

        if (data.code !== 200) {
            throw new Error(data.message || "Failed to fetch major groups");
        }

        return data.result;

    } catch (error) {
        console.error('Error fetching major groups:', error);
        throw new Error(
            error instanceof Error
                ? error.message
                : "Failed to fetch major groups"
        );
    }
}


export async function searchMajorsByName(
    majorName: string,
    admissionMethod?: string,
    location?: string
): Promise<MajorSearchItem[]> {
    try {
        const params = new URLSearchParams();
        params.append('majorName', majorName);
        if (admissionMethod) params.append('admissionMethod', admissionMethod);
        if (location) params.append('location', location);

        const queryString = params.toString();
        const url = `${process.env.BACKEND_URL}/api/v1/majors/filter?${queryString}`;

        const response = await fetch(url, {
            next: {
                revalidate: 1800, // Cache for 30 minutes (majors change less frequently)
                tags: ['majors', `major-${majorName}`]
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to search majors: ${response.statusText}`);
        }

        const data: ApiResponse<MajorSearchItem[]> = await response.json();

        if (data.code !== 200) {
            throw new Error(data.message || "Failed to search majors");
        }

        return data.result;

    } catch (error) {
        console.error('Error searching majors:', error);
        throw new Error(
            error instanceof Error
                ? error.message
                : "Failed to search majors"
        );
    }
}