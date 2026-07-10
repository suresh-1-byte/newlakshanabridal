import { FiMessageCircle } from "react-icons/fi";

export function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/919445572770"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp Lakshana"
      className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-[0_0_40px_rgba(37,211,102,0.5)] hover:scale-110 transition-transform"
      data-cursor="hover"
    >
      <FiMessageCircle className="text-2xl" />
    </a>
  );
}
