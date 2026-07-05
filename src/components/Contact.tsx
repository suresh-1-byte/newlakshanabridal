import { useState } from "react";
import { FiMapPin, FiPhone, FiMail, FiInstagram, FiMessageCircle, FiSend } from "react-icons/fi";
import { useReveal } from "../hooks/useReveal";
import { firebaseApi } from "../lib/firebaseApi";
import { toast } from "sonner";

// Per-icon brand colours applied on hover
const contactItems = [
  {
    I: FiMapPin,
    l: "Studio",
    v: "12, Anna Nagar Main Road,\nMogappair, Chennai 600037",
    hoverBg: "#34A853",      // Google Maps green
    hoverText: "#fff",
  },
  {
    I: FiPhone,
    l: "Phone",
    v: "+91 98765 43210",
    hoverBg: "#4CAF50",      // Phone green
    hoverText: "#fff",
  },
  {
    I: FiMail,
    l: "Email",
    v: "hello@lakshanabridal.com",
    hoverBg: "#EA4335",      // Gmail red
    hoverText: "#fff",
  },
  {
    I: FiInstagram,
    l: "Instagram",
    v: "@lakshana.bridal",
    hoverBg: "#E1306C",      // Instagram pink
    hoverText: "#fff",
  },
  {
    I: FiMessageCircle,
    l: "WhatsApp",
    v: "+91 98765 43210",
    hoverBg: "#25D366",      // WhatsApp green
    hoverText: "#fff",
  },
];

function ContactField({
  label,
  type = "text",
  name,
  as,
  required = false,
}: {
  label: string;
  type?: string;
  name: string;
  as?: "textarea";
  required?: boolean;
}) {
  const [val, setVal] = useState("");
  const [focus, setFocus] = useState(false);
  const active = focus || val.length > 0;
  
  return (
    <div className="relative pt-6">
      <label
        className={`absolute left-0 pointer-events-none transition-all duration-300 tracking-[0.2em] uppercase ${
          active ? "top-0 text-[10px] text-[#d4af37]" : "top-8 text-xs text-[#f8f5f0]/50"
        }`}
      >
        {label} {required && "*"}
      </label>
      {as === "textarea" ? (
        <textarea
          name={name}
          value={val}
          rows={4}
          onChange={(e) => setVal(e.target.value)}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          required={required}
          className="w-full bg-transparent border-b border-[#f8f5f0]/15 focus:border-[#d4af37] py-3 text-[#f8f5f0] outline-none resize-none transition-colors"
        />
      ) : (
        <input
          name={name}
          type={type}
          value={val}
          onChange={(e) => setVal(e.target.value)}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          required={required}
          className="w-full bg-transparent border-b border-[#f8f5f0]/15 focus:border-[#d4af37] py-3 text-[#f8f5f0] outline-none transition-colors"
        />
      )}
    </div>
  );
}

export function Contact() {
  const titleRef = useReveal<HTMLHeadingElement>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      subject: formData.get('subject') as string,
      message: formData.get('message') as string,
      serviceInterested: formData.get('service') as string || undefined,
    };

    try {
      console.log('📧 Submitting enquiry:', data);
      const response = await firebaseApi.createContact(data);
      
      if (response.success) {
        toast.success(response.message || '✅ Thank you! We will contact you within 24 hours.');
        (e.target as HTMLFormElement).reset();
        
        // Send to Google Sheets
        try {
          await sendToGoogleSheets('enquiry', {
            name: data.name,
            email: data.email,
            phone: data.phone,
            subject: data.subject,
            serviceInterested: data.serviceInterested || 'N/A',
            message: data.message,
            status: 'new',
            createdAt: new Date().toISOString(),
          });
        } catch (sheetError) {
          console.error('Google Sheets error (non-critical):', sheetError);
          // Don't show error to user - data is already saved in Firebase
        }
      } else {
        toast.error(response.message || '❌ Failed to submit. Please try again.');
      }
    } catch (error) {
      console.error('Enquiry submission error:', error);
      toast.error('❌ Failed to submit enquiry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative bg-[#141414] py-32 md:py-40">
      <div className="max-w-[1500px] mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <span className="eyebrow justify-center">Get In Touch</span>
          <h2
            ref={titleRef}
            className="fade-up mt-6 font-display text-5xl md:text-7xl leading-[1.05]"
          >
            Contact <em className="italic font-light text-[#d4af37]">Lakshana</em>.
          </h2>
        </div>

        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5 space-y-10">
            <div>
              <h3 className="text-[#d4af37] text-sm tracking-[0.3em] uppercase mb-6">Visit Us</h3>
              {contactItems.map((c) => (
                <div key={c.l} className="flex gap-6 group mb-6">
                  <span
                    className="w-12 h-12 border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37] shrink-0 transition-all duration-500"
                    style={{
                      ["--hover-bg" as string]: c.hoverBg,
                      ["--hover-text" as string]: c.hoverText,
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.backgroundColor = c.hoverBg;
                      (e.currentTarget as HTMLElement).style.color = c.hoverText;
                      (e.currentTarget as HTMLElement).style.borderColor = c.hoverBg;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.backgroundColor = "";
                      (e.currentTarget as HTMLElement).style.color = "";
                      (e.currentTarget as HTMLElement).style.borderColor = "";
                    }}
                  >
                    <c.I />
                  </span>
                  <div>
                    <div className="text-[10px] tracking-[0.4em] uppercase text-[#d4af37]/80 mb-1">{c.l}</div>
                    <div className="text-[#f8f5f0]/85 whitespace-pre-line leading-relaxed">{c.v}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-8 border-t border-[#d4af37]/20">
              <h3 className="text-[#d4af37] text-sm tracking-[0.3em] uppercase mb-4">Location</h3>
              <div className="h-[300px] border border-[#d4af37]/20 overflow-hidden">
                <iframe
                  title="Lakshana Studio Map"
                  className="w-full h-full grayscale contrast-125 brightness-75"
                  loading="lazy"
                  src="https://www.google.com/maps?q=Mogappair,Chennai&output=embed"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="glass p-8 md:p-12 space-y-2"
            >
              <h3 className="text-[#d4af37] text-sm tracking-[0.3em] uppercase mb-8">Send Enquiry</h3>
              
              <div className="grid md:grid-cols-2 gap-x-10 gap-y-2">
                <ContactField label="Full Name" name="name" required />
                <ContactField label="Phone Number" name="phone" type="tel" required />
                <ContactField label="Email Address" name="email" type="email" required />
                <ContactField label="Subject" name="subject" />
              </div>
              
              <ContactField label="Interested Service (Optional)" name="service" />
              <ContactField label="Your Message" name="message" as="textarea" required />
              
              <button 
                type="submit" 
                className="btn-gold mt-10 inline-flex items-center gap-3"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="animate-spin">⏳</span>
                    Sending...
                  </>
                ) : (
                  <>
                    <FiSend />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

// Google Sheets integration helper
async function sendToGoogleSheets(type: 'booking' | 'enquiry', data: any) {
  const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL'; // We'll add this later
  
  if (!GOOGLE_SCRIPT_URL || GOOGLE_SCRIPT_URL === 'YOUR_GOOGLE_APPS_SCRIPT_URL') {
    console.log('⚠️ Google Sheets integration not configured yet');
    return;
  }
  
  try {
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ type, data }),
    });
    console.log('✅ Sent to Google Sheets');
  } catch (error) {
    console.error('Google Sheets error:', error);
    throw error;
  }
}
