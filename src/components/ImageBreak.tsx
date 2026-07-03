import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function ImageBreak({
  src,
  alt,
  eyebrow,
  title,
  caption,
}: {
  src: string;
  alt: string;
  eyebrow: string;
  title: React.ReactNode;
  caption?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.2, 1]);
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section
      ref={ref}
      className="relative h-[90vh] md:h-screen w-full overflow-hidden bg-black"
    >
      <motion.div style={{ scale, y }} className="absolute inset-0">
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          loading="lazy"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-[#0d0d0d]/30 to-[#0d0d0d]/60" />
      </motion.div>
      <div className="relative z-10 h-full flex flex-col justify-end p-8 md:p-16 max-w-4xl">
        <span className="eyebrow mb-6">{eyebrow}</span>
        <h2 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.95]">
          {title}
        </h2>
        {caption && (
          <p className="mt-6 max-w-md text-[#f8f5f0]/60 text-sm leading-relaxed">{caption}</p>
        )}
      </div>
    </section>
  );
}
