import AdminHeader from "@/components/layout/admin-header";

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main>
            <AdminHeader />
            {children}
        </main>
    );
}