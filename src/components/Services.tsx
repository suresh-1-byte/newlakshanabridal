import { motion } from "framer-motion";
import { useReveal } from "../hooks/useReveal";
import hdBridal from "../assets/gallery-1.png";
import receptionMakeup from "../assets/reception makeup.png";
import engagementMakeup from "../assets/engagement makeup.png";
import signatureHair from "../assets/signature hairstyle.png";
import skinTherapy from "../assets/skin therapy.png";
import hairSpaRitual from "../assets/hair spa ritual.png";
import sareeDraping from "../assets/saree draping.png";
import nailCouture from "../assets/nail counture.png";

const services = [
  { n: "01", t: "HD Bridal Makeup", d: "Camera-ready luminosity engineered for the muhurtham moment and beyond.", img: hdBridal },
  { n: "02", t: "Reception Makeup", d: "A softer modern glam — radiant, sculpted, and quietly powerful.", img: receptionMakeup },
  { n: "03", t: "Engagement Makeup", d: "Dewy, romantic finishes designed for ring exchanges and candid film.", img: engagementMakeup },
  { n: "04", t: "Signature Hair Styling", d: "From jasmine braids to architectural updos, hair as couture.", img: signatureHair },
  { n: "05", t: "Skin Therapy", d: "Pre-bridal protocols — hydration, brightening, and cellular renewal.", img: skinTherapy },
  { n: "06", t: "Hair Spa Rituals", d: "Restorative scalp ceremonies with cold-pressed botanicals.", img: hairSpaRitual },
  { n: "07", t: "Saree Draping", d: "Regional drapes — Madisar, Nivi, half-saree — sculpted with precision.", img: sareeDraping },
  { n: "08", t: "Nail Couture", d: "Editorial nail extensions and bridal art tailored to your saree palette.", img: nailCouture },
];

export function Services() {
  const titleRef = useReveal<HTMLHeadingElement>();
  return (
    <section id="services" className="relative bg-[#0d0d0d] py-32 md:py-48 noise">
      <div className="max-w-[1500px] mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <span className="eyebrow">The Services</span>
            <h2
              ref={titleRef}
              className="fade-up mt-6 font-display text-5xl md:text-7xl leading-[1.05] max-w-3xl"
            >
              A complete <em className="italic font-light text-[#d4af37]">couture</em> beauty experience.
            </h2>
          </div>
          <a href="#book" className="btn-ghost shrink-0">Book a Service</a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-[#d4af37]/15">
          {services.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, delay: (i % 4) * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="group relative bg-[#0d0d0d] min-h-[420px] flex flex-col overflow-hidden cursor-pointer"
              data-cursor="hover"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={s.img}
                  alt={s.t}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-transparent to-transparent" />
              </div>
              
              <div className="relative flex-1 p-8 md:p-10 flex flex-col justify-between">
                <div className="absolute inset-0 bg-gradient-to-br from-[#d4af37]/0 to-[#d4af37]/0 group-hover:from-[#d4af37]/5 group-hover:to-transparent transition-all duration-700" />
                <div className="absolute top-0 left-0 right-0 h-px bg-[#d4af37]/0 group-hover:bg-[#d4af37] transition-all duration-700" />

                <div className="relative flex items-start justify-between">
                  <span className="text-[10px] tracking-[0.4em] text-[#d4af37]">{s.n}</span>
                  <span className="text-[10px] tracking-[0.3em] uppercase text-[#f8f5f0]/30 group-hover:text-[#f8f5f0]/70 transition-colors">
                    Explore →
                  </span>
                </div>
                <div className="relative">
                  <h3 className="font-display text-2xl md:text-3xl leading-tight mb-3 group-hover:text-[#d4af37] transition-colors duration-500">
                    {s.t}
                  </h3>
                  <p className="text-sm text-[#f8f5f0]/55 leading-relaxed">{s.d}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
