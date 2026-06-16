import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProductsSection from "@/components/ProductsSection";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <main className="page-network-surface min-h-screen overflow-hidden">
      <Header />
      <Hero />
      <ProductsSection />
      <Footer />
    </main>
  );
}
