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
      const savedTheme = localStorage.getItem('theme');
      return savedTheme ? savedTheme === 'dark' : true; // Default to dark mode
    }
    return true;
  });
  const [username, setUserName] = useState(''); // Add userName state
  const [email, setEmail] = useState(''); // Add email state
  const [id, setId] = useState(''); // Add id state



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
      const user = localStorage.getItem('user');

      if (user) {
        setUserName(JSON.parse(user).username);
        setEmail(JSON.parse(user).email);
        setId(JSON.parse(user).id);
      }
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
            <Navbar
              handleLogout={handleLogout}
              isLoggedIn={isLoggedIn}
              toggleDarkMode={toggleDarkMode}
              userName={username}
              email={email} // Pass email
              id={id} // Pass id
            />
            <main className={`flex-grow p-4 ${isClient ? 'bg-f2f4f8' : ''}`}>
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