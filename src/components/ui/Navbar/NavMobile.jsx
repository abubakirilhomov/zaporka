"use client";

import { useState, useEffect, useRef } from "react";
import {
  FaBars,
  FaGift,
  FaTools,
  FaTelegram,
  FaHeart,
  FaChartBar,
} from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { MdCategory, MdContactPhone } from "react-icons/md";
import { LuShoppingCart } from "react-icons/lu";
import { IoMdCall } from "react-icons/io";
import Link from "next/link";
import axios from "axios";
import Image from "next/image";
import logo from "../../../../public/images/logo.png"; // Adjusted path for cleaner import
import { useSelector } from "react-redux";

export function NavMobile() {
  const phoneNumber = process.env.NEXT_PUBLIC_PHONE_NUMBER || "999001507";
  const telegramLink = process.env.NEXT_PUBLIC_TELEGRAM_LINK || "https://t.me/DoniyorSamadov";
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const apiUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";
  const cartItems = useSelector((state) => state.cart.items);
  const drawerRef = useRef(null);

  // Toggle drawer
  const toggleDrawer = () => setDrawerOpen((prev) => !prev);

  // Close drawer when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target)) {
        setDrawerOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
    { name: "Каталог", href: "/catalog", icon: <MdCategory /> },
    { name: "Акции", href: "/", icon: <FaGift /> },
    { name: "Услуги", href: "/", icon: <FaTools /> },
    { name: "Компания", href: "/", icon: <CgProfile /> },
    { name: "Контакты", href: "/contacts", icon: <MdContactPhone /> },
  ];

  return (
    <nav className="md:hidden sticky top-0 z-50 bg-base-100 shadow-xs px-4 py-3 border-b border-base-300">
      <div className="flex justify-between items-center">
        <button onClick={toggleDrawer} className="p-2" aria-label="Открыть меню">
          <FaBars className="text-xl" aria-hidden="true" />
        </button>

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
        <input
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Поиск товаров..."
          className="input input-bordered w-full"
          aria-label="Поиск товаров"
        />
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
                  setDrawerOpen(false);
                }}
              >
                {item.title || item.name}
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Drawer */}
      {isDrawerOpen && (
        <div
          ref={drawerRef}
          className="absolute left-0 w-[70%] h-screen bg-base-300 z-40 p-4 rounded-r-2xl transition-transform duration-300"
        >
          {pages.map((item, i) => (
            <Link
              key={i}
              href={item.href}
              className="flex items-center gap-2 py-3 text-sm hover:bg-base-200 rounded px-2"
              onClick={() => setDrawerOpen(false)}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}

          <hr className="my-4 border-base-200" />

          <Link
            href="/cart"
            className="flex items-center gap-2 py-3 text-sm"
            onClick={() => setDrawerOpen(false)}
          >
            <LuShoppingCart className="text-lg" aria-hidden="true" /> Корзина
          </Link>

          <Link
            href="/saved"
            className="flex items-center gap-2 py-3 text-sm"
            onClick={() => setDrawerOpen(false)}
          >
            <FaHeart className="text-lg" aria-hidden="true" /> Отложенные
          </Link>

          <Link
            href="/compare"
            className="flex items-center gap-2 py-3 text-sm"
            onClick={() => setDrawerOpen(false)}
          >
            <FaChartBar className="text-lg" aria-hidden="true" /> Сравнение
          </Link>
        </div>
      )}
    </nav>
  );
}