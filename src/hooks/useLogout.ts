"use client";

import { useRouter } from "next/navigation";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { removeAccessToken } from "@/lib/token";
import { logoutApi } from "@/services/authServices";

export function useLogout() {
    const router = useRouter();
    const queryClient = useQueryClient();

    const { mutate: logout, isPending, isError, error } = useMutation({
        mutationFn: logoutApi,
        onSuccess: () => {
            removeAccessToken();
            localStorage.removeItem("user");

            queryClient.removeQueries({ queryKey: ["user"] });
            queryClient.removeQueries({ queryKey: ["auth"] });

            router.push("/");
        },
        onError: (err: any) => {
            console.error("Lỗi khi đăng xuất:", err);
            // toast.error(err.message);
        },
    });

    return { logout, isPending, isError, error };
}

export default useLogout;
