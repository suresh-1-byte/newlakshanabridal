import { useState } from "react";
import { FiPhone, FiMessageCircle, FiCalendar } from "react-icons/fi";
import { useReveal } from "../hooks/useReveal";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { firebaseApi } from "../lib/firebaseApi";
import { toast } from "sonner";

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

function Field({
  label,
  type = "text",
  name,
  as,
  options,
}: {
  label: string;
  type?: string;
  name: string;
  as?: "select" | "textarea";
  options?: string[];
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
        {label}
      </label>
      {as === "select" ? (
        <select
          name={name}
          value={val}
          onChange={(e) => setVal(e.target.value)}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          className="w-full bg-transparent border-b border-[#f8f5f0]/15 focus:border-[#d4af37] py-3 text-[#f8f5f0] outline-none transition-colors appearance-none"
        >
          <option value="" className="bg-[#0d0d0d]"></option>
          {options?.map((o) => (
            <option key={o} value={o} className="bg-[#0d0d0d]">
              {o}
            </option>
          ))}
        </select>
      ) : as === "textarea" ? (
        <textarea
          name={name}
          value={val}
          rows={3}
          onChange={(e) => setVal(e.target.value)}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
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
          className="w-full bg-transparent border-b border-[#f8f5f0]/15 focus:border-[#d4af37] py-3 text-[#f8f5f0] outline-none transition-colors"
        />
      )}
    </div>
  );
}

