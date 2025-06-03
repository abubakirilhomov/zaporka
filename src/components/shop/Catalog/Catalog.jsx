'use client';
import React from 'react';
import CatalogCard from '@/components/ui/CatalogCard/CatalogCard';
import Loading from '@/components/ui/Loading/Loading';
import useFetch from '@/hooks/useFetch/useFetch';
import SidebarCatalog from '@/components/ui/CatalogSidebar/CatalogSidebar'

const Catalog = () => {
  const serverUrl = 'https://zaporka-backend.onrender.com';
  const { data: categories, loading, error } = useFetch(`${serverUrl}/api/v1/categories`);

  return (
    <div className="flex flex-col md:flex-row container mx-auto md:px-4 px-0 py-8">
      {/* Левый сайдбар */}
      <div className="w-full md:w-64 mb-8 md:mb-0">
        <SidebarCatalog categories={categories} />
      </div>

      {/* Основной контент */}
      <main className="flex-1 md:pl-6">
        <h1 className="text-3xl font-bold">Каталог</h1>
        <p className="text-neutral-400 pt-2">Главная - Каталог</p>

        {loading && <Loading />}
        {error && (
          <p className="mt-10 text-error">
            Ошибка загрузки категорий: {error.message || 'Неизвестная ошибка'}
          </p>
        )}

        {!loading && !error && (
          <div className="mt-10">
            {categories && categories.length > 0 ? (
              <CatalogCard categories={categories} serverUrl={serverUrl} />
            ) : (
              <p className="text-neutral-500">Категории не найдены</p>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Catalog;
