import ReviewClient from "@/app/(user)/reviews/ReviewClient";
import Container from "@/components/ui/container";
import { getUniversityReviews } from "@/services/reviewServices";

export const metadata = {
    title: "Review các trường Đại học | UniBenchmarks",
    description: "Xem đánh giá và nhận xét về các trường đại học từ sinh viên.",
};

export default async function ReviewPage() {
    const universities = await getUniversityReviews();

    return (
        <Container>
            <div className="min-h-screen py-6">
                <h1 className="text-2xl md:text-3xl font-bold text-center mb-6">
                    Review các trường Đại học
                </h1>

                <div className="w-full h-40 sm:h-56 md:h-64 bg-white shadow-sm border rounded-xl flex items-center justify-center mb-6">
                    <p className="text-gray-500 italic">
                        Tin tức chính sẽ hiển thị ở đây
                    </p>
                </div>

                <ReviewClient universities={universities} />
            </div>
        </Container>
    );
}