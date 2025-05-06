'use client'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import Link from "next/link";
import "swiper/css";
import "swiper/css/navigation";

const BannerSwiper = ({ slides }) => {
  return (
    <div className="relative w-full">
      {/* Swiper Carousel for Banners */}
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        navigation={{
          nextEl: ".swiper-button-next-banner",
          prevEl: ".swiper-button-prev-banner",
        }}
        className="w-full h-[400px] sm:h-[500px]"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="w-full h-full relative cursor-pointer">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-30 text-white p-6">
                <h2 className="text-3xl sm:text-4xl font-bold mb-4">{slide.title}</h2>
                {slide.link && (
                  <Link
                    href={slide.link}
                    className="px-6 py-3 bg-white text-black rounded-lg hover:bg-opacity-90 transition-colors duration-300"
                  >
                    Подробнее
                  </Link>
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Buttons */}
      <button className="swiper-button-prev-banner absolute top-1/2 left-4 transform -translate-y-1/2 bg-white rounded-full p-3 hover:bg-neutral-100 transition-colors duration-300 z-10">
        <svg
          className="w-6 h-6 text-neutral-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <button className="swiper-button-next-banner absolute top-1/2 right-4 transform -translate-y-1/2 bg-white rounded-full p-3 hover:bg-neutral-100 transition-colors duration-300 z-10">
        <svg
          className="w-6 h-6 text-neutral-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );
};

export default BannerSwiper;