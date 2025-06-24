'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { FaUserCircle, FaGift, FaTools } from 'react-icons/fa';
import { CgProfile } from 'react-icons/cg';
import { MdCategory, MdContactPhone } from 'react-icons/md';
import { RxCross2 } from 'react-icons/rx';
import { FaChevronRight } from "react-icons/fa";



export default function NavMobile() {
  const modalRef = useRef(null);

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

  return (
    <div className="drawer drawer-start md:hidden sticky top-0 z-50">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content bg-base-100 shadow-xs px-4 py-3 border-b border-base-300">
        <div className="flex justify-between items-center">
          <label htmlFor="my-drawer" className="p-2 cursor-pointer">
            <svg className="w-6 h-6 text-base-content" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </label>

          <div className="flex items-center gap-4 w-full">
            <label className="input border rounded-2xl flex items-center h-10 ml-2 border-primary bg-base-100 w-full">
              <input
                type="search"
                required
                placeholder="Поиск"
                className="text-base-content bg-transparent focus:outline-none w-full"
              />
              <svg
                className="h-4 w-4 text-base-content flex-shrink-0 mr-3"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </g>
              </svg>
            </label>

            <div className="border rounded-xl px-3 py-1.5 border-base-300">
              <button onClick={handleOpenModal} className="flex items-center gap-1 text-base-content">
                <FaUserCircle className="text-base-content" />
                Войти
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="drawer-side">
        <label htmlFor="my-drawer" className="drawer-overlay"></label>
        <div className="flex flex-col justify-between h-full w-72 bg-base-100">
          <div className="px-4 py-3">
            <div className="flex justify-end mb-4">
              <label htmlFor="my-drawer" className="cursor-pointer">
                <RxCross2 className="text-xl text-base-content hover:text-primary transition" />
              </label>
            </div>

            <ul className="divide-y divide-base-300">
              <li>
                <Link href="/catalog" className="flex items-center justify-between px-4 py-3 hover:bg-base-300 rounded text-base-content">
                  <span className="flex items-center gap-3 ">
                    <MdCategory className="text-lg text-base-content" />
                    Каталог
                  </span>
                  <span className="text-lg font-bold text-base-content"><FaChevronRight className='text-xs' /> </span>
                </Link>
              </li>
              <li>
                <Link href="/" className="flex items-center justify-between px-4 py-3 hover:bg-base-200 rounded text-base-content">
                  <span className="flex items-center gap-3">
                    <FaGift className="text-lg text-base-content" />
                    Акции
                  </span>
                  <span className="text-lg font-bold text-base-content"><FaChevronRight className='text-xs' />                  </span>
                </Link>
              </li>
              <li>
                <Link href="/" className="flex items-center justify-between px-4 py-3 hover:bg-base-200 rounded text-base-content">
                  <span className="flex items-center gap-3">
                    <FaTools className="text-lg text-base-content" />
                    Проекты
                  </span>
                  <span className="text-lg font-bold text-base-content"><FaChevronRight className='text-xs' />
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/" className="flex items-center justify-between px-4 py-3 hover:bg-base-200 rounded text-base-content">
                  <span className="flex items-center gap-3">
                    <CgProfile className="text-lg text-base-content" />
                    Компания
                  </span>
                  <span className="text-lg font-bold text-base-content"><FaChevronRight className='text-xs' />                  </span>
                </Link>
              </li>
              <li>
                <Link href="/contacts" className="flex items-center justify-between px-4 py-3 hover:bg-base-200 rounded text-base-content">
                  <span className="flex items-center gap-3">
                    <MdContactPhone className="text-lg text-base-content" />
                    Контакты
                  </span>
                  <span className="text-lg font-bold text-base-content"><FaChevronRight className='text-xs' />
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Bottom section */}
          <div className="border-t border-base-content px-4 py-3 space-y-3 text-sm text-base-content">
            <Link href="/profile" className="flex items-center gap-2 hover:text-primary">
              <FaUserCircle className="text-lg text-base-content" />
              Личный кабинет
            </Link>
            <Link href="/cart" className="flex items-center justify-between hover:text-primary">
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5 text-base-content" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 7M7 13l-2 9h12l-2-9m0 0h2m-6 0v9" />
                </svg>
                Корзина
              </span>
              <span className="bg-base-300 text-xs px-2 py-0.5 rounded-full">0</span>
            </Link>
            <Link href="/favorites" className="flex items-center justify-between hover:text-primary">
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5 text-base-content" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                </svg>
                Отложенные
              </span>
              <span className="bg-base-300 text-xs px-2 py-0.5 rounded-full">0</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Login Modal */}
      <dialog ref={modalRef} className="modal" onClose={handleCloseModal}>
        <div className="modal-box bg-base-100 rounded-2xl max-w-sm">
          <form method="dialog" onClick={handleCloseModal}>
            <button className="btn btn-sm absolute right-2 top-2 btn-base-content">✕</button>
          </form>
          <div className="text-center gap-2">
            <p className="flex items-center justify-center gap-2 font-bold text-base-content mb-4 text-2xl">
              <CgProfile className="text-error" />
              Личный кабинет
            </p>
          </div>
          <div className="space-y-4">
            <label className="block text-sm font-medium text-base-content">
              Логин <span className="text-error">*</span>
            </label>
            <input
              type="text"
              placeholder="Введите логин"
              className="w-full h-10 px-3 rounded-xl bg-base-300 border border-base-300"
            />
            <label className="block text-sm font-medium text-base-content">
              Пароль <span className="text-error">*</span>
            </label>
            <input
              type="password"
              placeholder="Введите пароль"
              className="w-full h-10 px-3 rounded-xl bg-base-300 border border-base-300"
            />
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
              <button className="bg-info text-base-100 font-semibold py-2 px-4 rounded-xl w-full">ВОЙТИ</button>
              <button className="border border-info text-info font-semibold py-2 px-4 rounded-xl w-full">РЕГИСТРАЦИЯ</button>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
}
