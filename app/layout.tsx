"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import FlowerIcon from "@/components/FlowerIcon";
import { AppProvider } from "@/context/AppContext";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  
  const navItems = [
    { name: 'Home', href: '/', icon: 'home' },
    { name: 'Bloom AI', href: '/chat', icon: 'bloom' },
    { name: 'Tasks', href: '/tasks', icon: 'tasks' },
    { name: 'Goals', href: '/goals', icon: 'goals' },
    { name: 'Reminders', href: '/reminders', icon: 'reminders' },
    { name: 'Inbox', href: '/inbox', icon: 'inbox' },
    { name: 'Calendar', href: '/calendar', icon: 'calendar' },
    { name: 'Reports', href: '/reports', icon: 'reports' },
    { name: 'Check-in', href: '/checkin', icon: 'check' },
    { name: 'History', href: '/history', icon: 'history' }
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
      case 'goals':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
          </svg>
        );
      case 'reminders':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0018 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 00-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
          </svg>
        );
      case 'check':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'history':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 6v6l4 2" />
          </svg>
        );
      case 'bloom':
        return <FlowerIcon className="w-5 h-5" />;
      default:
        return null;
    }
  };

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={inter.className}>
        <AppProvider>
          <div className="flex min-h-screen items-stretch bg-gradient-to-b from-white to-[#f0e8ff] overflow-hidden">
            {/* Sidebar for desktop */}
            <aside className={`bg-white shadow-lg border-r border-gray-200 flex flex-col h-screen overflow-y-scroll overscroll-contain touch-pan-y transition-all duration-300 fixed top-0 left-0 z-30
              ${sidebarCollapsed ? 'w-20' : 'w-64'}
              hidden md:flex
            `}>
              <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
                {!sidebarCollapsed && (
                  <div className="flex items-center gap-2 text-gray-900 font-semibold">
                    <FlowerIcon className="w-5 h-5 text-indigo-500" />
                    <span>Bloom</span>
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => setSidebarCollapsed((prev) => !prev)}
                  className="p-2 rounded-full text-gray-500 hover:text-gray-900 hover:bg-gray-100"
                  aria-label="Toggle sidebar width"
                >
                  <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none" stroke="currentColor">
                    {sidebarCollapsed ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 5l-5 5 5 5" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 5l5 5-5 5" />
                    )}
                  </svg>
                </button>
              </div>
              <nav className="flex-1 px-2 py-4">
                <ul className="space-y-1">
                  <li>
                    <Link href="/" className={`flex items-center ${sidebarCollapsed ? 'justify-center' : 'space-x-2 px-3'} py-2 rounded-lg text-sm w-full text-left transition-colors ${pathname === '/' ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-50'}`} title={sidebarCollapsed ? 'Home' : ''}>
                      {renderIcon('home')}
                      {!sidebarCollapsed && <span>Home</span>}
                    </Link>
                  </li>
                  {navItems.slice(1).map((item) => (
                    <li key={item.name}>
                      <Link 
                        href={item.href}
                        className={`flex items-center ${sidebarCollapsed ? 'justify-center' : 'space-x-2 px-3'} py-2 rounded-lg text-sm w-full text-left transition-colors ${pathname === item.href ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-50'}`}
                        title={sidebarCollapsed ? item.name : ''}
                      >
                        {renderIcon(item.icon)}
                        {!sidebarCollapsed && <span>{item.name}</span>}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              {/* Projects Section */}
              <div className="mt-8">
                <div className={`${sidebarCollapsed ? 'px-2' : 'px-3'} mb-4`}>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900">My Projects</span>
                    <button className="flex items-center gap-1 text-blue-600 text-sm hover:text-blue-700">
                      <span className="px-2 py-1 rounded-full text-xs font-medium" style={{backgroundColor: '#f0efff', color: '#736ee1'}}>+ Add</span>
                    </button>
                  </div>
                </div>
                <ul className="space-y-1 px-2">
                  {['Product launch', 'Team brainstorm', 'Branding launch'].map((project, index) => (
                    <li key={project} className="group">
                      <a 
                        href="#" 
                        className={`flex items-center ${sidebarCollapsed ? 'justify-center' : 'space-x-3 px-3'} py-2 hover:bg-gray-50 rounded-lg transition-colors`}
                        title={sidebarCollapsed ? project : ''}
                      >
                        <div className={`w-3 h-3 rounded-full flex-shrink-0 ${index === 0 ? 'bg-purple-500' : index === 1 ? 'bg-blue-500' : 'bg-teal-500'}`}></div>
                        {!sidebarCollapsed && (
                          <span className="text-sm text-gray-700 truncate">{project}</span>
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Bottom Section */}
              <div className="p-2 border-t border-gray-200">
                <button 
                  className={`flex items-center ${sidebarCollapsed ? 'justify-center' : 'space-x-3 px-3'} py-3 rounded-lg text-sm text-gray-700 hover:bg-gray-50 w-full transition-colors`}
                  title={sidebarCollapsed ? 'Settings' : ''}
                >
                  <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {!sidebarCollapsed && <span>Settings</span>}
                </button>
              </div>
            </aside>
            {/* Sidebar for mobile */}
            <aside className={`fixed inset-y-0 left-0 z-40 bg-white shadow-lg border-r border-gray-200 flex flex-col w-64 transition-transform duration-300 md:hidden
              ${mobileNavOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
              {/* ...sidebar content... */}
              <button className="absolute top-4 right-4 p-2" onClick={() => setMobileNavOpen(false)}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </aside>
            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0" style={{marginLeft: sidebarCollapsed ? '5rem' : '16rem'}}>
              {/* Topbar for mobile */}
              <header className="md:hidden bg-white border-b border-gray-200 shadow-sm flex items-center justify-between px-4 h-16">
                <button className="p-2" onClick={() => setMobileNavOpen(true)}>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                </button>
                <FlowerIcon className="h-8 w-8 text-indigo-500" />
              </header>
              <main className="flex-1 w-full min-w-0">
                {children}
              </main>
            </div>
          </div>
        </AppProvider>
      </body>
    </html>
  );
}
