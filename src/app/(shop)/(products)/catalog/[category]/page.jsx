'use client';
import React from 'react';
import { useParams } from 'next/navigation';
import useFetch from '@/hooks/useFetch/useFetch';
import Loading from '@/components/ui/Loading/Loading';
import Link from 'next/link';
import { motion } from 'framer-motion';

const Page = () => {
  const { category } = useParams();
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
  const { data: products, loading, error } = useFetch(
    `${serverUrl}/api/v1/categories/${category}`
  );
  console.log(category)
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold">Категория: {category}</h1>
      <p className="text-neutral-400 pt-5">Главная - Каталог - {category}</p>

      {loading && <Loading />}
      {error && (
        <p className="mt-10 text-error">
          Ошибка загрузки товаров: {error.message || 'Неизвестная ошибка'}
        </p>
      )}

      {!loading && !error && (
        <div className="mt-10">
          {products && products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((product) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                >
                  <Link
                    href={`/product/${product.id}`}
                    className="p-6 flex-1 min-w-[150px] max-w-[33.33%] rounded border border-neutral-300 flex flex-col items-center"
                  >
                    <img
                      src={product.image || '/placeholder-image.png'}
                      alt={`Image for ${product.name}`}
                      className="w-full h-32 object-cover mb-3"
                    />
                    <span className="hover:text-primary font-light text-center">
                      {product.name}
                    </span>
                    <p className="text-neutral-500 text-sm text-center pt-3">
                      {product.price ? `${product.price} ₽` : 'Цена неизвестна'}
                    </p>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-neutral-500">Товары в категории не найдены</p>
          )}
        </div>
      )}
    </main>
  );
};

export default Page;