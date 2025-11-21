"use client";

import * as React from "react";
// Đã khôi phục import Shadcn ScrollArea
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { ChevronRight, GraduationCap } from "lucide-react";

interface University {
    id: string;
    universityCode: string;
    universityName: string;
}

interface UniversityListProps {
    universities: University[];
}

export default function UniversityList({ universities }: UniversityListProps) {
    
    const defaultMaxHeightClass = "h-[500px]"; 
    
    if (!universities || universities.length === 0) {
        return (
            <div 
                className={`flex items-center justify-center rounded-lg border border-slate-200 bg-white shadow-inner p-8 text-slate-500 italic ${defaultMaxHeightClass}`}
            >
                Không tìm thấy trường đại học nào phù hợp.
            </div>
        );
    }

    return (
        // 1. Dùng lại Shadcn ScrollArea với styling mới
        <ScrollArea 
            className={`${defaultMaxHeightClass} rounded-xl border border-slate-200 bg-white shadow-xl p-2`} 
        >
            {/* 2. Nội dung được đặt bên trong ScrollArea */}
            <div className="p-1 space-y-2">
                {universities.map((u) => (
                    // 3. Giữ nguyên Card Style đã cải tiến
                    <Link
                        key={u.id}
                        href={`/benchmarks/${u.universityCode}`}
                        className="group flex flex-col md:flex-row items-start md:items-center justify-between bg-white px-4 py-1
                                   rounded-lg border border-slate-100 transition-all duration-200 cursor-pointer 
                                   shadow-sm hover:shadow-lg hover:border-blue-300 hover:bg-blue-50/70"
                    >
                        {/* LEFT: Tên trường và Mã trường */}
                        <div className="flex items-start gap-3 flex-1 min-w-0">
                            {/* Icon chính */}
                            <div className="mt-0.5 text-blue-500 group-hover:text-blue-600 transition-colors">
                                <GraduationCap size={20} />
                            </div>

                            <div className="min-w-0">
                                <span className="text-base font-semibold text-slate-800 group-hover:text-blue-700 truncate block">
                                    {u.universityName}
                                </span>
                                <span className="text-xs text-slate-500 font-medium">
                                    Mã trường: <span className="font-mono text-slate-600">{u.universityCode}</span>
                                </span>
                            </div>
                        </div>

                        {/* RIGHT: Nút/Link xem chi tiết */}
                        <div className="flex items-center gap-1 mt-2 md:mt-0 text-sm font-medium text-blue-500 group-hover:text-blue-700 transition-all">
                            Xem điểm chuẩn
                            <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                        </div>
                    </Link>
                ))}
            </div>
        </ScrollArea>
    );
}