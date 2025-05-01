import React from 'react';
import { useParams } from 'next/navigation';

const Page = () => {
  const params = useParams();
  const categoryName = params.category;

  return (
    <div>
      <h1 className="text-3xl">Категория: {categoryName}</h1>
      <p>Товары в категории "{categoryName}"</p>
    </div>
  );
};

export default Page;