export function Marquee() {
  const words = [
    "HD Bridal Makeup",
    "Reception Glam",
    "Engagement",
    "Hair Styling",
    "Saree Draping",
    "Skin Therapy",
    "Academy",
    "Editorial Beauty",
  ];
  const repeated = [...words, ...words];
  return (
    <section
      aria-hidden
      className="relative bg-[#0d0d0d] border-y border-[#d4af37]/15 py-8 overflow-hidden"
    >
      <div className="marquee">
        {repeated.map((w, i) => (
          <span
            key={i}
            className="font-display text-3xl md:text-5xl text-[#f8f5f0]/80 flex items-center gap-12"
          >
            {w}
            <span className="w-2 h-2 rotate-45 bg-[#d4af37]" />
          </span>
        ))}
      </div>
    </section>
  );
}
