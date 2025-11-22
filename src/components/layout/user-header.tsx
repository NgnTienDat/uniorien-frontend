"use client";

import { useState } from "react";
import { UONavigationMenu } from "@/components/UONavigationMenu";
import { UOMobileSidebar } from "@/components/UOMobileSidebar";
import Link from "next/link";
import { Bell, GraduationCap, Menu, User, LogOut, Loader2 } from "lucide-react";
import { UOButton } from "@/components/UOButton";
import { useUser } from "@/hooks/useUser";
import useLogout from "@/hooks/useLogout";


const UserAvatarDropdown = ({ user, logout, isLoggingOut }: { user: any, logout: () => void, isLoggingOut: boolean }) => (
    <div className="relative group">
        <button className="flex items-center gap-2 p-2 rounded-full hover:bg-slate-100 transition-colors border border-transparent group-hover:border-blue-200">
            {/* Giả định Avatar */}
            <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-semibold uppercase">
                {/* {user?.fullName ? user.fullName[0] : <User size={18} />} */}


                {user?.avatar ? (
                    <img
                        src={user.avatar}
                        alt={user.fullName}
                        className="w-full h-full object-cover rounded-full"
                        referrerPolicy="no-referrer"
                    />
                ) : (
                    <User size={18} />
                )}
            </div>
            {/* Tên người dùng (chỉ hiện trên MD trở lên) */}
            <span className="hidden lg:inline text-slate-700 font-medium text-sm truncate max-w-[120px]">
                {user?.fullName || "Tài khoản"}
            </span>
        </button>

        {/* User Dropdown Menu */}
        <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-100 rounded-lg shadow-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 origin-top-right z-[100]">
            <div className="px-4 py-2 text-sm text-slate-500 truncate border-b border-slate-100">
                Chào mừng, <span className="font-semibold text-blue-600">{user?.fullName || "Bạn"}</span>
            </div>
            {/* Nút Đăng xuất trong Dropdown */}
            <button
                onClick={logout}
                disabled={isLoggingOut}
                className="w-full text-left flex items-center px-4 py-2 text-sm text-slate-700
                 hover:bg-red-50 hover:text-red-600 transition-colors"
            >
                {isLoggingOut ? (
                    <>
                        <Loader2 size={16} className="mr-2 animate-spin" /> Đang đăng xuất...
                    </>
                ) : (
                    <>
                        <LogOut size={16} className="mr-2" /> Đăng xuất
                    </>
                )}
            </button>
        </div>
    </div>
);


export default function UserHeader() {
    const { user, isAuthenticated, isLoading } = useUser();
    const [menuOpen, setMenuOpen] = useState(false);
    const { logout, isPending: isLoggingOut } = useLogout();
    return (
        <header className="bg-white border-b border-gray-100 px-4 md:px-8 py-3 flex items-center shadow-md justify-between relative z-50">
            {/* --- LEFT SECTION: Hamburger + Logo + Navigation --- */}
            <div className="flex items-center gap-6">

                {/* Hamburger (Mobile) */}
                <button
                    className="md:hidden p-2 text-gray-600 hover:text-blue-600 cursor-pointer"
                    onClick={() => setMenuOpen(true)}
                    aria-label="Open menu"
                >
                    <Menu size={22} />
                </button>

                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <div className="bg-blue-600 p-2 rounded-lg shadow-md">
                        <GraduationCap className="text-white" size={20} />
                    </div>
                    <span className="text-xl md:text-2xl font-bold text-blue-900 tracking-tight hidden sm:block">UniOrien</span>
                </Link>

                {/* Navigation Menu (Desktop) */}
                <div className="hidden md:flex items-center gap-2">
                    <UONavigationMenu
                        title="Tra cứu"
                        items={[
                            { label: "Điểm chuẩn", href: "/benchmarks" },
                            { label: "Ngành đào tạo", href: "/majors" },
                        ]}
                    />
                    <Link
                        href="/reviews"
                        className="text-slate-600 hover:text-blue-600
                        hover:bg-slate-50 font-medium px-4 py-2 rounded-lg transition-colors text-md"
                    >
                        Review các trường đại học
                    </Link>
                </div>
            </div>

            {/* --- RIGHT SECTION: Auth Status & Actions --- */}
            <div className="flex items-center gap-3">

                {/* Notification Button (Luôn hiển thị) */}
                <button
                    className="p-2 hover:bg-slate-100 rounded-full transition-colors relative"
                    aria-label="Notifications"
                >
                    <Bell size={20} className="text-slate-500" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                </button>

                {/* Auth/Loading Logic */}
                {isLoading ? (
                    // Loading State
                    <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full text-sm text-slate-500">
                        <Loader2 size={16} className="animate-spin" /> Tải...
                    </div>
                ) : isAuthenticated ? (
                    // Authenticated State (Show User Dropdown)
                    <UserAvatarDropdown
                        user={user}
                        logout={logout}
                        isLoggingOut={isLoggingOut}
                    />
                ) : (
                    // Guest State (Show Login Button)
                    <UOButton
                        name="Đăng nhập"
                        href="/login"
                    />
                )}
            </div>

            {/* Mobile Sidebar */}
            <UOMobileSidebar
                isOpen={menuOpen}
                onClose={() => setMenuOpen(false)}

            />
        </header>
    );
}