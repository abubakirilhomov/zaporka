"use client"; // Required for client-side hooks and Framer Motion
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

const CatalogCard = ({ categories, serverUrl }) => {

  return (
    <div className="md:gap-4 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-1">
      {categories.map((category) => {
        const [isImageLoaded, setIsImageLoaded] = useState(false);
        return (
          <motion.div
            key={category.name} // Use unique identifier instead of index
            initial={{ opacity: 0, scale: 0.9 }} // Start faded and slightly scaled down
            animate={{ opacity: 1, scale: 1 }} // Animate to full opacity and scale
            transition={{ duration: 0.3, ease: "easeOut" }} // Smooth animation
            whileHover={{ scale: 1.05, transition: { duration: 0.2 } }} // Smooth hover effect
            className="w-full sm:max-w-[100%] md:max-w-[354px] lg:max-w-[300px] md:mb-2 sm:mb-0"
          >
            <Link
              href={`/catalog/${category.slug}`}
              className="p-6 sm:p-8 flex-1 h-full border border-neutral-400 md:rounded flex flex-col justify-between items-center"
            >
              <div className="relative w-full h-32 mb-3">
                {!isImageLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="loading loading-ring loading-md text-primary"></span>
                  </div>
                )}
                <img
                  src={`${serverUrl}${category.image || "/placeholder-image.png"}`}
                  alt={`${category.name}`}
                  className={`w-full h-32 object-cover transition-opacity duration-300 ${
                    isImageLoaded ? "opacity-100" : "opacity-0"
                  }`}
                  onLoad={() => setIsImageLoaded(true)}
                  onError={() => setIsImageLoaded(true)} // Fallback in case of error
                />
              </div>
              <motion.span
                className="hover:text-primary font-light text-center line-clamp-2"
                whileHover={{ y: -2, transition: { duration: 0.2 } }}
              >
                {category.name}
              </motion.span>
              <p className="text-neutral-500 md:text-sm text-xs text-center pt-3 line-clamp-2">
                {category?.productsQuantity} товаров
              </p>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
};

export default CatalogCard;