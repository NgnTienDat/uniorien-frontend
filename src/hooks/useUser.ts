// hooks/useUser.ts - FIXED VERSION
"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";

interface Role {
    roleName: string;
    description: string;
}

interface User {
    id: string;
    fullName: string;
    email: string;
    role: Role;
}

export function useUser() {
    const queryClient = useQueryClient();

    const { data: user, isLoading, isError } = useQuery<User | null>({
        queryKey: ['user'],
        queryFn: async () => {
            // ✅ Fetch from server (verifies HttpOnly cookie)
            const response = await fetch('/api/me', {
                credentials: 'include', // Send cookies
            });

            if (!response.ok) {
                return null;
            }

            const data = await response.json();
            return data.user || null;
        },
        staleTime: 5 * 60 * 1000, // 5 minutes
        retry: 1,
    });

    const isAuthenticated = !!user;
    const isAdmin = user?.role.roleName === 'ADMIN';

    return {
        user,
        isLoading,
        isAuthenticated,
        isAdmin,
    };
}