'use client';

import { useState } from 'react';
import { Star } from 'lucide-react';
import { CommentResponse, Review } from '@/types/review';


interface ReviewSectionProps {
    universityCode: string;
    initialReviews: CommentResponse[];
}

function renderStars(rating: number, size = 'w-5 h-5') {
    return [...Array(5)].map((_, i) => (
        <Star
            key={i}
            className={`${size} ${i < rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`}
        />
    ));
}

export function ReviewSection({ universityCode, initialReviews }: ReviewSectionProps) {
    const [reviews, setReviews] = useState<CommentResponse[]>(initialReviews);
    const [formData, setFormData] = useState({
        name: '',
        content: ''
    });


    const handleSubmit = async () => {
        if (formData.content) {
            // In a real app, you would POST to an API route here
            // const response = await fetch(`/api/universities/${universityId}/reviews`, {
            //   method: 'POST',
            //   body: JSON.stringify(formData)
            // });
            console.log("uni code: ", universityCode);
           
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Bình luận</h2>

            {/* Review Form */}
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
               
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Bình luận của bạn</label>
                    <textarea
                        name="review"
                        value={formData.content}
                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                        placeholder="Viết gì đó..."
                        rows={4}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-none"
                    />
                </div>

                <button
                    onClick={handleSubmit}
                    className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-2.5 rounded-lg transition-colors"
                >
                    Submit Review
                </button>
            </div>

            {/* Reviews List */}
            <div className="space-y-6">
                {reviews.map(review => (
                    <div key={review.id} className="pb-6 border-b border-gray-200 last:border-0">
                        <div className="flex items-start gap-4">
                            <div className="w-7 h-7 rounded-full bg-gray-300 flex items-center justify-center text-white text-sm font-medium flex-shrink-0">
                                {review.avatar}
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center justify-between mb-2">
                                    <h4 className="font-medium text-gray-900">{review.fullName}</h4>
                                    <span className="text-sm text-gray-500">{review.createdAt}</span>
                                </div>
                                {/* <div className="flex mb-3">
                                    {renderStars(review.rating, 'w-4 h-4')}
                                </div> */}
                                <p className="text-gray-700 leading-relaxed">{review.content}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}