function DateField({ label, name }: { label: string; name: string }) {
  const [selected, setSelected] = useState<Date | undefined>();
  const [open, setOpen] = useState(false);
  const [focus, setFocus] = useState(false);
  const active = focus || selected !== undefined;

  return (
    <div className="relative pt-6">
      <label
        className={`absolute left-0 pointer-events-none transition-all duration-300 tracking-[0.2em] uppercase ${
          active ? "top-0 text-[10px] text-[#d4af37]" : "top-8 text-xs text-[#f8f5f0]/50"
        }`}
      >
        {label}
      </label>
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          className="w-full bg-transparent border-b border-[#f8f5f0]/15 focus:border-[#d4af37] py-3 text-[#f8f5f0] outline-none transition-colors text-left flex items-center justify-between"
        >
          <span>{selected ? selected.toLocaleDateString() : ""}</span>
          <FiCalendar className="text-[#d4af37]" />
        </button>
        <input type="hidden" name={name} value={selected?.toISOString()} />
        {open && (
          <div className="absolute top-full left-0 z-50 mt-2 bg-[#141414] border border-[#d4af37]/30 p-4 shadow-2xl">
            <DayPicker
              mode="single"
              selected={selected}
              onSelect={(date) => {
                setSelected(date);
                setOpen(false);
              }}
              classNames={{
                months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                month: "space-y-4",
                caption: "flex justify-center pt-1 relative items-center",
                caption_label: "text-sm font-medium text-[#f8f5f0]",
                nav: "space-x-1 flex items-center",
                nav_button: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 text-[#f8f5f0]",
                nav_button_previous: "absolute left-1",
                nav_button_next: "absolute right-1",
                table: "w-full border-collapse space-y-1",
                head_row: "flex",
                head_cell: "text-[#d4af37] rounded-md w-9 font-normal text-[0.8rem]",
                row: "flex w-full mt-2",
                cell: "text-center text-sm p-0 relative [&:has([disabled])]:opacity-50",
                day: "h-9 w-9 p-0 font-normal text-[#f8f5f0] hover:bg-[#d4af37] hover:text-[#0d0d0d] rounded-md transition-colors",
                day_selected: "bg-[#d4af37] text-[#0d0d0d] hover:bg-[#d4af37] hover:text-[#0d0d0d]",
                day_today: "text-[#d4af37]",
                day_outside: "text-[#f8f5f0]/30",
                day_disabled: "text-[#f8f5f0]/30",
                day_range_middle: "aria-selected:bg-[#d4af37]/20 aria-selected:text-[#f8f5f0]",
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export function Book() {
  const titleRef = useReveal<HTMLHeadingElement>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      phone: formData.get('phone'),
      email: formData.get('email'),
      service: formData.get('service'),
      preferredDate: formData.get('date'),
      message: formData.get('message'),
    };

    try {
      console.log('📅 Submitting booking:', data);
      const response = await firebaseApi.createBooking(data);
      
      if (response.success) {
        toast.success(response.message || '✅ Booking request submitted successfully!');
        (e.target as HTMLFormElement).reset();
        
        // Send to Google Sheets
        try {
          await sendToGoogleSheets('booking', {
            bookingId: response.data?.bookingReference || 'N/A',
            customerName: data.name,
            phone: data.phone,
            email: data.email,
            service: data.service,
            date: data.preferredDate ? new Date(data.preferredDate as string).toLocaleDateString() : 'N/A',
            time: '10:00 AM', // Default time
            message: data.message,
            status: 'pending',
            amount: 0,
            createdAt: new Date().toISOString(),
          });
        } catch (sheetError) {
          console.error('Google Sheets error (non-critical):', sheetError);
          // Don't show error to user - data is already saved in Firebase
        }
      } else {
        toast.error(response.message || '❌ Failed to submit booking request');
      }
    } catch (error) {
      console.error('Booking submission error:', error);
      toast.error('❌ Failed to submit booking request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="book" className="relative bg-[#0d0d0d] py-32 md:py-48 overflow-hidden">
      <div className="max-w-[1500px] mx-auto px-6 md:px-12 grid lg:grid-cols-12 gap-16">
        <div className="lg:col-span-5">
          <span className="eyebrow">Reserve Your Date</span>
          <h2
            ref={titleRef}
            className="fade-up mt-6 font-display text-5xl md:text-6xl leading-[1.05]"
          >
            Begin your <em className="italic font-light text-[#d4af37]">Lakshana</em> experience.
          </h2>
          <p className="mt-8 text-[#f8f5f0]/65 leading-relaxed max-w-md">
            Tell us about your wedding. A senior consultant will personally reach
            out within 24 hours to design your bridal journey.
          </p>
          <div className="mt-12 space-y-6">
            <a
              href="tel:+919876543210"
              className="flex items-center gap-4 group"
              data-cursor="hover"
            >
              <span className="w-10 h-10 border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37] group-hover:bg-[#d4af37] group-hover:text-[#0d0d0d] transition">
                <FiPhone />
              </span>
              <span className="text-[#f8f5f0]/80 group-hover:text-[#d4af37] transition">+91 98765 43210</span>
            </a>
            <a
              href="https://wa.me/919876543210"
              className="flex items-center gap-4 group"
              data-cursor="hover"
            >
              <span className="w-10 h-10 border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37] group-hover:bg-[#d4af37] group-hover:text-[#0d0d0d] transition">
                <FiMessageCircle />
              </span>
              <span className="text-[#f8f5f0]/80 group-hover:text-[#d4af37] transition">WhatsApp Concierge</span>
            </a>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="lg:col-span-7 glass p-8 md:p-12 space-y-2"
        >
          <div className="grid md:grid-cols-2 gap-x-10 gap-y-2">
            <Field label="Full Name" name="name" />
            <Field label="Phone" name="phone" type="tel" />
            <Field
              label="Service"
              name="service"
              as="select"
              options={[
                "Bridal Makeup",
                "Reception",
                "Engagement",
                "Hair Styling",
                "Skin Therapy",
                "Saree Draping",
                "Academy Enrolment",
              ]}
            />
            <DateField label="Preferred Date" name="date" />
          </div>
          <Field label="Tell us about your wedding" name="message" as="textarea" />
          <button 
            type="submit" 
            className="btn-gold mt-10"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Request Consultation'}
          </button>
        </form>
      </div>
    </section>
  );
}
