import Link from 'next/link';
import React from 'react';
import { FaLinkedin, FaGithub, FaFacebook } from 'react-icons/fa';

const Footer: React.FC = () => {
    return (
        <footer className="bg-sky-100 text-slate-800 p-5">
            <div className="container mx-auto">
                {/* Main content grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">

                    <div className="space-y-4 p-5 border-r-1 border-slate-300">
                        <h2 className="text-2xl font-bold text-blue-700">UniOrien</h2>
                        <p>
                            Nền tảng tư vấn chọn trường đại học tích hợp AI ChatBot. <br />
                            Nhằm hỗ trợ thí sinh cũng như phụ huynh tìm được trường và ngành học phù hợp.
                        </p>
                        <p>
                            Trang web được thiết kế và xây dựng bởi Nguyễn Tiến Đạt - Sinh viên năm 4 ngành Khoa học máy tính
                        </p>
                    </div>

                    <div className='p-5 border-r-1 border-slate-300'>
                        <h3 className="text-lg font-semibold mb-4">Các Liên Kết</h3>
                        <ul className="space-y-2 text-blue-600">
                            <li>
                                <Link href="/benchmarks" className="hover:underline">Tra cứu trường đại học</Link>
                            </li>
                            <li>
                                <Link href="/majors" className="hover:underline">Tra cứu ngành đào tạo</Link>
                            </li>
                        </ul>
                    </div>

                    <div className='p-5'>
                        <h3 className="text-lg font-semibold mb-4">Thông tin liên hệ</h3>
                        <div className="flex items-center space-x-6">
                            <a href="https://www.linkedin.com/in/dat-nguyen-7b3411297/" aria-label="LinkedIn Profile" className="text-2xl text-gray-700
                             hover:text-blue-600 transition-colors">
                                <FaLinkedin />
                            </a>
                            <a href="https://github.com/NgnTienDat" aria-label="GitHub Profile" className="text-2xl text-gray-700
                             hover:text-blue-800 transition-colors">
                                <FaGithub />
                            </a>
                            <a href="https://www.facebook.com/gosoi.964" aria-label="Facebook Profile" className="text-2xl text-gray-700
                             hover:text-blue-800 transition-colors">
                                <FaFacebook />
                            </a>
                        </div>
                        <p className="mt-4">
                            Email: tie.dat.2004@gmail.com
                        </p>
                    </div>

                </div>

                <div className="mt-8 pt-6 border-t border-slate-300 text-center text-sm text-slate-500">
                    <p>© 2025 UniOrien. Thiết kế và phát triển bởi Nguyễn Tiến Đạt</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;