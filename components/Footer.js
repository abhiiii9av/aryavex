import Image from "next/image";
import Link from "next/link";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/#products" },
  { label: "Contact", href: "/contact" }
];

const solutionLinks = [
  { label: "UPI Payment Switch", href: "/products/upi-payment-switch" },
  { label: "Core Banking Solution", href: "/products/core-banking-solution" },
  { label: "Wallet Platform", href: "/products/wallet-platform" },
  { label: "Video KYC Solution", href: "/products/video-kyc-solution" }
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-[var(--color-line)] bg-white px-4 py-16 sm:px-6 lg:px-8">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-68"
        style={{ backgroundImage: "url('/footer-pattern-only.png')" }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.48)_0%,rgba(255,255,255,0.44)_34%,rgba(255,255,255,0.66)_68%,rgba(255,255,255,0.84)_100%)]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr_0.8fr_1fr]">
          <div>
            <Image
              src="/aryavex-logo.png"
              alt="Aryavex Technologies Pvt Ltd"
              width={360}
              height={114}
              className="h-auto w-[14rem] mix-blend-multiply sm:w-[16rem]"
            />
            <p className="mt-6 max-w-md text-[1.02rem] leading-8 text-[var(--color-muted)]">
              Centura SQUAre IT Park, Unit No. 440, Road Number 22, Plot No B-44 And B-44/A, Opposite Lanxess, Near Mahindra & Mahindra, Wagle estate ,Thane 400604, Maharashtra, India
            </p>
          </div>

          <div>
            <h3 className="font-editorial text-[1.35rem] text-[var(--color-ink)]">
              Quick Links
            </h3>
            <nav className="mt-5 flex flex-col gap-4">
              {quickLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-[1rem] text-[var(--color-muted)] transition hover:text-[var(--color-ink)]"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h3 className="font-editorial text-[1.35rem] text-[var(--color-ink)]">
              Solutions
            </h3>
            <nav className="mt-5 flex flex-col gap-4">
              {solutionLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-[1rem] text-[var(--color-muted)] transition hover:text-[var(--color-ink)]"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h3 className="font-editorial text-[1.35rem] text-[var(--color-ink)]">
              Get in Touch
            </h3>
            <div className="mt-5 space-y-4 text-[1rem] leading-8 text-[var(--color-muted)]">
              <p>contact@aryavex.in</p>
              <p>
                Banking technology solutions for institutions looking to scale
                modern financial services.
              </p>
            </div>
            <div>
              <Link
  href="/contact"
  className="group font-editorial mt-6 inline-flex items-center border border-[var(--color-ink)] px-6 py-3 text-[1rem] transition hover:bg-[var(--color-ink)]"
>
  <span className="text-[var(--color-ink)] group-hover:text-white">
    Contact Our Team
  </span>
</Link>
            </div>
            
          </div>
        </div>

        <div className="mt-14 border-t border-[var(--color-line)] pt-6 text-sm text-[var(--color-muted)]">
          <p>© 2026 Aryavex Technologies Pvt Ltd. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
