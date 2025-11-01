"use client";

import { removeVietnameseTones } from "@/lib/utils";
import Link from "next/link";

interface MajorListProps {
    majors: string[];
}

export default function MajorList({ majors }: MajorListProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 px-4 pb-4">
            {majors.map((m) => (
                <Link
                    href={`/majors/${encodeURIComponent(m)}`}
                    key={m}
                    className="border rounded-md px-3 py-2 bg-white text-gray-700 text-sm hover:bg-blue-50 cursor-pointer"
                >
                    {m}
                </Link>
            ))}
        </div>
    );
}
