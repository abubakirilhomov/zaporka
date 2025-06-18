'use client';
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import Link from "next/link";
import "swiper/css";
import "swiper/css/navigation";

const BannerPage = () => {
  const [slides, setSlides] = useState([]);
  const baseURL = "https://zaporka-backend.onrender.com";

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const response = await fetch(`${baseURL}/api/v1/swiper`);
        const data = await response.json();
        const formatted = data.map(item => ({
          image: baseURL + item.image,
          title: 'Новинка', // Default title
          link: item.link || null,
        }));
        setSlides(formatted);
      } catch (error) {
        console.error("Bannerlarni yuklashda xatolik:", error);
      }
    };

    fetchSlides();
  }, []);

  return (
    <div className="relative w-full">
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
        className="w-full h-[400px] sm:h-[500px] rounded-2xl"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="w-full h-full relative rounded-2xl bg-center bg-cover"
              style={{
                backgroundImage: `url(${slide.image || "/placeholder-image.png"})`,
              }}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-black/60 to-black/20 rounded-2xl flex flex-col items-center justify-center text-white p-6 text-center">
                <h2 className="text-3xl sm:text-5xl font-extrabold drop-shadow mb-6">
                  {slide.title}
                </h2>
                {slide.link && (
                  <Link
                    href={slide.link}
                    className="px-6 py-3 bg-base-100 text-black rounded-lg hover:bg-opacity-80 transition-all duration-300 shadow-lg"
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
      <button className="swiper-button-prev-banner hidden md:flex items-center justify-center absolute top-1/2 left-4 transform -translate-y-1/2 bg-base-100 rounded-full p-3 hover:bg-neutral-100 transition duration-300 z-10 shadow-md">
        <svg
          className="w-6 h-6 text-neutral-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button className="swiper-button-next-banner hidden md:flex items-center justify-center absolute top-1/2 right-4 transform -translate-y-1/2 bg-base-100 rounded-full p-3 hover:bg-neutral-100 transition duration-300 z-10 shadow-md">
        <svg
          className="w-6 h-6 text-neutral-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

export default BannerPage;
