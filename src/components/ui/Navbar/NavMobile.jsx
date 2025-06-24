"use client";

import { useState, useEffect } from "react";
import {
  FaBars,
  FaGift,
  FaTools,
  FaTelegram,
  FaHeart,
  FaChartBar,
  FaChevronRight,
} from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { MdCategory, MdContactPhone } from "react-icons/md";
import { IoMdCall } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import Link from "next/link";
import axios from "axios";
import Image from "next/image";
import logo from "../../../../public/images/logo.png"; // Adjusted path for cleaner import
import { useSelector } from "react-redux";

export default function NavMobile() {
  const phoneNumber = process.env.NEXT_PUBLIC_PHONE_NUMBER || "999001507";
  const telegramLink = process.env.NEXT_PUBLIC_TELEGRAM_LINK || "https://t.me/DoniyorSamadov";
  const apiUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";
  const cartItems = useSelector((state) => state.cartItems);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Debounced search
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery) {
        setIsLoading(true);
        setError(null);
        axios
          .get(`${apiUrl}/api/v1/products/search?query=${encodeURIComponent(searchQuery)}`)
          .then((res) => {
            setSearchResults(res.data);
            setIsLoading(false);
          })
          .catch((err) => {
            console.error(err);
            setError("Ошибка при поиске");
            setIsLoading(false);
          });
      } else {
        setSearchResults([]);
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, apiUrl]);

  const pages = [
    { name: "Каталог", href: "/catalog", icon: <MdCategory className="text-lg text-base-content" /> },
    { name: "Акции", href: "/", icon: <FaGift className="text-lg text-base-content" /> },
    { name: "Услуги", href: "/", icon: <FaTools className="text-lg text-base-content" /> },
    { name: "Компания", href: "/", icon: <CgProfile className="text-lg text-base-content" /> },
    { name: "Контакты", href: "/contacts", icon: <MdContactPhone className="text-lg text-base-content" /> },
  ];

  return (
    <div className="drawer drawer-start md:hidden sticky top-0 z-50">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content bg-base-100 shadow-xs px-4 py-3 border-b border-base-300">
        <div className="flex justify-between items-center">
          <label htmlFor="my-drawer" className="p-2 cursor-pointer" aria-label="Открыть меню">
            <FaBars className="w-6 h-6 text-base-content" />
          </label>

          <Link href="/" className="absolute left-1/2 transform -translate-x-1/2">
            <Image src={logo} alt="Логотип компании" width={100} height={40} priority />
          </Link>

          <div className="flex items-center gap-3">
            <a
              href={`tel:${phoneNumber}`}
              className="bg-base-300 p-2 rounded-2xl"
              aria-label="Позвонить"
            >
              <IoMdCall className="text-xl text-success" aria-hidden="true" />
            </a>
            <a
              href={telegramLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-base-300 p-2 rounded-2xl"
              aria-label="Написать в Telegram"
            >
              <FaTelegram className="text-xl text-info" aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* Search Input */}
        <div className="relative mt-2">
          <label className="input border rounded-2xl flex items-center h-10 border-primary bg-base-100 w-full">
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Поиск товаров..."
              className="text-base-content bg-transparent focus:outline-none w-full"
              aria-label="Поиск товаров"
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
          {isLoading && <div className="p-2 bg-base-100 w-full shadow rounded">Загрузка...</div>}
          {error && <div className="p-2 bg-base-100 w-full shadow rounded text-error">{error}</div>}
          {searchResults.length > 0 && !isLoading && !error && (
            <div className="absolute top-12 left-0 bg-base-100 w-full shadow rounded max-h-64 overflow-y-auto z-50">
              {searchResults.map((item, i) => (
                <Link
                  key={item.id || i}
                  href={`/products/${item.id}`}
                  className="block p-2 border-b border-base-200 hover:bg-base-200"
                  onClick={() => {
                    setSearchResults([]);
                    document.getElementById("my-drawer").checked = false;
                  }}
                >
                  {item.title || item.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="drawer-side">
        <label htmlFor="my-drawer" className="drawer-overlay"></label>
        <div className="flex flex-col justify-between h-full w-72 bg-base-100">
          <div className="px-4 py-3">
            <div className="flex justify-end mb-4">
              <label htmlFor="my-drawer" className="cursor-pointer" aria-label="Закрыть меню">
                <RxCross2 className="text-xl text-base-content hover:text-primary transition" />
              </label>
            </div>

            <ul className="divide-y divide-base-300">
              {pages.map((item, i) => (
                <li key={i}>
                  <Link
                    href={item.href}
                    className="flex items-center justify-between px-4 py-3 hover:bg-base-300 rounded text-base-content"
                    onClick={() => document.getElementById("my-drawer").checked = false}
                  >
                    <span className="flex items-center gap-3">{item.icon} {item.name}</span>
                    <span className="text-lg font-bold text-base-content">
                      <FaChevronRight className="text-xs" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Bottom section */}
          <div className="border-t border-base-content px-4 py-3 space-y-3 text-sm text-base-content">
            <Link
              href="/favorites"
              className="flex items-center justify-between hover:text-primary"
              onClick={() => document.getElementById("my-drawer").checked = false}
            >
              <span className="flex items-center gap-2">
                <FaHeart className="w-5 h-5 text-base-content" aria-hidden="true" />
                Отложенные
              </span>
              <span className="bg-base-300 text-xs px-2 py-0.5 rounded-full">0</span>
            </Link>
            <Link
              href="/compare"
              className="flex items-center justify-between hover:text-primary"
              onClick={() => document.getElementById("my-drawer").checked = false}
            >
              <span className="flex items-center gap-2">
                <FaChartBar className="w-5 h-5 text-base-content" aria-hidden="true" />
                Сравнение
              </span>
              <span className="bg-base-300 text-xs px-2 py-0.5 rounded-full">0</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}