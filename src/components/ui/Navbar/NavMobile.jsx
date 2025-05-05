'use client';

import Link from 'next/link';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import logo from '../../../../public/images/logo.png';
import { IoMdArrowDropdown } from 'react-icons/io';
import { FaUserCircle } from 'react-icons/fa';
import { useState } from 'react';

export default function NavMobile() {
  const [modal, setOpenModal] = useState(false);
  const cartItems = useSelector((state) => state.cart.items);
  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const phoneNumber = '999001507';

  return (
    <nav className="bg-gray-200 text-base-300 p-3 md:hidden sticky top-0 z-50">
      <div className="container mx-auto flex flex-col gap-4 items-center">
        {/* Logo */}
        <Link href="/">
          <Image src={logo} alt="Logo" width={100} height={80} />
        </Link>

        {/* Search Bar */}
        <label className="input border-1 rounded-2xl w-full border-success flex items-center">
          <input type="search" required placeholder="Поиск" className="w-full" />
          <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
        </label>

        {/* Phone Number Dropdown */}
        <div className="relative group cursor-pointer">
          <p className="text-sm text-black font-bold rounded-full p-1 flex gap-2 items-center">
            {phoneNumber}
            <IoMdArrowDropdown />
          </p>
          <div className="absolute left-0 mt-1 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-in-out bg-white p-1 rounded shadow z-10">
            <p className="text-sm text-black pl-2 pr-2">{phoneNumber}</p>
          </div>
        </div>

        {/* Login Button */}
        <div className="flex items-center gap-2">
          <button
            className="cursor-pointer flex items-center gap-2"
            onClick={() => document.getElementById('my_modal_3').showModal()}
          >
            <FaUserCircle />
            Войти
          </button>
        </div>
      </div>
    </nav>
  );
}