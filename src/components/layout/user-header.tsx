"use client";

import { useState } from "react";
import { UONavigationMenu } from "@/components/common/UONavigationMenu";
import { UOMobileSidebar } from "@/components/common/UOMobileSidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { Menu } from "lucide-react";
import { UOButton } from "@/components/common/UOButton";

export default function UserHeader() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="bg-white border-b border-gray-200 px-4 md:px-10 py-3 flex items-center justify-between relative z-50">
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

                    {/* Logo */}
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


            <UOButton name={"Đăng nhập"}/>

            {/* <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar> */}
            </div>

            {/* Mobile sidebar */}
            <UOMobileSidebar isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
        </header>
    );
}
