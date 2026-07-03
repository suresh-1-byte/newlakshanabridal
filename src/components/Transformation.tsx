import { useRef, useState, useEffect } from "react";
import before1 from "../assets/before1.png";
import after1 from "../assets/after1.png";
import before2 from "../assets/before2.png";
import after2 from "../assets/after2.png";
import before3 from "../assets/before3.png";
import after3 from "../assets/after3.png";
import before4 from "../assets/before4.png";
import after4 from "../assets/after4.png";
import before5 from "../assets/before5.png";
import after5 from "../assets/after5.png";
import { useReveal } from "../hooks/useReveal";

function TransformationCard({
  title,
  beforeSrc,
  afterSrc,
}: {
  title: string;
  beforeSrc: string;
  afterSrc: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);
  const dragging = useRef(false);

  useEffect(() => {
    const move = (clientX: number) => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = ((clientX - rect.left) / rect.width) * 100;
      setPos(Math.max(0, Math.min(100, x)));
    };

    const onMouseMove = (e: MouseEvent) => dragging.current && move(e.clientX);
    const onTouchMove = (e: TouchEvent) => dragging.current && move(e.touches[0].clientX);
    const stop = () => (dragging.current = false);

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", stop);
    window.addEventListener("touchmove", onTouchMove);
    window.addEventListener("touchend", stop);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", stop);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", stop);
    };
  }, []);

  return (
    <div className="mx-auto w-full max-w-[560px]">
      <div className="mb-4 text-sm uppercase tracking-[0.32em] text-[#f8f5f0]/70">{title}</div>
      <div
        ref={containerRef}
        onMouseDown={(e) => {
          dragging.current = true;
          const rect = containerRef.current!.getBoundingClientRect();
          setPos(((e.clientX - rect.left) / rect.width) * 100);
        }}
        onTouchStart={(e) => {
          dragging.current = true;
          const rect = containerRef.current!.getBoundingClientRect();
          setPos(((e.touches[0].clientX - rect.left) / rect.width) * 100);
        }}
        className="relative w-full aspect-[16/10] overflow-hidden border border-[#d4af37]/30 select-none cursor-ew-resize"
        data-cursor="hover"
      >
        {/* Underlay: After Image (Fixed in background) */}
        <img
          src={afterSrc}
          alt="After bridal transformation"
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
          width={1280}
          height={1600}
        />
        
        {/* Overlay Mask: This div shrinks/grows but does NOT resize the image inside */}
        <div className="absolute inset-y-0 left-0 overflow-hidden z-10" style={{ width: `${pos}%` }}>
          {/* CRITICAL FIX: 
            We use 'w-[558px]' (or a calculated width) or simple CSS trick 
            to keep the image dimensions tied strictly to the outer frame.
            By setting 'absolute left-0 top-0 h-full' and calculating the width based on the aspect ratio container, 
            or using 'w-full' with a wrapper element that stays 100% of the container:
          */}
          <div className="absolute inset-0 w-full h-full" style={{ width: containerRef.current ? `${containerRef.current.offsetWidth}px` : '100cqi' }}>
            <img
              src={beforeSrc}
              alt="Before bridal transformation"
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
              width={1280}
              height={1600}
            />
          </div>
          <div className="absolute top-4 left-4 z-20 text-[10px] tracking-[0.4em] uppercase text-[#f8f5f0] bg-black/40 px-3 py-2 backdrop-blur">
            Before
          </div>
        </div>
        
        <div className="absolute top-4 right-4 z-20 text-[10px] tracking-[0.4em] uppercase text-[#0d0d0d] bg-[#d4af37] px-3 py-2">
          After
        </div>

        {/* Slider Handle Line */}
        <div className="absolute top-0 bottom-0 w-px bg-[#d4af37] z-30 pointer-events-none" style={{ left: `${pos}%` }}>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#d4af37] flex items-center justify-center text-[#0d0d0d] text-lg shadow-[0_0_30px_rgba(212,175,55,0.6)]">
            ⇆
          </div>
        </div>
      </div>
    </div>
  );
}

export function Transformation() {
  const titleRef = useReveal<HTMLHeadingElement>();
  const cards = [
    { title: "Classic Bridal Glow", before: before1, after: after1 },
    { title: "Romantic Wedding Shine", before: before2, after: after2 },
    { title: "Regal Transformation", before: before3, after: after3 },
    { title: "Soft Cinematic Touch", before: before4, after: after4 },
    { title: "Golden Bridal Finish", before: before5, after: after5 },
  ];

  return (
    <section className="relative bg-[#0d0d0d] py-24 md:py-40 overflow-hidden">
      <div className="max-w-[1500px] mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
          <div>
            <span className="eyebrow">The Transformation</span>
            <h2
              ref={titleRef}
              className="fade-up mt-6 font-display text-4xl md:text-6xl leading-[1.05] max-w-2xl"
            >
              From quiet beauty to <em className="italic font-light text-[#d4af37]">cinematic bride.</em>
            </h2>
          </div>
          <p className="max-w-sm text-[#f8f5f0]/60 text-sm leading-relaxed">
            Drag the gold line. Witness the artistry that has earned Lakshana the
            trust of over a thousand brides across South India.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cards.map((card) => (
            <TransformationCard
              key={card.title}
              title={card.title}
              beforeSrc={card.before}
              afterSrc={card.after}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
