import CustomSwiper from "@/components/ui/CustomSwiper/CustomSwiper";
import NavDesktop from "@/components/ui/Navbar/NavDesktop";

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
    <NavDesktop/>
    <CustomSwiper slides={slides}/>
    </>
  );
}
