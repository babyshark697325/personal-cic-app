"use client";

import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [activeNav, setActiveNav] = useState('Home');
  
  const navItems = [
    { name: 'Home', href: '/', icon: 'home' },
    { name: 'My tasks', href: '/tasks', icon: 'tasks' },
    { name: 'Inbox', href: '/inbox', icon: 'inbox' },
    { name: 'Calendar', href: '/calendar', icon: 'calendar' },
    { name: 'Reports & Analytics', href: '/reports', icon: 'reports' }
  ];

  const renderIcon = (iconType: string) => {
    switch (iconType) {
      case 'home':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            <polyline points="9,22 9,12 15,12 15,22"/>
          </svg>
        );
      case 'tasks':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
            <rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>
            <path d="m16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
          </svg>
        );
      case 'inbox':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/>
          </svg>
        );
      case 'calendar':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
            <line x1="16" y1="2" x2="16" y2="6"/>
            <line x1="8" y1="2" x2="8" y2="6"/>
            <line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
        );
      case 'reports':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50`}>
        <div className="flex h-screen bg-gray-50">
          {/* Sidebar */}
          <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
            {/* Profile Section */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">CH</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Courtney Henry</p>
                  <p className="text-sm text-gray-500">Online</p>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-6">
              <ul className="space-y-2">
                {/* Home */}
                <li>
                  <button 
                    onClick={() => setActiveNav('Home')}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm w-full text-left transition-colors ${
                      activeNav === 'Home' 
                        ? 'bg-gray-100 text-gray-900 font-medium' 
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {renderIcon('home')}
                    <span>Home</span>
                  </button>
                </li>
                
                {/* Bloom AI */}
                <li className="flex items-center space-x-3 px-3 py-2 text-gray-700 text-sm">
                  <span className="text-yellow-500 text-lg">★</span>
                  <span>Bloom</span>
                </li>
                
                {/* Rest of navigation items */}
                {navItems.slice(1).map((item) => (
                  <li key={item.name}>
                    <button 
                      onClick={() => setActiveNav(item.name)}
                      className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm w-full text-left transition-colors ${
                        activeNav === item.name 
                          ? 'bg-gray-100 text-gray-900 font-medium' 
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {renderIcon(item.icon)}
                      <span>{item.name}</span>
                    </button>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <div className="flex items-center justify-between px-3 mb-4">
                  <span className="text-sm font-medium text-gray-900">My Projects</span>
                  <button className="flex items-center gap-1 text-blue-600 text-sm hover:text-blue-700">
                    <span className="px-2 py-1 rounded-full text-xs font-medium" style={{backgroundColor: '#f7f1ff', color: '#7c3aed'}}>+ Add</span>
                  </button>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-center space-x-3 px-3 py-2 hover:bg-gray-50 rounded-lg">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">Product launch</span>
                  </li>
                  <li className="flex items-center space-x-3 px-3 py-2 hover:bg-gray-50 rounded-lg">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">Team brainstorm</span>
                  </li>
                  <li className="flex items-center space-x-3 px-3 py-2 hover:bg-gray-50 rounded-lg">
                    <div className="w-3 h-3 bg-teal-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">Branding launch</span>
                  </li>
                </ul>
              </div>
            </nav>

            {/* Bottom Section */}
            <div className="p-4 border-t border-gray-200">
              <button className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-50 w-full">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Settings</span>
              </button>
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

