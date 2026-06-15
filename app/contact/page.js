import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: "Contact Us | Aryavex Technologies Pvt Ltd",
  description: "Get in touch with Aryavex Technologies for banking and fintech solutions."
};

export default function ContactPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[linear-gradient(180deg,#faf8f3_0%,#f6f2ea_100%)]">
      <Header />

      <section className="px-4 pb-24 pt-12 sm:px-6 lg:px-8 lg:pb-32 lg:pt-16">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-4xl text-center">
            <p className="font-editorial text-[0.95rem] tracking-[0.12em] text-[var(--color-muted)]">
              Contact Aryavex
            </p>
            <h1 className="mt-5 text-balance font-sans text-[3.5rem] font-semibold leading-[0.95] tracking-[-0.05em] text-[#133f87] sm:text-[4.8rem]">
              Get in Touch With Us
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-[1.05rem] leading-8 text-[var(--color-muted)]">
              Tell us about your institution, your requirements, and the
              solutions you are exploring. Our team will get back to you with
              the right direction.
            </p>
          </div>

          <div className="mx-auto mt-14 max-w-6xl">
            <ContactForm />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
