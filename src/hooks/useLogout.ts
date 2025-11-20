"use client";

import { useRouter } from "next/navigation";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

export function useLogout() {
    const router = useRouter();
    const queryClient = useQueryClient();

    const { mutate: logout, isPending, isError, error } = useMutation({
        mutationFn: async () => {
            await fetch('/api/auth/logout', { method: 'POST' });
        },
        onSuccess: () => {
            queryClient.clear();

            router.push('/');
            router.refresh();
            toast.success("Đăng xuất thành công");
        },
        onError: (err: any) => {
            console.error("Lỗi khi đăng xuất:", err);
            toast.error("Đăng xuất thất bại");
        },
    });

    return { logout, isPending, isError, error };
}

export default useLogout;
