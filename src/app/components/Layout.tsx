"use client";
import React, { useEffect, useState, ReactNode } from 'react';
import Link from 'next/link';
import Header from './Header';

interface LayoutProps {
  hideHeader?: boolean;
  children: React.ReactNode;
}

const Layout = ({ hideHeader, children }: LayoutProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const theme = typeof window !== "undefined" ? localStorage.getItem('theme') || 'dark' : 'dark';

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme || 'dark');
    if (typeof window !== "undefined") {
      const token = localStorage.getItem('access_token');
      if (token) {
        setIsLoggedIn(true);
      }
    }
  }, [theme]);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen flex flex-col">
      {!hideHeader &&
        <>
          <Header isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
          <main className="flex-grow container mx-auto p-4">{children}</main>
        </>
      }

      {hideHeader && <main>{children}</main>}

    </div>
  );
};

export default Layout;
