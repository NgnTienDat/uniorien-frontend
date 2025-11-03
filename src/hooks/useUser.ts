// hooks/useUser.ts
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

    const { data: user, isLoading } = useQuery<User | null>({
        queryKey: ['user'],
        queryFn: () => {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                return JSON.parse(storedUser) as User;
            }
            return null;
        },
        staleTime: Infinity,
        gcTime: Infinity,
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