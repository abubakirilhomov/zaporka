// app/(shop)/layout.jsx
import Navbar from '@/components/ui/Navbar/NavCombined';
import Footer from '@/components/ui/Footer/Footer';

export const metadata = {
  title: "Zaporka - Магазин труб",
  description: "Просмотрите наш ассортимент труб в магазине Zaporka.",
};

export default function ShopLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      <Footer />
    </div>
  );
}