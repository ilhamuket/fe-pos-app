"use client";

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Layout from './components/Layout';
import Login from './components/Login';

const HomePage: React.FC = () => {
  const router = useRouter();

  return (
    <Layout hideHeader>
      <Login />
    </Layout>
  );
};

export default HomePage;