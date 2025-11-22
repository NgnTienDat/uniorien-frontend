'use client';

import { useState } from 'react';
import { MessageSquare, Send, User, Clock, ImageIcon } from 'lucide-react';
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
    const { comments, addComment, isAdding, isLoading } = useComment(universityCode, universityId);
    const [content, setContent] = useState('');
    const displayComments = comments || initialReviews;

    const handleSubmit = async () => {
        if (!content.trim()) return;
        try {
            await addComment(content);
            setContent('');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8" id="reviews">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <MessageSquare className="text-blue-600" size={24} />
                    Cộng đồng thảo luận
                    <span className="ml-2 px-2 py-0.5 bg-slate-100 text-slate-600 text-sm rounded-full font-normal">
                        {displayComments.length}
                    </span>
                </h2>
            </div>

            {/* Input Area */}
            <div className="flex gap-4 mb-8">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">
                    <User size={20} />
                </div>
                <div className="flex-1 relative">
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Bạn nghĩ gì về ngôi trường này? Chia sẻ ngay..."
                        rows={3}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all text-sm"
                        disabled={isAdding}
                    />
                    <div className="absolute bottom-3 right-3">
                        <button
                            onClick={handleSubmit}
                            disabled={isAdding || !content.trim()}
                            className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed shadow-sm"
                        >
                            {isAdding ? <span className="w-4 h-4 block rounded-full border-2 border-white border-t-transparent animate-spin"></span> : <Send size={16} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Reviews List */}
            <div className="space-y-6">
                {isLoading ? (
                    <div className="text-center py-10 text-slate-400">Đang tải bình luận...</div>
                ) : displayComments.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-10 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                        <MessageSquare className="text-slate-300 mb-2" size={40} />
                        <p className="text-slate-500">Chưa có đánh giá nào.</p>
                        <p className="text-slate-400 text-sm">Hãy là người đầu tiên chia sẻ cảm nhận!</p>
                    </div>
                ) : (
                    displayComments.map(review => (
                        <div key={review.id} className="flex gap-4 group">
                            {/* Avatar */}
                            <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mt-1 shadow-sm">
                                {review.avatar ? (
                                    <img
                                        src={review.avatar}
                                        alt={review.fullName}
                                        className="w-full h-full object-cover rounded-full"
                                        referrerPolicy="no-referrer"
                                    />
                                ) : (
                                    <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-sm font-bold">
                                        {review.fullName?.charAt(0)?.toUpperCase() || "U"}
                                    </div>
                                )}
                            </div>

                            {/* Content Bubble */}
                            <div className="flex-1">
                                <div className="bg-slate-50 rounded-2xl rounded-tl-none p-4 border border-slate-100 group-hover:border-blue-100 transition-colors">
                                    <div className="flex items-center justify-between mb-1">
                                        <h4 className="font-bold text-slate-900 text-sm">
                                            {review.fullName || 'Người dùng ẩn danh'}
                                        </h4>
                                        <span className="text-xs text-slate-400 flex items-center gap-1">
                                            <Clock size={12} />
                                            {formatDate(review.createdAt)}
                                        </span>
                                    </div>
                                    <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-line">
                                        {review.content}
                                    </p>
                                </div>
                                {/* Actions (Like/Reply - Placeholder for future) */}
                                <div className="flex items-center gap-4 mt-1 ml-2 text-xs text-slate-500 font-medium">
                                    <button className="hover:text-blue-600 cursor-pointer">Thích</button>
                                    <button className="hover:text-blue-600 cursor-pointer">Phản hồi</button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}