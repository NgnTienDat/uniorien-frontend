// COMPLETED REFACTORING WITH NEXT.JS BEST PRACTICES 
// NGUYEN TIEN DAT 22-11-2025


import { springEndpoint } from "@/lib/helper";
import { ApiResponse } from "@/types/response";
import { CommentResponse, CommentsPageResponse, University, UniversityDetail } from "@/types/review";

// ============================================
// SERVER-SIDE FUNCTIONS (for Server Components)
// ============================================

/**
 * Fetch university reviews (SERVER-SIDE)
 * Used in Server Component: /reviews/page.tsx
 */
export async function getUniversityReviews(): Promise<University[]> {
  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}${springEndpoint.ALL_UNI_REVIEW_LIST}`,
      {
        next: {
          revalidate: 3600,
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
 * Fetch university comments (SERVER-SIDE)
 * Used in Server Component: /reviews/[id]/page.tsx for initial data
 */
export async function getUniversityComments(
  universityCode: string
): Promise<CommentResponse[]> {
  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}${springEndpoint.ALL_COMMENT(universityCode)}`,
      {
        next: {
          revalidate: 300, // 5 minutes
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
 * Fetch university detail (SERVER-SIDE)
 */
export async function getUniversityDetail(
  universityCode: string
): Promise<UniversityDetail> {
  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}${springEndpoint.UNIVERSITY_DETAIL(universityCode)}`,
      {
        next: {
          revalidate: 3600,
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

// ============================================
// CLIENT-SIDE FUNCTIONS (for Client Components)
// ============================================

/**
 * Fetch university comments (CLIENT-SIDE)
 * Used in Client Components for refreshing comments
 */
export async function fetchUniversityCommentsClient(
  universityCode: string,
  page: number = 0,
  size: number = 10
): Promise<CommentsPageResponse> {
  try {
    const response = await fetch(
      `/api/reviews/${universityCode}/comments?page=${page}&size=${size}&sort=createdAt,desc`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch comments');
    }

    const data: CommentsPageResponse = await response.json();
    return data;

  } catch (error) {
    console.error('Error fetching comments (client):', error);
    throw new Error(
      error instanceof Error
        ? error.message
        : "Failed to fetch comments"
    );
  }
}

/**
 * Add university comment (CLIENT-SIDE)
 * Used in Client Components for authenticated actions
 */
export async function addUniversityCommentClient(
  universityId: string,
  content: string
): Promise<void> {
  try {
    const response = await fetch('/api/reviews/comments', {
      method: "POST",
      headers: { 
        "Content-Type": "application/json" 
      },
      body: JSON.stringify({ universityId, content }),
      credentials: 'include', // Important for cookies
    });

    if (!response.ok) {
      const error = await response.json();
      
      // Special handling for auth errors
      if (response.status === 401) {
        const authError = new Error('Unauthorized') as any;
        authError.status = 401;
        throw authError;
      }
      
      throw new Error(error.message || 'Failed to add comment');
    }

  } catch (error) {
    console.error('Error adding comment (client):', error);
    throw error; // Re-throw to handle in hook
  }
}