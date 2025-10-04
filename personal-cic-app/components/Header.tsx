"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Dashboard" },
    { href: "/checkin", label: "New reflection" },
    { href: "/history", label: "Timeline" },
    { href: "/chat", label: "Insights" },
  ];

  return (
    <header className="bg-slate-900/80 backdrop-blur border-b border-slate-700 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex items-center space-x-4">
            <Link 
              href="/" 
              className="flex items-center space-x-3"
            >
              <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg">
                <div className="w-6 h-6 bg-white rounded-sm opacity-90"></div>
              </div>
              <span className="text-xl font-bold text-slate-100">Personal CIC Management Tool</span>
            </Link>
          </div>
          
          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors duration-200 ${
                  pathname === item.href
                    ? "text-indigo-400 border-b-2 border-indigo-400 pb-1"
                    : "text-slate-300 hover:text-indigo-400"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Quick Action Button */}
          <div className="flex items-center space-x-4">
            <Link
              href="/checkin"
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              Quick reflection
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-slate-300 hover:text-slate-100 p-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
