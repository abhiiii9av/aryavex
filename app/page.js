import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProductsSection from "@/components/ProductsSection";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[linear-gradient(180deg,#faf8f3_0%,#f6f2ea_100%)]">
      <Header />
      <Hero />
      <ProductsSection />
      <Footer />
    </main>
  );
}
