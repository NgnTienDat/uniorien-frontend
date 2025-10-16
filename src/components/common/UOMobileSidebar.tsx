"use client";

import Link from "next/link";
import { X } from "lucide-react";

interface UOMobileSidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export function UOMobileSidebar({ isOpen, onClose }: UOMobileSidebarProps) {
    return (
        <>
            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-40 md:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <div
                className={`fixed top-0 left-0 h-full w-72 bg-white shadow-lg z-50 transform transition-transform duration-300 md:hidden
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
                    <h2 className="font-semibold text-gray-700">Danh mục</h2>
                    <button
                        className="text-gray-600 hover:text-blue-600 cursor-pointer"
                        onClick={onClose}
                    >
                        <X size={22} />
                    </button>
                </div>

                {/* Menu list */}
                <nav className="flex flex-col gap-1 px-5 py-4 overflow-y-auto h-[calc(100%-64px)]">
                    <Link
                        href="/benchmarks"
                        className="text-gray-700 hover:text-blue-600 hover:bg-gray-100 font-medium px-3 py-2 rounded-md transition-colors"
                        onClick={onClose}
                    >
                        Tra cứu điểm chuẩn
                    </Link>

                    <Link
                        href="/majors"
                        className="text-gray-700 hover:text-blue-600 hover:bg-gray-100 font-medium px-3 py-2 rounded-md transition-colors"
                        onClick={onClose}
                    >
                        Tra cứu ngành đào tạo
                    </Link>

                    <Link
                        href="/reviews"
                        className="text-gray-700 hover:text-blue-600 hover:bg-gray-100 font-medium px-3 py-2 rounded-md transition-colors"
                        onClick={onClose}
                    >
                        Xem đánh giá về trường đại học
                    </Link>
                </nav>
            </div>
        </>
    );
}
