import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import heroBride from "../assets/hero-bride.jpg";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      id="home"
      ref={ref}
      className="relative h-[110vh] w-full overflow-hidden bg-[#0d0d0d] noise"
    >
      {/* Background image with slow zoom */}
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <img
          src={heroBride}
          alt="Lakshana bridal portrait — South Indian luxury bride in red silk"
          className="w-full h-full object-cover"
          width={1920}
          height={1280}
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d0d]/70 via-[#0d0d0d]/40 to-[#0d0d0d]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d0d0d]/80 via-transparent to-[#0d0d0d]/50" />
      </motion.div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 24 }).map((_, i) => (
          <motion.span
            key={i}
            className="absolute w-[2px] h-[2px] rounded-full bg-[#d4af37]/60"
            style={{
              left: `${(i * 37) % 100}%`,
              top: `${(i * 53) % 100}%`,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.2, 0.9, 0.2],
            }}
            transition={{
              duration: 6 + (i % 5),
              repeat: Infinity,
              delay: (i % 7) * 0.5,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 h-screen flex flex-col items-center justify-center text-center px-6"
      >
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="eyebrow mb-8"
        >
          Est. Chennai · Bridal Atelier
        </motion.span>

        <h1 className="font-display text-[12vw] md:text-[7.5vw] lg:text-[6vw] leading-[0.95] tracking-tight text-balance max-w-6xl">
          {["Where", "Elegance", "Becomes", "Timeless", "Beauty"].map((word, i) => (
            <span key={i} className="overflow-hidden inline-block mr-4 align-bottom">
              <motion.span
                className="inline-block"
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{
                  delay: 0.6 + i * 0.12,
                  duration: 1.2,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {word === "Elegance" || word === "Timeless" ? (
                  <em className="italic font-light text-[#d4af37]">{word}</em>
                ) : (
                  word
                )}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 1 }}
          className="mt-8 max-w-xl text-sm md:text-base tracking-wide text-[#f8f5f0]/70 leading-relaxed"
        >
          Premium bridal makeovers, luxury beauty services and a professional
          beauty academy — crafted in the heart of Chennai.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.9, duration: 1 }}
          className="mt-10 flex flex-col sm:flex-row gap-4"
        >
          <a href="#book" className="btn-gold">Book Bridal Consultation</a>
          <a href="#portfolio" className="btn-ghost">Explore Portfolio</a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-10">
        <span className="text-[10px] tracking-[0.45em] text-[#f8f5f0]/50 uppercase">Scroll</span>
        <div className="scroll-indicator" />
      </div>

      {/* Side meta */}
      <div className="hidden md:flex absolute left-8 bottom-10 flex-col gap-3 z-10 text-[10px] tracking-[0.4em] uppercase text-[#f8f5f0]/40">
        <span>01 / 09</span>
        <span className="w-px h-12 bg-[#f8f5f0]/20 ml-3" />
      </div>
      <div className="hidden md:flex absolute right-8 bottom-10 flex-col items-end gap-3 z-10 text-[10px] tracking-[0.4em] uppercase text-[#f8f5f0]/40">
        <span>Chapter I</span>
        <span>The Atelier</span>
      </div>
    </section>
  );
}
