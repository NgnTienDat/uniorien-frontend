"use client";

import React from "react";

interface Benchmark {
    majorCode: string;
    major: string;
    subjectCombinations: string;
    score: number;
    note?: string;
}

interface AdmissionTableProps {
    benchmarkList: Benchmark[];
}

export default function AdmissionTable({ benchmarkList }: AdmissionTableProps) {
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-slate-50 text-slate-500 text-xs font-semibold uppercase tracking-wider border-b border-slate-200">
                        <th className="px-4 py-3 w-12 text-center">STT</th>
                        <th className="px-4 py-3 w-32">Mã ngành</th>
                        <th className="px-4 py-3 min-w-[200px]">Tên ngành</th>
                        <th className="px-4 py-3 w-40">Tổ hợp</th>
                        <th className="px-4 py-3 w-28 text-right">Điểm chuẩn</th>
                        <th className="px-4 py-3 min-w-[150px]">Ghi chú</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                    {benchmarkList.map((b, index) => (
                        <tr 
                            key={index} 
                            className="hover:bg-blue-50/50 transition-colors duration-150"
                        >
                            <td className="px-4 py-3 text-center text-slate-400">
                                {index + 1}
                            </td>
                            <td className="px-4 py-3 font-mono text-slate-600 font-medium">
                                {b.majorCode || <span className="text-slate-300">-</span>}
                            </td>
                            <td className="px-4 py-3 font-medium text-slate-800">
                                {b.major}
                            </td>
                            <td className="px-4 py-3 text-slate-600">
                                {b.subjectCombinations ? (
                                    <span className="inline-block bg-slate-100 px-2 py-0.5 rounded text-xs text-slate-600 font-medium border border-slate-200">
                                        {b.subjectCombinations}
                                    </span>
                                ) : "-"}
                            </td>
                            <td className="px-4 py-3 text-right">
                                <span className="font-bold text-blue-600 text-base">
                                    {b.score}
                                </span>
                            </td>
                            <td className="px-4 py-3 text-slate-500 italic text-xs">
                                {b.note || ""}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}