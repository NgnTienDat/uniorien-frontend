import Container from "@/components/ui/container";
import { UOSelectBox } from "@/components/UOSelectBox";
import { Search } from "lucide-react";
import MajorGroupList from "@/app/(user)/majors/MajorGroupList";
import { getMajorGroups } from "@/services/majorServices";

export default async function MajorPage() {
    const majorGroups = await getMajorGroups();

    return (
        <Container>
            <div className="min-h-screen py-10 bg-gray-50">
                {/* Tiêu đề */}
                <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
                    Tra cứu ngành đào tạo năm học 2025
                </h1>

                {/* Banner */}
                <div className="w-full h-40 sm:h-56 md:h-64 bg-gradient-to-r from-blue-50 to-indigo-100 border rounded-2xl flex items-center justify-center mb-10 shadow-inner">
                    <p className="text-gray-500 italic">Tin tức chính sẽ hiển thị ở đây</p>
                </div>

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

                {/* Danh sách nhóm ngành */}
                <MajorGroupList groups={majorGroups} />
            </div>
        </Container>
    );
}
