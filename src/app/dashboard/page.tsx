"use client";

import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { useRouter } from 'next/navigation';

const Dashboard: React.FC = () => {
  const [username, setUsername] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem('access_token');
      const user = localStorage.getItem('user');
      if (!token) {
        router.push('/login');
      } else {

        if (user) {
          setUsername(JSON.parse(user).username);
        }

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