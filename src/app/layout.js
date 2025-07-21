// app/layout.js
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ReduxProvider from "./ReduxProvider";
import { ToastContainer } from "react-toastify";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

Collapse

Wrap

Copy
export const metadata = {
  title: "Zaporka - Трубы и запорная арматура в Узбекистане",
  description:
    "Zaporka предлагает качественные трубы и запорную арматуру для бизнеса в Узбекистане. Доставка по всей стране.",
  keywords: "zaporka, запорка, трубы, запорная арматура, строительные материалы, Узбекистан",
  openGraph: {
    title: "Zaporka - Трубы и запорная арматура",
    description: "Широкий ассортимент труб и запорной арматуры с доставкой по Узбекистану.",
    url: "https://zaporka.uz",
    siteName: "Zaporka",
    images: [
      {
        url: "https://zaporka.uz/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Zaporka - трубы и запорная арматура",
      },
    ],
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ReduxProvider>{children}</ReduxProvider>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </body>
    </html>
  );
}
