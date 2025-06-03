import Catalog from '@/components/shop/Catalog/Catalog';
import React, { useState } from 'react';
import { FiGrid, FiChevronDown, FiChevronRight } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const CatalogSidebar = ({ categories }) => {
  const [open, setOpen] = useState(true);
  const safeCategories = Array.isArray(categories) ? categories : [];

  return (
    <aside className="w-full md:w-64 bg-white border border-gray-200 p-4">
      {/* Заголовок */}
      <div
        className="flex items-center justify-between cursor-pointer mb-2"
        onClick={() => setOpen(!open)}
      >
        <h2 className="font-bold text-lg flex items-center gap-2">
          <FiGrid /> КАТАЛОГ
        </h2>
        {open ? <FiChevronDown size={18} /> : <FiChevronRight size={18} />}
      </div>

      {/* Список категорий с анимацией */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="categories"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="flex flex-col divide-y divide-gray-200 border border-gray-200 rounded-md">
              {safeCategories.length > 0 ? (
                safeCategories.map((cat) => (
                  <div
                    key={cat._id}
                    className="px-4 py-3 text-sm hover:bg-gray-50 cursor-pointer flex justify-between items-center"
                  >
                    <span>{cat.name}</span>
                    <FiChevronRight size={14} />
                  </div>
                ))
              ) : (
                <p className="text-neutral-500 px-4 py-3">Категории не найдены</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </aside>
  );
};

export default CatalogSidebar;
