"use client";

import { useState } from "react";
import { ChevronDown, Layers, FolderOpen, Folder } from "lucide-react";
import MajorList from "./MajorList";
import { MajorGroup } from "@/types/major";

interface MajorGroupListProps {
    groups: MajorGroup[];
}

export default function MajorGroupList({ groups }: MajorGroupListProps) {
    const [openGroup, setOpenGroup] = useState<number | null>(null);

    const toggleGroup = (id: number) => {
        setOpenGroup((prev) => (prev === id ? null : id));
    };

    return (
        <div className="space-y-2 max-w-5xl mx-auto">
            {groups.map((group) => {
                const isOpen = openGroup === group.id;
                return (
                    <div
                        key={group.id}
                        className={`group border rounded-xl bg-white transition-all duration-300 overflow-hidden ${isOpen
                                ? "border-blue-200 shadow-lg shadow-blue-100/50"
                                : "border-slate-200 hover:border-blue-300 hover:shadow-md"
                            }`}
                    >
                        <button
                            onClick={() => toggleGroup(group.id)}
                            className={`w-full flex justify-between items-center p-3 text-left transition-colors duration-200 ${isOpen ? "bg-blue-50/50" : "bg-white hover:bg-slate-50"
                                }`}
                        >
                            <div className="flex items-center gap-4">
                                {/* Icon Box */}
                                <div className={`p-2.5 rounded-lg transition-colors ${isOpen ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-500 group-hover:bg-blue-100 group-hover:text-blue-600"
                                    }`}>
                                    {isOpen ? <FolderOpen size={20} /> : <Folder size={20} />}
                                </div>

                                <div>
                                    <span className={`text-md font-semibold block ${isOpen ? "text-blue-900" : "text-slate-700 group-hover:text-blue-800"
                                        }`}>
                                        {group.majorGroupName}
                                    </span>
                                    <span className="text-xs text-slate-400 font-medium mt-0.5 block">
                                        Mã nhóm: {group.id}
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${isOpen
                                        ? "bg-blue-100 text-blue-700 border-blue-200"
                                        : "bg-slate-100 text-slate-600 border-slate-200"
                                    }`}>
                                    {group.majors.length} ngành
                                </span>
                                <ChevronDown
                                    size={20}
                                    className={`text-slate-400 transition-transform duration-200 ${isOpen ? "rotate-180 text-blue-600" : ""}`}
                                />
                            </div>
                        </button>

                        {/* Nội dung accordion (Sử dụng CSS Grid trick để animate height auto) */}
                        <div
                            className={`overflow-hidden transition-[max-height,opacity] duration-150 ease-out ${isOpen
                                    ? "max-h-[800px] opacity-100"
                                    : "max-h-0 opacity-0"
                                }`}
                        >
                            <div className="p-5 pt-0 border-t border-blue-100/50">
                                <div className="mt-5">
                                    <MajorList majors={group.majors} />
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}