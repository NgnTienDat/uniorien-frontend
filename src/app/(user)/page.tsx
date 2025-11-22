import Container from '@/components/ui/container'
import React from 'react'
import { Search, BookOpen, Calendar, ArrowRight, GraduationCap, Bell, Menu } from 'lucide-react'

// Mock Data
const categories = ["Tất cả", "Tuyển sinh 2025", "Review Đại học", "Học bổng", "Kỹ năng mềm"];

const featuredPosts = [
    {
        id: 1,
        title: "Phương án tuyển sinh ĐH Bách Khoa 2025",
        summary: "Chi tiết về tỉ lệ xét tuyển các phương thức và điểm chuẩn dự kiến năm nay.",
        tag: "Tuyển sinh",
        date: "2h trước",
        color: "bg-blue-50 text-blue-700",
    },
    {
        id: 2,
        title: "Review chân thực: Ngành IT học gì?",
        summary: "Góc nhìn từ sinh viên năm cuối về chương trình đào tạo và cơ hội việc làm.",
        tag: "Góc nhìn",
        date: "1 ngày trước",
        color: "bg-sky-50 text-sky-700",
    },
    {
        id: 3,
        title: "Top 5 học bổng toàn phần cho 2k7",
        summary: "Tổng hợp các học bổng có giá trị cao đang mở đơn đăng ký trong tháng này.",
        tag: "Học bổng",
        date: "3 ngày trước",
        color: "bg-indigo-50 text-indigo-700",
    },
    {
        id: 4,
        title: "Bí quyết đạt 900+ Toeic trong 3 tháng",
        summary: "Lộ trình tự học tiếng Anh hiệu quả dành cho tân sinh viên.",
        tag: "Kỹ năng",
        date: "5 ngày trước",
        color: "bg-slate-100 text-slate-700",
    },
];

function UserPage() {
    return (
        <Container>
            <div className="py-6 font-sans text-slate-800 space-y-8 min-h-screen">

              

                {/* --- 2. HERO BANNER (Bo tròn trong Container) --- */}
                <div className="relative bg-gradient-to-br from-blue-700 via-blue-600 to-sky-500 rounded-3xl p-8 md:p-12 text-white shadow-xl overflow-hidden">
                    {/* Decorative Circles */}
                    <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-white/10 blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 -ml-10 -mb-10 w-40 h-40 rounded-full bg-blue-400/20 blur-2xl"></div>

                    <div className="relative z-10 max-w-2xl">

                        <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                            Định hướng tương lai, <br /> vững bước vào Đại học.
                        </h1>

                        {/* Search Bar Inside Banner */}
                        <div className="bg-white p-2 rounded-2xl shadow-lg flex items-center max-w-md">
                            <Search className="ml-3 text-slate-400" size={20} />
                            <input
                                type="text"
                                placeholder="Tìm trường, ngành, học bổng..."
                                className="flex-1 p-2 outline-none text-slate-700 placeholder:text-slate-400"
                            />
                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl font-medium transition-colors">
                                Tìm kiếm
                            </button>
                        </div>
                    </div>
                </div>

                {/* --- 3. CATEGORY TABS --- */}
                <div className="flex overflow-x-auto pb-2 gap-2 no-scrollbar">
                    {categories.map((cat, index) => (
                        <button
                            key={index}
                            className={`px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${index === 0
                                    ? 'bg-blue-600 text-white shadow-md shadow-blue-200'
                                    : 'bg-white border border-slate-200 text-slate-600 hover:border-blue-300 hover:text-blue-600'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* --- 4. MAIN CONTENT GRID --- */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left Column: Featured Feed */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                                <BookOpen size={20} className="text-blue-600" /> Tin mới nhất
                            </h2>
                        </div>

                        <div className="space-y-4">
                            {featuredPosts.map((post) => (
                                <div key={post.id} className="group bg-white border border-slate-100 p-5 rounded-2xl hover:shadow-lg hover:border-blue-100 transition-all duration-300 cursor-pointer flex flex-col sm:flex-row gap-5">
                                    {/* Thumbnail Placeholder */}
                                    <div className="w-full sm:w-48 h-32 rounded-xl bg-slate-100 flex-shrink-0 overflow-hidden relative">
                                        <div className="absolute inset-0 bg-slate-200 flex items-center justify-center text-slate-400 group-hover:scale-105 transition-transform">
                                            {/* Giả lập ảnh */}
                                            <span className="text-xs uppercase font-bold">Thumbnail</span>
                                        </div>
                                    </div>

                                    <div className="flex-1 flex flex-col justify-between">
                                        <div>
                                            <div className="flex items-center gap-3 mb-2">
                                                <span className={`text-xs font-bold px-2 py-1 rounded-md ${post.color}`}>
                                                    {post.tag}
                                                </span>
                                                <span className="text-xs text-slate-400 flex items-center gap-1">
                                                    <Calendar size={12} /> {post.date}
                                                </span>
                                            </div>
                                            <h3 className="text-lg font-bold text-slate-800 group-hover:text-blue-600 transition-colors line-clamp-2 mb-2">
                                                {post.title}
                                            </h3>
                                            <p className="text-sm text-slate-500 line-clamp-2">
                                                {post.summary}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="w-full py-3 mt-4 text-sm font-medium text-slate-500 hover:text-blue-600 bg-slate-50 rounded-xl hover:bg-blue-50 transition-colors">
                            Xem thêm bài viết
                        </button>
                    </div>

                    {/* Right Column: Sidebar Info */}
                    <div className="space-y-6">
                        {/* Event Widget */}
                        <div className="bg-blue-900 text-white p-6 rounded-2xl shadow-lg">
                            <h3 className="font-bold text-lg mb-4 border-b border-blue-700 pb-2">Sự kiện sắp tới</h3>
                            <ul className="space-y-4">
                                <li className="flex gap-3">
                                    <div className="bg-blue-700/50 w-12 h-12 rounded-lg flex flex-col items-center justify-center flex-shrink-0">
                                        <span className="text-xs text-blue-200">TH 08</span>
                                        <span className="font-bold text-lg">25</span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold hover:text-blue-200 cursor-pointer">Ngày hội tư vấn tuyển sinh Open Day</p>
                                        <p className="text-xs text-blue-300 mt-1">08:00 AM - ĐH Quốc Gia</p>
                                    </div>
                                </li>
                                <li className="flex gap-3">
                                    <div className="bg-blue-700/50 w-12 h-12 rounded-lg flex flex-col items-center justify-center flex-shrink-0">
                                        <span className="text-xs text-blue-200">TH 09</span>
                                        <span className="font-bold text-lg">02</span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold hover:text-blue-200 cursor-pointer">Hạn nộp hồ sơ xét tuyển đợt 1</p>
                                        <p className="text-xs text-blue-300 mt-1">Toàn quốc</p>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        {/* Newsletter Widget */}
                        {/* <div className="bg-white border border-slate-200 p-6 rounded-2xl">
                            <h3 className="font-bold text-slate-800 mb-2">Nhận tin tức UniOrien</h3>
                            <p className="text-sm text-slate-500 mb-4">Cập nhật thông tin tuyển sinh mới nhất qua email.</p>
                            <div className="space-y-2">
                                <input type="email" placeholder="Email của bạn" className="w-full px-4 py-2 rounded-lg bg-slate-50 border border-slate-200 focus:outline-none focus:border-blue-500 text-sm" />
                                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-medium transition-colors">
                                    Đăng ký
                                </button>
                            </div>
                        </div> */}
                    </div>
                </div>

                

            </div>
        </Container>
    )
}

export default UserPage