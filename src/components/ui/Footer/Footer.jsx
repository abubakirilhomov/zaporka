'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { MdEmail, MdPhone, MdLocationOn } from 'react-icons/md';

export default function Footer() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('https://zaporka-backend.onrender.com/api/v1/company-info')
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error('Ошибка при загрузке данных:', err));
  }, []);

  return (
    <footer className="bg-base-200 text-base-content py-10 px-4">
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-center md:text-center">
        {/* Каталог */}
        <div>
          <h3 className="font-bold uppercase mb-3">Каталог</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="#" className="hover:underline">Клапаны</Link></li>
            <li><Link href="#" className="hover:underline">Задвижки</Link></li>
            <li><Link href="#" className="hover:underline">Затворы</Link></li>
          </ul>
        </div>

        {/* О компании */}
        <div>
          <h3 className="font-bold uppercase mb-3">Компания</h3>
          <p className="text-sm leading-relaxed">
            {data?.companyInfo || 'Загрузка информации...'}
          </p>
        </div>

        <div className=''>
          <h3 className="font-bold uppercase mb-3">Контакты</h3>
          <ul className="space-y-3 text-sm flex justify-center">
            {data?.phoneNumbers?.map((phone, index) => (
              <li key={index} className="flex items-center justify-center md:justify-start gap-2">
                <MdPhone />
                <a href={`tel:${phone}`} className="hover:underline">{phone}</a>
              </li>
            ))}
            {data?.email?.map((email, index) => (
              <li key={index} className="flex items-center justify-center md:justify-start gap-2">
                <MdEmail />
                <a href={`mailto:${email}`} className="hover:underline">{email}</a>
              </li>
            ))}
            {data?.companyAddress?.address && (
              <li className="flex items-center justify-center md:justify-start gap-2">
                <MdLocationOn />
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(data.companyAddress.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  {data.companyAddress.address}
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* Подвал */}
      <div className="border-t border-base-300 mt-10 pt-6 text-sm text-center px-2">
        <p>
          2025 © Запорная арматура.РУ – клапана, задвижки, затворы,
          <Link href="#" className="text-primary hover:underline ml-1">водоподготовка</Link>,
          кабель оптом со склада
          <Link href="#" className="text-primary hover:underline ml-1">СПб</Link>
        </p>
      </div>
    </footer>
  );
}
