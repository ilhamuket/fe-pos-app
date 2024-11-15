"use client"

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Layout from '../components/Layout'; // Adjust the import based on your project structure

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();


  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      router.push('/dashboard');
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
        setShowSuccessModal(true);
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Login failed');
        setShowErrorModal(true);
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again.');
      setShowErrorModal(true);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Register</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Username</span>
              </label>
              <input
                type="text"
                placeholder="username"
                className="input input-bordered"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <input
                type="password"
                placeholder="confirm password"
                className="input input-bordered"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary">Register</button>
            </div>
          </form>
          <div className="mt-4 text-center">
            <span>Already have an account? </span>
            <Link href="/login" legacyBehavior>
              <a className="text-blue-500">Login</a>
            </Link>
          </div>
          {showSuccessModal && (
            <div className="modal modal-open">
              <div className="modal-box flex flex-col items-center">
                <div className="checkmark-circle">
                  <div className="background"></div>
                  <div className="checkmark draw"></div>
                </div>
                <h3 className="font-bold text-lg mt-4">Login Berhasil</h3>
                <p className="py-4">
                  Anda akan diarahkan ke halaman dashboard
                </p>
                <div className="modal-action">
                  <button
                    className="btn"
                    onClick={() => {
                      setShowSuccessModal(false);
                      router.push('/dashboard');
                    }}
                  >
                    OK
                  </button>
                </div>
              </div>
            </div>
          )}

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