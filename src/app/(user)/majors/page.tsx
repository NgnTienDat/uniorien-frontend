import Container from "@/components/ui/container";
import { UOSelectBox } from "@/components/common/UOSelectBox";
import { Search } from "lucide-react";
import MajorGroupList from "@/app/(user)/majors/MajorGroupList";

// Dữ liệu có thể fetch từ backend, nhưng tạm hardcode
const majorGroups = [
    {
        id: 1,
        name: "Kỹ thuật - Công nghệ",
        majors: [
            "Kỹ thuật phần mềm",
            "Khoa học máy tính",
            "Công nghệ thông tin",
            "Hệ thống thông tin",
            "An toàn thông tin",
            "Trí tuệ nhân tạo",
        ],
    },
    {
        id: 2,
        name: "Kinh tế - Quản lý",
        majors: [
            "Kinh tế học",
            "Quản trị kinh doanh",
            "Marketing",
            "Tài chính - Ngân hàng",
            "Kế toán",
        ],
    },
    {
        id: 3,
        name: "Khoa học Xã hội & Nhân văn",
        majors: [
            "Tâm lý học",
            "Xã hội học",
            "Báo chí",
            "Ngôn ngữ Anh",
            "Ngôn ngữ Trung Quốc",
        ],
    },
    {
        id: 4,
        name: "Giáo dục - Sư phạm",
        majors: [
            "Giáo dục tiểu học",
            "Sư phạm Toán học",
            "Sư phạm Ngữ văn",
            "Sư phạm Anh",
        ],
    },
];

export default function MajorPage() {
    return (
        <Container>
            <div className="min-h-screen py-6">
                {/* Tiêu đề */}
                <h1 className="text-2xl md:text-3xl font-bold text-center mb-6">
                    Tra cứu ngành đào tạo năm học 2025
                </h1>

                {/* Banner */}
                <div className="w-full h-40 sm:h-56 md:h-64 bg-white border rounded-xl flex items-center justify-center mb-6">
                    <p className="text-gray-500 italic">Tin tức chính sẽ hiển thị ở đây</p>
                </div>

                {/* Ô tìm kiếm + chọn tỉnh */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-6">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Nhập tên ngành đào tạo"
                            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none bg-white"
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
