import { useLoginSonner } from "@/hooks/useLoginSonner";
import {
    addUniversityCommentClient,
    fetchUniversityCommentsClient
} from "@/services/reviewServices";
import { CommentsPageResponse } from "@/types/review";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-toastify";

export function useComment(universityCode: string, universityId: string) {
    const queryClient = useQueryClient();
    const { showLoginRequired } = useLoginSonner();
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize] = useState(10);

    // Fetch comments with pagination
    const {
        data: pageData,
        isLoading,
        isError,
        refetch,
    } = useQuery<CommentsPageResponse, Error>({
        queryKey: ["comments", universityCode, currentPage, pageSize],
        queryFn: () => fetchUniversityCommentsClient(universityCode, currentPage, pageSize),
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
            // Reset to first page after adding comment
            setCurrentPage(0);
            queryClient.invalidateQueries({
                queryKey: ["comments", universityCode],
            });

            toast.success("Comment added successfully!");
        },
    });

    return {
        comments: pageData?.content || [],
        pageData,
        currentPage,
        setCurrentPage,
        isLoading,
        isError,
        addComment,
        isAdding,
        refetch,
    };
}