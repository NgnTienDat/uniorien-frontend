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
            <table className="min-w-full border border-gray-300 bg-white rounded-lg text-sm md:text-base">
                <thead className="bg-blue-50">
                    <tr>
                        <th className="border border-gray-300 px-3 py-1 text-left w-16">STT</th>
                        <th className="border border-gray-300 px-3 py-1 text-left w-32">Mã ngành</th>
                        <th className="border border-gray-300 px-3 py-1 text-left">Tên ngành</th>
                        <th className="border border-gray-300 px-3 py-1 text-left w-32">Tổ hợp môn</th>
                        <th className="border border-gray-300 px-3 py-1 text-center w-28">Điểm chuẩn</th>
                        <th className="border border-gray-300 px-3 py-1 text-left w-48">Ghi chú</th>
                    </tr>
                </thead>
                <tbody>
                    {benchmarkList.map((b, index) => (
                        <tr
                            key={index}
                            className={`hover:bg-blue-100 transition-colors ${index % 2 === 0 ? "bg-white" : "bg-blue-50"
                                }`}
                        >
                            <td className="border border-gray-300 px-3 py-1 text-center">
                                {index + 1}
                            </td>
                            <td className="border border-gray-300 px-3 py-1 text-gray-700">
                                {b.majorCode || "-"}
                            </td>
                            <td className="border border-gray-300 px-3 py-1 text-gray-700 break-words">
                                {b.major?.split(" - ")[1] || b.major}
                            </td>
                            <td className="border border-gray-300 px-3 py-1 text-gray-600">
                                {b.subjectCombinations || "-"}
                            </td>
                            <td className="border border-gray-300 px-3 py-1 text-center font-semibold text-blue-700">
                                {b.score}
                            </td>
                            <td className="border border-gray-300 px-3 py-1 text-gray-600 italic">
                                {b.note || "-"}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
