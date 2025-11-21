import { MajorDetail, MajorSearchItem, Score } from '@/services/majorServices';
import React from 'react';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';

interface MajorSearchListProps {
    majorSearchList: MajorSearchItem[];
}

export default function MajorSearchList({ majorSearchList }: MajorSearchListProps) {
    
    // --- Logic helper functions (Giữ nguyên) ---
    const getUniqueYears = () => {
        const years = new Set<number>();
        majorSearchList.forEach(university => {
            university.majorDetails.forEach(major => {
                major.scores.forEach(score => years.add(score.year));
            });
        });
        return Array.from(years).sort((a, b) => b - a);
    };

    const uniqueYears = getUniqueYears();

    const getScoreForYear = (scores: Score[], year: number) => {
        const score = scores.find(s => s.year === year);
        // Định dạng điểm nếu có, nếu không thì trả về dấu '-'
        return score ? (score.score % 1 === 0 ? score.score.toString() : score.score.toFixed(2)) : '-';
    };

    const getUniversityRowSpan = (majorDetails: MajorDetail[]) => {
        return majorDetails.length;
    };
    // ---------------------------------------------

    if (majorSearchList.length === 0) {
        return (
            <div className="text-center py-12 text-slate-500 border rounded-lg bg-white shadow-md">
                <p className="text-xl font-medium">Không tìm thấy trường đại học nào đào tạo ngành này.</p>
                <p className="text-sm mt-2">Vui lòng thử điều chỉnh lại bộ lọc tìm kiếm của bạn.</p>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto border border-slate-200 rounded-lg shadow-xl">
            <table className="min-w-full text-left border-collapse">
                
                {/* --- HEADER (Dựa trên AdmissionTable) --- */}
                <thead>
                    <tr className="bg-slate-50 text-slate-500 text-xs font-semibold uppercase tracking-wider border-b border-slate-200 sticky top-0">
                        <th className="px-4 py-3 w-12 text-center border-r border-slate-200">STT</th>
                        <th className="px-4 py-3 min-w-[200px] border-r border-slate-200">Tên trường</th>
                        <th className="px-4 py-3 min-w-[200px] border-r border-slate-200">Tên ngành</th>
                        <th className="px-4 py-3 w-40 border-r border-slate-200 text-center">Tổ hợp môn</th>
                        {uniqueYears.map(year => (
                            <th
                                key={year}
                                className="px-4 py-3 w-28 text-center" // Căn giữa cột điểm
                            >
                                Điểm {year}
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                    {majorSearchList.map((university, universityIndex) => (
                        university.majorDetails.map((major, majorIndex) => {
                            const isFirstMajor = majorIndex === 0;
                            const rowSpan = getUniversityRowSpan(university.majorDetails);
                            
                            return (
                                <tr 
                                    key={`${universityIndex}-${majorIndex}`} 
                                    className="hover:bg-blue-50/50 transition-colors duration-150"
                                >
                                    {/* --- Cột STT --- */}
                                    {isFirstMajor && (
                                        <td
                                            className="px-4 py-3 text-center text-slate-400 border-r border-slate-100 align-top"
                                            rowSpan={rowSpan}
                                        >
                                            {universityIndex + 1}
                                        </td>
                                    )}
                                    
                                    {/* --- Cột Tên Trường --- */}
                                    {isFirstMajor && (
                                        <td
                                            className="px-4 py-3 font-bold text-blue-700 border-r border-slate-100 align-top"
                                            rowSpan={rowSpan}
                                        >
                                            <Link 
                                                href="#"
                                                className="hover:underline flex items-center gap-1"
                                            >
                                                {university.universityName}
                                                <ExternalLink size={12} className="text-blue-500 min-w-[12px]"/>
                                            </Link>
                                            {/* <span className="block text-xs text-slate-500 font-medium mt-0.5">
                                                Mã: {university.universityCode}
                                            </span> */}
                                        </td>
                                    )}
                                    
                                    {/* --- Cột Tên Ngành (Chi tiết) --- */}
                                    <td className="px-4 py-3 font-medium text-slate-800 border-r border-slate-100">
                                        {major.majorName}
                                    </td>
                                    
                                    {/* --- Cột Tổ hợp môn --- */}
                                    <td className="px-4 py-3 text-center text-slate-600 border-r border-slate-100">
                                        {major.subjectCombinations ? (
                                            <span className="inline-block bg-slate-100 px-2 py-0.5 rounded text-xs text-slate-600 font-medium border border-slate-200">
                                                {major.subjectCombinations}
                                            </span>
                                        ) : "-"}
                                    </td>
                                    
                                    {/* --- Cột Điểm chuẩn theo năm --- */}
                                    {uniqueYears.map(year => (
                                        <td
                                            key={year}
                                            className="px-4 py-3 text-center"
                                        >
                                            <span className={`font-bold text-base ${
                                                getScoreForYear(major.scores, year) !== '-' ? 'text-green-600' : 'text-slate-400'
                                            }`}>
                                                {getScoreForYear(major.scores, year)}
                                            </span>
                                        </td>
                                    ))}
                                </tr>
                            );
                        })
                    ))}
                </tbody>
            </table>
        </div>
    );
}