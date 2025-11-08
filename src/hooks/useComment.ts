import { addUniversityComment, getUniversityComments } from "@/services/reviewServices";
import { CommentResponse } from "@/types/review";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export function useComment(universityCode: string) {
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
        mutationFn: (content: string) => addUniversityComment(content),
        onSuccess: async () => {
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
