"use client";
import React from "react";
import Link from "next/link";
import { useState } from "react";

interface HeaderProps {
  isLoggedIn: boolean;
  handleLogout: () => void;
  toggleDarkMode: () => void;
}

const Navbar: React.FC<HeaderProps> = ({ isLoggedIn, handleLogout , toggleDarkMode}) => {

 

  return (
    <nav className="navbar shadow-sm p-2 flex items-center justify-between">
      {/* Left Section - Quick Actions */}
      <div className="flex items-center space-x-4">
    
      </div>

      {/* Right Section - User Actions */}
      <div className="flex items-center space-x-4">
        {/* Language Dropdown */}
        <div className="dropdown">
          <button tabIndex={0} className="btn btn-ghost">
            ID
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        {/* Notifications */}
        <button className="btn btn-ghost">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405a2.032 2.032 0 00-.595-1.411L15 11V7a5 5 0 00-10 0v4l-2.994 3.184a2.032 2.032 0 00-.595 1.411L4 17h11z" />
          </svg>
        </button>

        <label className="grid cursor-pointer place-items-center">
          <input
            type="checkbox"
            onChange={toggleDarkMode}
            className="toggle theme-controller bg-base-content col-span-2 col-start-1 row-start-1"
          />
          <svg
            className="stroke-base-100 fill-base-100 col-start-1 row-start-1"
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round">
            <circle cx="12" cy="12" r="5" />
            <path
              d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
          </svg>
          <svg
            className="stroke-base-100 fill-base-100 col-start-2 row-start-1"
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        </label>

        {/* User Profile */}
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img src="https://via.placeholder.com/40" alt="User Avatar" />
            </div>
          </label>
          <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
            <li>
              <Link href="/profile">Profile</Link>
            </li>
            <li>
              <Link href="/settings">Settings</Link>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
