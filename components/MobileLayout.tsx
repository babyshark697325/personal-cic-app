import React from "react";
import FlowerIcon from "@/components/FlowerIcon";
import { useRouter } from "next/router";

const navItems = [
  { name: "Home", href: "/", icon: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/></svg>
  ) },
  { name: "Messages", href: "/chat", icon: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
  ) },
  { name: "Notifications", href: "/inbox", icon: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/></svg>
  ) },
  { name: "Settings", href: "/settings", icon: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ) }
];

export default function MobileLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  return (
    <div className="bg-gradient-to-b from-white to-[#f0e8ff] min-h-screen flex flex-col">
      {/* Top header */}
      <header className="fixed top-0 left-0 w-full h-14 bg-white/80 backdrop-blur z-40 flex items-center px-4 border-b border-gray-200 shadow-sm">
        <FlowerIcon className="h-7 w-7 text-indigo-500 mr-2" />
        <span className="text-lg font-semibold text-gray-900">Bloom</span>
      </header>
      <main className="flex-1 pt-16 pb-20 px-2 w-full max-w-screen-sm mx-auto">
        {children}
      </main>
      {/* Bottom navigation bar */}
      <nav className="fixed bottom-0 left-0 w-full h-14 bg-white/90 backdrop-blur z-40 border-t border-gray-200 flex justify-around items-center">
        {navItems.map(item => (
          <button
            key={item.name}
            className="flex flex-col items-center justify-center text-xs text-gray-700 hover:text-indigo-500 focus:outline-none"
            onClick={() => router.push(item.href)}
          >
            {item.icon}
            {item.name}
          </button>
        ))}
      </nav>
    </div>
  );
}
