import MajorSearchList from "@/app/(user)/majors/[major]/MajorSearchList";
import { UOSelectBox } from "@/components/UOSelectBox";
import Container from "@/components/ui/container";
import { getMajorRelatedMajorSearching } from "@/services/majorServices";



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
    console.log("MajorSearchPage params:", decodedMajor);

    const majors = await getMajorRelatedMajorSearching(decodedMajor, "điểm thi thpt", "");

    return (
        <Container>
            <div className="min-h-screen py-6">
                <h1 className="text-2xl md:text-3xl font-bold text-center mb-6">
                    Ngành <span className="text-blue-600">{decodedMajor}</span> - Danh sách các trường đào tạo
                </h1>

                <div className="w-full h-40 sm:h-56 md:h-64 bg-white border rounded-xl flex items-center justify-center mb-6">
                    <p className="text-gray-500 italic">
                        Tin tức chính sẽ hiển thị ở đây
                    </p>
                </div>
                <div className=" py-3 flex justify-end">
                    <UOSelectBox />
                </div>
                <MajorSearchList majorSearchList={majors} />

            </div>
        </Container>
    );
}