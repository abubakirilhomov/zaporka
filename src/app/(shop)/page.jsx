// app/(shop)/page.jsx
'use client'
import Link from 'next/link';

export default function Page() {
  return (
    <div className="text-center py-12">
      <h1 className="text-3xl font-bold mb-4">Welcome to My Shop</h1>
      <p className="mb-6">Explore our wide range of products.</p>
      <Link href="/products" className="bg-info text-base-100 px-4 py-2 rounded hover:bg-info">
        Shop Now
      </Link>
    </div>
  );
}