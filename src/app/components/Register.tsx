"use client"

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [usernameError, setUsernameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setUsernameError(false);
    setEmailError(false);
    setPasswordError(false);
    setConfirmPasswordError(false);

    if (!username) {
      setUsernameError(true);
      return;
    }

    if (!email) {
      setEmailError(true);
      return;
    }

    if (!password) {
      setPasswordError(true);
      return;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError(true);
      return;
    }

    setIsLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://pos-backend-nest-5935331f9eea.herokuapp.com';
      const response = await fetch(apiUrl + '/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('access_token', data.access_token);
        router.push('/dashboard');

      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Login failed');
        setShowErrorModal(true);
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again.');
      setShowErrorModal(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} px-5`}>
      <div className={`w-full max-w-4xl ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'} rounded-lg overflow-hidden flex flex-col md:flex-row`}>
        <div className="w-full md:w-1/2 p-6">
          <h5 className="text-center mb-2">Selamat datang</h5>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Username</span>
              </label>
              <input
                type="text"
                placeholder="Username"
                className={`input input-bordered input-sm w-full max-w ${usernameError ? 'input-error' : ''}`}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              {usernameError && <span className="text-error text-xs mt-2">Username is required</span>}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Email"
                className={`input input-bordered input-sm w-full max-w ${emailError ? 'input-error' : ''}`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {emailError && <span className="text-error text-xs mt-2">Email is required</span>}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Password"
                className={`input input-bordered input-sm w-full max-w ${passwordError ? 'input-error' : ''}`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {passwordError && <span className="text-error text-xs mt-2">Password is required</span>}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <input
                type="password"
                placeholder="Confirm Password"
                className={`input input-bordered input-sm w-full max-w ${confirmPasswordError ? 'input-error' : ''}`}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {confirmPasswordError && <span className="text-error text-xs mt-2">Passwords do not match</span>}
            </div>

            <div className="form-control mt-6">
              <button
                type="submit"
                className={`btn btn-sm bg-blue-600 w-full mt-4 text-white ${isLoading ? 'loading-xs' : ''}`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="loading loading-spinner text-primary"></span>
                    Loading...
                  </>
                ) : (
                  'Register'
                )}
              </button>
            </div>
          </form>
          <div className="mt-4 text-center">
            <span>Already have an account? </span>
            <Link href="/login" legacyBehavior>
              <a className="text-blue-500">Login</a>
            </Link>
          </div>
          {showErrorModal && (
            <div className="modal modal-open">
              <div className="modal-box flex flex-col items-center">
                <div className="xmark-circle">
                  <div className="background"></div>
                  <div className="xmark draw"></div>
                </div>
                <h3 className="font-bold text-lg mt-4">Login Gagal</h3>
                <p className="py-4">{errorMessage}</p>
                <div className="modal-action">
                  <button
                    className="btn"
                    onClick={() => setShowErrorModal(false)}
                  >
                    OK
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;