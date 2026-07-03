import { motion } from "framer-motion";
import {
  FiAward,
  FiHeart,
  FiStar,
  FiShield,
  FiFeather,
  FiTrendingUp,
} from "react-icons/fi";
import { useReveal } from "../hooks/useReveal";

const items = [
  { I: FiHeart, t: "Personalised Makeup", d: "Looks engineered for your features, skin tone and saree palette." },
  { I: FiAward, t: "Certified Experts", d: "International certifications, decades of cumulative artistry." },
  { I: FiStar, t: "Luxury Products", d: "Charlotte Tilbury, Dior, MAC Pro, Bobbi Brown — only the finest." },
  { I: FiShield, t: "Hygiene Standards", d: "Sterilised tools, sealed kits, single-use applicators — always." },
  { I: FiFeather, t: "Bridal Specialists", d: "South Indian, North Indian, Christian and modern fusion brides." },
  { I: FiTrendingUp, t: "Trend-Forward", d: "Editorial techniques from Mumbai, Paris and Seoul ateliers." },
];

export function WhyUs() {
  const titleRef = useReveal<HTMLHeadingElement>();
  return (
    <section className="relative bg-[#0d0d0d] py-32 md:py-48">
      <div className="max-w-[1500px] mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 mb-20">
          <div className="lg:col-span-5">
            <span className="eyebrow">Why Lakshana</span>
            <h2
              ref={titleRef}
              className="fade-up mt-6 font-display text-5xl md:text-6xl leading-[1.05]"
            >
              A studio built on <em className="italic font-light text-[#d4af37]">obsession</em> for detail.
            </h2>
          </div>
          <p className="lg:col-span-7 text-[#f8f5f0]/65 leading-relaxed text-lg max-w-xl lg:mt-12">
            Six promises that define every Lakshana bride — from the first
            consultation to the last frame of your wedding film.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((it, i) => (
            <motion.div
              key={it.t}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="group relative p-10 border border-[#d4af37]/15 hover:border-[#d4af37]/60 transition-all duration-700 hover:-translate-y-2"
            >
              <div className="absolute -inset-px bg-gradient-to-br from-[#d4af37]/0 via-[#d4af37]/0 to-[#d4af37]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              <it.I className="text-[#d4af37] text-3xl mb-8 group-hover:scale-110 transition-transform duration-500" />
              <h3 className="font-display text-2xl mb-3">{it.t}</h3>
              <p className="text-sm text-[#f8f5f0]/55 leading-relaxed">{it.d}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
