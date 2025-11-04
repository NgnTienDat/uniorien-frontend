'use client';

import React from 'react';
import Link from 'next/link';
import { Star, MapPin, Users } from 'lucide-react';

type University = {
    id: string;
    universityCode: string;
    universityName: string;
    logo?: string | null;
    description?: string | null;
    location?: string | null;
    rating?: number; // thêm trường đánh giá (1–5)
    reviewCount?: number;
};

interface UniReviewListProps {
    universities: University[];
}

function UniReviewList({ universities }: UniReviewListProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {universities.map((u) => {
                const rating = u.rating ?? 4.2;
                const filledStars = Math.floor(rating);
                const hasHalfStar = rating - filledStars >= 0.5;
                const reviewCount = u.reviewCount ?? 1234;

                return (
                    <Link
                        key={u.id}
                        href={`/reviews/${u.universityCode}`}
                        className="block group"
                    >
                        <div className="bg-white rounded-xl p-5 border border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                            <div className="flex gap-4 items-start">
                                {/* Logo */}
                                <div className="w-20 h-20 bg-gray-50 rounded-lg flex items-center justify-center overflow-hidden border">
                                    {u.logo ? (
                                        <img
                                            src={u.logo}
                                            alt={u.universityName}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <span className="text-lg font-semibold text-blue-600">
                                            {u.universityCode}
                                        </span>
                                    )}
                                </div>

                                {/* Info */}
                                <div className="flex flex-col flex-1 min-w-0">
                                    <h3 className="text-base font-semibold text-gray-800 line-clamp-2 min-h-[3rem] mb-1 group-hover:text-blue-600">
                                        {u.universityName}
                                    </h3>

                                    {u.location && (
                                        <div className="flex items-center text-xs text-gray-500 mb-2">
                                            <MapPin className="w-3 h-3 mr-1" />
                                            <span className="truncate">{u.location}</span>
                                        </div>
                                    )}

                                    {/* Rating */}
                                    <div className="flex items-center mb-2">
                                        {[...Array(5)].map((_, i) => {
                                            const filled =
                                                i < filledStars ||
                                                (i === filledStars && hasHalfStar);
                                            return (
                                                <Star
                                                    key={i}
                                                    className={`w-4 h-4 ${filled
                                                            ? 'text-yellow-400 fill-yellow-400'
                                                            : 'text-gray-300'
                                                        }`}
                                                />
                                            );
                                        })}
                                        <span className="ml-2 text-sm text-gray-600">
                                            {rating.toFixed(1)}
                                        </span>
                                    </div>

                                    {/* Reviews count */}
                                    <div className="flex items-center text-xs text-gray-500">
                                        <Users className="w-3 h-3 mr-1" />
                                        <span>{reviewCount.toLocaleString()} đánh giá</span>
                                    </div>

                                    {/* View more */}
                                    <div className="mt-3 text-blue-500 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                                        <span>Xem chi tiết</span>
                                        <svg
                                            className="w-4 h-4"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 5l7 7-7 7"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
}

export default UniReviewList;
