import Link from "next/link";

const CatalogCard = ({ categories }) => {
    return (
      <div className="flex flex-wrap gap-4">
        {categories.map((category, index) => (
          <Link
            key={index}
            href={`/category/${category.name}`}
            className="hover:scale-105 p-6 sm:p-8 flex-1 min-w-[200px] max-w-[250px] border border-neutral-300 flex flex-col items-center"
          >
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-32 object-cover mb-3"
            />
            <span className="hover:text-info text-center">{category.name}</span>
            <p className="text-neutral-500 text-sm pt-3">
              {category.amount} товаров
            </p>
          </Link>
        ))}
      </div>
    );
};

export default CatalogCard;