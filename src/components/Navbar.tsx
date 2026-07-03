import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#services", label: "Services" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "py-4 bg-[#0d0d0d]/70 backdrop-blur-xl border-b border-[rgba(212,175,55,0.15)]"
            : "py-8 bg-transparent"
        }`}
      >
        <div className="max-w-[1500px] mx-auto px-6 md:px-12 flex items-center justify-between">
          <a href="#home" className="flex items-center gap-3 leading-none" aria-label="Lakshana home">
            <img
              src="/logo.png"
              alt="Lakshana LP Bridal Atelier logo"
              className="w-12 h-12 object-contain"
            />
            <span className="flex flex-col leading-none">
              <span className="font-display text-2xl tracking-[0.2em] text-[#f8f5f0]">
                LAKSHANA
              </span>
              <span className="text-[9px] tracking-[0.45em] text-[#d4af37] mt-1">
                BRIDAL STUDIO
              </span>
            </span>
          </a>

          <nav className="hidden lg:flex items-center gap-10">
            {links.slice(0, 7).map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="link-underline text-[11px] tracking-[0.3em] uppercase text-[#f8f5f0]/80 hover:text-[#f8f5f0]"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <a href="#book" className="btn-gold hidden md:inline-flex">
              <span>Book Appointment</span>
            </a>
            <button
              aria-label="Open menu"
              onClick={() => setOpen(true)}
              className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 border border-[#d4af37]/50"
            >
              <span className="w-4 h-px bg-[#f8f5f0]" />
              <span className="w-4 h-px bg-[#f8f5f0]" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "circle(0% at 100% 0%)" }}
            animate={{ clipPath: "circle(150% at 100% 0%)" }}
            exit={{ clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[60] bg-[#0d0d0d]"
          >
            <div className="relative h-full flex flex-col">
              <div className="flex items-center justify-between p-6 md:p-12">
              <div className="flex items-center gap-3">
                <img
                  src="/logo.png"
                  alt="Lakshana logo"
                  className="w-10 h-10 object-contain"
                />
                <span className="font-display text-xl tracking-[0.2em]">LAKSHANA</span>
              </div>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="w-10 h-10 flex items-center justify-center border border-[#d4af37]/50 text-[#f8f5f0]"
                >
                  ✕
                </button>
              </div>
              <nav className="flex-1 flex flex-col justify-center items-center gap-6 px-6">
                {links.map((l, i) => (
                  <motion.a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.06, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="font-display text-4xl md:text-5xl tracking-wide hover:text-[#d4af37] transition-colors"
                  >
                    {l.label}
                  </motion.a>
                ))}
                <motion.a
                  href="#book"
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.7 }}
                  className="btn-gold mt-8"
                >
                  Book Appointment
                </motion.a>
              </nav>
              <div className="p-6 md:p-12 text-center text-xs tracking-[0.3em] text-[#f8f5f0]/40 uppercase">
                Chennai · India
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
