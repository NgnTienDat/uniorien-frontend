"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Layers } from "lucide-react";
import MajorList from "./MajorList";

interface MajorGroupListProps {
    groups: {
        id: number;
        majorGroupName: string;
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
            {groups.map((group) => {
                const isOpen = openGroup === group.id;
                return (
                    <div
                        key={group.id}
                        className={`border rounded-md bg-white shadow-sm transition-all duration-300 ${isOpen ? "ring-1 ring-blue-300 shadow-md" : "hover:shadow-md"
                            }`}
                    >
                        <button
                            onClick={() => toggleGroup(group.id)}
                            className={`w-full flex justify-between items-center px-5 py-3 text-left rounded-t-md transition-colors duration-200
                                 ${isOpen ? "bg-blue-50 mb-3" : "hover:bg-gray-50 hover:rounded-md"
                                }`}
                        >
                            <div className="flex items-center gap-2">
                                <Layers className={`w-5 h-5 ${isOpen ? "text-blue-500" : "text-gray-500"}`} />
                                <span
                                    className={`font-medium ${isOpen ? "text-blue-600" : "text-blue-800"
                                        }`}
                                >
                                    {group.majorGroupName}
                                </span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-blue-500">
                                <span>({group.majors.length} ngành)</span>
                                {isOpen ? (
                                    <ChevronUp size={18} className="text-blue-500" />
                                ) : (
                                    <ChevronDown size={18} />
                                )}
                            </div>
                        </button>

                        {/* Danh sách ngành */}
                        <div
                            className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
                                }`}
                        >
                            <MajorList majors={group.majors} />
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
