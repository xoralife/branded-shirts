import Hero from "@/components/Hero";
import CategorySection from "@/components/CategorySection";
import ProductGrid from "@/components/ProductGrid";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import About from "@/components/About";
import Newsletter from "@/components/Newsletter";
import ContactForm from "@/components/ContactForm";
import BackToTop from "@/components/BackToTop";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <CategorySection />
      <ProductGrid />
      <Testimonials />
      <FAQ />
      <About />
      <Newsletter />
      <ContactForm />
      <Footer />
      <BackToTop />
    </>
  );
}
