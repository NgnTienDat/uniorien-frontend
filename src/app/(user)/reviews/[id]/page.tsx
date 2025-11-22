import { ReviewSection } from "@/app/(user)/reviews/[id]/ReviewSection";
import { UniversityAbout } from "@/app/(user)/reviews/[id]/UniversityAbout";
import { UniversityCampus } from "@/app/(user)/reviews/[id]/UniversityCampus";
import { UniversityHeader } from "@/app/(user)/reviews/[id]/UniversityHeader";
import Container from "@/components/ui/container";
import { getUniversityComments, getUniversityDetail } from "@/services/reviewServices";
import Link from "next/link";
import { ArrowLeft, ChevronRight } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const university = await getUniversityDetail(id);
    return {
        title: `${university.universityName} - Đánh giá | UniOrien`,
        description: university.about || `Xem đánh giá về ${university.universityName}`,
    };
}

export default async function UniversityPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const [university, initialReviews] = await Promise.all([
        getUniversityDetail(id),
        getUniversityComments(id),
    ]);

    return (
        <Container>
            <div className="min-h-screen py-6">
                {/* --- BREADCRUMB --- */}
                <Link
                    href="/reviews"
                    className="inline-flex items-center text-slate-500 hover:text-blue-600 transition-colors text-sm font-medium mb-6"
                >
                    <ArrowLeft size={16} className="mr-1" /> Quay lại danh sách
                </Link>

                <div className="max-w-5xl mx-auto space-y-6">
                    <UniversityHeader
                        university={university}
                        reviewCount={initialReviews.length}
                    />

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Left Column: Main Info */}
                        <div className="lg:col-span-2 space-y-6">
                            <UniversityAbout about={university?.about} />
                            <UniversityCampus images={university?.campusImages} />
                            <ReviewSection
                                universityCode={id}
                                universityId={university.universityId}
                                initialReviews={initialReviews}
                            />
                        </div>

                        {/* Right Column: Sidebar Info (Giả lập thêm thông tin bên lề nếu cần) */}
                        <div className="space-y-6">
                            <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 sticky top-6">
                                <h3 className="font-bold text-slate-800 mb-3">Thông tin nhanh</h3>
                                <ul className="space-y-3 text-sm text-slate-600">
                                    <li className="flex justify-between border-b border-slate-100 pb-2">
                                        <span>Mã trường:</span>
                                        <span className="font-bold text-blue-600">{university.universityCode}</span>
                                    </li>
                                    <li className="flex justify-between border-b border-slate-100 pb-2">
                                        <span>Loại hình:</span>
                                        <span className="font-medium">Công lập</span>
                                    </li>
                                    <li className="flex justify-between pt-1">
                                        <span>Website:</span>
                                        <a href="#" className="text-blue-500 hover:underline">Truy cập</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
}