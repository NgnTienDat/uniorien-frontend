import Link from 'next/link';
import React from 'react';
import { FaLinkedin, FaGithub, FaFacebook } from 'react-icons/fa';
import { Mail, Briefcase, GraduationCap } from 'lucide-react'; // Sử dụng thêm Lucide Icons

const Footer: React.FC = () => {
    return (
        <footer className="bg-blue-50 text-slate-700 py-10 border-t border-blue-100">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* --- Main Content Grid --- */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm md:divide-x md:divide-slate-200">

                    {/* --- 1. Thương hiệu & Mô tả --- */}
                    <div className="space-y-4 pr-6">
                        <h2 className="text-3xl font-extrabold text-blue-700 flex items-center gap-2">
                            <GraduationCap size={32} className="text-blue-500" />
                            UniOrien
                        </h2>
                        
                        <p className="text-slate-600 leading-relaxed">
                            Nền tảng tư vấn chọn trường đại học tích hợp AI ChatBot. 
                            Hỗ trợ thí sinh và phụ huynh tìm được trường, ngành học phù hợp dựa trên dữ liệu chuẩn xác.
                        </p>
                        
                        <div className="pt-2 text-xs text-slate-500 italic border-t border-slate-100">
                            <Briefcase size={16} className="inline mr-1 -mt-0.5 text-slate-400" /> 
                            Thiết kế &amp; Phát triển bởi Nguyễn Tiến Đạt - Sinh viên ngành Khoa học máy tính.
                        </div>
                    </div>

                    {/* --- 2. Liên kết điều hướng --- */}
                    <div className='px-6 md:pl-8'>
                        <h3 className="text-lg font-semibold mb-5 text-slate-800 border-b border-blue-500 pb-1 inline-block">
                            Liên Kết Nhanh
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <Link 
                                    href="/benchmarks" 
                                    className="text-blue-600 hover:text-blue-800 transition-colors font-medium flex items-center gap-2"
                                >
                                    <span className="text-xs">•</span> Tra cứu Điểm chuẩn
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    href="/majors" 
                                    className="text-blue-600 hover:text-blue-800 transition-colors font-medium flex items-center gap-2"
                                >
                                    <span className="text-xs">•</span> Tra cứu Ngành học
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    href="/about" 
                                    className="text-blue-600 hover:text-blue-800 transition-colors font-medium flex items-center gap-2"
                                >
                                    <span className="text-xs">•</span> Về UniOrien
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* --- 3. Thông tin liên hệ & Mạng xã hội --- */}
                    <div className='px-6 md:pl-8'>
                        <h3 className="text-lg font-semibold mb-5 text-slate-800 border-b border-blue-500 pb-1 inline-block">
                            Thông tin Liên Hệ
                        </h3>
                        
                        {/* Social Icons */}
                        <div className="flex items-center space-x-5 mb-5">
                            <a 
                                href="https://www.linkedin.com/in/dat-nguyen-7b3411297/" 
                                aria-label="LinkedIn Profile" 
                                className="text-2xl text-slate-500 hover:text-[#0A66C2] transition-colors" // Màu LinkedIn chính thức
                            >
                                <FaLinkedin />
                            </a>
                            <a 
                                href="https://github.com/NgnTienDat" 
                                aria-label="GitHub Profile" 
                                className="text-2xl text-slate-500 hover:text-[#171515] transition-colors" // Màu GitHub chính thức
                            >
                                <FaGithub />
                            </a>
                            <a 
                                href="https://www.facebook.com/gosoi.964" 
                                aria-label="Facebook Profile" 
                                className="text-2xl text-slate-500 hover:text-[#1877F2] transition-colors" // Màu Facebook chính thức
                            >
                                <FaFacebook />
                            </a>
                        </div>
                        
                        {/* Email */}
                        <p className="mt-4 flex items-center text-slate-600">
                            <Mail size={16} className="text-blue-500 mr-2" />
                            Email: 
                            <span className="text-blue-600 ml-1 hover:underline">{" "}tie.dat2004@gmail.com</span>
                        </p>
                    </div>

                </div>

                {/* --- Copyright --- */}
                <div className="mt-10 pt-6 border-t border-slate-200 text-center text-xs text-slate-500">
                    <p>Copyright © 2025 - UniOrien. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;