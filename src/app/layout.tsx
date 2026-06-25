import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import CartDrawer from "@/components/CartDrawer";
import { CartProvider } from "@/context/CartContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Branded Store | Premium Shirts & Trousers",
    template: "%s | Branded Store",
  },
  description:
    "Discover premium branded shirts and trousers in Pakistan. Shop the latest collection of formal and casual wear with modern styles and superior quality.",
  keywords: ["branded shirts", "trousers", "pakistan", "formal wear", "casual wear", "premium clothing"],
  openGraph: {
    title: "Branded Store | Premium Shirts & Trousers",
    description: "Shop premium branded shirts and trousers in Pakistan.",
    type: "website",
    locale: "en_PK",
    siteName: "Branded Store",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <CartProvider>
          <Header />
          <CartDrawer />
          <main className="flex-1">{children}</main>
        </CartProvider>
      </body>
    </html>
  );
}
