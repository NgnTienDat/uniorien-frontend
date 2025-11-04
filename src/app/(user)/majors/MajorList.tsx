"use client";

import Link from "next/link";

interface MajorListProps {
    majors: string[];
}

export default function MajorList({ majors }: MajorListProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 px-5 pb-5">
            {majors.map((m) => (
                <Link
                    href={`/majors/${encodeURIComponent(m)}`}
                    key={m}
                    className="border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-700 bg-gray-50 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 shadow-sm hover:shadow cursor-pointer"
                >
                    {m}
                </Link>
            ))}
        </div>
    );
}
