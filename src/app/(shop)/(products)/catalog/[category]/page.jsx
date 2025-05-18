'use client';

import { useParams } from 'next/navigation';
import useFetch from '@/hooks/useFetch/useFetch';
import Loading from '@/components/ui/Loading/Loading';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import Head from 'next/head';
import { useState, useCallback, useEffect } from 'react';
import ProductCard from '@/components/ui/ProductsCard/ProductsCard';
import CartModal from '@/components/ui/CartModal/CartModal';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/redux/slices/cartSlice';
import { BsCartPlus } from 'react-icons/bs';
import { toast } from 'react-toastify';

const Page = () => {
  const { category } = useParams();
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
  const shouldReduceMotion = useReducedMotion();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const dispatch = useDispatch();

  const { data: products, loading, error, refetch } = useFetch(
    `${serverUrl}/api/v1/products/by-category/${category}`,
    {}
  );

  const [imageErrors, setImageErrors] = useState({});
  const [isRefetching, setIsRefetching] = useState(false);

  const initializeImageErrors = useCallback(() => {
    if (!products) return;
    setImageErrors((prev) => {
      const newErrors = { ...prev };
      products.forEach((product, index) => {
        const productId = product._id || product.id || `${product.title}-${product.price}-${index}`;
        if (!(productId in newErrors)) {
          newErrors[productId] = false;
        }
      });
      return newErrors;
    });
  }, [products]);

  useEffect(() => {
    if (products && Object.keys(imageErrors).length === 0) {
      initializeImageErrors();
    }
  }, [products, initializeImageErrors]);

  const handleRefetch = useCallback(() => {
    if (isRefetching) return;
    setIsRefetching(true);
    refetch();
    setTimeout(() => setIsRefetching(false), 1000);
  }, [refetch, isRefetching]);

  const handleAddToCart = (product) => {
    const price = Number(product.price);
    if (isNaN(price)) {
      toast.error('Ошибка: некорректная цена товара');
      return;
    }
    dispatch(
      addToCart({
        id: product._id || product.id,
        title: product.title,
        price,
        quantity: 1,
      })
    );
    setSelectedProduct(product);
    window.my_modal_1.showModal();
  };

  const motionProps = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 0 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.3, ease: 'easeOut' },
        whileHover: { y: 0, transition: { duration: 0.2 } },
      };

  if (!serverUrl || !category) {
    return (
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-8"
      >
        <p className="text-error text-center mt-10">
          {serverUrl ? 'Ошибка: категория не указана' : 'Ошибка: сервер не настроен'}
        </p>
      </motion.main>
    );
  }

  const decodedCategory = decodeURIComponent(category);

  return (
    <>
      <Head>
        <title>Категория: {decodedCategory} | Ваш Магазин</title>
        <meta
          name="description"
          content={`Просмотрите товары в категории ${decodedCategory} - высококачественные изделия с доставкой.`}
        />
      </Head>

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="container mx-auto md:px-4 sm:px-6 lg:px-8 py-8"
      >
        <CartModal selectedProduct={selectedProduct} setSelectedProduct={setSelectedProduct} />

        <h1 className="text-3xl font-bold">Категория: {decodedCategory}</h1>
        <nav aria-label="Breadcrumb" className="pt-5">
          <ol className="flex space-x-2 text-neutral-400">
            <li>
              <Link href="/" className="hover:text-primary">
                Главная
              </Link>
            </li>
            <li> / </li>
            <li>
              <Link href="/catalog" className="hover:text-primary">
                Каталог
              </Link>
            </li>
            <li> / {decodedCategory}</li>
          </ol>
        </nav>

        {loading && (
          <div className="flex justify-center mt-10">
            <Loading aria-label="Загрузка товаров" />
          </div>
        )}

        {error && (
          <div className="mt-10 text-center">
            <p className="text-error">
              Ошибка загрузки товаров:{' '}
              {error instanceof Error ? error.message : 'Неизвестная ошибка'}
            </p>
            <button
              onClick={handleRefetch}
              disabled={isRefetching}
              className={`mt-4 px-4 py-2 text-white rounded ${
                isRefetching
                  ? 'cursor-not-allowed'
                  : 'bg-primary hover:bg-primary-dark'
              }`}
            >
              Попробовать снова
            </button>
          </div>
        )}

        {!loading && !error && (
          <div className="mt-10">
            {products && products.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-6 gap-2">
                {products.map((product, index) => (
                  <ProductCard
                    key={product._id || product.id || `${product.title}-${product.price}-${index}`}
                    product={product}
                    index={index}
                    motionProps={motionProps}
                    imageErrors={imageErrors}
                    setImageErrors={setImageErrors}
                    setSelectedProduct={setSelectedProduct}
                    renderButton={() => (
                      <button
                        className="mt-3 btn w-full relative overflow-hidden
                          bg-gradient-to-r from-blue-500 to-indigo-600
                          hover:from-blue-600 hover:to-indigo-700
                          text-white font-semibold py-3 px-6 rounded-xl
                          shadow-lg hover:shadow-xl
                          transform transition-all duration-300 ease-in-out
                          hover:scale-105 active:scale-95
                          flex items-center justify-center gap-2
                          group"
                        onClick={(e) => {
                          e.preventDefault();
                          handleAddToCart(product);
                        }}
                        aria-label={`Добавить ${product.title} в корзину`}
                      >
                        <span className="relative z-10">Добавить в корзину</span>
                        <BsCartPlus
                          size={20}
                          className="relative z-10 transform transition-transform duration-300 group-hover:translate-x-1 group-hover:scale-110"
                        />
                        <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
                      </button>
                    )}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center mt-10">
                <p className="text-neutral-500">Товары в категории не найдены</p>
                <Link
                  href="/catalog"
                  className="mt-4 inline-block px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark"
                >
                  Вернуться в каталог
                </Link>
              </div>
            )}
          </div>
        )}
      </motion.main>
    </>
  );
};

export default Page;