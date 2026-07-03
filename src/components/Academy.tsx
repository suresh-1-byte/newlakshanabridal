import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import academy from "../assets/academy.jpg";
import { useReveal } from "../hooks/useReveal";

const programs = [
  { c: "01", t: "Beautician Foundation", d: "12 weeks · Mon–Fri", price: "Certified" },
  { c: "02", t: "HD Makeup Masterclass", d: "6 weeks · Studio + Live", price: "Pro" },
  { c: "03", t: "Bridal Hairstyling", d: "8 weeks · Hands-on", price: "Advanced" },
  { c: "04", t: "Bridal Mastery Diploma", d: "6 months · Career-track", price: "Diploma" },
];

export function Academy() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const titleRef = useReveal<HTMLHeadingElement>();

  return (
    <section id="academy" ref={ref} className="relative bg-[#0d0d0d] py-32 md:py-48 overflow-hidden">
      <div className="max-w-[1500px] mx-auto px-6 md:px-12 grid lg:grid-cols-12 gap-12 lg:gap-20">
        <div className="lg:col-span-5 relative h-[70vh] lg:h-auto overflow-hidden order-2 lg:order-1">
          <motion.img
            style={{ y }}
            src={academy}
            alt="Lakshana Beauty Academy classroom"
            className="w-full h-[120%] object-cover"
            loading="lazy"
            width={1600}
            height={1100}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d]/60 to-transparent" />
          <div className="absolute bottom-8 left-8 right-8 glass p-6">
            <span className="eyebrow">Internationally Certified</span>
            <p className="mt-3 font-display text-2xl">Become a sought-after bridal artist.</p>
          </div>
        </div>

        <div className="lg:col-span-7 order-1 lg:order-2">
          <span className="eyebrow">The Academy</span>
          <h2
            ref={titleRef}
            className="fade-up mt-6 font-display text-5xl md:text-7xl leading-[1.05]"
          >
            Train with India's <em className="italic font-light text-[#d4af37]">finest</em> bridal mentors.
          </h2>
          <p className="mt-8 text-[#f8f5f0]/65 max-w-lg leading-relaxed">
            Small cohorts. Personal mentorship. Real bridal kits. Lakshana
            Academy graduates step out as confident, certified, career-ready
            artists — with portfolios shot in our own atelier.
          </p>

          <div className="mt-12 divide-y divide-[#d4af37]/15 border-y border-[#d4af37]/15">
            {programs.map((p) => (
              <div
                key={p.c}
                className="group flex items-center justify-between py-6 cursor-pointer hover:pl-4 transition-all duration-500"
                data-cursor="hover"
              >
                <div className="flex items-center gap-6">
                  <span className="text-[10px] tracking-[0.4em] text-[#d4af37]">{p.c}</span>
                  <div>
                    <h3 className="font-display text-2xl md:text-3xl group-hover:text-[#d4af37] transition-colors">
                      {p.t}
                    </h3>
                    <p className="text-xs tracking-wider text-[#f8f5f0]/40 mt-1">{p.d}</p>
                  </div>
                </div>
                <span className="text-[10px] tracking-[0.3em] uppercase text-[#f8f5f0]/50 group-hover:text-[#d4af37] transition-colors hidden md:block">
                  {p.price} →
                </span>
              </div>
            ))}
          </div>

          <a href="#book" className="btn-gold mt-12">Enroll Now</a>
        </div>
      </div>
    </section>
  );
}
