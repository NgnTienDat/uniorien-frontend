import { API_AUTH, NEXT_API, SPRING_API } from "@/lib/axiosConfig";
import { nextEndpoint, springEndpoint } from "@/lib/helper";
import { ApiResponse } from "@/types/response";
import { CommentResponse, University, UniversityDetail } from "@/types/review";
import { AxiosError } from "axios";
import { toast } from "react-toastify";



// ============================================
// SERVER-SIDE FUNCTIONS (for Server Components)
// ============================================

/**
 * Fetch major groups directly from Spring Boot
 * Used in Server Component: /majors/page.tsx
 */


export async function getUniversityReviews(): Promise<University[]> {
  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}${springEndpoint.ALL_UNI_REVIEW_LIST}`,
      {
        next: {
          revalidate: 3600, // Cache for 1 hour
          tags: ['university-reviews']
        },
      }
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch university reviews: ${response.statusText}`);
    }
    const data: ApiResponse<University[]> = await response.json();
    if (data.code !== 200) {
      throw new Error(data.message || "Failed to fetch university reviews");
    }
    return data.result;
  } catch (error) {
    console.error('Error fetching university reviews:', error);
    throw new Error(
      error instanceof Error
        ? error.message
        : "Failed to fetch university reviews"
    );
  }
}

/**
 * Fetch major groups directly from Spring Boot
 * Used in Server Component: /majors/page.tsx
 */

export async function getUniversityComments(
  universityCode: string
): Promise<CommentResponse[]> {
  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}${springEndpoint.ALL_COMMENT(universityCode)}`,
      {
        next: {
          revalidate: 300, // Cache for 5 minutes
          tags: ['university-comments', `comments-${universityCode}`]
        },
      }
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch university comments: ${response.statusText}`);
    }
    const data: ApiResponse<CommentResponse[]> = await response.json();
    if (data.code !== 200) {
      throw new Error(data.message || "Failed to fetch university comments");
    }
    return data.result;
  } catch (error) {
    console.error('Error fetching university comments:', error);
    throw new Error(
      error instanceof Error
        ? error.message
        : "Failed to fetch university comments"
    );
  }

}


/**
 * Fetch major groups directly from Spring Boot
 * Used in Server Component: /majors/page.tsx
 */


export async function addUniversityComment(
  universityId: string,
  content: string
): Promise<void> {
  try {
    const response = await fetch('/api/reviews', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ universityId, content }),
    });

    if (!response.ok) {
      const error = new Error(response.statusText) as any;
      error.status = response.status;
      throw error;
    }
  } catch (error) {
    console.error('Error adding university comment:', error);
    throw new Error(
      error instanceof Error
        ? error.message
        : "Failed to add comment"
    );
  }
}


/**
 * Fetch major groups directly from Spring Boot
 * Used in Server Component: /majors/page.tsx
 */

export async function getUniversityDetail(
  universityCode: string
): Promise<UniversityDetail> {
  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}${springEndpoint.UNIVERSITY_DETAIL(universityCode)}`,
      {
        next: {
          revalidate: 3600, // Cache for 1 hour
          tags: ['university-detail', `university-${universityCode}`]
        },
      }
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch university detail: ${response.statusText}`);
    }
    const data: ApiResponse<UniversityDetail> = await response.json();
    if (data.code !== 200) {
      throw new Error(data.message || "Failed to fetch university detail");
    }
    return data.result;
  } catch (error) {
    console.error('Error fetching university detail:', error);
    throw new Error(
      error instanceof Error
        ? error.message
        : "Failed to fetch university detail"
    );
  }

}