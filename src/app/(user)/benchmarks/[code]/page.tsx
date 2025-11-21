import AdmissionList from "@/app/(user)/benchmarks/[code]/AdmissionList";
import Container from "@/components/ui/container";
import { getUniversityAdmissionDetails } from "@/services/universityServices";
import Link from "next/link";
import { School, ExternalLink, Info, ArrowLeft, ListChecks, ShieldCheck } from "lucide-react";

export default async function UniversityAdmission({
    params,
    searchParams,
}: {
    params: Promise<{ code: string }>;
    searchParams: Promise<{ year?: string; admissionMethod?: string }>;
}) {
    // Unbox params
    const { code } = await params;
    const { year, admissionMethod } = await searchParams;

    // Fetch Data
    const admissionDetails = await getUniversityAdmissionDetails(
        code,
        year,
        admissionMethod
    );

    return (
        <Container>
            <div className="min-h-screen py-8 font-sans text-slate-800 space-y-6">
                
                {/* --- 1. BREADCRUMB / BACK LINK --- */}
                <Link 
                    href="/benchmarks" 
                    className="inline-flex items-center text-slate-500 hover:text-blue-600 transition-colors text-sm font-medium"
                >
                    <ArrowLeft size={16} className="mr-1" /> Quay lại danh sách
                </Link>

                {/* --- 2. HEADER CARD (PROFILE TRƯỜNG) --- */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
                    <div className="flex items-start gap-4 md:gap-6">
                        {/* Logo Placeholder / Icon */}
                        <div className="w-16 h-16 md:w-20 md:h-20 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 flex-shrink-0 border border-blue-100">
                            <School size={40} strokeWidth={1.5} />
                        </div>
                        
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2.5 py-0.5 rounded border border-blue-200">
                                    MÃ: {admissionDetails.universityCode || code.toUpperCase()}
                                </span>
                                <span className="text-slate-400 text-xs font-medium uppercase">
                                    Năm tuyển sinh: 2025
                                </span>
                            </div>
                            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 leading-tight">
                                {admissionDetails.universityName}
                            </h1>
                            <p className="text-slate-500 text-sm mt-1">
                                Tra cứu điểm chuẩn, chỉ tiêu và phương thức xét tuyển chính thức.
                            </p>
                        </div>
                    </div>

                    {/* Action Button */}
                    <Link
                        href={admissionDetails.website || "#"}
                        target="_blank"
                        className="group flex items-center gap-2 px-5 py-2.5 bg-slate-50 text-slate-700 font-semibold rounded-xl hover:bg-blue-600 hover:text-white transition-all border border-slate-200 hover:border-blue-600 whitespace-nowrap"
                    >
                        <span>Website nhà trường</span>
                        <ExternalLink size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* --- 3. LEFT COLUMN: MAIN CONTENT (ADMISSION LIST) --- */}
                    <div className="lg:col-span-3 space-y-6">
                        
                        {/* Section Title */}
                        <div className="flex items-center justify-between">
                             <h2 className="text-xl font-bold flex items-center gap-2 text-slate-800">
                                <ListChecks className="text-blue-600" /> Bảng điểm chuẩn chi tiết
                            </h2>
                        </div>

                        {/* Main List Component Wrapper */}
                        <div className="rounded-xl  overflow-hidden min-h-[400px]">
                            {admissionDetails?.admissionList?.length > 0 ? (
                                <AdmissionList
                                    admissionList={admissionDetails.admissionList}
                                    universityCode={admissionDetails.universityCode}
                                />
                            ) : (
                                <div className="p-10 text-center text-slate-500">
                                    Chưa có dữ liệu hiển thị
                                </div>
                            )}
                        </div>
                    </div>

                    {/* --- 4. RIGHT COLUMN: SIDEBAR INFO --- */}
                    <div className="space-y-6">
                        
                        {/* Info Alert Box */}
                        <div className="bg-sky-50 border border-sky-100 rounded-2xl p-5 relative overflow-hidden">
                            <div className="flex items-start gap-3 relative z-10">
                                <Info className="text-sky-600 shrink-0 mt-0.5" size={20} />
                                <div>
                                    <h3 className="font-bold text-sky-900 mb-1">Lưu ý quan trọng</h3>
                                    <p className="text-sm text-sky-800/80 leading-relaxed">
                                        Thông tin về điểm chuẩn và chỉ tiêu được cập nhật liên tục từ nguồn chính thức của nhà trường. Vui lòng đối chiếu với website trường khi nộp hồ sơ.
                                    </p>
                                </div>
                            </div>
                            {/* Decoration */}
                            <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-sky-200/50 rounded-full blur-xl"></div>
                        </div>

                        {/* Admission Methods Summary Card */}
                        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                                <ShieldCheck size={18} className="text-blue-600" />
                                Phương thức xét tuyển
                            </h3>
                            
                            {admissionDetails?.admissionList?.length > 0 ? (
                                <div className="flex flex-col gap-2">
                                    {admissionDetails.admissionList.map((item, index) => (
                                        <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 hover:bg-blue-50 transition-colors border border-slate-100 hover:border-blue-100 group">
                                            <div className="w-2 h-2 rounded-full bg-blue-400 group-hover:bg-blue-600 transition-colors"></div>
                                            <span className="text-sm font-medium text-slate-700 group-hover:text-blue-700">
                                                {item.admissionMethod}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm text-slate-500 italic">
                                    Đang cập nhật...
                                </p>
                            )}
                        </div>

                        {/* Quick Stat (Optional) */}
                         <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-5 text-white shadow-lg">
                            <p className="text-blue-200 text-sm mb-1">Tổng số phương thức xét tuyển</p>
                            <p className="text-3xl font-bold">
                                {admissionDetails?.admissionList?.length || 0}+ <span className="text-lg font-normal text-blue-300">phương thức</span>
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </Container>
    );
}