'use client';
import CatalogCard from '@/components/ui/CatalogCard/CatalogCard';
import axios from 'axios';
import React, { useEffect } from 'react';

const page = () => {
    const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL
  const categories = [
    {
      name: "Кроссовки",
      image: "https://media.istockphoto.com/id/538025236/photo/heap-of-shiny-metal-steel-pipes-with-selective-focus-effect.jpg?s=612x612&w=0&k=20&c=NU2vEghQxU77iNNYFwXbt9Q9TRIJUq5TnsUeQjQVMdY=",
      amount: 12,
    },
    {
      name: "Кроссовки2",
      image: "https://media.istockphoto.com/id/538025236/photo/heap-of-shiny-metal-steel-pipes-with-selective-focus-effect.jpg?s=612x612&w=0&k=20&c=NU2vEghQxU77iNNYFwXbt9Q9TRIJUq5TnsUeQjQVMdY=",
      amount: 90,
    },
    {
      name: "Кроссовки3",
      image: "https://media.istockphoto.com/id/538025236/photo/heap-of-shiny-metal-steel-pipes-with-selective-focus-effect.jpg?s=612x612&w=0&k=20&c=NU2vEghQxU77iNNYFwXbt9Q9TRIJUq5TnsUeQjQVMdY=",
      amount: 178,
    },
  ];

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories = await axios.get(`${serverUrl}/api/v1/categories`);

        console.log(categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, [])
  

  return (
    <main>
      <h1 className="text-3xl">Каталог</h1>
      <p className="text-neutral-400 pt-5">Главная - Каталог</p>

      <div className="mt-10">
        <CatalogCard categories={categories} />
      </div>
    </main>
  );
};

export default page;