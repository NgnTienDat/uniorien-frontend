"use client";

import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function useLoginSonner() {
  const router = useRouter();

  const showLoginRequired = () => {
    toast.info("Bạn chưa đăng nhập", {
      duration: 30000,
      description: "Vui lòng đăng nhập để tiếp tục.",
      descriptionClassName: "text-blue-600",
      action: {
        label: "Đăng nhập",
        onClick: () => router.push("/login"),
      },

      cancel: {
        label: "Hủy",
        onClick: () => { },
      },
    });
  };

  return { showLoginRequired };
}
