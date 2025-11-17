import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const interTight = Inter_Tight({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Impact Pharma - Your Trusted Partner in Pharmaceutical Wholesale Distribution",
  description: "Supplying quality medicines and medical supplies to hospitals, clinics, and pharmacies",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${interTight.className} bg-white text-gray-900`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
