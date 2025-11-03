import AdmissionList from "@/app/(user)/benchmarks/[code]/AdmissionList";
import Container from "@/components/ui/container";
import { getDetailUniversityAdmission } from "@/services/universityServices";
import Link from "next/link";

export default async function UniversityAdmission({
    params,
    searchParams,
}: {
    params: Promise<{ code: string }>;
    searchParams: Promise<{ year?: string; admissionMethod?: string }>;
}) {
    const { code } = await params;
    const { year, admissionMethod } = await searchParams;

    const admissionDetails = await getDetailUniversityAdmission(code, year, admissionMethod);



    return (
        <Container>
            <div className="min-h-screen py-6">
                {/* Tiêu đề + Link */}
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                        Điểm chuẩn{" "}
                        <span className="text-blue-600">
                            {admissionDetails.universityName}
                        </span>{" "}
                        năm học 2025
                    </h1>

                    <Link
                        href={admissionDetails.website}
                        target="_blank"
                        className="text-blue-500 hover:underline text-sm md:text-base"
                    >
                        → Xem đánh giá/nhận xét về trường
                    </Link>
                </div>

                {/* Thông tin thêm */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6 shadow-sm">
                    <h3 className="font-semibold mb-2 text-gray-700">
                        Thông tin thêm
                    </h3>
                    <p className="text-sm text-gray-600 italic">
                        Thông tin về tuyển sinh sẽ được cập nhật sớm nhất từ
                        nguồn chính thức của trường.
                    </p>
                </div>

                <div className="bg-white py-3 px-4 rounded-lg mb-6 shadow-sm border border-gray-200">

                    {admissionDetails?.admissionList?.length > 0 ? (
                        <div>
                            <h4 className="font-semibold text-lg mb-2 text-gray-700">
                                Các phương thức xét tuyển
                            </h4>
                            <div className="text-blue-500 text-lg space-y-0.5 font-semibold">
                                {admissionDetails.admissionList.map((item, index) => (
                                    <p key={index}>{item.admissionMethod} {item.admissionYear}</p>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <p className="text-gray-500 italic mt-2">
                            Thông tin xét tuyển sẽ sớm được cập nhật.
                        </p>
                    )}
                </div>


                {/* Danh sách phương thức xét tuyển và điểm chuẩn */}
                {admissionDetails?.admissionList ? (
                    <AdmissionList
                        admissionList={admissionDetails.admissionList}
                        universityCode={admissionDetails.universityCode}
                    />
                ) : null}


            </div>
        </Container>
    );
}
