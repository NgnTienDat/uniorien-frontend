'use client';

import React from 'react';
import Link from 'next/link';
import { Star, MapPin, School, ArrowUpRight } from 'lucide-react';

type University = {
    id: string;
    universityCode: string;
    universityName: string;
    logo?: string | null;
    description?: string | null;
    location?: string | null;
    rating?: number;
    reviewCount?: number;
};

interface UniReviewListProps {
    universities: University[];
}

function UniReviewList({ universities }: UniReviewListProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {universities.map((u) => {
                const rating = u.rating ?? 4.5;
                const reviewCount = u.reviewCount ?? 120;
                
                return (
                    <Link
                        key={u.id}
                        href={`/reviews/${u.universityCode}`}
                        className="group relative bg-white rounded-xl border border-slate-200 p-4 hover:border-blue-400 hover:shadow-lg transition-all duration-300 flex flex-col justify-between h-full"
                    >
                        {/* --- TOP SECTION: Logo & Basic Info --- */}
                        <div className="flex items-start gap-3 mb-3">
                            {/* Logo nhỏ gọn hơn (w-12 h-12) */}
                            <div className="w-12 h-12 rounded-lg border border-slate-100 bg-white flex items-center justify-center overflow-hidden p-1 shrink-0 shadow-sm">
                                {u.logo ? (
                                    <img
                                        src={u.logo}
                                        alt={u.universityName}
                                        className="w-full h-full object-contain"
                                    />
                                ) : (
                                    <School className="text-blue-200" size={24} />
                                )}
                            </div>

                            {/* Tên & Mã trường */}
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start gap-2">
                                    <h3 className="text-sm font-bold text-slate-800 leading-tight line-clamp-2 group-hover:text-blue-700 transition-colors">
                                        {u.universityName}
                                    </h3>
                                    {/* Mã trường dạng Badge nhỏ */}
                                    <span className="shrink-0 px-1.5 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-bold rounded border border-slate-200">
                                        {u.universityCode}
                                    </span>
                                </div>
                                
                                {/* Địa điểm */}
                                <div className="flex items-center mt-1.5 text-xs text-slate-500">
                                    <MapPin className="w-3 h-3 mr-1 text-slate-400" />
                                    <span className="truncate max-w-[180px]">{u.location || "Đang cập nhật"}</span>
                                </div>
                            </div>
                        </div>

                        {/* --- BOTTOM SECTION: Rating & Stats --- */}
                        <div className="pt-3 border-t border-slate-100 flex items-center justify-between mt-auto">
                            <div className="flex items-center gap-3">
                                {/* Rating Box */}
                                <div className="flex items-center gap-1 bg-yellow-50 px-1.5 py-0.5 rounded text-yellow-700 border border-yellow-100">
                                    <span className="text-xs font-bold">{rating.toFixed(1)}</span>
                                    <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                                </div>
                                <span className="text-xs text-slate-400">
                                    {reviewCount} bài viết
                                </span>
                            </div>

                            {/* Hover Icon Action */}
                            <div className="w-6 h-6 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
                                <ArrowUpRight size={14} />
                            </div>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
}

export default UniReviewList;