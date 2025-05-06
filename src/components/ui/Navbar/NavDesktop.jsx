'use client';

import Link from 'next/link';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import logo from '../../../../public/images/logo.png';
import { IoMdArrowDropdown } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { useState } from 'react';



export default function NavDesktop() {
  const [modal, setOpenModal] = useState(false)
  const cartItems = useSelector((state) => state.cart.items);
  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const phoneNumber = "999001507";

  return (
    <>
      <nav className="bg-gray-200 text-base-300 p-3 hidden md:block sticky z-50">
        <div className="container mx-auto flex gap-8 justify-start items-center relative">
          <Image src={logo} alt="Logo" width={120} height={100} className='cursor-pointer' />

          <label className="input border-1 rounded-2xl w-full border-success">
            <input type="search" required placeholder="Поиск" />
            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
          </label>

          <div className="relative group cursor-pointer">
            <p className="text-sm text-black font-bold rounded-full p-1 flex gap-2 items-center"> {phoneNumber}<IoMdArrowDropdown />            </p>
            <div className="absolute left-0 mt-1 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-in-out bg-white p-1 rounded shadow z-10">
              <p className="text-sm text-black pl-2 pr-2">{phoneNumber}</p>
            </div>

          </div>
          <div className='flex items-center gap-2'>

            <button className="cursor-pointer flex items-center gap-2" onClick={() => document.getElementById('my_modal_3').showModal()}> <FaUserCircle />Войти
            </button>
            <dialog id="my_modal_3" className="modal">
  <div className="modal-box bg-white rounded-2xl max-w-sm">
    <form method="dialog">
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    </form>

    <div className="text-center">
      <p className="font-bold text-2xl mb-4">Личный кабинет</p>
    </div>

    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Логин <span className="text-red-500">*</span></label>
        <input
          type="text"
          placeholder="Введите логин"
          className="w-full h-10 px-3 rounded-xl bg-gray-100 border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Пароль <span className="text-red-500">*</span></label>
        <input
          type="password"
          placeholder="Введите пароль"
          className="w-full h-10 px-3 rounded-xl bg-gray-100 border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>

      <div className="flex items-center justify-between text-sm text-gray-600">
        <label className="flex items-center gap-2">
          <input type="checkbox" defaultChecked className="toggle toggle-sm bg-blue-500" />
          Запомнить меня
        </label>
        <a href="#" className="text-blue-600 hover:underline">ЗАБЫЛИ ПАРОЛЬ?</a>
      </div>

      <div className="flex gap-2 justify-between mt-4">
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl w-full">
          ВОЙТИ
        </button>
        <button className="border border-blue-500 text-blue-500 hover:bg-blue-100 font-semibold py-2 px-4 rounded-xl w-full">
          РЕГИСТРАЦИЯ
        </button>
      </div>
    </div>
  </div>
</dialog>

          </div>
        </div>
      </nav>

    </>
  );
}
