"use client";

import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  updateQuantity,
  clearCart,
} from "@/redux/slices/cartSlice";
import { toast } from "react-toastify";
import Head from "next/head";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import Loading from "@/components/ui/Loading/Loading";
import { useRouter } from "next/navigation";

const CartItem = ({ item, onIncrement, onDecrement, onRemove }) => (
  <li className="card bg-base-100 shadow-md p-4 flex flex-col sm:flex-row sm:items-center justify-between">
    <div className="mb-4 sm:mb-0">
      <h3 className="text-lg font-bold">{item.title}</h3>
      <p className="text-sm text-neutral-500">Цена: {item.price} UZS</p>
      <p className="text-sm text-neutral-500">Количество: {item.quantity}</p>
    </div>
    <div className="flex items-center gap-2">
      <button
        onClick={() => onDecrement(item.id)}
        disabled={item.quantity <= 1}
        className="btn btn-sm btn-outline btn-secondary"
      >
        -
      </button>
      <input
        type="number"
        min="1"
        value={item.quantity}
        onChange={(e) => {
          const newQty = parseInt(e.target.value);
          if (!isNaN(newQty) && newQty >= 1) {
            onIncrement(item.id, newQty); // мы обработаем это ниже
          }
        }}
        className="input input-sm w-16 text-center"
      />
      <button
        onClick={() => onIncrement(item.id)}
        className="btn btn-sm btn-outline btn-secondary"
      >
        +
      </button>
      <button
        onClick={() => onRemove(item.id)}
        className="btn btn-sm btn-error"
      >
        ✕
      </button>
    </div>
  </li>
);

const CartPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { userData, items: cartItems } = useSelector((state) => state.cart);
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalPrice = useMemo(
    () =>
      cartItems.reduce(
        (sum, item) => sum + Number(item.price) * Number(item.quantity),
        0
      ),
    [cartItems]
  );

  const handleIncrement = (id, newQty = null) => {
    const item = cartItems.find((item) => item.id === id);
    if (item) {
      const quantity = newQty !== null ? newQty : item.quantity + 1;
      dispatch(updateQuantity({ id, quantity }));
    }
  };

  const handleDecrement = (id) => {
    const item = cartItems.find((item) => item.id === id);
    if (item && item.quantity > 1) {
      dispatch(updateQuantity({ id, quantity: item.quantity - 1 }));
    }
  };

  const handleRemove = (id) => dispatch(removeFromCart(id));

  const handleBuy = async () => {
    if (!cartItems.length) return toast.error("Корзина пуста");
    if (
      !userData.firstName ||
      !userData.lastName ||
      !userData.phoneNumber ||
      !userData.address
    ) {
      return toast.error("Заполните все данные для доставки");
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${serverUrl}/api/v1/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          products: cartItems.map((item) => item.id),
          ...userData,
          totalPrice,
        }),
      });

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Ошибка при оформлении");

      toast.success("Заказ успешно оформлен!");
      dispatch(clearCart());
    } catch (err) {
      toast.error(
        <>
          {err.message || "Ошибка"}
          <button onClick={handleBuy} className="btn btn-sm btn-link ml-2">
            Повторить
          </button>
        </>
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Корзина | Ваш Магазин</title>
        <meta
          name="description"
          content="Просмотрите товары в корзине и оформите заказ."
        />
      </Head>

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="max-w-3xl mx-auto px-4 py-8"
      >
        <h1 className="text-3xl font-bold mb-6">Ваша корзина</h1>

        {cartItems.length > 0 ? (
          <>
            <ul className="space-y-4 mb-6">
              {cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onIncrement={handleIncrement}
                  onDecrement={handleDecrement}
                  onRemove={handleRemove}
                />
              ))}
            </ul>

            <div className="card bg-base-200 p-6 shadow-md mb-6">
              <h2 className="text-xl font-semibold mb-4">
                Данные для доставки
              </h2>
              <p>
                <strong>Имя:</strong> {userData.firstName || "—"}
              </p>
              <p>
                <strong>Фамилия:</strong> {userData.lastName || "—"}
              </p>
              <p>
                <strong>Телефон:</strong> {userData.phoneNumber || "—"}
              </p>
              <p>
                <strong>Адрес:</strong> {userData.address || "—"}
              </p>
            </div>

            <div className="text-right text-xl font-semibold mb-4">
              Итого: {totalPrice.toFixed(2)} UZS
            </div>

            <button
              onClick={handleBuy}
              disabled={isSubmitting}
              className="btn btn-primary w-full"
            >
              {isSubmitting ? <Loading /> : "Оформить заказ"}
            </button>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-neutral-500"
          >
            <p className="mb-4">Корзина пуста</p>
            <button
              className="btn btn-primary"
              onClick={() => router.push("/catalog")}
            >
              Перейти к покупкам
            </button>
          </motion.div>
        )}
      </motion.main>
    </>
  );
};

export default CartPage;
