"use client";

import * as React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface University {
    id: number;
    universityCode: string;
    universityName: string;
}

interface UniversityListProps {
    universities: University[];
}

export default function UniversityList({ universities }: UniversityListProps) {
    return (
        <ScrollArea className="h-[400px] rounded-md border p-2">
            <div className="p-2">
                {universities.map((u, idx) => (
                    <React.Fragment key={u.id}>
                        <div className="flex justify-between items-center bg-white p-3 rounded-md
                         hover:bg-blue-50 transition my-1 shadow-sm">
                            <span className="font-medium text-gray-800">
                                {u.universityName}
                            </span>
                            <button className="text-blue-500 hover:underline text-sm cursor-pointer">
                                Xem thông tin tuyển sinh
                            </button>
                        </div>
                    </React.Fragment>
                ))}
            </div>
        </ScrollArea>
    );
}
