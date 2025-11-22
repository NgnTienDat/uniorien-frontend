import UserHeader from "@/components/layout/user-header";
import Footer from "@/components/layout/footer";
import { Toaster } from "@/components/ui/sonner";

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
            <main className="flex-1 mt-[64px]">
                {children}
            </main>
            {/* <Toaster position="top-center" richColors closeButton/> */}
            <Toaster
                position="top-center"
                richColors
                closeButton
                toastOptions={{
                    className: 'border-blue-200 bg-blue-500 text-blue-800',
                    actionButtonStyle: {
                        backgroundColor: '#2563EB', // Blue-600
                        color: 'white',
                    },
                    cancelButtonStyle: {
                        backgroundColor: '#E5E7EB', // Gray-200
                        color: '#4B5563', // Gray-600
                    }
                }}
            />
            <footer className="mt-auto">
                <Footer />
            </footer>
        </div>
    );
}
