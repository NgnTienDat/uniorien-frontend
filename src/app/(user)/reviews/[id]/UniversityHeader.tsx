import { UniversityDetail } from '@/types/review';
import { Star, MapPin, Users, Calendar, School } from 'lucide-react';

interface UniversityHeaderProps {
    university: UniversityDetail;
    reviewCount: number;
}

export function UniversityHeader({ university, reviewCount }: UniversityHeaderProps) {
    const rating = university.rating ?? 0;
    
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            {/* Cover Image Placeholder */}
            <div className="h-32 md:h-48 bg-gradient-to-r from-blue-600 to-indigo-700 relative">
                <div className="absolute inset-0 opacity-20 pattern-dots"></div>
            </div>

            <div className="px-6 pb-6 md:px-8 md:pb-8 relative">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                    {/* Floating Logo */}
                    <div className="-mt-12 md:-mt-16 bg-white p-1.5 rounded-2xl shadow-lg">
                        <div className="w-24 h-24 md:w-32 md:h-32 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-100 text-blue-700 overflow-hidden">
                            {/* Nếu có logo thật thì dùng img, ko thì dùng text */}
                             <span className="text-3xl font-extrabold tracking-tighter">
                                {university.universityCode}
                             </span>
                        </div>
                    </div>

                    {/* Info Section */}
                    <div className="flex-1 pt-2 w-full">
                        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                            <div>
                                <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
                                    {university.universityName}
                                </h1>
                                <div className="flex items-center gap-2 text-slate-500 text-sm mb-3">
                                    <MapPin size={16} />
                                    <span>{university.location || "Chưa cập nhật vị trí"}</span>
                                </div>
                            </div>
                            
                            {/* Rating Badge */}
                            <div className="flex items-center gap-3 bg-blue-50 px-4 py-2 rounded-xl border border-blue-100">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-blue-700 leading-none">
                                        {rating > 0 ? rating.toFixed(1) : "N/A"}
                                    </div>
                                    <div className="flex text-yellow-400 text-[10px] mt-1">
                                         {[...Array(5)].map((_, i) => (
                                            <Star key={i} size={10} className={i < Math.floor(rating) ? "fill-current" : "text-slate-300"} />
                                        ))}
                                    </div>
                                </div>
                                <div className="h-8 w-px bg-blue-200"></div>
                                <div className="text-xs text-slate-600">
                                    <span className="font-bold block text-slate-800">{reviewCount}</span>
                                    Đánh giá
                                </div>
                            </div>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6 pt-6 border-t border-slate-100">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                                    <Users size={20} />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500">Sinh viên</p>
                                    <p className="font-semibold text-slate-800">
                                        {university.students ? university.students.toLocaleString() : "---"}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                                    <Calendar size={20} />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500">Thành lập</p>
                                    <p className="font-semibold text-slate-800">
                                        {university.founded || "---"}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                                    <School size={20} />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500">Đào tạo</p>
                                    <p className="font-semibold text-slate-800">
                                        {university.programsOffered || "---"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}