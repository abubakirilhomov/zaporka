'use client';

import Link from 'next/link';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import logo from '../../../../public/images/logo.png';
import { IoMdArrowDropdown } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { use, useEffect, useRef, useState } from 'react';
import { IoMdCall } from "react-icons/io";
import axios from 'axios'; // Import axios

export default function NavDesktop() {
  const [windowWidth, setWindowWidth] = useState(0);
  const modalRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [page] = useState(1); // Default page
  const [limit] = useState(10); // Default limit
  const apiUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000';
  const cartItems = useSelector((state) => state.cart.items);
  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const phoneNumber = "999001507";
  console.log("Asdasdasd")

  useEffect(() => {
    console.log("hahahahah")
  }, [])
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth);
    }
  }, []);

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

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery) return;

    try {
      const response = await axios.get(`${apiUrl}/api/v1/products/search?query=${encodeURIComponent(searchQuery)}&page=${page}&limit=${limit}`);
      setSearchResults(response.data); 
      console.log('Search results:', response);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  return (
    <>
      <nav className="text-base-300 p-5 hidden md:block sticky z-50 pr-20 items-center shadow-xs">
        <div className='flex justify-between items-center gap-10'>
          <div className="container mx-auto flex gap-8 justify-start items-center relative left-10">
            <Link href={`/`}>
              <Image src={logo} alt="Logo" width={150} height={150} className='cursor-pointer' />
            </Link>
            <form onSubmit={handleSearch} className="input border flex items-center w-[60%] h-10 ml-16 border-primary bg-base-100">
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                required
                placeholder="Поиск"
                className="text-base-content bg-transparent focus:outline-none px-3 w-full"
              />
              <button type="submit" className="ml-2">
                <svg className="h-3 w-3 text-base-content flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.3-4.3"></path>
                  </g>
                </svg>
              </button>
            </form>
            {searchResults.length > 0 && (
              <div className="mt-2 p-2 bg-base-100 border border-primary rounded">
                {searchResults.map((product, index) => (
                  <div key={index} className="text-base-content">{product.title || product.description}</div>
                ))}
              </div>
            )}
          </div>

          <div className="relative group cursor-pointer p-1 rounded-sm border border-primary">
            <p className="text-sm text-base-content font-bold rounded-full p-1 flex gap-2 items-center">
              <IoMdCall className='text-success'/>Позвонить<IoMdArrowDropdown />
            </p>
            <div className="absolute left-0 pl-5 pr-5 h-8 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-in-out bg-base-300 p-1 rounded shadow z-10 ml-3 mt-3">
              <Link href="https://voice.google.com/u/0/calls" passHref legacyBehavior>
                <a rel='noopener norferrer' target='_blank' className='bg-base-300 text-success font-medium rounded-2xl '>{phoneNumber}</a>
              </Link>
            </div>
          </div>

          <div className='flex items-center gap-10 p-2 pl-2 pr-2 rounded-sm border border-primary'>
            <button className="cursor-pointer text-sm font-bold flex items-center gap-2 text-base-content" onClick={handleOpenModal}>
              <FaUserCircle /> Войти
            </button>

            <dialog id="my_modal_3" className="modal" ref={modalRef} onClose={handleCloseModal}>
              <div className="modal-box bg-base-100 rounded-2xl max-w-sm">
                <form method="dialog" onClick={handleCloseModal}>
                  <button className="btn btn-sm absolute right-2 top-2 btn-base-300">✕</button>
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
                      type="login"
                      placeholder="Введите пароль"
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
                      <span className='text-base-content'>Запомнить меня</span>
                    </label>
                    <Link href="#" className="hover:underline text-info">ЗАБЫЛИ ПАРОЛЬ?</Link>
                  </div>
                  <div className="flex gap-2 justify-between mt-4">
                    <button className="bg-info cursor-pointer text-base-300 font-semibold py-2 px-4 rounded-xl w-full hover:bg-success-content duration-200">
                      ВОЙТИ
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