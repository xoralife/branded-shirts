import Hero from "@/components/Hero";
import CategorySection from "@/components/CategorySection";
import ProductGrid from "@/components/ProductGrid";
import About from "@/components/About";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <CategorySection />
      <ProductGrid />
      <About />
      <Footer />
    </>
  );
}
