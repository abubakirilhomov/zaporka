'use client';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData, setSelectedProduct, addToCart } from '@/redux/slices/cartSlice';
import { toast } from 'react-toastify';

const CartModal = ({ selectedProduct, setSelectedProduct }) => {
  const dispatch = useDispatch();
  const reduxSelectedProduct = useSelector((state) => state.cart.selectedProduct);
  const userData = useSelector((state) => state.cart.userData);
  const currentProduct = selectedProduct || reduxSelectedProduct;

  const [quantity, setQuantity] = useState(1);
  const [formData, setFormData] = useState({
    firstName: userData.firstName || '',
    lastName: userData.lastName || '',
    phoneNumber: userData.phoneNumber || '',
    address: userData.address || '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!currentProduct) {
      toast.error('Товар не выбран');
      return;
    }

    if (!e.target.checkValidity()) {
      toast.error('Пожалуйста, заполните все поля корректно');
      return;
    }

    if (quantity < 1) {
      toast.error('Количество должно быть не менее 1');
      return;
    }

    dispatch(setUserData(formData));
    dispatch(
      addToCart({
        id: currentProduct._id || currentProduct.id,
        title: currentProduct.title,
        price: Number(currentProduct.price),
        quantity: Number(quantity),
      })
    );

    toast.success('Товар добавлен в корзину!');
    dispatch(setSelectedProduct(null));
    setQuantity(1);
    window.my_modal_1.close();
  };

  const handleClose = () => {
    dispatch(setSelectedProduct(null));
    setFormData({
      firstName: userData.firstName || '',
      lastName: userData.lastName || '',
      phoneNumber: userData.phoneNumber || '',
      address: userData.address || '',
    });
    setQuantity(1);
    window.my_modal_1.close();
  };

  const handleQuantityChange = (e) => {
    const value = e.target.value;
    if (value === '' || /^[0-9]*$/.test(value)) {
      setQuantity(value);
    }
  };

  const incrementQuantity = () => setQuantity((prev) => Number(prev) + 1);
  const decrementQuantity = () => {
    if (quantity > 1) setQuantity((prev) => Number(prev) - 1);
  };

  return (
    <dialog id="my_modal_1" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-4">Оформление заказа</h3>
        {currentProduct && (
          <p className="mb-4">
            Товар: {currentProduct.title} ({currentProduct?.price} {currentProduct.currency})
          </p>
        )}
        <form className="space-y-3 text-lg" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Имя"
            className="input input-primary w-full"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Фамилия"
            className="input input-primary w-full"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            required
          />
          <div className="relative">
            <input
              type="tel"
              className="input input-primary tabular-nums w-full"
              placeholder="Телефон +998"
              value={formData.phoneNumber}
              onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
              pattern="[0-9]*"
              minLength="8"
              maxLength="13"
              inputMode="numeric"
              aria-label="Телефон"
              autoComplete="tel"
              title="Введите номер телефона в формате +998XXXXXXXXX"
              required
            />
            {formData.phoneNumber.length > 0 && formData.phoneNumber.length < 8 && (
              <p className="text-error text-sm mt-1">Должно быть 8 цифр</p>
            )}
          </div>
          <input
            type="text"
            placeholder="Адрес доставки"
            className="input input-primary w-full"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            required
          />
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={decrementQuantity}
              disabled={quantity <= 1}
              className="btn btn-sm btn-outline"
              aria-label="Уменьшить количество"
            >
              -
            </button>
            <input
              type="number"
              className="input input-primary w-20 text-center"
              value={quantity}
              onChange={handleQuantityChange}
              min="1"
              required
            />
            <button
              type="button"
              onClick={incrementQuantity}
              className="btn btn-sm btn-outline"
              aria-label="Увеличить количество"
            >
              +
            </button>
          </div>

          {/* КНОПКА: Добавить в корзину */}
          <button
            type="submit"
            className="btn btn-primary w-full font-semibold py-3 px-6 rounded-xl shadow-lg transition-all duration-300 ease-in-out flex items-center justify-center gap-2 relative overflow-hidden"
            aria-label="Добавить в корзину"
          >
            {/* Эффект наведения, не перекрывающий клики */}
            <span className="absolute inset-0 bg-base-100 opacity-0 hover:opacity-10 transition-opacity duration-300 z-0"></span>
            <span className="relative z-10">Добавить в корзину</span>
          </button>
        </form>
        <div className="modal-action">
          <form method="dialog">
            <button className="btn" onClick={handleClose} aria-label="Отмена">
              Отмена
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default CartModal;
