  'use client';

  import Link from 'next/link';
  import { useRef, useState } from 'react';
  import { FaUserCircle, FaBars, FaGift, FaTools, FaBuilding } from 'react-icons/fa';
  import { LuShoppingCart } from "react-icons/lu";
  import { CgProfile } from "react-icons/cg";
  import { MdCategory, MdContactPhone } from "react-icons/md";



  export default function NavMobile() {

    const phoneNumber = '999001507';
    const modalRef = useRef(null);
    const [isDrawerOpen, setDrawerOpen] = useState(false);

    const handleOpenModal = () => {
      if (modalRef.current) {
        modalRef.current.showModal();
        const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
        document.body.style.paddingRight = `${scrollBarWidth}px`;
        document.body.style.overflow = 'hidden';
      }
    };

    const handleCloseModal = () => {
      if (modalRef.current) {
        modalRef.current.close();
        document.body.style.paddingRight = '';
        document.body.style.overflow = '';
      }
    };

    const toggleDrawer = () => {
      setDrawerOpen((prev) => !prev);
    };

    const pages = [
      { name: "Каталог", href: "/catalog", icon: <MdCategory /> },
      { name: "Акции", href: "/discounts", icon: <FaGift /> },
      { name: "Услуги", href: "/services", icon: <FaTools /> },
      { name: "Проекты", href: "/projects", icon: <FaBuilding /> },
      { name: "Компания", href: "/company", icon: <CgProfile /> },
      { name: "Контакты", href: "/contacts", icon: <MdContactPhone /> },
    ];


    return (
      <nav className="md:hidden sticky top-0 z-50 bg-base-100 shadow-xs shadow-base-content px-4 py-3 border-b border-base-300">
        <div className="flex justify-between items-center">
          <button onClick={toggleDrawer} className="lg:hidden p-2">
            <FaBars className="text-xl" />
          </button>

          <div className="flex items-center gap-4">
            <label className="input border rounded-2xl flex items-center w-[100%] h-10 ml-2 border-primary bg-base-100">
              <input
                type="search"
                required
                placeholder="Поиск"
                className="text-base-content bg-transparent focus:outline-none w-full"
              />
              <svg className="h-3 w-3 text-base-content flex-shrink-0 mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </g>
              </svg>
            </label>

            <div className="border rounded-xl px-3 py-1.5">
              <button onClick={handleOpenModal} className="flex items-center gap-1 text-base-content">
                <FaUserCircle />
                Войти
              </button>
            </div>
          </div>
        </div>

        {isDrawerOpen && (
          <div className="w-[70%] mt-4 absolute rounded-2xl overflow-x-auto flex justify-between items-start left-0 h-[100vh] bg-base-300  z-40 transition-all duration-500 ease-in-out">
            <div className="flex flex-col items-start p-2 w-full">

              {pages.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="text-base-content pl-2 relative flex items-center justify-between w-full hover:bg-red-500 "
                >
                  <div className='flex flex-col w-full'>

                    <div>
                      <div className='flex items-center gap-2 mt-4'>
                        <span className='relative bottom-5'>{item.icon}</span>

                        <span className='font-bold relative bottom-5'>{item.name}</span>
                      </div>
                      <hr className="my-2 border border-base-100 w-full relative bottom-3" />

                    </div>
                  </div>
                </Link>

              ))}


              <Link href="/" className="text-base-content py-2 pl-2 flex items-center justify-between w-full">
                <span className='font-bold'>Личный кабинет</span>
              </Link>
              <hr className="my-2 border border-base-100 w-full" />


              <Link href="/cart" className="text-base-content py-5 pl-2 flex items-center justify-between w-full">
                <span><i className="fa-solid fa-cart-shopping mr-2  font-bold" /> Корзина</span>
                <span className="badge badge-success badge-sm"><LuShoppingCart />
                </span>

              </Link>


              <Link href="/saved" className="text-base-content py-5 pl-2 flex items-center justify-between w-full">
                <span><i className="fa-regular fa-heart mr-2 font-bold" /> Отложенные</span>

                <span className="badge badge-neutral badge-sm">Saved</span>

              </Link>

              <Link href="/compare" className="text-base-content py-5 pl-2 flex items-center justify-between w-full">
                <span><i className="fa-solid fa-chart-column  text-xs font-bold" />Сравнение товаров</span>
                <span className="badge badge-neutral badge-sm font-bold">  Сравнение</span>

              </Link>
            </div>

            <div className="flex justify-end pr-3 p-1 relative right-1">
              <button onClick={toggleDrawer} className="text-base-content text-xl">✕</button>
              {/* bjknl;' */}

            </div>
          </div>
        )}

        <dialog
          id="mobile_modal_login"
          className="modal"
          ref={modalRef}
          onClose={handleCloseModal}
        >
          <div className="modal-box bg-base-100 rounded-2xl max-w-sm">
            <form method="dialog" onClick={handleCloseModal}>
              <button className="btn btn-sm absolute right-2 top-2 btn-base-content">✕</button>
            </form>

            <div className="text-center gap-2">
              <p className="flex items-center justify-center gap-2 font-bold text-base-content mb-4 text-2xl">
                <CgProfile />
                Личный кабинет
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-base-content">
                  Логин <span className="text-error">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Введите логин"
                  className="w-full h-10 px-3 rounded-xl bg-base-300 border border-base-300 focus:outline-none focus:ring focus:ring-primary text-base-content"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-base-content">
                  Пароль <span className="text-error">*</span>
                </label>
                <input
                  type="password"
                  placeholder="Введите пароль"
                  className="w-full h-10 px-3 rounded-xl bg-base-300 border border-base-300 focus:outline-none focus:ring focus:ring-primary text-base-content"
                />
              </div>

              <div className="flex items-center justify-between text-sm text-base-300">
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="toggle toggle-sm bg-info" />
                  <span className="text-base-content">Запомнить меня</span>
                </label>
                <Link href="#" className="hover:underline text-info">
                  ЗАБЫЛИ ПАРОЛЬ?
                </Link>
              </div>

              <div className="flex gap-2 justify-between mt-4">
                <button className="bg-info text-base-300 font-semibold py-2 px-4 rounded-xl w-full">
                  ВОЙТИ
                </button>
                <button className="border border-info text-info font-semibold py-2 px-4 rounded-xl w-full">
                  РЕГИСТРАЦИЯ
                </button>
              </div>
            </div>
          </div>
        </dialog>
      </nav>
    );
  }
