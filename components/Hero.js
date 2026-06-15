import Image from "next/image";
import Link from "next/link";

const heroStats = [
  { value: "16+", label: "banking solutions" },
  { value: "Payments", label: "onboarding, switching, and compliance" },
  { value: "Built for", label: "banks, NBFCs, and digital finance teams" }
];

export default function Hero() {
  return (
    <section className="relative px-4 pb-24 pt-14 sm:px-6 lg:px-8 lg:pb-32 lg:pt-16">
      <div className="relative mx-auto grid max-w-7xl items-start gap-14 lg:grid-cols-[0.95fr_1.25fr]">
        <div className="pt-8">
          <div className="font-editorial text-[0.95rem] tracking-[0.12em] text-[var(--color-muted)]">
            Banking technology, designed for scale
          </div>

          <h1 className="font-editorial mt-8 max-w-xl text-[4.4rem] leading-[0.96] tracking-[-0.06em] text-[var(--color-ink)] sm:text-[5.4rem] lg:text-[6.4rem]">
            DIGITAL
            <br />
            BANKING,
            <br />
            BUILT FOR
            <br />
            GROWTH
          </h1>

          <p className="mt-10 max-w-lg text-[1.08rem] leading-9 text-[var(--color-muted)]">
            Aryavex Technologies delivers modern banking and fintech solutions
            for institutions looking to strengthen payments, customer service,
            transaction infrastructure, and digital financial access.
          </p>

          <Link
            href="#products"
            className="group font-editorial mt-10 inline-flex items-center border border-[var(--color-ink)] px-8 py-4 text-[1.15rem] text-[var(--color-ink)] transition hover:bg-[var(--color-ink)] hover:text-white"
          >
            <span className="text-[var(--color-ink)] group-hover:text-white">
              Explore Our Solutions
            </span>
            
          </Link>
        </div>

        <div className="relative min-h-[42rem] overflow-hidden border border-[var(--color-line)] bg-white">
          <Image
            src="/main.jpg"
            alt="Aryavex hero visual"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 58vw"
            priority
          />
        </div>

        <div className="grid gap-px border border-[var(--color-line)] bg-[var(--color-line)] lg:col-span-2 sm:grid-cols-3">
          {heroStats.map((stat) => (
            <div key={stat.label} className="bg-white px-6 py-5 text-left">
              <p className="font-editorial text-[2rem] tracking-[-0.04em] text-[var(--color-ink)]">
                {stat.value}
              </p>
              <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
