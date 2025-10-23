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
                    <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-3">
                        {admission.admissionMethod}
                    </h2>

                    <div className="overflow-x-auto">
                        <table className="min-w-full border border-gray-300 bg-white rounded-lg text-sm md:text-base">
                            <thead className="bg-blue-50">
                                <tr>
                                    <th className="border border-gray-300 px-3 py-2 text-left w-12">
                                        STT
                                    </th>
                                    <th className="border border-gray-300 px-3 py-2 text-left">
                                        Mã ngành
                                    </th>
                                    <th className="border border-gray-300 px-3 py-2 text-left">
                                        Tên ngành
                                    </th>
                                    <th className="border border-gray-300 px-3 py-2 text-left">
                                        Tổ hợp môn
                                    </th>
                                    <th className="border border-gray-300 px-3 py-2 text-center w-24">
                                        Điểm chuẩn
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {admission.benchmarkList.map((b, index) => (
                                    <tr
                                        key={index}
                                        className="hover:bg-blue-50 transition-colors"
                                    >
                                        <td className="border border-gray-300 px-3 py-2 text-center">
                                            {index + 1}
                                        </td>
                                        <td className="border border-gray-300 px-3 py-2 text-gray-700">
                                            {b.major?.split(" - ")[0] || "-"}
                                        </td>
                                        <td className="border border-gray-300 px-3 py-2 text-gray-700">
                                            {b.major?.split(" - ")[1] ||
                                                b.major}
                                        </td>
                                        <td className="border border-gray-300 px-3 py-2 text-gray-600">
                                            {b.subjectCombinations || "-"}
                                        </td>
                                        <td className="border border-gray-300 px-3 py-2 text-center font-semibold text-blue-700">
                                            {b.score}
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
