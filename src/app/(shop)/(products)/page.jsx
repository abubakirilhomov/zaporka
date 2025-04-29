// app/(shop)/(products)/page.jsx
import ProductCard from '@/components/shop/ProductCard';

// Mock product data (replace with API fetch)
const products = [
  { id: '1', name: 'Product 1', price: 29.99 },
  { id: '2', name: 'Product 2', price: 49.99 },
];

export default function Products() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
          />
        ))}
      </div>
    </div>
  );
}