import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "@/styles/globals.css";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const roboto = Roboto({
  subsets: ["vietnamese"],
  weight: ["100", "400"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "UniOrien",
  description: "Hệ thống tư vấn chọn ngành, chọn trường đại học thông minh",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className={roboto.className}>
        <ReactQueryProvider>{children}</ReactQueryProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
