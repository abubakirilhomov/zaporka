// components/ui/CartModal/CartModal.jsx
'use client';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData, setSelectedProduct, addToCart } from '@/redux/slices/cartSlice';
import { toast } from 'react-toastify';

const CartModal = ({ selectedProduct, setSelectedProduct }) => {
  const dispatch = useDispatch();
  const reduxSelectedProduct = useSelector((state) => state.cart.selectedProduct);
  const userData = useSelector((state) => state.cart.userData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
  const currentProduct = selectedProduct || reduxSelectedProduct;
  const store = useSelector((state) => state.cart);
  console.log('store', store);

  const [formData, setFormData] = useState({
    firstName: userData.firstName || '',
    lastName: userData.lastName || '',
    phoneNumber: userData.phoneNumber || '',
    address: userData.address || '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentProduct) {
      toast.error('Товар не выбран');
      return;
    }

    // Проверяем валидность формы
    if (!e.target.checkValidity()) {
      toast.error('Пожалуйста, заполните все поля корректно');
      return;
    }

    setIsSubmitting(true);
    const totalPrice = Number(currentProduct.price);
    if (isNaN(totalPrice)) {
      toast.error('Ошибка: некорректная цена товара');
      setIsSubmitting(false);
      return;
    }

    const orderData = {
      products: [currentProduct._id || currentProduct.id], // Send array of ObjectId strings
      ...formData,
      totalPrice,
    };

    try {
      dispatch(setUserData(formData)); // Сохраняем userData в Redux
      const response = await fetch(`${serverUrl}/api/v1/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success('Заказ успешно отправлен!');
        // Добавляем selectedProduct в items
        dispatch(
          addToCart({
            id: currentProduct._id || currentProduct.id,
            title: currentProduct.title,
            price: totalPrice,
            quantity: 1,
          })
        );
        dispatch(setSelectedProduct(null)); // Сбрасываем selectedProduct
        setFormData({ firstName: '', lastName: '', phoneNumber: '', address: '' }); // Сбрасываем форму
        window.my_modal_1.close();
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

  const handleClose = () => {
    dispatch(setSelectedProduct(null)); // Очищаем selectedProduct
    setFormData({
      firstName: userData.firstName || '',
      lastName: userData.lastName || '',
      phoneNumber: userData.phoneNumber || '',
      address: userData.address || '',
    }); // Восстанавливаем formData из userData
    window.my_modal_1.close();
  };

  return (
    <dialog id="my_modal_1" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-4">Оформление заказа</h3>
        {currentProduct && (
          <p className="mb-4">
            Товар: {currentProduct.title} ({currentProduct.price} {currentProduct.currency})
          </p>
        )}
        <form className="space-y-3" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Имя"
            className="input input-bordered w-full"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Фамилия"
            className="input input-bordered w-full"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            required
          />
          <div className="relative">
            <span className="absolute z-20 inset-y-0 left-0 flex items-center pl-3 text-gray-500">
              +998 </span>
            <input
              type="tel"
              className="input validator tabular-nums w-full"
              placeholder="Телефон"
              value={formData.phoneNumber}
              onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
              pattern="[0-9]*"
              minLength="8"
              maxLength="13"
              title="Должно быть 8 цифр"
              inputMode="numeric"
              required
            />
            {formData.phoneNumber.length > 0 && formData.phoneNumber.length < 8  && (
              <p className="validator-hint text-error text-sm mt-1">Должно быть 8 цифр</p>
            )}
          </div>
          <input
            type="text"
            placeholder="Адрес доставки"
            className="input input-bordered w-full"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            required
          />
          <button
            type="submit"
            className="btn btn-success w-full relative overflow-hidden
              bg-gradient-to-r from-green-500 to-emerald-600
              hover:from-green-600 hover:to-emerald-700
              text-white font-semibold py-3 px-6 rounded-xl
              shadow-lg hover:shadow-xl
              transform transition-all duration-300 ease-in-out
              hover:scale-105 active:scale-95
              flex items-center justify-center gap-2
              group"
            disabled={isSubmitting}
            aria-label={isSubmitting ? 'Отправка заказа...' : 'Заказать'}
          >
            <span className="relative z-10">
              {isSubmitting ? (
                <span className="loading loading-spinner"></span>
              ) : (
                'Заказать'
              )}
            </span>
            <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
          </button>
        </form>
        <div className="modal-action">
          <form method="dialog">
            <button className="btn" onClick={handleClose}>
              Отмена
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default CartModal;