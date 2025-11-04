'use client';

import { useMemo, useState } from "react";

type University = {
    id: string;
    universityCode: string;
    universityName: string;
};

export function useUniversityFilter(universities: University[]) {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredUniversities = useMemo(() => {
        if (!searchTerm.trim()) {
            return universities;
        }

        const normalizedSearch = searchTerm.toLowerCase();

        return universities.filter(university =>
            university.universityCode.toLowerCase().includes(normalizedSearch) ||
            university.universityName.toLowerCase().includes(normalizedSearch)
        );
    }, [universities, searchTerm]);

    return {
        searchTerm,
        setSearchTerm,
        filteredUniversities,
    };
}