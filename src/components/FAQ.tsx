import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, MessageCircle } from "lucide-react";

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
    answer: "Yes, a refundable security deposit is required for all gear rentals. The deposit amount varies based on the total value of the equipment rented and is fully refunded upon the safe return of the gear in original condition."
  },
  {
    question: "How do photoshoot bookings work?",
    answer: "You can reserve a photoshoot slot directly through our website. Once you request a booking, our team will review the details and contact you via WhatsApp to finalize the itinerary, themes, and a 30% advance payment to confirm the slot."
  },
  {
    question: "Can I cancel or reschedule my booking?",
    answer: "Cancellations made 48 hours prior to the booking slot are eligible for a full refund of the advance. Cancellations within 48 hours are non-refundable. Rescheduling is subject to calendar availability."
  },
  {
    question: "Do you offer same-day camera rentals?",
    answer: "Yes! We offer same-day rentals subject to gear availability. Call us or WhatsApp us directly and we'll confirm within 30 minutes if your desired equipment is available for your date."
  },
  {
    question: "What is included in a photoshoot package?",
    answer: "Every package includes a professional photographer, studio or outdoor session (as per your theme), edited images delivered digitally, and a brief pre-shoot consultation. Premium and Cinematic tiers also include video highlights."
  }
];

export function FAQ({ isLight }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className={`py-20 sm:py-28 border-t relative overflow-hidden transition-colors duration-500 ${
      isLight ? "bg-white border-gray-100" : "bg-[#050505] border-white/5"
    }`}>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-6 ${
              isLight ? "border-gray-200 bg-gray-50 text-gray-500" : "border-white/10 bg-white/5 text-gray-400"
            }`}>
              <MessageCircle className="w-3.5 h-3.5" />
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest">Got Questions?</span>
            </div>
            <h2 className={`text-3xl sm:text-4xl font-serif font-black leading-tight tracking-tight ${isLight ? "text-gray-900" : "text-white"}`}>
              Frequently Asked
              <br />
              <span className={`italic font-light ${isLight ? "text-gray-400" : "text-gray-500"}`}>Questions</span>
            </h2>
          </motion.div>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.07 }}
                whileHover={{ scale: 1.01, transition: { type: "spring", stiffness: 400, damping: 28 } }}
                className={`rounded-2xl border overflow-hidden transition-all duration-300 ${
                  isLight
                    ? `bg-white border-gray-200 ${isOpen ? "shadow-md" : "shadow-sm"}`
                    : `bg-[#111] border-white/8 ${isOpen ? "border-white/15" : ""}`
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className={`w-full px-6 py-5 text-left flex items-center justify-between gap-4 transition-colors ${
                    isLight ? "hover:bg-gray-50" : "hover:bg-white/5"
                  }`}
                >
                  <span className={`text-sm font-semibold font-sans leading-snug ${isLight ? "text-gray-900" : "text-white"}`}>
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="shrink-0"
                  >
                    <ChevronDown className={`w-4 h-4 ${isLight ? "text-gray-400" : "text-gray-500"}`} />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className={`px-6 pb-6 pt-0 text-sm leading-relaxed ${isLight ? "text-gray-500" : "text-gray-400"}`}>
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className={`mt-10 p-6 rounded-3xl border text-center ${
            isLight ? "bg-gray-50 border-gray-200" : "bg-white/3 border-white/8"
          }`}
        >
          <p className={`text-sm mb-4 ${isLight ? "text-gray-500" : "text-gray-400"}`}>
            Still have questions? We're happy to help.
          </p>
          <a
            href="https://wa.me/917795849384"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold font-sans transition-all hover:scale-105 ${
              isLight ? "bg-gray-900 text-white hover:bg-black" : "bg-white text-black hover:bg-gray-100"
            }`}
          >
            <MessageCircle className="w-4 h-4" />
            Chat on WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
}
