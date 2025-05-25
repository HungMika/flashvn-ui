import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/features/dashboard/Pages/components/Navbar";
import Breadcrumb from "@/features/dashboard/Pages/components/Breadcrumb";
import Footer from "@/features/dashboard/Pages/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FLASH VN",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <Breadcrumb />
        {children}
        <Footer />
      </body>
    </html>
  );
}
