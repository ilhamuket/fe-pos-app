import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface LoginFormProps {
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  showErrorModal: boolean;
  setShowErrorModal: React.Dispatch<React.SetStateAction<boolean>>;
  errorMessage: string;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}


const LoginForm: React.FC<LoginFormProps> = ({
  username,
  setUsername,
  password,
  setPassword,
  showErrorModal,
  setShowErrorModal,
  errorMessage,
  setErrorMessage,
  theme,
  toggleTheme
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setUsernameError(false);

    if (!username) {
      setUsernameError(true);
      return;
    }

    if (!password) {
      setPasswordError(true);
      return;
    }

    setIsLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://pos-backend-nest-5935331f9eea.herokuapp.com';
      const response = await fetch(apiUrl + '/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
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
    <div className="w-full md:w-1/2 p-6">
      <h5 className="text-center mb-2">Selamat datang</h5>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="form-control">
          <label className="label" htmlFor="username">
            <span className={`text-xs ${theme === 'dark' ? 'text-white' : 'text-black'}`}>Username</span>
          </label>
          <input
            type="text"
            id="username"
            className={`input input-bordered ${usernameError ? 'input-error' : ''} input-sm w-full max-w`}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {usernameError && <span className="text-error text-xs mt-2">Username is required</span>}
        </div>
        <div className="form-control">
          <label className="label" htmlFor="password">
            <span className={`text-xs ${theme === 'dark' ? 'text-white' : 'text-black'}`}>Password</span>
          </label>
          <input
            type="password"
            id="password"
            className={`input input-bordered ${passwordError ? 'input-error' : ''} input-sm w-full max-w`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {passwordError && <span className="text-error text-xs mt-2">Password is required</span>}
        </div>
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
            'Masuk'
          )}
        </button>
      </form>
      <div className="divider mt-8">Or</div>
      <div className="space-y-2 mt-4">
        <button className="btn btn-sm btn-outline w-full">Sign in dengan Google</button>
        <button className="btn btn-sm btn-outline w-full">Sign in dengan Facebook</button>
        <Link href="/register" legacyBehavior>
          <button className="btn btn-sm btn-outline w-full">Sign Up</button>
        </Link>
      </div>

      {showErrorModal && (
        <div className="modal modal-open">
          <div
            className="modal-box flex flex-col items-center"
            style={{
              backgroundColor: 'var(--modal-bg)',
              color: 'var(--modal-text)',
            }}
          >
            <div className="xmark-circle">
              <div className="background"></div>
              <div className="xmark draw"></div>
            </div>
            <h3 className="font-bold text-lg mt-4">Login Failed</h3>
            <p className="py-4">{errorMessage}</p>
            <div className="modal-action">
              <button
                className="btn"
                style={{
                  backgroundColor: 'var(--modal-action-bg)',
                  color: 'var(--modal-action-text)',
                }}
                onClick={() => setShowErrorModal(false)}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginForm;