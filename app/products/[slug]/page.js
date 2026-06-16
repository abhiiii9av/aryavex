import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import RelatedProductsCarousel from "@/components/RelatedProductsCarousel";
import { getProductBySlug, products } from "@/lib/products";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export function generateMetadata({ params }) {
  const product = getProductBySlug(params.slug);

  if (!product) {
    return {
      title: "Product Not Found | Aryavex Technologies"
    };
  }

  return {
    title: `${product.name} | Aryavex Technologies`,
    description: product.description
  };
}

function DetailBlock({ label, children, className = "" }) {
  return (
    <div className={`border border-line bg-white/85 p-8 ${className}`}>
      <p className="text-[0.7rem] font-medium uppercase tracking-[0.28em] text-muted">
        {label}
      </p>
      <div className="mt-5 text-[1.03rem] leading-8 text-muted">{children}</div>
    </div>
  );
}

function ProductVisual({ product }) {
  if (product.imagePath) {
    return (
      <div className="border border-line bg-[#f1ecde] p-6 sm:p-8">
        <div className="border border-line bg-white/80 p-4 shadow-[0_18px_40px_rgba(0,0,0,0.04)]">
          <div className="relative aspect-[4/3] overflow-hidden border border-line bg-[#faf7f1]">
            <Image
              src={product.imagePath}
              alt={product.imageAlt || product.name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="border border-line bg-[#f1ecde] p-6 sm:p-8">
      <div className="relative aspect-[4/3] overflow-hidden border border-line bg-[linear-gradient(180deg,#faf7f1_0%,#f3ede0_100%)]">
        <div className="absolute left-[10%] top-[18%] h-24 w-24 border border-line bg-white/60 animate-float-soft" />
        <div className="absolute right-[12%] top-[14%] h-16 w-32 border border-line bg-white/70 animate-drift-soft" />
        <div className="absolute bottom-[18%] left-[12%] h-28 w-28 border border-line bg-white/50 animate-float-soft" />
        <div className="absolute bottom-[10%] right-[14%] h-40 w-40 border border-line bg-[#133f87]/8" />
        <div className="absolute inset-x-[18%] bottom-[16%] top-[24%] border border-line bg-white/80 shadow-[0_18px_40px_rgba(0,0,0,0.04)]">
          <div className="flex h-full items-center justify-center">
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center border border-line bg-[#faf7f1] text-3xl text-[#ef7b5d]">
                ↗
              </div>
              <p className="font-editorial mt-6 px-6 text-[1.8rem] leading-tight text-ink">
                {product.name}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductDetailPage({ params }) {
  const product = getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = products
    .map((item, index) => ({ ...item, iconIndex: index }))
    .filter((item) => item.slug !== product.slug);

  return (
    <main className="page-network-surface min-h-screen">
      <Header />

      <section className="px-4 pb-16 pt-12 sm:px-6 lg:px-8 lg:pb-24 lg:pt-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
            <div>
              <Link
                href="/#products"
                className="font-editorial inline-flex items-center gap-3 text-[1rem] text-muted transition hover:text-ink"
              >
                <span className="text-lg">↗</span>
                Back to products
              </Link>

              <p className="font-editorial mt-10 text-[0.95rem] tracking-[0.12em] text-muted">
                Product Overview
              </p>
              <h1 className="font-editorial mt-5 max-w-4xl text-[3.5rem] leading-[0.92] tracking-[-0.05em] text-ink sm:text-[4.8rem]">
                {product.name}
              </h1>
              <p className="mt-8 max-w-2xl text-[1.12rem] leading-8 text-muted">
                {product.intro}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <div className="border border-line bg-white/85 px-4 py-3 text-[0.82rem] uppercase tracking-[0.2em] text-muted">
                  Enterprise-ready
                </div>
                <div className="border border-line bg-white/85 px-4 py-3 text-[0.82rem] uppercase tracking-[0.2em] text-muted">
                  Configurable
                </div>
                <div className="border border-line bg-white/85 px-4 py-3 text-[0.82rem] uppercase tracking-[0.2em] text-muted">
                  Finance workflows
                </div>
              </div>

              <div className="mt-10 flex flex-wrap gap-4 ">
                <div className="hover:bg-black hover:text-white" >
                  <Link
                  href="/contact"
                  className="font-editorial inline-flex items-center border border-black px-7 py-3 text-[1rem] text-black transition "
                >
                  Request a Consultation
                </Link>
                </div>
                <div >
                  <Link
                  href="/#products"
                  className="font-editorial inline-flex items-center border border-line bg-white/80 px-7 py-3 text-[1rem] text-ink transition hover:border-ink"
                >
                  Explore More Solutions
                </Link>
                </div>
                
              </div>
            </div>

            <ProductVisual product={product} />
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2">
            <DetailBlock
              label="Overview"
              className="relative overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#fcfaf5_100%)]"
            >
              <div className="absolute left-0 top-0 h-full w-1 bg-[#ef7b5d]" />
              <p>{product.overview}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <div className="border border-line bg-[#faf7f1] px-4 py-3 text-[0.8rem] uppercase tracking-[0.18em] text-muted">
                  Secure flow
                </div>
                <div className="border border-line bg-[#faf7f1] px-4 py-3 text-[0.8rem] uppercase tracking-[0.18em] text-muted">
                  Modular system
                </div>
              </div>
            </DetailBlock>

            <DetailBlock
              label="Built For"
              className="bg-[linear-gradient(180deg,#ffffff_0%,#fcfaf5_100%)]"
            >
              <ul className="space-y-4">
                {product.useCases.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-4 border border-line bg-[#faf7f1] px-4 py-4 transition hover:border-[#ef7b5d]/35 hover:bg-white"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-line bg-white text-[#ef7b5d]">
                      ↗
                    </span>
                    <span className="text-[1rem] leading-7 text-ink">{item}</span>
                  </li>
                ))}
              </ul>
            </DetailBlock>

            <div className="border border-line bg-[linear-gradient(180deg,#f1ecde_0%,#f7f2e8_100%)] p-8 sm:col-span-2 sm:p-10">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-[0.7rem] font-medium uppercase tracking-[0.28em] text-muted">
                    Key Highlights
                  </p>
                  <h2 className="font-editorial mt-3 text-[2rem] leading-none tracking-[-0.04em] text-ink sm:text-[2.5rem]">
                    The essentials at a glance
                  </h2>
                </div>
                <div className="border border-line bg-white/80 px-5 py-4 sm:max-w-md">
                  <p className="text-[0.98rem] leading-7 text-muted">
                    A quick visual summary of the core strengths this solution
                    brings into operational finance environments.
                  </p>
                </div>
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-3">
                {product.highlights.map((item, index) => (
                  <div
                    key={item}
                    className="group relative overflow-hidden border border-line bg-white/90 p-6 transition duration-300 hover:-translate-y-1 hover:border-[#ef7b5d]/35 animate-rise-in"
                    style={{ animationDelay: `${index * 0.08}s` }}
                  >
                    <div className="absolute inset-x-0 top-0 h-1 bg-transparent transition group-hover:bg-[#ef7b5d]" />
                    <div className="flex items-center justify-between">
                      <p className="text-[0.7rem] uppercase tracking-[0.22em] text-muted">
                        0{index + 1}
                      </p>
                      <span className="text-[#ef7b5d] opacity-70 transition group-hover:translate-x-1 group-hover:-translate-y-1">
                        ↗
                      </span>
                    </div>
                    <p className="mt-5 text-[1.05rem] leading-8 text-ink">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* <div className="mt-16 border border-line bg-white/85 p-8 sm:p-10 lg:p-12">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
              <div>
                <p className="text-[0.7rem] font-medium uppercase tracking-[0.28em] text-muted">
                  How It Helps
                </p>
                <h2 className="font-editorial mt-4 text-[2.3rem] leading-[0.98] tracking-[-0.04em] text-ink sm:text-[2.8rem]">
                  A cleaner way to support financial operations with focused technology.
                </h2>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="border border-line bg-[#faf7f1] p-6 transition hover:-translate-y-1">
                  <p className="text-sm uppercase tracking-[0.2em] text-muted">
                    Operational clarity
                  </p>
                  <p className="mt-4 text-[1rem] leading-7 text-muted">
                    Designed to simplify workflows, improve visibility, and support teams with better day-to-day control.
                  </p>
                </div>
                <div className="border border-line bg-[#faf7f1] p-6 transition hover:-translate-y-1">
                  <p className="text-sm uppercase tracking-[0.2em] text-muted">
                    Institution-ready
                  </p>
                  <p className="mt-4 text-[1rem] leading-7 text-muted">
                    Built for organizations that need dependable digital systems aligned with real financial operations.
                  </p>
                </div>
                <div className="border border-line bg-[#faf7f1] p-6 transition hover:-translate-y-1 sm:col-span-2">
                  <p className="text-sm uppercase tracking-[0.2em] text-muted">
                    Delivery approach
                  </p>
                  <p className="mt-4 text-[1rem] leading-7 text-muted">
                    Aryavex focuses on modular product thinking, scalable architecture, and configurable workflows so institutions can adapt faster as business needs evolve.
                  </p>
                </div>
              </div>
            </div>
          </div> */}

          <div className="mt-16">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[0.7rem] font-medium uppercase tracking-[0.28em] text-muted">
                  Other Products
                </p>
                <h2 className="mt-3 text-[3rem] font-semibold leading-none tracking-[-0.05em] text-[#133f87] sm:text-[4rem]">
                  Other Products
                </h2>
              </div>
              <Link
                href="/#products"
                className="text-[1.05rem] text-ink transition hover:text-[#133f87]"
              >
                View all products
              </Link>
            </div>

            <RelatedProductsCarousel items={relatedProducts} />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
