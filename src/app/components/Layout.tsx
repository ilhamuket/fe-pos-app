import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

interface LayoutProps {
  hideHeader: boolean;
  children: React.ReactNode;
}

const Layout = ({ hideHeader, children }: LayoutProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem('theme') === 'dark';
    }
    return true; // Default to dark mode
  });

  useEffect(() => {
    const theme = isDarkMode ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    if (typeof window !== "undefined") {
      localStorage.setItem('theme', theme);

    }

    if (theme === 'light') {
      setIsClient(true);
    } else {
      setIsClient(false);
    }


    if (typeof window !== "undefined") {
      const token = localStorage.getItem('access_token');
      if (token) {
        setIsLoggedIn(true);
      }
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen flex flex-col">
      {!hideHeader &&
        <div className="flex h-screen">
          <Sidebar />
          <div className="flex-1 flex flex-col">
            <Navbar handleLogout={handleLogout} isLoggedIn={isLoggedIn} toggleDarkMode={toggleDarkMode} />
            <main className={`flex-grow w-full p-4 ${isClient ? 'bg-f2f4f8' : ''}`}>
              {children}
            </main>
          </div>
        </div>
      }
      {hideHeader && <main>{children}</main>}
    </div>
  );
};

export default Layout;