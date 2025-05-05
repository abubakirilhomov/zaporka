import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-neutral-100 to-neutral-200 p-6">
      <div className="text-center">
        <h1 className="text-8xl sm:text-9xl font-bold text-neutral-800 mb-4">404</h1>
        <h2 className="text-2xl sm:text-3xl font-semibold text-neutral-600 mb-6">
          Страница не найдена
        </h2>
        <p className="text-neutral-500 mb-8 max-w-md mx-auto">
          К сожалению, страница, которую вы ищете, не существует. Возможно, она была удалена или вы ввели неправильный адрес.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-info underline text-accent rounded-lg hover:bg-info-dark transition-colors duration-300"
        >
          Вернуться на главную
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;