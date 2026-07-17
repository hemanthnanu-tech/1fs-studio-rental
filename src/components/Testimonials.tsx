import React from "react";
import { motion } from "motion/react";
import { Star, Quote } from "lucide-react";

interface TestimonialsProps {
  isLight: boolean;
}

const TESTIMONIALS = [
  {
    name: "Ananya Rao",
    role: "Content Creator",
    text: "Renting gear from 1FS was the smoothest experience! The Sony A7 IV was in pristine condition, and Darshan's advice on lenses saved my shoot.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150"
  },
  {
    name: "Rahul M",
    role: "Groom-to-be",
    text: "We booked them for our pre-wedding cinematic shoot. The team's vision and final color grading left us speechless. Highly recommend 1FS Studio!",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150"
  },
  {
    name: "Priya Shetty",
    role: "New Mother",
    text: "The baby photoshoot was handled with such care. The studio was hygienic, the props were adorable, and the photos are absolutely priceless.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150"
  }
];

export function Testimonials({ isLight }: TestimonialsProps) {
  return (
    <section className={`py-20 sm:py-28 border-t relative overflow-hidden transition-colors duration-500 ${
      isLight ? "bg-gray-50 border-gray-100" : "bg-[#080808] border-white/5"
    }`}>
      {/* Background glow */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full blur-[120px] pointer-events-none opacity-30 ${
        isLight ? "bg-purple-100" : "bg-purple-950"
      }`} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-14 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className={`inline-flex items-center gap-3 mb-5`}>
              <span className={`w-8 h-px ${isLight ? "bg-gray-300" : "bg-white/20"}`} />
              <span className={`text-[10px] uppercase tracking-[0.2em] font-mono font-bold ${isLight ? "text-gray-400" : "text-gray-500"}`}>
                Client Stories
              </span>
              <span className={`w-8 h-px ${isLight ? "bg-gray-300" : "bg-white/20"}`} />
            </div>
            <h2 className={`text-3xl sm:text-5xl font-serif font-black leading-tight tracking-tight ${isLight ? "text-gray-900" : "text-white"}`}>
              Loved by{" "}
              <span className={`italic font-light ${isLight ? "text-purple-600" : "text-gray-400"}`}>Creators</span>
            </h2>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {TESTIMONIALS.map((testimonial, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
              className={`p-7 rounded-3xl border relative flex flex-col transition-all hover:scale-[1.02] hover:shadow-xl ${
                isLight
                  ? "bg-white border-gray-100 shadow-sm hover:border-gray-200"
                  : "bg-[#111] border-white/8 hover:border-white/15"
              }`}
            >
              <Quote className={`absolute top-6 right-6 w-8 h-8 opacity-8 ${isLight ? "text-gray-400" : "text-white"}`} />

              {/* Stars */}
              <div className="flex items-center gap-0.5 mb-5">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              <p className={`text-sm sm:text-base leading-relaxed mb-8 flex-1 ${isLight ? "text-gray-600" : "text-gray-300"}`}>
                "{testimonial.text}"
              </p>

              <div className="flex items-center gap-3">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className={`w-11 h-11 rounded-full object-cover border-2 ${isLight ? "border-gray-200" : "border-white/10"}`}
                />
                <div>
                  <h4 className={`text-sm font-bold font-sans leading-tight ${isLight ? "text-gray-900" : "text-white"}`}>
                    {testimonial.name}
                  </h4>
                  <span className={`text-[11px] uppercase tracking-wider font-mono ${isLight ? "text-gray-400" : "text-gray-500"}`}>
                    {testimonial.role}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
