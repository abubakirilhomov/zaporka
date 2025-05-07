'use client';

import Link from 'next/link';
import { useSelector } from 'react-redux';
import { useRef, useState } from 'react';
import { IoMdCall, IoMdArrowDropdown } from 'react-icons/io';
import { FaUserCircle, FaBars } from 'react-icons/fa';

export default function NavMobile() {
  const cartItems = useSelector((state) => state.cart.items);
  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const phoneNumber = '999001507';
  const modalRef = useRef(null);
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const handleOpenModal = () => {
    if (modalRef.current) {
      modalRef.current.showModal();
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.paddingRight = `${scrollBarWidth}px`;
      document.body.style.overflow = 'hidden';
    }
  };

  const handleCloseModal = () => {
    if (modalRef.current) {
      modalRef.current.close();
      document.body.style.paddingRight = '';
      document.body.style.overflow = '';
    }
  };

  const toggleDrawer = () => {
    setDrawerOpen((prev) => !prev);
  };

  return (
    <nav className="md:hidden sticky top-0 z-50 bg-base-100 shadow-xs shadow-base-content px-4 py-3 border-b border-base-300">
      <div className="flex justify-between items-center">
        {/* Replace logo with hamburger menu for mobile */}
        <button onClick={toggleDrawer} className="lg:hidden p-2">
          <FaBars className="text-xl" />
        </button>

        {/* Phone number and login button */}
        <div className="flex items-center gap-4">
          <label className="input border rounded-2xl flex items-center w-[100%] h-10 ml-2 border-primary bg-base-100">
            <input
              type="search"
              required
              placeholder="Поиск"
              className="text-base-content bg-transparent focus:outline-none  w-full"
            />
            <svg className="h-3 w-3 text-base-content flex-shrink-0 mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
          </label>

          <div className="border-2 border-error rounded-xl px-3 py-1">
            <button onClick={handleOpenModal} className="flex items-center gap-1 text-base-content">
              <FaUserCircle />
              Войти
            </button>
          </div>
        </div>
      </div>

      {isDrawerOpen && (
        <div className="w-[50%] absolute rounded-2xl  flex justify-between items-start left-0 h-screen bg-base-300 bg-opacity-70 z-40  transition-all duration-500 ease-in-out">
         <div className="flex flex-col items-start p-2">
            <Link href="/" className="text-white py-2 pl-2">Pages</Link>
            <Link href="/shop" className="text-white py-2 pl-2">Pages</Link>
            <Link href="/about" className="text-white py-2 pl-2">Pages</Link>
            <Link href="/contact" className="text-white py-2 pl-2">Pages</Link>
          </div>
          <div className="flex justify-end p-4">
            <button onClick={toggleDrawer} className="text-white text-xl">✕</button>
          </div>         
        </div>
      )}

      {/* Modal for login */}
      <dialog
        id="mobile_modal_login"
        className="modal"
        ref={modalRef}
        onClose={handleCloseModal}
      >
        <div className="modal-box bg-base-100 rounded-2xl max-w-sm">
          <form method="dialog" onClick={handleCloseModal}>
            <button className="btn btn-sm absolute right-2 top-2 btn-base-content">✕</button>
          </form>

          <div className="text-center">
            <p className="font-bold text-base-content mb-4 text-2xl">Личный кабинет</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-base-content">
                Логин <span className="text-error">*</span>
              </label>
              <input
                type="text"
                placeholder="Введите логин"
                className="w-full h-10 px-3 rounded-xl bg-base-300 border border-base-300 focus:outline-none focus:ring focus:ring-primary text-base-content"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-base-content">
                Пароль <span className="text-error">*</span>
              </label>
              <input
                type="password"
                placeholder="Введите пароль"
                className="w-full h-10 px-3 rounded-xl bg-base-300 border border-base-300 focus:outline-none focus:ring focus:ring-primary text-base-content"
              />
            </div>

            <div className="flex items-center justify-between text-sm text-base-300">
              <label className="flex items-center gap-2">
                <input type="checkbox" defaultChecked className="toggle toggle-sm bg-info" />
                <span className="text-base-content">Запомнить меня</span>
              </label>
              <Link href="#" className="hover:underline text-info">
                ЗАБЫЛИ ПАРОЛЬ?
              </Link>
            </div>

            <div className="flex gap-2 justify-between mt-4">
              <button className="bg-info text-base-300 font-semibold py-2 px-4 rounded-xl w-full">
                ВОЙТИ
              </button>
              <button className="border border-info text-info font-semibold py-2 px-4 rounded-xl w-full">
                РЕГИСТРАЦИЯ
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </nav>
  );
}
