'use client';
import React from 'react';
import useFetch from '@/hooks/useFetch/useFetch';
import Loading from '@/components/ui/Loading/Loading';
import SidebarCatalog from '@/components/ui/Sidebar/CatalogSidebar';
import CatalogCard from '@/components/ui/CatalogCard/CatalogCard';

const Catalog = () => {
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
  const { data: categories, loading, error } = useFetch(`${serverUrl}/api/v1/categories`);
  console.log("asdsada", serverUrl)
  return (
    <main className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-6">
      {/* Сайдбар с категориями */}
      <SidebarCatalog categories={categories || []} />

      {/* Основной контент */}
      <div className="flex-1">
        <h1 className="text-3xl font-bold mb-2">Каталог</h1>
        <p className="text-neutral-400 mb-6">Главная - Каталог</p>

        {loading && <Loading />}
        {error && (
          <p className="text-error mt-10">
            Ошибка загрузки категорий: {error.message || 'Неизвестная ошибка'}
          </p>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {categories && categories.length > 0 ? (
              categories.map((category) => (
                <CatalogCard key={category._id} category={category} serverUrl={serverUrl} />
              ))
            ) : (
              <p className="text-neutral-500">Категории не найдены</p>
            )}
          </div>
        )}
      </div>
    </main>
  );
};

export default Catalog;

