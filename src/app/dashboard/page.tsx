"use client";

import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { useRouter } from 'next/navigation';

interface Product {
  id: number;
  name: string;
  price: string;
  stock: number;
  category_id: number;
  status: string;
  created_at: string;
}

const Dashboard: React.FC = () => {
  const [username, setUsername] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Tambahkan state untuk loading
  const router = useRouter();

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://pos-backend-nest-5935331f9eea.herokuapp.com';

  // Fetch produk dari API dengan autentikasi
  const fetchProducts = async () => {
    setIsLoading(true); // Set loading menjadi true saat mulai mengambil data
    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        setErrorMessage('You are not logged in.');
        return;
      }

      const response = await fetch(`${apiUrl}/products`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,  // Sertakan token di header
        },
      });

      if (!response.ok) {
        setErrorMessage('Failed to fetch products.');
        throw new Error('Unauthorized or Server error');
      }

      const data = await response.json();

      if (data && Array.isArray(data.data)) {
        setProducts(data.data); // Mengakses data dari field 'data'
      } else {
        console.error('Data produk tidak valid, bukan array');
        setErrorMessage('Data produk tidak valid');
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setErrorMessage('Error fetching products. Please try again later.');
    } finally {
      setIsLoading(false); // Set loading menjadi false setelah selesai
    }
  };

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

    fetchProducts(); // Ambil produk saat halaman dimuat
  }, []);

  const handleSelectProduct = (product: Product) => {
    const isProductSelected = selectedProducts.some((p) => p.id === product.id);
    if (!isProductSelected) {
      setSelectedProducts((prev) => [...prev, product]);
    }
  };

  const handleRemoveProduct = (productId: number) => {
    setSelectedProducts((prev) => prev.filter((p) => p.id !== productId));
  };

  return (
    <Layout hideHeader={false}>
      <div className="p-4">
        <h1 className="text-2xl font-bold">Welcome to the Dashboard, {username}!</h1>

        {errorMessage && (
          <div className="alert alert-error mt-4">
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Loading Spinner */}
        {isLoading ? (
          <div className="flex justify-center items-center mt-6">
            <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
          </div>
        ) : (
          // Daftar produk
          <div className="mt-6">
            <h2 className="text-xl font-semibold">Select a Product</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mt-4">
              {Array.isArray(products) && products.length > 0 ? (
                products.map((product) => (
                  <div
                    key={product.id}
                    className="card w-60 bg-base-100 shadow-xl cursor-pointer"
                    onClick={() => handleSelectProduct(product)}
                  >
                    <figure>
                      <img 
                        src="https://picsum.photos/200/200" 
                        alt="Product" 
                        className="w-full h-32 object-cover" 
                      />
                    </figure>

                    <div className="card-body">
                      <h3 className="card-title">{product.name}</h3>
                      <p className="text-sm">Price: ${product.price}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center text-gray-500">No products available</div>
              )}
            </div>
          </div>
        )}

        {/* Produk yang dipilih */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold">Selected Products</h2>
          <ul className="mt-4 space-y-2">
            {selectedProducts.map((product) => (
              <li key={product.id} className="flex justify-between items-center p-2 bg-base-200 rounded-md shadow-md">
                <span>{product.name} - ${product.price}</span>
                <button
                  className="btn btn-xs btn-outline text-red-500"
                  onClick={() => handleRemoveProduct(product.id)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Tombol checkout */}
        <div className="mt-6">
          <button
            onClick={() => {
              // Proses checkout atau simpan transaksi
            }}
            className="btn btn-primary"
          >
            Checkout
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
