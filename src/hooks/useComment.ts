import { addUniversityComment, getUniversityComments } from "@/services/reviewServices";
import { CommentResponse } from "@/types/review";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export function useComment(universityCode: string, universityId: string) {
    const queryClient = useQueryClient();

    const {
        data: comments,
        isLoading,
        isError,
        refetch,
    } = useQuery<CommentResponse[], Error>({
        queryKey: ["comments", universityCode],
        queryFn: () => getUniversityComments(universityCode),
        enabled: !!universityCode,
    });

    const {
        mutateAsync: addComment,
        isPending: isAdding,
    } = useMutation({
        mutationFn: (content: string) => addUniversityComment(universityId, content),
        onSuccess: async () => {
            confirm("Comment added successfully!");
            await queryClient.invalidateQueries({
                queryKey: ["comments", universityCode],
            });
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

