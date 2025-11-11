"use client";

import "./globals.css";
import { Inter } from "next/font/google";
// import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import FlowerIcon from "@/components/FlowerIcon";
import { AppProvider } from "@/context/AppContext";
import MobileLayout from "@/components/MobileLayout";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={inter.className}>
        <AppProvider>
          {isMobile ? (
            <MobileLayout>{children}</MobileLayout>
          ) : (
            <div className="flex min-h-screen items-stretch bg-gradient-to-b from-white to-[#f0e8ff] overflow-hidden">
              {/* ...existing desktop layout code... */}
              {/* You may need to move the previous desktop layout code here if not already present. */}
            </div>
          )}
        </AppProvider>
      </body>
    </html>
  );
}
