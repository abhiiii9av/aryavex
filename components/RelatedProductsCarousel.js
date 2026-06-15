"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

function getProductIconPath(index) {
  return `/${String.fromCharCode(97 + index)}.png`;
}

export default function RelatedProductsCarousel({ items }) {
  const railRef = useRef(null);
  const pauseUntilRef = useRef(0);
  const repeatedItems = [...items, ...items];

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    const speed = 88;
    let frameId = 0;
    let lastTime = 0;

    function tick(timestamp) {
      if (Date.now() < pauseUntilRef.current) {
        lastTime = timestamp;
        frameId = window.requestAnimationFrame(tick);
        return;
      }

      if (!lastTime) {
        lastTime = timestamp;
      }

      const delta = timestamp - lastTime;
      lastTime = timestamp;
      rail.scrollLeft += (speed * delta) / 1000;

      if (rail.scrollLeft >= rail.scrollWidth / 2) {
        rail.scrollLeft = 1;
      }

      frameId = window.requestAnimationFrame(tick);
    }

    frameId = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, []);

  function scrollByAmount(direction) {
    const rail = railRef.current;
    if (!rail) return;

    const amount = Math.min(rail.clientWidth * 0.88, 1200);
    rail.scrollBy({
      left: direction === "next" ? amount : -amount,
      behavior: "smooth"
    });
  }

  function pauseAutoScroll(ms = 2200) {
    pauseUntilRef.current = Date.now() + ms;
  }

  function handleWheel(event) {
    const rail = railRef.current;
    if (!rail) return;

    if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
      event.preventDefault();
      pauseAutoScroll();
      rail.scrollLeft += event.deltaY;
    }
  }

  return (
    <div className="mt-8">
      <div className="relative">
        <button
          type="button"
          onClick={() => {
            pauseAutoScroll();
            scrollByAmount("prev");
          }}
          aria-label="Previous products"
          className="absolute -left-1 top-1/2 z-10 hidden h-14 w-14 -translate-y-1/2 items-center justify-center text-4xl text-[#ef7b5d] transition hover:text-[#133f87] md:inline-flex"
        >
          ←
        </button>

        <div
          ref={railRef}
          onWheel={handleWheel}
          onPointerDown={() => pauseAutoScroll(900)}
          onPointerUp={() => pauseAutoScroll(700)}
          onTouchStart={() => pauseAutoScroll(900)}
          onTouchEnd={() => pauseAutoScroll(700)}
          className="flex gap-5 overflow-x-auto px-2 pb-6 pt-2 lg:px-12 overflow-y-auto hide-scrollbar"
          style={{ touchAction: "pan-x" }}
        >
          {repeatedItems.map((item, index) => (
            <Link
              key={`${item.slug}-${index}`}
              href={`/products/${item.slug}`}
              className="group flex min-h-[21.5rem] w-[calc(100%-1rem)] shrink-0 flex-col items-center border border-[#d7dfec] bg-white px-6 py-8 text-center transition duration-300 hover:-translate-y-1 hover:border-[#ef7b5d]/40 sm:w-[19rem] lg:w-[17rem]"
            >
              <div className="relative h-24 w-24">
                <Image
                  src={getProductIconPath(item.iconIndex)}
                  alt={`${item.name} icon`}
                  fill
                  className="object-contain"
                  sizes="96px"
                />
              </div>

              <h3 className="mt-6 text-[1.45rem] font-semibold leading-tight tracking-[-0.04em] text-[#133f87]">
                {item.name}
              </h3>

              <span className="mt-auto inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#ef7b5d] text-xl text-white transition group-hover:-translate-y-1 group-hover:translate-x-1">
                ↗
              </span>
            </Link>
          ))}
        </div>

        <button
          type="button"
          onClick={() => {
            pauseAutoScroll();
            scrollByAmount("next");
          }}
          aria-label="Next products"
          className="absolute -right-1 top-1/2 z-10 hidden h-14 w-14 -translate-y-1/2 items-center justify-center text-4xl text-[#133f87] transition hover:text-[#ef7b5d] md:inline-flex"
        >
          →
        </button>
      </div>
    </div>
  );
}
