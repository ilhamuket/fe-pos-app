"use client";

import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';

const Dashboard: React.FC = () => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem('access_token');
      if (!token) {
        window.location.href = '/login';
      } else {
        // Fetch user data or decode token to get username
        // This is a placeholder, replace with actual user fetching logic
        setUsername('User');
      }
    }

  }, []);

  return (
    <Layout hideHeader={false}>
      <div>
        <h1 className="text-2xl font-bold">Welcome to the Dashboard, {username}!</h1>
        {/* Add more dashboard content here */}
      </div>
    </Layout>
  );
};

export default Dashboard;