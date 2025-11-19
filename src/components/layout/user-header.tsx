"use client";

import { useState } from "react";
import { UONavigationMenu } from "@/components/UONavigationMenu";
import { UOMobileSidebar } from "@/components/UOMobileSidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { Menu } from "lucide-react";
import { UOButton } from "@/components/UOButton";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";
import useLogout from "@/hooks/useLogout";

export default function UserHeader() {
    const { user, isAuthenticated, isAdmin } = useUser();
    const [menuOpen, setMenuOpen] = useState(false);
    const router = useRouter();
    const { logout } = useLogout();

    console.log("User in UserHeader: ", user);

    return (
        <header className="bg-white border-b border-gray-200 px-4 md:px-10 py-3 flex items-center shadow-lg justify-between relative z-50">
            {/* Left section: Hamburger + Logo */}
            <div className="flex items-center gap-6">
                <div className="flex items-center gap-3 mr-4">
                    {/* Hamburger button */}
                    <button
                        className="md:hidden p-2 text-gray-600 hover:text-blue-600 cursor-pointer"
                        onClick={() => setMenuOpen(true)}
                    >
                        <Menu size={22} />
                    </button>

                    <Link href="/" className="text-2xl font-semibold text-blue-600">
                        UniOrien
                    </Link>
                </div>

                {/* Desktop navigation */}
                <div className="hidden md:flex items-center gap-4">
                    <UONavigationMenu
                        title="Tra cứu"
                        items={[
                            { label: "Điểm chuẩn", href: "/benchmarks" },
                            { label: "Ngành đào tạo", href: "/majors" },
                        ]}
                    />

                    <Link
                        href="/reviews"
                        className="text-gray-600 hover:text-blue-600 hover:bg-gray-100 font-medium px-4 py-2 rounded-md transition-colors"
                    >
                        Xem đánh giá về trường đại học
                    </Link>
                </div>
            </div>
            <div className="flex space-x-1">

                {isAuthenticated ? (
                    <UOButton name="Đăng xuất" onClick={() => logout()} />
                ) : (
                    <UOButton name="Đăng nhập" href="/login" />
                )}

            </div>

            {/* Mobile sidebar */}
            <UOMobileSidebar isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
        </header>
    );
}
