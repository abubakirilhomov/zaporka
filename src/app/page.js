import Catalog from "@/components/shop/Catalog/Catalog";
import CustomSwiper from "@/components/ui/CustomSwiper/CustomSwiper";
import Footer from "@/components/ui/Footer/Footer";
import NavCombined from "@/components/ui/Navbar/NavCombined";
import NavDesktop from "@/components/ui/Navbar/NavDesktop";
import NavMobile from "@/components/ui/Navbar/NavMobile";

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
      <CustomSwiper slides={slides}/>
    </header>
    <main className="px-3">
      <Catalog/>
    </main>
    <footer>
      <Footer />
    </footer>
    </>
  );
}
