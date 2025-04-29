// src/components/ui/Navbar/NavMobile.jsx
'use client';

import Link from 'next/link';
import { useSelector, useState } from 'react';

export default function NavMobile() {
  const cartItems = useSelector((state) => state.cart.items);
  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-500 text-white p-4 md:hidden">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          My Shop
        </Link>
        <button onClick={() => setIsOpen(!isOpen)}>
          ☰
        </button>
      </div>
      {isOpen && (
        <ul className="mt-4">
          <li className="p-2">
            <Link href="/products" className="hover:underline">
              Products
            </Link>
          </li>
          <li className="p-2">
            <Link href="/cart" className="hover:underline">
              Cart ({cartItemCount})
            </Link>
          </li>
          <li className="p-2">
            <Link href="/account" className="hover:underline">
              Account
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
}