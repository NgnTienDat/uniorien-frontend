import { useLoginSonner } from "@/hooks/useLoginSonner";
import {
    addUniversityCommentClient,
    fetchUniversityCommentsClient
} from "@/services/reviewServices";
import { CommentResponse } from "@/types/review";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export function useComment(universityCode: string, universityId: string) {
    const router = useRouter();
    const queryClient = useQueryClient();
    const { showLoginRequired } = useLoginSonner();

    // Fetch comments from client-side API route
    const {
        data: comments,
        isLoading,
        isError,
        refetch,
    } = useQuery<CommentResponse[], Error>({
        queryKey: ["comments", universityCode],
        queryFn: () => fetchUniversityCommentsClient(universityCode),
        enabled: !!universityCode,
    });

    // Add comment with proper auth handling
    const {
        mutateAsync: addComment,
        isPending: isAdding,
    } = useMutation({
        mutationFn: (content: string) =>
            addUniversityCommentClient(universityId, content),

        onError: (error: any) => {
            if (error.status === 401) {
                showLoginRequired();
                return;
            }

            console.error("Error adding comment:", error);
            alert(error.message || "Failed to add comment");
        },

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["comments", universityCode],
            });

            toast.success("Comment added successfully!");
        },
    });

    return {
        comments,
        isLoading,
        isError,
        addComment,
        isAdding,
        refetch,
    };
}