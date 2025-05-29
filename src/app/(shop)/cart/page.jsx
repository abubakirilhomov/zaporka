'use client';

import { useSelector, useDispatch } from 'react-redux';
import useFetch from '@/hooks/useFetch/useFetch';
import { clearCart } from '@/redux/slices/cartSlice';
import Loading from '@/components/ui/Loading/Loading';
import { toast } from 'react-toastify';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const CartPage = () => {
  const dispatch = useDispatch();
  const { userData, items: cartItems } = useSelector((state) => state.cart);
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const store = useSelector((store) => store)
  console.log(store)
  const productIds = cartItems.map((item) => item.id).join(',');
  const { data: products, loading, error } = useFetch(
    productIds ? `${serverUrl}/api/v1/products?ids=${productIds}` : null,
    {}
  );

  const handleBuy = async () => {
    if (
      !cartItems.length ||
      !userData.firstName ||
      !userData.lastName ||
      !userData.phoneNumber ||
      !userData.address
    ) {
      toast.error('Пожалуйста, заполните данные и добавьте товары в корзину');
      return;
    }

    setIsSubmitting(true);
    const totalPrice = cartItems.reduce(
      (sum, item) => sum + (Number(item.price) * Number(item.quantity) || 0),
      0
    );
    if (isNaN(totalPrice)) {
      toast.error('Ошибка: некорректная цена товаров');
      setIsSubmitting(false);
      return;
    }
    const orderData = {
      products: cartItems.map((item) => item.id),
      ...userData,
      totalPrice,
    };

    try {
      const response = await fetch(`${serverUrl}/api/v1/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success('Заказ успешно отправлен!');
        dispatch(clearCart());
      } else {
        throw new Error(data.message || 'Ошибка при оформлении заказа');
      }
    } catch (err) {
      console.error(err);
      toast.error(err.message || 'Ошибка при оформлении заказа');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Корзина | Ваш Магазин</title>
        <meta name="description" content="Просмотрите товары в вашей корзине и оформите заказ." />
      </Head>
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-8"
      >
        <h1 className="text-3xl font-bold mb-6">Ваша корзина</h1>

        {loading && (
          <div className="flex justify-center mt-10">
            <Loading aria-label="Загрузка товаров" />
          </div>
        )}

        {error && (
          <div className="mt-10 text-center">
            <p className="text-error">
              Ошибка загрузки товаров: {error instanceof Error ? error.message : 'Неизвестная ошибка'}
            </p>
          </div>
        )}

        {!loading && !error && (
          <div className="mt-10">
            {cartItems.length > 0 ? (
              <div>
                <h2 className="text-xl font-semibold mb-4">Товары в корзине</h2>
                <ul className="space-y-4">
                  {cartItems.map((item) => (
                    <li key={item.id} className="border p-4 rounded-lg">
                      <h3 className="text-lg font-medium">{item.title}</h3>
                      <p>Цена: {item.price} ₽</p>
                      <p>Количество: {item.quantity}</p>
                    </li>
                  ))}
                </ul>
                <h2 className="text-xl font-semibold mt-6 mb-4">Данные для доставки</h2>
                <div className="border p-4 rounded-lg">
                  <p><strong>Имя:</strong> {userData.firstName || 'Не указано'}</p>
                  <p><strong>Фамилия:</strong> {userData.lastName || 'Не указано'}</p>
                  <p><strong>Телефон:</strong> {userData.phoneNumber || 'Не указано'}</p>
                  <p><strong>Адрес:</strong> {userData.address || 'Не указано'}</p>
                </div>
                <button
                  onClick={handleBuy}
                  disabled={isSubmitting}
                  className="mt-6 btn w-full relative overflow-hidden
                    bg-gradient-to-r from-green-500 to-emerald-600
                    hover:from-green-600 hover:to-emerald-700
                    text-white font-semibold py-3 px-6 rounded-xl
                    shadow-lg hover:shadow-xl
                    transform transition-all duration-300 ease-in-out
                    hover:scale-105 active:scale-95
                    flex items-center justify-center gap-2
                    group"
                  aria-label={isSubmitting ? 'Отправка заказа...' : 'Купить'}
                >
                  <span className="relative z-10">
                    {isSubmitting ? (
                      <span className="loading loading-spinner"></span>
                    ) : (
                      'Купить'
                    )}
                  </span>
                  <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
                </button>
              </div>
            ) : (
              <p className="text-neutral-500 text-center">Корзина пуста</p>
            )}
          </div>
        )}
      </motion.main>
    </>
  );
};

export default CartPage;