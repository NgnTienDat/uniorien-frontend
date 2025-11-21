"use client";

import React, { useState } from "react";
import { Admission } from "@/services/universityServices";
import { fetchAdmissionDetailsClient } from "@/services/universityServices";
import AdmissionTable from "@/app/(user)/benchmarks/[code]/AdmissionTable";

interface AdmissionListProps {
    admissionList: Admission[];
    universityCode: string;
}

export default function AdmissionList({
    admissionList,
    universityCode,
}: AdmissionListProps) {
    const [loadingStates, setLoadingStates] = useState<Record<number, boolean>>({});
    const [previousYearDataMap, setPreviousYearDataMap] = useState<Record<number, Admission[]>>({});
    const [noMoreDataFlags, setNoMoreDataFlags] = useState<Record<number, boolean>>({});

    const handleViewPreviousYear = async (
        admissionMethod: string,
        currentYearToLoad: string,
        index: number
    ) => {
        const prevYear = (Number(currentYearToLoad) - 1).toString();

        setLoadingStates(prev => ({ ...prev, [index]: true }));

        try {
            // ✅ Use client-side fetch function
            const res = await fetchAdmissionDetailsClient(
                universityCode,
                prevYear,
                admissionMethod
            );

            if (res.admissionList && res.admissionList.length > 0) {
                setPreviousYearDataMap(prev => ({
                    ...prev,
                    [index]: [...(prev[index] || []), res.admissionList[0]]
                }));
            } else {
                // No data available for this year
                setNoMoreDataFlags(prev => ({ ...prev, [index]: true }));
            }
        } catch (err) {
            console.error('Error loading previous year:', err);
            // On error, set flag to prevent further attempts
            setNoMoreDataFlags(prev => ({ ...prev, [index]: true }));
        } finally {
            setLoadingStates(prev => ({ ...prev, [index]: false }));
        }
    };

    const handleClosePreviousYear = (index: number) => {
        setPreviousYearDataMap(prev => {
            const newMap = { ...prev };
            delete newMap[index];
            return newMap;
        });
        // Reset the no-more-data flag when closing
        setNoMoreDataFlags(prev => {
            const newFlags = { ...prev };
            delete newFlags[index];
            return newFlags;
        });
    };

    const getNextYearToLoad = (admission: Admission, index: number): string => {
        const previousData = previousYearDataMap[index];
        if (!previousData || previousData.length === 0) {
            return admission.admissionYear;
        }
        // Get the last loaded year
        const lastLoadedYear = previousData[previousData.length - 1].admissionYear;
        return lastLoadedYear;
    };

    return (
        <div className="space-y-10">
            {admissionList.map((admission, i) => (
                <div key={i} className="mb-17">
                    {/* Current Year Section */}
                    <div className="bg-blue-200 p-2 rounded-t-md ">
                        <h2 className="text-lg md:text-xl font-semibold text-gray-800">
                            {admission.admissionMethod} - Năm {admission.admissionYear}
                        </h2>
                    </div>

                    <AdmissionTable benchmarkList={admission.benchmarkList} />

                    {/* Previous Years Section - Displayed directly below current year */}
                    {previousYearDataMap[i] && previousYearDataMap[i].length > 0 && (
                        <div className="mt-6 space-y-6">
                            {previousYearDataMap[i].map((prevData, yearIndex) => (
                                <div key={yearIndex} className="border-t-4 border-gray-300 pt-6">
                                    <div className="bg-blue-200 p-2 rounded-t-lg flex justify-between items-center">
                                        <h3 className="text-lg md:text-xl font-semibold text-gray-800">
                                            {prevData.admissionMethod} - Năm {prevData.admissionYear}
                                        </h3>
                                        {yearIndex === 0 && (
                                            <button
                                                onClick={() => handleClosePreviousYear(i)}
                                                className="text-gray-600 hover:text-gray-800 text-xl font-bold px-2"
                                                aria-label="Đóng tất cả"
                                            >
                                                ×
                                            </button>
                                        )}
                                    </div>
                                    <AdmissionTable benchmarkList={prevData.benchmarkList} />
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="mt-5 flex justify-center gap-2">
                        {previousYearDataMap[i] && previousYearDataMap[i].length > 0 && (
                            <button
                                onClick={() => handleClosePreviousYear(i)}
                                className="text-sm md:text-base px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
                            >
                                Đóng tất cả năm trước
                            </button>
                        )}
                        {!noMoreDataFlags[i] && (
                            <button
                                onClick={() => {
                                    const yearToLoad = getNextYearToLoad(admission, i);
                                    handleViewPreviousYear(
                                        admission.admissionMethod,
                                        yearToLoad,
                                        i
                                    );
                                }}
                                disabled={loadingStates[i]}
                                className="text-sm md:text-base px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:opacity-50"
                            >
                                {loadingStates[i]
                                    ? "Đang tải..."
                                    : `Xem ${admission.admissionMethod} năm ${Number(getNextYearToLoad(admission, i)) - 1
                                    }`}
                            </button>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}