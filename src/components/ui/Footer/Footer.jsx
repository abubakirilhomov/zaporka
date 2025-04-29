// src/components/ui/Footer/Footer.jsx
'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white p-4">
      <div className="container mx-auto text-center">
        <p>© {new Date().getFullYear()} My Shop. All rights reserved.</p>
        <ul className="flex justify-center space-x-4 mt-2">
          <li>
            <Link href="/about" className="hover:underline">
              About
            </Link>
          </li>
          <li>
            <Link href="/contact" className="hover:underline">
              Contact
            </Link>
          </li>
          <li>
            <Link href="/privacy" className="hover:underline">
              Privacy Policy
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}