'use client';

import Link from 'next/link';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import logo from '../../../../public/images/logo.png';
import { IoMdArrowDropdown } from 'react-icons/io';
import { FaUserCircle } from 'react-icons/fa';
import { useState, useRef } from 'react';
import { FiShoppingCart } from "react-icons/fi";


export default function NavMobile() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const cartItems = useSelector((state) => state.cart.items);
  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const phoneNumber = '999001507';
  const dialogRef = useRef(null);

  const openModal = () => {
    setIsModalOpen(true);
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  };

  return (
    <nav className="bg-base-100 text-base-content p-3 sticky top-0 z-50 shadow-sm md:hidden">
      <div className="flex flex-col gap-3">
        {/* Top Row: Logo + Phone + Cart + Login */}
        <div className="flex items-center justify-between gap-3">
          <Link href="/">
            <Image
              src={logo}
              alt="Logo"
              width={90}
              height={60}
              className="object-contain"
            />
          </Link>

          <div className="relative group cursor-pointer">
            <p className="text-sm font-semibold flex items-center gap-1">
              {phoneNumber}
              <IoMdArrowDropdown className="text-lg" />
            </p>
            <div className="absolute left-0 mt-1 w-32 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-in-out bg-base-content p-2 rounded-lg shadow-lg z-10">
              <p className="text-sm text-black text-center">{phoneNumber}</p>
            </div>
          </div>

          <Link href="/cart" className="relative inline-flex items-center">
            <span className="text-sm font-medium"><FiShoppingCart />
            </span>
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-error text-base-content text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </Link>

          <button
            className="flex items-center gap-1 text-sm font-medium text-base-content"
            onClick={openModal}
          >
            <FaUserCircle className="text-lg" />
            Войти
          </button>
        </div>

        {/* Search Input */}
        <label className="input border border-primary rounded-full w-full flex items-center px-3 py-2">
          <input
            type="search"
            required
            placeholder="Поиск"
            className="w-full text-sm bg-transparent focus:outline-none"
          />
          <svg
            className="h-4 w-4 opacity-50 flex-shrink-0"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
        </label>
      </div>

      {/* Modal Dialog */}
      <dialog ref={dialogRef} className="modal rounded-lg p-6 w-full max-w-sm bg-base-content shadow-xl">
        <form method="dialog" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Личный кабинет</h2>
            <button onClick={closeModal} className="hover:text-error">✕</button>
          </div>
          <div>
            <label className="block text-sm mb-1">Логин <span className="text-error">*</span></label>
            <input
              type="text"
              placeholder="Введите логин"
              className="w-full h-10 px-3 rounded-xl bg-base-100 border border-base-300 focus:outline-none text-base-content"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Пароль <span className="text-error">*</span></label>
            <input
              type="password"
              placeholder="Введите пароль"
              className="w-full h-10 px-3 rounded-xl bg-base-100 border border-base-300 focus:outline-none text-base-content"
            />
          </div>
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="toggle toggle-sm bg-info" />
              <span>Запомнить меня</span>
            </label>
            <Link href="#" className="text-info hover:underline">Забыли пароль?</Link>
          </div>
          <div className="flex gap-2">
            <button type="submit" className="text-base-content font-semibold py-2 px-4 rounded-xl w-full">Войти</button>
            <button type="button" className="border border-info text-info font-semibold py-2 px-4 rounded-xl w-full">
              Регистрация
            </button>
          </div>
        </form>
      </dialog>
    </nav>
  );
}
