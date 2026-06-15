"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { products } from "@/lib/products";

const spreadLayouts = [
  { x: -380, y: 0, rotate: 0 },
  { x: 0, y: 0, rotate: 0 },
  { x: 380, y: 0, rotate: 0 }
];

function ProductCard({ product, hoverTint = false }) {
  const hoverClass = hoverTint
    ? "hover:border-[#ef7b5d]/35 hover:bg-[#f4eadc]"
    : "hover:border-[#ef7b5d]/35 hover:bg-[#faf7f1]";
  const iconBySlug = {
    "upi-payment-switch": "/a.png",
    "payment-aggregator": "/b.png",
    "financial-transaction-switch": "/c.png",
    "core-banking-solution": "/d.png",
    "fraud-risk-management-solution": "/e.png",
    "mobile-banking-imps-switching-solution": "/f.png",
    "internet-banking-solution": "/g.png",
    "bharat-billpay-solution": "/h.png",
    "aeps-switching-solution": "/i.png",
    "account-aggregator-tsp": "/j.png",
    "agent-banking-solution": "/k.png",
    "wallet-platform": "/l.png",
    "ekyc-solution": "/m.png",
    "video-kyc-solution": "/n.png",
    "banking-chatbot": "/o.png",
    "data-vault-solution": "/p.png"
  };
  const iconSrc = iconBySlug[product.slug];

  return (
    <Link
      href={`/products/${product.slug}`}
      className={`group grid h-[31rem] grid-rows-[auto_auto_1fr_auto] overflow-hidden border border-line bg-white p-8 transition duration-500 ${hoverClass}`}
    >
      <div className="flex h-16 w-16 items-center justify-center border border-line bg-[#faf7f1] transition group-hover:border-[#ef7b5d]/35 group-hover:bg-white">
        {iconSrc ? (
          <Image
            src={iconSrc}
            alt={`${product.name} icon`}
            width={34}
            height={34}
            className="h-8 w-8 object-contain"
          />
        ) : (
          <span className="text-3xl text-[#ef7b5d]">↗</span>
        )}
      </div>

      <h3 className="font-editorial mt-8 min-h-[7.5rem] text-[2rem] leading-tight tracking-[-0.04em] text-[#133f87]">
        {product.name}
      </h3>

      <p className="mt-5 self-start text-[1.02rem] leading-8 text-muted">
        {product.description}
      </p>

      <div className="pt-8">
        <span className="inline-flex h-12 w-12 items-center justify-center border border-[#ef7b5d] bg-[#ef7b5d] text-xl text-white transition group-hover:translate-x-1 group-hover:-translate-y-1">
          ↗
        </span>
      </div>
    </Link>
  );
}

function ProductDeck({ products: group, deckIndex }) {
  const sectionRef = useRef(null);
  const [spreadProgress, setSpreadProgress] = useState(0);

  useEffect(() => {
    function handleScroll() {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const triggerStart = viewportHeight * 0.6;
      const triggerEnd = viewportHeight * 0.18;
      const rawProgress =
        (triggerStart - rect.top) / (triggerStart - triggerEnd);
      setSpreadProgress(Math.min(Math.max(rawProgress, 0), 1));
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <div ref={sectionRef} className="relative h-[72vh]">
      <div className="sticky top-2 flex min-h-[60vh] items-center justify-center overflow-visible">
        <div className="relative h-[34rem] w-full max-w-7xl overflow-visible">
          {group.map((product, index) => {
            const spread = spreadLayouts[index];
            const stackedRotation = 0;
            const x = spread.x * spreadProgress;
            const y = spread.y * spreadProgress;
            const rotate =
              stackedRotation * (1 - spreadProgress) +
              spread.rotate * spreadProgress;
            const scale = 0.92 + spreadProgress * 0.08;
            const opacity = 0.88 + spreadProgress * 0.12;

            return (
              <div
                key={product.name}
                className="absolute left-1/2 top-1/2 w-full max-w-[19rem] sm:max-w-[21rem] xl:max-w-[22rem]"
                style={{
                  transform: `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(${rotate}deg) scale(${scale})`,
                  opacity,
                  zIndex: 20 - index
                }}
              >
                <ProductCard
                  product={product}
                  hoverTint={index === 1 || (deckIndex + index) % 4 === 2}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function ProductsSection() {
  const productGroups = useMemo(() => {
    const groups = [];
    for (let i = 0; i < products.length; i += 3) {
      groups.push(products.slice(i, i + 3));
    }
    return groups;
  }, []);

  return (
    <section
      id="products"
      className="scroll-mt-10 px-4 pb-24 pt-6 sm:px-6 lg:px-8 lg:pb-32"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-editorial text-[0.95rem] tracking-[0.12em] text-muted">
            Solutions for Simpler Banking
          </p>
          <h2 className="font-editorial mt-5 text-[3.4rem] leading-[0.96] tracking-tighter text-ink sm:text-[4.4rem]">
            Products designed for modern financial operations
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-[1.05rem] leading-8 text-muted">
            A focused suite of banking and fintech solutions built to support
            payments, switching, onboarding, digital channels, and secure
            operational infrastructure.
          </p>
        </div>

        <div className="mt-16">
          {productGroups.map((group, index) => (
            <ProductDeck key={`deck-${index}`} products={group} deckIndex={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
