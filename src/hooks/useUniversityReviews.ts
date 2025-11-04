'use client';

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

type University = {
    id: string;
    universityCode: string;
    universityName: string;
    logo?: string | null;
    description?: string | null;
    location?: string | null;
};

const ITEMS_PER_PAGE = 9;

export function useUniversityReviews(initialUniversities: University[]) {
    const [displayCount, setDisplayCount] = useState(ITEMS_PER_PAGE);

    // Cache universities in TanStack Query
    const { data: universities } = useQuery<University[]>({
        queryKey: ['university-reviews'],
        queryFn: () => initialUniversities,
        staleTime: Infinity,
        gcTime: Infinity,
        initialData: initialUniversities,
    });

    const hasMore = displayCount < universities.length;

    const loadMore = () => {
        setDisplayCount(prev => Math.min(prev + ITEMS_PER_PAGE, universities.length));
    };

    const visibleUniversities = universities.slice(0, displayCount);

    return {
        universities: visibleUniversities,
        allUniversities: universities,
        hasMore,
        loadMore,
        totalCount: universities.length,
        displayCount,
    };
}