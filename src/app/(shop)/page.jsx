// app/(shop)/page.jsx
import Link from 'next/link';

export default function Page() {
  return (
    <div className="text-center py-12">
      <h1 className="text-3xl font-bold mb-4">Welcome to My Shop</h1>
      <p className="mb-6">Explore our wide range of products.</p>
      <Link href="/products" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Shop Now
      </Link>
    </div>
  );
}