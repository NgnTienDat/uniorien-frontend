import ReviewClient from "@/app/(user)/reviews/ReviewClient";
import Container from "@/components/ui/container";
import { getUniversityReviews } from "@/services/reviewServices";
import { MessageSquareQuote, Star } from "lucide-react";

export const metadata = {
    title: "Review trường Đại học | UniOrien",
    description: "Cộng đồng đánh giá và chia sẻ trải nghiệm thực tế về các trường đại học.",
};

export default async function ReviewPage() {
    const universities = await getUniversityReviews();

    return (
        <Container>
            <div className="min-h-screen py-8 font-sans text-slate-800 space-y-10">
                
                {/* --- HERO SECTION --- */}
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-800 to-indigo-900 text-white shadow-xl p-8 md:p-12">
                    {/* Background decorations */}
                    <div className="absolute top-0 right-0 -mr-10 -mt-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-10 w-32 h-32 bg-blue-400/20 rounded-full blur-2xl"></div>

                    <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
                        <div className="inline-flex items-center justify-center p-3 bg-white/10 backdrop-blur-sm rounded-full mb-2 ring-1 ring-white/20">
                            <MessageSquareQuote size={32} className="text-blue-200" />
                        </div>
                        <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
                            Góc nhìn chân thực từ <br/>
                            <span className="text-blue-300">Cộng đồng sinh viên</span>
                        </h1>
                        <p className="text-blue-100 text-lg md:text-xl font-light max-w-2xl mx-auto">
                            Khám phá hàng ngàn đánh giá về cơ sở vật chất, giảng viên và môi trường học tập để đưa ra lựa chọn đúng đắn nhất.
                        </p>
                        
                        <div className="flex justify-center gap-6 pt-4 text-sm font-medium text-blue-200">
                            <div className="flex items-center gap-2">
                                <Star className="text-yellow-400 fill-yellow-400" size={16} /> 
                                <span>Đánh giá minh bạch</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                <span>Cập nhật liên tục</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- MAIN CLIENT CONTENT --- */}
                <ReviewClient universities={universities} />
            </div>
        </Container>
    );
}