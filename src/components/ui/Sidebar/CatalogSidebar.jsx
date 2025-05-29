'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiChevronRight } from 'react-icons/fi';
import { HiOutlineViewGrid } from 'react-icons/hi';
import { IoChevronUpSharp, IoChevronDownSharp } from 'react-icons/io5';

const SidebarCatalog = () => {
  const [categories, setCategories] = useState([]);
  const [isOpen, setIsOpen] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('https://zaporka-backend.onrender.com/api/v1/categories');
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error('Ошибка при загрузке категорий:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <aside className="w-[260px] h-screen overflow-y-auto bg-white border-r border-gray-200 shadow-sm flex flex-col">
      {/* Header */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="px-5 py-4 flex justify-between items-center border-b border-gray-200 cursor-pointer select-none"
      >
        <h2 className="text-[14px] font-bold tracking-wide flex items-center gap-2 text-black">
          <HiOutlineViewGrid size={18} /> КАТАЛОГ
        </h2>
        {isOpen ? (
          <IoChevronUpSharp className="text-sm text-black" />
        ) : (
          <IoChevronDownSharp className="text-sm text-black" />
        )}
      </div>

      {/* List */}
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-[1000px]' : 'max-h-0'
        }`}
      >
        <ul className="divide-y divide-gray-100">
          {categories.map((category) => {
            const isActive = pathname === `/catalog/${category.slug}`;

            return (
              <li key={category._id}>
                <Link
                  href={`/catalog/${category.slug}`}
                  className={`block px-5 py-4 text-[14px] transition-all duration-200 ${
                    isActive
                      ? 'bg-gray-100 font-semibold'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-gray-900">{category.name}</span>
                    <FiChevronRight className="text-gray-400" size={16} />
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
};

export default SidebarCatalog;
