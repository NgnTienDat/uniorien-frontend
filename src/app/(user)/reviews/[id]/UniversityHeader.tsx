// components/UniversityHeader.tsx (Server Component)
import { UniversityDetail } from '@/types/review';
import { Star, MapPin, Users, Calendar } from 'lucide-react';

interface University {
    name: string;
    location: string;
    logo: string;
    rating: number;
    students: number;
    founded: number;
    acceptance: string;
}

interface UniversityHeaderProps {
    university: UniversityDetail;
    reviewCount: number;
}

function renderStars(rating: number) {
    return [...Array(5)].map((_, i) => (
        <Star
            key={i}
            className={`w-5 h-5 ${i < rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`}
        />
    ));
}

export function UniversityHeader({ university, reviewCount }: UniversityHeaderProps) {
    return (
        <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="flex gap-6 mb-6">
                <div className="w-20 h-20 bg-red-700 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-3xl font-bold text-white">{university.universityCode}</span>
                </div>
                <div className="flex-1">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{university.universityName}</h1>
                    <div className="flex items-center gap-2 text-gray-600 mb-3">
                        <MapPin className="w-4 h-4" />
                        <span>{university.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        {university.rating === undefined || null ? (
                            <div className="flex">{renderStars(0)}</div>
                        ) : (<>
                            <div className="flex">{renderStars(Math.floor(university.rating))}</div>
                            <span className="text-gray-900 font-medium">{university.rating}</span>
                        </>
                        )}
                        <span className="text-gray-500">({reviewCount} Bình luận)</span>
                    </div>
                </div>
            </div>

            <div className="flex gap-8 pt-6 border-t border-gray-200">
                <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-gray-400" />
                    <div>
                        <span className="text-sm text-gray-500 mr-2">Tổng sinh viên: </span>
                        {university.students === undefined || null ?
                            <span className='text-gray-500 text-sm'>Đang cập nhật</span>
                            :
                            <span className="font-medium text-gray-900">{university.students.toLocaleString()}</span>
                        }
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <div>
                        <span className="text-sm text-gray-500 mr-2">Năm thành lập: </span>
                        {(university.founded === undefined || university.founded === null) ? (
                            <span className='text-gray-500 text-sm'>Đang cập nhật</span>
                        ) : (
                            <span className="font-medium text-gray-900">{university.founded}</span>
                        )}
                    </div>
                </div>
               
            </div>
        </div>
    );
}