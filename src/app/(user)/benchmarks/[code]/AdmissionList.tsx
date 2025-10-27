"use client";

import React from "react";
import { Admission } from "@/services/universityServices";

interface AdmissionListProps {
    admissionList: Admission[];
}

export default function AdmissionList({ admissionList }: AdmissionListProps) {
    return (
        <div className="space-y-10">
            {admissionList.map((admission, i) => (
                <div key={i}>
                    <div className="bg-amber-300 p-2 rounded-t-lg">
                        <h2 className="text-lg md:text-xl font-semibold text-gray-800">
                            {admission.admissionMethod}
                        </h2>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full border border-gray-300 bg-white rounded-lg text-sm md:text-base">
                            <thead className="bg-blue-50">
                                <tr>
                                    <th className="border border-gray-300 px-3 py-1 text-left w-16">
                                        STT
                                    </th>
                                    <th className="border border-gray-300 px-3 py-1 text-left w-32">
                                        Mã ngành
                                    </th>
                                    <th className="border border-gray-300 px-3 py-1 text-left">
                                        Tên ngành
                                    </th>
                                    <th className="border border-gray-300 px-3 py-1 text-left w-32">
                                        Tổ hợp môn
                                    </th>
                                    <th className="border border-gray-300 px-3 py-1 text-center w-28">
                                        Điểm chuẩn
                                    </th>
                                    <th className="border border-gray-300 px-3 py-1 text-left w-48">
                                        Ghi chú
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {admission.benchmarkList.map((b, index) => (
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
                </div>
            ))}
        </div>
    );
}
