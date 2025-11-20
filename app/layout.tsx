import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";

const interTight = Inter_Tight({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Impact Pharma - Leading Medical Equipment & Healthcare Product Wholesaler | Since 2019",
  description: "Wholesale distributor of medical devices, equipment, consumables, laboratory reagents, and healthcare products. Serving 2000+ clients with 1000+ products across East Africa.",
  icons: {
    icon: "https://impactpharma.b-cdn.net/web%20web%20icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${interTight.className} bg-white text-gray-900`}>
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
