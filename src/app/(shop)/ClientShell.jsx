'use client';

import Navbar from "@/components/ui/Navbar/NavCombined";
import Footer from "@/components/ui/Footer/Footer";
import Link from "next/link";
import { TiShoppingCart } from "react-icons/ti";

export default function ClientShell({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow relative container mx-auto px-2 py-8">
        {children}
        <Link
          href="/cart"
          className="py-3 bg-primary text-base-100 px-5 md:text-2xl fixed right-0 md:top-[30%] top-[20%] flex flex-col rounded-l-2xl rounded-none"
        >
          <TiShoppingCart />
        </Link>
      </main>
      <Footer />
    </div>
  );
}
