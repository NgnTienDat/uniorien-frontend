import Container from "@/components/ui/container";
import { getUniversities } from "@/services/universityServices";
import BenchmarkClient from "./BenchmarkClient";

export const metadata = {
  title: "Tra cứu điểm chuẩn đại học năm 2025 | UniBenchmarks",
  description:
    "Xem điểm chuẩn, phương thức tuyển sinh, và thông tin chi tiết các trường đại học năm 2025.",
};

export default async function BenchmarkPage() {
  const universities = await getUniversities();

  return (
    <Container>
      <div className="min-h-screen py-6">
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-6 ">
          Tra cứu điểm chuẩn đại học năm 2025
        </h1>

        <div className="w-full h-40 sm:h-56 md:h-64 bg-white border rounded-xl flex items-center justify-center shadow-sm mb-6">
          <p className="text-gray-500 italic">
            Tin tức chính sẽ hiển thị ở đây
          </p>
        </div>

        <BenchmarkClient universities={universities} />
      </div>
    </Container>
  );
}