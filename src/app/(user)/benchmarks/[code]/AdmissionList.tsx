"use client";

import React, { useState } from "react";
import { Admission } from "@/services/universityServices";
import { fetchAdmissionDetailsClient } from "@/services/universityServices";
import AdmissionTable from "@/app/(user)/benchmarks/[code]/AdmissionTable";
import { Calendar, History, ChevronDown, Loader2, XCircle } from "lucide-react";

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
                setNoMoreDataFlags(prev => ({ ...prev, [index]: true }));
            }
        } catch (err) {
            console.error('Error loading previous year:', err);
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
        return previousData[previousData.length - 1].admissionYear;
    };

    return (
        <div className="space-y-8">
            {admissionList.map((admission, i) => (
                // Main Card Container
                <div key={i} className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                    
                    {/* Header - Current Year */}
                    <div className="bg-slate-50/80 border-b border-slate-100 px-6 py-4 flex items-center gap-3">
                        <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                            <Calendar size={20} />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-slate-800">
                                Năm {admission.admissionYear}
                            </h2>
                            <p className="text-sm text-slate-500 font-medium">
                                {admission.admissionMethod}
                            </p>
                        </div>
                    </div>

                    {/* Table Current Year */}
                    <AdmissionTable benchmarkList={admission.benchmarkList} />

                    {/* Previous Years Section (Timeline Style) */}
                    {previousYearDataMap[i] && previousYearDataMap[i].length > 0 && (
                        <div className="bg-slate-50 border-t border-slate-200 px-4 py-6 space-y-6">
                            <div className="flex items-center gap-2 text-sm font-bold text-slate-500 uppercase tracking-wider px-2">
                                <History size={14} /> Lịch sử điểm chuẩn
                            </div>

                            {previousYearDataMap[i].map((prevData, yearIndex) => (
                                <div key={yearIndex} className="relative pl-4 md:pl-8 border-l-2 border-slate-200 ml-2 md:ml-4">
                                    {/* Dot Indicator */}
                                    <div className="absolute -left-[9px] top-0 w-4 h-4 bg-slate-400 rounded-full border-2 border-white"></div>
                                    
                                    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden mb-4 shadow-sm">
                                        <div className="bg-slate-100 px-4 py-2 border-b border-slate-200 flex justify-between items-center">
                                            <span className="font-bold text-slate-700">
                                                Năm {prevData.admissionYear}
                                            </span>
                                            {yearIndex === 0 && (
                                                <button
                                                    onClick={() => handleClosePreviousYear(i)}
                                                    className="text-slate-400 hover:text-red-500 transition-colors"
                                                    title="Đóng tất cả"
                                                >
                                                    <XCircle size={18} />
                                                </button>
                                            )}
                                        </div>
                                        <AdmissionTable benchmarkList={prevData.benchmarkList} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Action Footer */}
                    <div className="bg-white p-4 border-t border-slate-100 flex items-center justify-center gap-3">
                         {previousYearDataMap[i] && previousYearDataMap[i].length > 0 && (
                             <button
                                onClick={() => handleClosePreviousYear(i)}
                                className="px-4 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-800 transition-colors"
                             >
                                Đóng lại
                             </button>
                         )}

                        {!noMoreDataFlags[i] && (
                            <button
                                onClick={() => {
                                    const yearToLoad = getNextYearToLoad(admission, i);
                                    handleViewPreviousYear(admission.admissionMethod, yearToLoad, i);
                                }}
                                disabled={loadingStates[i]}
                                className="flex items-center gap-2 px-5 py-2 rounded-lg bg-blue-50 text-blue-700 font-medium hover:bg-blue-100 hover:shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                            >
                                {loadingStates[i] ? (
                                    <>
                                        <Loader2 size={16} className="animate-spin" /> Đang tải...
                                    </>
                                ) : (
                                    <>
                                        <History size={16} />
                                        Xem năm {Number(getNextYearToLoad(admission, i)) - 1}
                                    </>
                                )}
                            </button>
                        )}
                        
                        {noMoreDataFlags[i] && previousYearDataMap[i]?.length > 0 && (
                            <span className="text-xs text-slate-400 italic">Đã hiển thị hết dữ liệu</span>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}