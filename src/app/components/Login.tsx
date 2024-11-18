"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SliderSection from './auth/SliderSection';
import LoginForm from './auth/LoginForm';
import Footer from './auth/Footer';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const router = useRouter();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);

    if (typeof window !== "undefined") {
      const token = localStorage.getItem('access_token');
      if (token) {
        router.push('/dashboard');
      }
    }
  }, [router, theme]);



  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };


  return (
    <div className={`flex flex-col items-center justify-center min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} px-5`}>
      <div className={`w-full max-w-4xl ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'} rounded-lg overflow-hidden flex flex-col md:flex-row`}>
        <SliderSection theme={theme} />
        <LoginForm
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          showErrorModal={showErrorModal}
          setShowErrorModal={setShowErrorModal}
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
          theme={theme}
          toggleTheme={toggleTheme}
        />

      </div>
      <Footer />
    </div>
  );
};

export default Login;
