import { addUniversityComment, getUniversityComments } from "@/services/reviewServices";
import { CommentResponse } from "@/types/review";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export function useComment(universityCode: string, universityId: string) {
    const router = useRouter();
    const queryClient = useQueryClient();
    console.log("call from useComment");

    // const {
    //     data: comments,
    //     isLoading,
    //     isError,
    //     refetch,
    // } = useQuery<CommentResponse[], Error>({
    //     queryKey: ["comments", universityCode],
    //     queryFn: () => getUniversityComments(universityCode),
    //     enabled: !!universityCode,
    // });

    const {
        mutateAsync: addComment,
        isPending: isAdding,
    } = useMutation({
        mutationFn: (content: string) => addUniversityComment(universityId, content),
        onError: (error: any) => {
            if (error.status === 401) {
                router.push("/login");
            }
            console.error("Error adding comment:", error);
        },
        onSuccess: async () => {
            confirm("Comment added successfully!");
            await queryClient.invalidateQueries({
                queryKey: ["comments", universityCode],
            });
        },
    });

    return {
        // comments,
        // isLoading,
        // isError,
        addComment,
        isAdding,
        // refetch,
    };
}

