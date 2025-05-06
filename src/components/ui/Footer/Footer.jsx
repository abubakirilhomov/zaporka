'use client';

import Image from 'next/image';
import { FaCcVisa, FaCcMastercard, FaPaypal } from 'react-icons/fa';
import { MdEmail, MdLocationOn, MdPhone } from 'react-icons/md';

export default function Footer() {
  return (
<footer className="bg-[#89aa] text-neutral-content py-10 px-4">

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Каталог */}
        <div>
          <h3 className="font-bold uppercase mb-3">Каталог</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:underline">Акции</a></li>
            <li><a href="#" className="hover:underline">Услуги</a></li>
            <li><a href="#" className="hover:underline">Бренды</a></li>
          </ul>
        </div>

        {/* Компания */}
        <div>
          <h3 className="font-bold uppercase mb-3">Компания</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:underline">О компании</a></li>
            <li><a href="#" className="hover:underline">Новости</a></li>
            <li><a href="#" className="hover:underline">Отзывы</a></li>
            <li><a href="#" className="hover:underline">Контакты</a></li>
          </ul>
        </div>

        {/* Информация */}
        <div>
          <h3 className="font-bold uppercase mb-3">Информация</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:underline">Магазины</a></li>
            <li><a href="#" className="hover:underline">Производители</a></li>
          </ul>
        </div>

        {/* Контакты и подписка */}
        <div className="flex flex-col space-y-3">
          <h3 className="font-bold uppercase">Сервис</h3>

          <a href="tel:+78125092908" className="flex items-center space-x-2 text-sm hover:underline">
            <MdPhone />
            <span>+7 (812) 509-29-08</span>
          </a>

          <a href="mailto:zarmaturaru@mail.ru" className="flex items-center space-x-2 text-sm hover:underline">
            <MdEmail />
            <span>zarmaturaru@mail.ru</span>
          </a>

          <a
            href="https://www.google.com/maps/search/?api=1&query=Санкт-Петербург+Петергофское+шоссе,+756"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-sm hover:underline"
          >
            <MdLocationOn />
            <span>г. Санкт-Петербург, Петергофское шоссе, 756</span>
          </a>

          <form className="mt-4 flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Ваш email"
              className="input input-bordered w-full sm:flex-1 text-black"
            />
            <button type="submit" className="btn btn-primary w-full sm:w-auto">Подписаться</button>
          </form>
        </div>
      </div>

      {/* Нижняя часть */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-sm text-center">
        <p className="mb-3 px-2">
          2025 © Запорная арматура.РУ – клапана, задвижки, затворы,
          <a href="#" className="text-blue-400 hover:underline ml-1">водоподготовка</a>,
          кабель оптом со склада
          <a href="#" className="text-blue-400 hover:underline ml-1">СПб</a>
        </p>
        <div className="flex justify-center items-center space-x-4">
          <FaCcVisa size={26} />
          <FaCcMastercard size={26} />
          <FaPaypal size={26} />
          <Image
            src="/icons/mir.png"
            alt="Мир"
            width={36}
            height={24}
            className="object-contain"
          />
        </div>
      </div>
    </footer>
  );
}
