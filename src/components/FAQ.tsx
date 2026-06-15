import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, HelpCircle } from "lucide-react";

interface FAQProps {
  isLight: boolean;
}

const FAQS = [
  {
    question: "What documents are required to rent a camera?",
    answer: "We require a valid original government-issued ID (Aadhaar Card, Passport, or Driving License) and a signed rental agreement. For first-time renters, we may also request a recent utility bill for address verification."
  },
  {
    question: "Do you charge a security deposit?",
    answer: "Yes, a refundable security deposit is required for all gear rentals. The deposit amount varies based on the total value of the equipment rented and is fully refunded upon the safe return of the gear."
  },
  {
    question: "How do photoshoot bookings work?",
    answer: "You can reserve a photoshoot slot directly through our website. Once you request a booking, our team will review the details and contact you via WhatsApp to finalize the itinerary, themes, and 30% advance payment to confirm the slot."
  },
  {
    question: "Can I cancel or reschedule my booking?",
    answer: "Cancellations made 48 hours prior to the booking slot are eligible for a full refund of the advance. Cancellations within 48 hours are non-refundable. Rescheduling is subject to calendar availability."
  }
];

export function FAQ({ isLight }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const bgClass = isLight ? "bg-[#FAFAFA]" : "bg-[#09090B]";
  const textClass = isLight ? "text-[#171717]" : "text-[#FAFAFA]";
  const subTextClass = isLight ? "text-[#71717A]" : "text-[#A1A1AA]";
  const borderClass = isLight ? "border-[#E4E4E7]" : "border-[#52525B]/12";
  const itemBgClass = isLight ? "bg-white" : "bg-[#09090B]";

  return (
    <section className={`py-16 sm:py-24 border-t relative overflow-hidden transition-colors duration-500 ${bgClass} ${borderClass}`}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-10 sm:mb-14">
          <span className={`text-[10px] uppercase tracking-widest font-mono font-bold flex items-center justify-center gap-2 mb-3 ${isLight ? "text-[#52525B]" : "text-[#A1A1AA]"}`}>
            <HelpCircle className="w-4 h-4" />
            Got Questions?
          </span>
          <h2 className={`text-3xl sm:text-4xl font-serif font-black leading-tight ${textClass}`}>
            Frequently Asked <span className="text-gradient-ocean">Questions</span>
          </h2>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className={`rounded-2xl border overflow-hidden ${itemBgClass} ${borderClass}`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className={`w-full px-6 py-5 text-left flex items-center justify-between transition-colors ${
                  isLight ? "hover:bg-[#F4F4F5]" : "hover:bg-[#18181B]"
                }`}
              >
                <span className={`text-sm sm:text-base font-semibold font-serif ${textClass}`}>
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === idx ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className={`w-5 h-5 shrink-0 ${isLight ? "text-[#52525B]" : "text-[#A1A1AA]"}`} />
                </motion.div>
              </button>
              
              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className={`px-6 pb-5 pt-1 text-sm leading-relaxed ${subTextClass}`}>
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
