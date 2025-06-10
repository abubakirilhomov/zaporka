'use client';

import { useParams } from 'next/navigation';
import useFetch from '@/hooks/useFetch/useFetch';
import Loading from '@/components/ui/Loading/Loading';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedProduct, addToCart } from '@/redux/slices/cartSlice';
import { BsCartPlus } from 'react-icons/bs';
import { toast } from 'react-toastify';
import CartModal from '@/components/ui/CartModal/CartModal';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

const ProductPage = () => {
  const { id } = useParams();
  console.log('Product ID:', id);
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
  const shouldReduceMotion = useReducedMotion();
  const dispatch = useDispatch();
  const { selectedProduct, userData } = useSelector((state) => state.cart);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [imageErrors, setImageErrors] = useState({});
  const { data: product, loading, error } = useFetch(
    `${serverUrl}/api/v1/products/${id}`,
    {}
  );
  console.log('Fetched Product:', product)
  const motionProps = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.4, ease: 'easeOut' },
      };

  const handleAddToCart = () => {
    if (!product) return;

    const price = Number(product.price);
    if (isNaN(price)) {
      toast.error('Ошибка: некорректная цена товара');
      return;
    }

    const productData = {
      id: product._id || product.id,
      title: product.title,
      price,
      currency: product.currency || '₽',
      quantity: 1,
    };

    const isUserDataComplete =
      userData.firstName &&
      userData.lastName &&
      userData.phoneNumber &&
      userData.address;

    if (isUserDataComplete) {
      dispatch(addToCart(productData));
      toast.success(`${product.title} добавлен в корзину!`);

      const orderData = {
        products: [productData.id],
        ...userData,
        totalPrice: price,
      };

      fetch(`${serverUrl}/api/v1/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      })
        .then((response) => response.json())
        .then((data) => {
          if (!data.success) {
            throw new Error(data.message || 'Ошибка при оформлении заказа');
          }
        })
        .catch((err) => {
          console.error(err);
          toast.error(err.message || 'Ошибка при оформлении заказа');
          dispatch(removeFromCart(productData.id));
        });
    } else {
      dispatch(setSelectedProduct(productData));
      window.my_modal_1.showModal();
    }
  };

  if (!serverUrl || !id) {
    return (
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-8"
      >
        <p className="text-error text-center mt-10">
          {serverUrl ? 'Ошибка: товар не указан' : 'Ошибка: сервер не настроен'}
        </p>
      </motion.main>
    );
  }

  if (loading) {
    return (
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-8"
      >
        <div className="flex justify-center mt-10">
          <Loading aria-label="Загрузка товара" />
        </div>
      </motion.main>
    );
  }

  if (error || !product) {
    return (
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-8"
      >
        <p className="text-error text-center mt-10">
          Ошибка загрузки товара:{' '}
          {error instanceof Error ? error.message : 'Товар не найден'}
        </p>
        <Link
          href="/catalog"
          className="mt-4 inline-block px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark"
        >
          Вернуться в каталог
        </Link>
      </motion.main>
    );
  }

  const images = [
    product.mainImage,
    ...(product.swiperImages || []).slice(0, 2), // Ensure up to 3 images total (1 main + 2 from swiperImages)
  ].filter(Boolean).map((img) => `${serverUrl}${img}`);

  return (
    <>
      <Head>
        <title>{product.title} | Ваш Магазин</title>
        <meta
          name="description"
          content={`Подробная информация о товаре ${product.title} - высококачественное изделие с доставкой.`}
        />
      </Head>

      <motion.main
        {...motionProps}
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-8"
      >
        <CartModal
          selectedProduct={selectedProduct}
          setSelectedProduct={(product) => dispatch(setSelectedProduct(product))}
        />

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
            <li> / </li>
            <li>
              <Link href={`/catalog/${product?.category?.name}`} className="hover:text-primary">
                {product.category?.name || 'Без категории'}
              </Link>
            </li>
            <li> / {product.title}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
          {/* Image Swiper */}
          <div className="relative">
            {product.stock > 0 && (
              <span className="absolute z-10 top-2 left-2 badge badge-success rounded-2xl text-white font-bold">
                В наличии
              </span>
            )}
            {product.views > 50 && (
              <span className="absolute z-10 top-2 right-2 badge badge-info rounded-2xl text-white font-bold">
                Популярно
              </span>
            )}
            <Swiper
              modules={[Navigation, Thumbs]}
              navigation
              thumbs={{ swiper: thumbsSwiper }}
              className="w-full rounded-lg"
            >
              {images.length > 0 ? (
                images.map((img, index) => (
                  <SwiperSlide key={index}>
                    {!imageErrors[img] ? (
                      <Image
                        src={img}
                        alt={`Изображение ${product.title} ${index + 1}`}
                        width={400}
                        height={400}
                        className="w-full h-96 object-cover rounded-lg"
                        priority={index === 0}
                        onError={() =>
                          setImageErrors((prev) => ({ ...prev, [img]: true }))
                        }
                      />
                    ) : (
                      <div className="w-full h-96 flex items-center justify-center rounded-lg bg-neutral-100">
                        <span className="text-neutral-500 text-sm text-center">
                          Изображение недоступно
                        </span>
                      </div>
                    )}
                  </SwiperSlide>
                ))
              ) : (
                <SwiperSlide>
                  <div className="w-full h-96 flex items-center justify-center rounded-lg bg-neutral-100">
                    <span className="text-neutral-500 text-sm text-center">
                      Изображение недоступно
                    </span>
                  </div>
                </SwiperSlide>
              )}
            </Swiper>
            {/* Thumbnail Swiper */}
            {images.length > 1 && (
              <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={3}
                freeMode
                watchSlidesProgress
                modules={[Thumbs]}
                className="mt-4"
              >
                {images.map((img, index) => (
                  <SwiperSlide key={index}>
                    {!imageErrors[img] ? (
                      <Image
                        src={img}
                        alt={`Миниатюра ${product.title} ${index + 1}`}
                        width={100}
                        height={100}
                        className="w-full h-24 object-cover rounded cursor-pointer"
                        onError={() =>
                          setImageErrors((prev) => ({ ...prev, [img]: true }))
                        }
                      />
                    ) : (
                      <div className="w-full h-24 flex items-center justify-center rounded bg-neutral-100 cursor-pointer">
                        <span className="text-neutral-500 text-xs text-center">
                          Недоступно
                        </span>
                      </div>
                    )}
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div>

          {/* Product Details */}
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold">{product.title || 'Без названия'}</h1>
            <p className="text-2xl font-semibold text-primary mt-2">
              {product.price
                ? `${product.price} ${product.currency || 'UZS'}`
                : 'Цена неизвестна'}
            </p>
            <div className="mt-4 text-neutral-600 space-y-2">
              {product.material && <p>Материал: {product.material}</p>}
              {product.steelGrade && <p>Марка стали: {product.steelGrade}</p>}
              {product.workingPressure && (
                <p>Рабочее давление: {product.workingPressure} бар</p>
              )}
              {product.description && (
                <p className="mt-4">{product.description}</p>
              )}
            </div>
            <button
              className="mt-6 btn w-full md:w-auto relative btn-primary font-semibold py-3 px-6 rounded-xl
                shadow-lg hover:shadow-xl
                transform transition-all duration-300 ease-in-out
                hover:scale-105 active:scale-95
                flex items-center justify-center gap-2
                group"
              onClick={handleAddToCart}
              aria-label={`Добавить ${product.title} в корзину`}
            >
              <span className="relative z-10">Добавить в корзину</span>
              <BsCartPlus
                size={20}
                className="relative z-10 transform transition-transform duration-300 group-hover:translate-x-1 group-hover:scale-110"
              />
              <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
            </button>
          </div>
        </div>
      </motion.main>
    </>
  );
};

export default ProductPage;