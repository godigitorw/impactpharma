import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";

const interTight = Inter_Tight({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Impact Pharma - Your Trusted Partner in Pharmaceutical Wholesale Distribution",
  description: "Supplying quality medicines and medical supplies to hospitals, clinics, and pharmacies",
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
