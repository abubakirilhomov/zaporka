'use client';

import Image from 'next/image';
import { FaCcVisa, FaCcMastercard, FaPaypal } from 'react-icons/fa';
import { MdEmail, MdLocationOn, MdPhone } from 'react-icons/md';

export default function Footer() {
  return (
    <footer className="neutral-content		 text-neutral-content py-10 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Каталог */}
        <div>
          <h3 className="font-bold uppercase mb-3">Каталог</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:underline">Акции</a></li>
            <li><a href="#" className="hover:underline">Услуги</a></li>
            <li><a href="#" className="hover:underline">Бренды</a></li>
          </ul>
        </div>

        {/* Компания */}
        <div>
          <h3 className="font-bold uppercase mb-3">Компания</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:underline">О компании</a></li>
            <li><a href="#" className="hover:underline">Новости</a></li>
            <li><a href="#" className="hover:underline">Отзывы</a></li>
            <li><a href="#" className="hover:underline">Контакты</a></li>
          </ul>
        </div>

        {/* Информация */}
        <div>
          <h3 className="font-bold uppercase mb-3">Информация</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:underline">Магазины</a></li>
            <li><a href="#" className="hover:underline">Производители</a></li>
          </ul>
        </div>

        {/* Сервис + Контакты */}
        <div className="md:col-span-2 flex flex-col space-y-4">
          <h3 className="font-bold uppercase">Сервис</h3>

          <a href="tel:+78125092908" className="flex items-center space-x-2 hover:underline">
            <MdPhone />
            <span>+7 (812) 509-29-08</span>
          </a>

          <a href="mailto:zarmaturaru@mail.ru" className="flex items-center space-x-2 hover:underline">
            <MdEmail />
            <span>zarmaturaru@mail.ru</span>
          </a>

          <a
            href="https://www.google.com/maps/search/?api=1&query=Санкт-Петербург+Петергофское+шоссе,+756"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 hover:underline"
          >
            <MdLocationOn />
            <span>г. Санкт-Петербург, Петергофское шоссе, 756</span>
          </a>

          <form className="mt-4 flex">
            <input
              type="email"
              placeholder="Подписаться на рассылку"
              className="input input-bordered rounded-l w-full text-black"
            />
            <button type="submit" className="btn btn-primary rounded-l-none">→</button>
          </form>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-sm text-center">
        <p className="mb-3">
          2025 © Запорная арматура.РУ – клапана, задвижки, затворы,{" "}
          <a href="#" className="text-blue-400 hover:underline">водоподготовка</a>, кабель оптом со склада{" "}
          <a href="#" className="text-blue-400 hover:underline">СПб</a>
        </p>
        <div className="flex justify-center space-x-4 items-center">
          <FaCcVisa size={28} />
          <FaCcMastercard size={28} />
          <FaPaypal size={28} />
          <Image
            src="/icons/mir.png"
            alt="Мир"
            width={40}
            height={24}
            className="object-contain"
          />
        </div>
      </div>
    </footer>
  );
}
