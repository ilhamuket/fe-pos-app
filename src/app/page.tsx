import React from 'react';
import Layout from '../app/components/Layout';

const HomePage: React.FC = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold mb-4">Welcome to the Home Page</h1>
        <p className="text-lg mb-4">This is the main page of the application.</p>
        <div className="flex space-x-4">
          <a href="/login" className="btn btn-primary">Login</a>
          <a href="/register" className="btn btn-secondary">Register</a>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;