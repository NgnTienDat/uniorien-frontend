"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import MajorList from "./MajorList";

interface MajorGroupListProps {
    groups: {
        id: number;
        majorGroupName: string;
        numberOfMajors: number;
        majors: string[];
    }[];
}

export default function MajorGroupList({ groups }: MajorGroupListProps) {
    const [openGroup, setOpenGroup] = useState<number | null>(null);

    const toggleGroup = (id: number) => {
        setOpenGroup((prev) => (prev === id ? null : id));
    };

    return (
        <div className="space-y-1">
            {groups.map((group) => (
                <div
                    key={group.id}
                    className={`border rounded-lg overflow-hidden transition-shadow space-y-1 ${openGroup === group.id
                        ? "shadow-md my-5 border-gray-500 border-3"
                        : "bg-white border-gray-200 hover:shadow-md"
                        }`}
                >

                    <button
                        onClick={() => toggleGroup(group.id)}
                        className={`w-full flex justify-between items-center px-4 py-3 text-left hover:bg-blue-50
                            ${openGroup === group.id ? "mb-3 hover:bg-gray-300 bg-gray-300" : ""}`
                        }
                    >
                        <span className="text-gray-800">{group.majorGroupName}</span>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <span>[{group.majors.length} ngành]</span>
                            {openGroup === group.id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                        </div>
                    </button>

                    {openGroup === group.id && <MajorList majors={group.majors} />}
                </div>
            ))}
        </div>
    );
}
