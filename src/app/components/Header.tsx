import React from 'react';
import Link from 'next/link';

interface HeaderProps {
  isLoggedIn: boolean;
  handleLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ isLoggedIn, handleLogout }) => {
  return (
    <header className="bg-base-200 p-4 shadow-md">
      <nav className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">
          <Link href="/">POS APP</Link>
        </div>
        <div>
          {isLoggedIn && (
            <button onClick={handleLogout} className="btn btn-primary">
              Logout
            </button>
          )}
          {!isLoggedIn && (
            <Link href="/login" legacyBehavior>
              <a className="btn btn-secondary">Login</a>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;