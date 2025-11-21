"use client";

import Link from "next/link";
import { ArrowRight, Hash } from "lucide-react";

interface MajorListProps {
    majors: string[];
}

export default function MajorList({ majors }: MajorListProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {majors.map((m) => (
                <Link
                    href={`/majors/${encodeURIComponent(m)}`}
                    key={m}
                    className="group relative flex items-start gap-3 p-3.5 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:border-blue-200 hover:shadow-md transition-all duration-200"
                >
                    {/* Icon trang trí nhỏ */}
                    <div className="mt-0.5 min-w-[24px] h-6 flex items-center justify-center rounded text-slate-400 bg-white border border-slate-200 group-hover:text-blue-500 group-hover:border-blue-100 transition-colors">
                        <Hash size={14} />
                    </div>

                    <div className="flex-1">
                        <h4 className="text-sm font-medium text-slate-700 group-hover:text-blue-700 transition-colors line-clamp-2 leading-relaxed">
                            {m}
                        </h4>
                    </div>

                    {/* Arrow icon chỉ hiện khi hover */}
                    <div className="absolute bottom-3 right-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-blue-400">
                        <ArrowRight size={16} />
                    </div>
                </Link>
            ))}
        </div>
    );
}