// app/(user)/majors/[major]/page.tsx
import MajorSearchList from "@/app/(user)/majors/[major]/MajorSearchList";
import { UOSelectBox } from "@/components/UOSelectBox";
import Container from "@/components/ui/container";
import { searchMajorsByName } from "@/services/majorServices";
import { ArrowLeft, Filter, SquareActivity } from "lucide-react";
import Link from "next/link";

// ✅ Generate metadata dynamically
export async function generateMetadata({
    params
}: {
    params: Promise<{ major: string }>
}) {
    const { major } = await params;
    const decodedMajor = decodeURIComponent(major);

    return {
        title: `Ngành ${decodedMajor} - Điểm chuẩn 2025 | UniOrien`,
        description: `Tra cứu điểm chuẩn và danh sách trường đại học đào tạo ngành ${decodedMajor} năm 2025`,
    };
}

// ✅ Server Component with async params
export default async function MajorSearchPage({
    params,
    searchParams,
}: {
    params: Promise<{ major: string }>;
    searchParams: Promise<{ admissionMethod?: string; location?: string }>;
}) {
    const { major } = await params;
    const { admissionMethod, location } = await searchParams;

    const decodedMajor = decodeURIComponent(major);

    // ✅ Default admission method
    const currentAdmissionMethod = admissionMethod || "điểm thi thpt";

    // ✅ Direct call to Spring Boot via searchMajorsByName()
    const majors = await searchMajorsByName(
        decodedMajor,
        currentAdmissionMethod,
        location || ""
    );

    return (
        <Container>
            <div className="min-h-screen py-6">
                {/* --- BREADCRUMB --- */}
                <Link
                    href="/majors"
                    className="inline-flex items-center text-slate-500 hover:text-blue-600 transition-colors text-sm font-medium mb-6"
                >
                    <ArrowLeft size={16} className="mr-1" /> Quay lại danh sách
                </Link>

                {/* --- HEADER --- */}
                <h1 className="text-2xl md:text-4xl font-extrabold text-center mb-4 text-slate-800">
                    Ngành <span className="text-blue-600">{decodedMajor}</span>
                </h1>
                <p className="text-center text-slate-500 mb-8">
                    Danh sách các trường đại học đào tạo và điểm chuẩn tương ứng.
                </p>

                {/* --- NEWS BANNER --- */}
                <div className="w-full h-40 sm:h-56 md:h-64 bg-blue-50 border border-blue-200 rounded-xl flex flex-col items-center justify-center p-6 mb-8 shadow-inner">
                    <SquareActivity size={32} className="text-blue-500 mb-2" />
                    <h2 className="text-xl font-semibold text-blue-700">Góc Tin Tức Ngành</h2>
                    <p className="text-blue-600/80 italic text-center mt-1">
                        Các thông tin mới nhất về cơ hội nghề nghiệp, xu hướng và yêu cầu của ngành sẽ hiển thị ở đây.
                    </p>
                </div>

                {/* --- FILTERS --- */}
                <div className="flex flex-col md:flex-row items-end justify-between gap-4 mb-6 p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="flex items-center gap-2 text-slate-600 font-medium">
                        <Filter size={20} />
                        <span>Bộ lọc tìm kiếm:</span>
                    </div>

                    <div className="flex gap-4 w-full md:w-auto">
                        {/* TODO: Implement filter components */}
                        {/* These should use URL search params for filtering */}
                    </div>
                </div>

                {/* --- RESULT LIST --- */}
                {majors && majors.length > 0 ? (
                    <MajorSearchList majorSearchList={majors} />
                ) : (
                    <div className="text-center py-12 text-slate-500">
                        <p className="text-lg">Không tìm thấy kết quả phù hợp</p>
                        <p className="text-sm mt-2">Vui lòng thử với bộ lọc khác</p>
                    </div>
                )}
            </div>
        </Container>
    );
}