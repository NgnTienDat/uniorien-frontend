"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import MajorList from "./MajorList";

interface MajorGroupListProps {
    groups: {
        id: number;
        name: string;
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
                <div key={group.id} className="bg-white border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                    <button
                        onClick={() => toggleGroup(group.id)}
                        className="w-full flex justify-between items-center px-4 py-3 text-left hover:bg-gray-100"
                    >
                        <span className="text-gray-700">{group.name}</span>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
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
