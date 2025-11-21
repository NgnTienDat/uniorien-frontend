import Container from "@/components/ui/container";
import { UOSelectBox } from "@/components/UOSelectBox";
import { Search, Sparkles, TrendingUp, BookOpen } from "lucide-react";
import MajorGroupList from "@/app/(user)/majors/MajorGroupList";
import { getMajorGroups } from "@/services/majorServices";

export const metadata = {
    title: "Danh mục ngành đào tạo 2025 | UniOrien",
    description: "Tra cứu thông tin chi tiết các nhóm ngành, mã ngành và xu hướng nghề nghiệp năm 2025.",
};

export default async function MajorPage() {
    // Fetch dữ liệu từ Server
    const majorGroups = await getMajorGroups();

    return (
        <Container>
            <div className="min-h-screen py-10 space-y-10 font-sans text-slate-800">

                {/* --- 1. HEADER SECTION --- */}
                <div className="text-center max-w-2xl mx-auto space-y-3">

                    <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                        Danh mục <span className="text-blue-600">Ngành Đào Tạo</span>
                    </h1>
                    <p className="text-slate-500 text-lg">
                        Khám phá lộ trình nghề nghiệp tương lai với dữ liệu chi tiết về các nhóm ngành hot nhất năm 2025.
                    </p>
                </div>

                {/* --- 2. HERO BANNER (TRENDING MAJORS) --- 
            Thay thế placeholder bằng Banner "Xu hướng"
        */}
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-700 to-indigo-800 text-white shadow-xl">
                    {/* Decorative Background */}
                    <div className="absolute top-0 right-0 -mr-20 -mt-20 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-10 w-32 h-32 bg-blue-400/20 rounded-full blur-2xl"></div>

                    <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 p-8 md:p-10 items-center">
                        <div className="space-y-4">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/30 border border-blue-400/30 text-sm font-medium text-blue-100 backdrop-blur-md">
                                <Sparkles size={14} />
                                <span>Xu hướng 2025</span>
                            </div>
                            <h2 className="text-2xl md:text-3xl font-bold leading-tight">
                                Nhóm ngành Công nghệ & Dữ liệu đang dẫn đầu
                            </h2>
                            <p className="text-blue-100 text-sm md:text-base leading-relaxed max-w-md">
                                Theo thống kê mới nhất, nhu cầu nhân lực ngành AI, Khoa học dữ liệu và An toàn thông tin dự kiến tăng 150% trong năm nay.
                            </p>
                            <button className="mt-2 px-5 py-2.5 bg-white text-blue-700 font-semibold rounded-xl hover:bg-blue-50 transition-colors shadow-md inline-flex items-center gap-2">
                                Xem chi tiết <TrendingUp size={16} />
                            </button>
                        </div>

                        {/* Right Side: Stats / Decorative Cards */}
                        <div className="hidden md:flex gap-4 justify-end">
                            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/10 w-40">
                                <div className="h-8 w-8 rounded-full bg-orange-400 mb-3 flex items-center justify-center">
                                    <span className="font-bold text-white text-xs">IT</span>
                                </div>
                                <div className="text-2xl font-bold">Top 1</div>
                                <div className="text-xs text-blue-200 mt-1">Công nghệ thông tin</div>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/10 w-40 translate-y-4">
                                <div className="h-8 w-8 rounded-full bg-green-500 mb-3 flex items-center justify-center">
                                    <span className="font-bold text-white text-xs">MKT</span>
                                </div>
                                <div className="text-2xl font-bold">Top 2</div>
                                <div className="text-xs text-blue-200 mt-1">Digital Marketing</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- 3. SEARCH & FILTER BAR --- 
            Gộp chung vào một khối thống nhất (Control Bar)
        */}
                {/* Thanh tìm kiếm */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-8">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Nhập tên ngành đào tạo..."
                            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none bg-white  shadow-sm"
                        />
                    </div>
                    <UOSelectBox />
                </div>

                {/* --- 4. MAJOR LIST SECTION --- */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between px-2">
                        <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                            <BookOpen size={20} className="text-blue-600" />
                            Tất cả nhóm ngành
                        </h3>
                        <span className="text-sm text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                            {majorGroups ? majorGroups.length : 0} nhóm ngành
                        </span>
                    </div>

                    {/* Wrapper cho List để đảm bảo spacing */}
                    <div className="min-h-[400px]">
                        <MajorGroupList groups={majorGroups} />
                    </div>
                </div>

            </div>
        </Container>
    );
}