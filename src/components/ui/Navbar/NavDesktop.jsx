"use client";

import { useState, useEffect, useRef } from "react";
import { FaTelegram } from "react-icons/fa";
import { IoMdCall } from "react-icons/io";
import { useSelector } from "react-redux";
import Link from "next/link";
import axios from "axios";
import Image from "next/image";
import logo from "../../../../public/images/logo.png"; // Adjusted path for cleaner import

export function NavDesktop() {
  const phoneNumber = process.env.NEXT_PUBLIC_PHONE_NUMBER || "999001507";
  const telegramLink = process.env.NEXT_PUBLIC_TELEGRAM_LINK || "https://t.me/DoniyorSamadov";
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const apiUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchResults([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

  return (
    <nav className="hidden md:flex justify-between items-center px-10 py-4 bg-base-100 shadow sticky top-0 z-50">
      <Link href="/" aria-label="Главная страница">
        <Image src={logo} alt="Запорка" width={150} height={50} priority />
      </Link>

      <div className="relative w-1/2" ref={searchRef}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="input input-bordered w-full"
          placeholder="Поиск товаров..."
          aria-label="Поиск товаров"
        />
        {isLoading && <div className="absolute top-12 left-0 p-2 bg-base-100 w-full shadow rounded">Загрузка...</div>}
        {error && <div className="absolute top-12 left-0 p-2 bg-base-100 w-full shadow rounded text-error">{error}</div>}
        {searchResults.length > 0 && !isLoading && !error && (
          <div className="absolute top-12 left-0 bg-base-100 w-full shadow rounded max-h-64 overflow-y-auto z-50">
            {searchResults.map((item, i) => (
              <Link
                key={item.id || i}
                href={`/products/${item.id}`}
                className="block p-2 border-b border-base-200 hover:bg-base-200"
                onClick={() => setSearchResults([])}
              >
                {item.title || item.name}
              </Link>
            ))}
          </div>
        )}
      </div>

      <div className="flex gap-4 items-center">
        <a
          href={`tel:${phoneNumber}`}
          className="btn btn-outline btn-success"
          aria-label="Позвонить"
        >
          <IoMdCall aria-hidden="true" /> Позвонить
        </a>
        <a
          href={telegramLink}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-outline btn-info"
          aria-label="Написать в Telegram"
        >
          <FaTelegram aria-hidden="true" /> Написать
        </a>
      </div>
    </nav>
  );
}