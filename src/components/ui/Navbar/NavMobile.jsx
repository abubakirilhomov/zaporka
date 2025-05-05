// src/components/ui/Navbar/NavMobile.jsx
'use client';

import Link from 'next/link';
import { useSelector, useState } from 'react';

export default function NavMobile() {

  return (
    <nav className="bg-primary text-white p-4 md:hidden">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          My Shop
        </Link>
      </div>
    </nav>
  );
}