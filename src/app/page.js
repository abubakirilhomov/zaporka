import Catalog from "@/components/shop/Catalog/Catalog";
import CustomSwiper from "@/components/ui/CustomSwiper/CustomSwiper";
import Footer from "@/components/ui/Footer/Footer";
import NavCombined from "@/components/ui/Navbar/NavCombined";
import { ToastContainer } from "react-toastify";
import { TiShoppingCart } from "react-icons/ti";
import Link from "next/link";
import NavBottom from "./(shop)/navbottom/NavBottom";
export default function Home() {
  const slides = [
    {
      image: "https://example.com/banner1.jpg",
      title: "Добро пожаловать в наш магазин!",
      link: "/shop",
    },
    {
      image: "https://example.com/banner2.jpg",
      title: "Скидки до 50% на кроссовки!",
      link: "/category/Кроссовки",
    },
    {
      image: "https://example.com/banner3.jpg",
      title: "Новые поступления",
      link: "/new-arrivals",
    },
  ];
  return (
    <>
    <header>
      <NavCombined/>
      <NavBottom/>
      <CustomSwiper slides={slides}/>
    </header>
    <main className="px-3 relative">
      <Catalog/>
              <Link
          href="/cart"
          className="py-3 bg-primary z-10 text-base-100 px-5 md:text-2xl fixed right-0 md:top-[30%] top-[25%] flex flex-col rounded-l-2xl rounded-none"
        >
          <TiShoppingCart />
        </Link>
    </main>
    <footer>
      <Footer />
    </footer>
    <ToastContainer/>
    </>
  );
}
