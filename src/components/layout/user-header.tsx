import NavigationMenu from "@/components/common/NavigationMenu";
import Link from "next/link";

export default function UserHeader() {
    return (
        <div className="bg-white border-b border-gray-200 px-10 py-3 flex items-center gap-8">
            <Link href="/" className="text-xl font-semibold text-blue-600">
                UniOrien
            </Link>

            <NavigationMenu
                title="Tra cứu"
                items={[
                    { label: "Điểm chuẩn", href: "/lookup/scores" },
                    { label: "Ngành đào tạo", href: "/lookup/majors" },
                ]}
            />

            <Link
                href="/reviews"
                className="text-gray-500 hover:text-gray-700"
            >
                Review trường đại học
            </Link>
        </div>
    );
}
