import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Prodify",
  description: "Productivity workspace",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50`}>
        <div className="flex h-screen bg-gray-50">
          {/* Sidebar */}
          <div className="w-56 bg-white border-r border-gray-200 flex flex-col">
            {/* Profile Section */}
            <div className="p-3 border-b border-gray-200">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-semibold">CH</span>
                </div>
                <div className="flex-1">
                  <p className="text-xs font-medium text-gray-900">Courtney Henry</p>
                  <p className="text-xs text-gray-500">Online</p>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-2 py-2">
              <ul className="space-y-0.5">
                <li>
                  <a href="/" className="flex items-center space-x-2 px-2 py-1.5 rounded text-xs bg-gray-100 text-gray-900 font-medium">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v3H8V5z" />
                    </svg>
                    <span>Home</span>
                  </a>
                </li>
                <li className="flex items-center space-x-2 px-2 py-1.5 text-gray-700 text-xs">
                  <span className="text-yellow-500">★</span>
                  <span>Prodify AI</span>
                </li>
                <li>
                  <a href="#" className="flex items-center space-x-2 px-2 py-1.5 rounded text-xs text-gray-700 hover:bg-gray-50">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    <span>My tasks</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center space-x-2 px-2 py-1.5 rounded text-xs text-gray-700 hover:bg-gray-50">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                    </svg>
                    <span>Inbox</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center space-x-2 px-2 py-1.5 rounded text-xs text-gray-700 hover:bg-gray-50">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a4 4 0 118 0v4m-4 10V7m0 10v4" />
                    </svg>
                    <span>Calendar</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center space-x-2 px-2 py-1.5 rounded text-xs text-gray-700 hover:bg-gray-50">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    <span>Reports & Analytics</span>
                  </a>
                </li>
              </ul>

              <div className="mt-4">
                <div className="flex items-center justify-between px-2 mb-1">
                  <span className="text-xs text-gray-900">My Projects</span>
                  <button className="text-blue-600 text-xs hover:text-blue-700">+ Add</button>
                </div>
                <ul className="space-y-0.5">
                  <li className="flex items-center space-x-2 px-2 py-1 hover:bg-gray-50 rounded">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-xs text-gray-700">Product launch</span>
                  </li>
                  <li className="flex items-center space-x-2 px-2 py-1 hover:bg-gray-50 rounded">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-xs text-gray-700">Team brainstorm</span>
                  </li>
                  <li className="flex items-center space-x-2 px-2 py-1 hover:bg-gray-50 rounded">
                    <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                    <span className="text-xs text-gray-700">Branding launch</span>
                  </li>
                </ul>
              </div>
            </nav>

            {/* Bottom Section */}
            <div className="p-2 border-t border-gray-200">
              <button className="flex items-center space-x-2 px-2 py-1.5 rounded text-xs text-gray-700 hover:bg-gray-50 w-full mb-2">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Settings</span>
              </button>
              
              <div className="p-2 bg-blue-600 rounded text-white">
                <div className="flex items-center space-x-1 mb-1">
                  <span className="font-bold text-xs">prodify</span>
                </div>
                <p className="text-xs mb-2 leading-relaxed">New members will gain access to public Prodify Docs and Dashboards</p>
                <button className="text-xs bg-white bg-opacity-20 px-1.5 py-0.5 rounded">+ Invite people</button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-auto">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}

