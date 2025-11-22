import Container from "@/components/ui/container";
import { getUniversities } from "@/services/universityServices";
import BenchmarkClient from "./BenchmarkClient";
import { TrendingUp, Info, School } from "lucide-react";

export const metadata = {
  title: "Tra cứu điểm chuẩn đại học năm 2025 | UniOrien",
  description: "Xem điểm chuẩn, phương thức tuyển sinh, và thông tin chi tiết các trường đại học năm 2025.",
};

export default async function BenchmarkPage() {
  // Fetch dữ liệu từ Server (giữ nguyên)
  const universities = await getUniversities();

  return (
    <Container>
      <div className="min-h-screen py-10 space-y-8 font-sans text-slate-800">

        {/* --- 1. PAGE HEADER --- */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center p-2 bg-blue-50 text-blue-700 rounded-full mb-2">
            <School size={20} className="mr-2" />
            <span className="text-sm font-semibold tracking-wide uppercase">Cổng thông tin dữ liệu 2025</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            <span className="bg-gradient-to-r from-blue-800 to-blue-500 bg-clip-text text-transparent">
              Tra cứu Điểm chuẩn
            </span>{" "}
            Đại học
          </h1>

          <p className="text-slate-500 text-lg">
            Hệ thống cập nhật liên tục dữ liệu điểm chuẩn, phương thức xét tuyển và chỉ tiêu của hơn 200 trường đại học trên cả nước.
          </p>
        </div>

        {/* --- 2. FEATURED / NEWS BANNER --- 
            Thay thế placeholder cũ bằng một Banner chuyên nghiệp hơn 
        */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Cột tin nổi bật chính */}
          <div className="md:col-span-2 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-6 text-white shadow-lg flex flex-col justify-between relative overflow-hidden">
            {/* Decoration */}
            <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>

            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-3 text-blue-100">
                <TrendingUp size={18} />
                <span className="text-sm font-medium uppercase">Tin nóng tuyển sinh</span>
              </div>
              <h3 className="text-2xl font-bold mb-2">Công bố điểm sàn xét tuyển 2025</h3>
              <p className="text-blue-100/90 text-sm mb-4 max-w-md">
                Bộ GD&ĐT vừa chính thức công bố ngưỡng đảm bảo chất lượng đầu vào cho khối ngành Sức khỏe và Sư phạm. Xem chi tiết ngay.
              </p>
            </div>
            <button className="w-fit bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Xem chi tiết
            </button>
          </div>

          {/* Cột thống kê nhỏ / Hướng dẫn */}
          <div className="bg-white border border-blue-100 rounded-2xl p-6 shadow-sm flex flex-col justify-center space-y-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-blue-50 rounded-lg text-blue-600 mt-1">
                <Info size={20} />
              </div>
              <div>
                <h4 className="font-bold text-slate-800">Hướng dẫn tra cứu</h4>
                <p className="text-sm text-slate-500 mt-1">
                  Nhập tên trường hoặc mã trường vào ô tìm kiếm bên dưới để xem chi tiết lịch sử điểm chuẩn 3 năm gần nhất.
                </p>
              </div>
            </div>
            <div className="h-px bg-slate-100 w-full"></div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-500">Dữ liệu trường:</span>
              <span className="font-bold text-blue-700">{universities ? universities.length : 0}+ Trường</span>
            </div>
          </div>
        </div>

        {/* --- 3. MAIN CLIENT COMPONENT WRAPPER --- 
            Tạo một khung (Card) cho Client Component để tách biệt
        */}
        <div>
          {/* Truyền data vào Client Component */}
          <BenchmarkClient universities={universities} />
        </div>

      </div>
    </Container>
  );
}