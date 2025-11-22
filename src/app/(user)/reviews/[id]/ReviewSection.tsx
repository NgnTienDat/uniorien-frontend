'use client';

import { useState } from 'react';
import { MessageSquare, Send, User, Clock, ChevronLeft, ChevronRight, Hash } from 'lucide-react';
import { CommentResponse } from '@/types/review';
import { formatDate } from '@/lib/utils';
import { useComment } from '@/hooks/useComment';

interface ReviewSectionProps {
    universityCode: string;
    universityId: string;
    initialReviews: CommentResponse[];
}

export function ReviewSection({
    universityCode,
    universityId,
    initialReviews
}: ReviewSectionProps) {
    // --- LOGIC ---
    const {
        comments,
        pageData,
        currentPage,
        setCurrentPage,
        addComment,
        isAdding,
        isLoading
    } = useComment(universityCode, universityId);

    const [content, setContent] = useState('');

    // FIX: Ensure displayComments is always an array
    const displayComments = Array.isArray(comments) && comments.length > 0 
        ? comments 
        : Array.isArray(initialReviews) 
        ? initialReviews 
        : [];
    
    const totalElements = pageData?.totalElements || displayComments.length;

    const handleSubmit = async () => {
        if (!content.trim()) return;
        try {
            await addComment(content);
            setContent('');
        } catch (err) {
            console.error(err);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (pageData && currentPage < pageData.totalPages - 1) {
            setCurrentPage(currentPage + 1);
        }
    };
    // --- END LOGIC ---

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8" id="reviews">
            <div className="flex items-center justify-between mb-8 border-b border-slate-100 pb-4">
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <MessageSquare className="text-blue-600" size={24} />
                    Cộng đồng thảo luận
                </h2>
                <div className="px-3 py-1 bg-slate-50 text-slate-600 text-sm rounded-full font-medium border border-slate-100 flex items-center gap-1">
                    <Hash size={14} className="text-slate-400" />
                    {totalElements} <span className="hidden sm:inline">bình luận</span>
                </div>
            </div>

            {/* Input Area */}
            <div className="flex gap-4 mb-10">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 flex-shrink-0 border border-blue-100">
                    <User size={20} />
                </div>
                <div className="flex-1 relative group">
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Chia sẻ trải nghiệm hoặc đặt câu hỏi về trường..."
                        rows={3}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none transition-all text-sm placeholder:text-slate-400"
                        disabled={isAdding}
                    />
                    <div className="absolute bottom-3 right-3 opacity-100 transition-opacity">
                        <button
                            onClick={handleSubmit}
                            disabled={isAdding || !content.trim()}
                            className="bg-blue-600 hover:bg-blue-700 text-white p-2 flex items-center justify-center
                            rounded-lg transition-all disabled:bg-slate-200 disabled:text-slate-400 
                            disabled:cursor-not-allowed shadow-sm hover:shadow active:scale-95"
                        >
                            {isAdding ? (
                                <span className="w-4 h-4 block rounded-full border-2 border-white border-t-transparent animate-spin"></span>
                            ) : (
                                <Send size={16} className={content.trim() ? "translate-x-0.5" : ""} />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Reviews List */}
            <div className="space-y-8">
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-12 space-y-3">
                        <div className="w-8 h-8 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
                        <p className="text-sm text-slate-400">Đang tải bình luận...</p>
                    </div>
                ) : displayComments.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 bg-slate-50/50 rounded-2xl border border-dashed border-slate-200">
                        <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-3">
                            <MessageSquare className="text-slate-300" size={24} />
                        </div>
                        <p className="text-slate-600 font-medium">Chưa có đánh giá nào</p>
                        <p className="text-slate-400 text-sm">Hãy là người đầu tiên chia sẻ cảm nhận!</p>
                    </div>
                ) : (
                    <>
                        <div className="space-y-6">
                            {displayComments.map(review => (
                                <div key={review.id} className="flex gap-4 group">
                                    {/* Avatar */}
                                    <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mt-1 shadow-sm border border-slate-100 overflow-hidden bg-white">
                                        {review.avatar ? (
                                            <img
                                                src={review.avatar}
                                                alt={review.fullName}
                                                className="w-full h-full object-cover"
                                                referrerPolicy="no-referrer"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-sm font-bold">
                                                {review.fullName?.charAt(0)?.toUpperCase() || "U"}
                                            </div>
                                        )}
                                    </div>

                                    {/* Content Bubble */}
                                    <div className="flex-1">
                                        <div className="bg-slate-50 rounded-2xl rounded-tl-sm p-4 border border-slate-100 group-hover:border-blue-100 group-hover:bg-blue-50/30 transition-all">
                                            <div className="flex items-center justify-between mb-1.5">
                                                <h4 className="font-bold text-slate-900 text-sm">
                                                    {review.fullName || 'Người dùng ẩn danh'}
                                                </h4>
                                                <span className="text-xs text-slate-400 flex items-center gap-1 bg-white px-2 py-0.5 rounded-full border border-slate-100">
                                                    <Clock size={11} />
                                                    {formatDate(review.createdAt)}
                                                </span>
                                            </div>
                                            <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-line">
                                                {review.content}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination Section */}
                        {pageData && pageData.totalPages > 1 && (
                            <div className="flex flex-col sm:flex-row items-center justify-between pt-8 mt-2 border-t border-slate-100 gap-4">

                                {/* Page Info */}
                                <div className="text-sm text-slate-500 font-medium order-2 sm:order-1">
                                    Trang <span className="text-slate-900 font-bold">{currentPage + 1}</span>
                                    <span className="mx-1 text-slate-300">/</span>
                                    {pageData.totalPages}
                                </div>

                                {/* Controls */}
                                <div className="flex items-center gap-2 order-1 sm:order-2">
                                    <button
                                        onClick={handlePreviousPage}
                                        disabled={pageData.first}
                                        className="group flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:border-blue-500 hover:text-blue-600 hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-slate-200 disabled:hover:text-slate-600 transition-all duration-200"
                                    >
                                        <ChevronLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
                                        <span>Trước</span>
                                    </button>

                                    <button
                                        onClick={handleNextPage}
                                        disabled={pageData.last}
                                        className="group flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:border-blue-500 hover:text-blue-600 hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-slate-200 disabled:hover:text-slate-600 transition-all duration-200"
                                    >
                                        <span>Sau</span>
                                        <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}