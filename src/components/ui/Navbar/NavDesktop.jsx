// src/components/ui/Navbar/NavDesktop.jsx
'use client';

import Link from 'next/link';
import { useSelector } from 'react-redux';

export default function NavDesktop() {
  const cartItems = useSelector((state) => state.cart.items);
  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="bg-secondary text-primary p-4 hidden md:block">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          My Shop
        </Link>
        <ul className="flex space-x-4">
          <li>
            <Link href="/products" className="hover:underline">
              Products
            </Link>
          </li>
          <li>
            <Link href="/cart" className="hover:underline">
              Cart ({cartItemCount})
            </Link>
          </li>
          <li>
            <Link href="/account" className="hover:underline">
              Account
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}