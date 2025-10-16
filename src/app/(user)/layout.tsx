import UserHeader from "@/components/layout/user-header";
import Footer from "@/components/layout/footer";

export default function UserLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col min-h-screen">
            <header className="fixed top-0 left-0 w-full z-50">
                <UserHeader />
            </header>

            {/* Nội dung chính có padding-top để không bị header che */}
            <main className="flex-1 mt-[80px]">
                {children}
            </main>

            <footer className="mt-auto">
                <Footer />
            </footer>
        </div>
    );
}
