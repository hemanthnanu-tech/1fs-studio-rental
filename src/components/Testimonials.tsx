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
    text: "The baby photoshoot was handled with such care. The studio was hygienic, and the props were adorable. Best memories captured forever.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150"
  }
];

export function Testimonials({ isLight }: TestimonialsProps) {
  const bgClass = isLight ? "bg-[#FFFFFF]" : "bg-[#09090B]";
  const textClass = isLight ? "text-[#171717]" : "text-[#FAFAFA]";
  const subTextClass = isLight ? "text-[#71717A]" : "text-[#A1A1AA]";
  const borderClass = isLight ? "border-[#E4E4E7]" : "border-[#52525B]/12";
  const cardBgClass = isLight ? "bg-[#F4F4F5]" : "bg-[#09090B]";

  return (
    <section className={`py-16 sm:py-24 border-t relative overflow-hidden transition-colors duration-500 ${bgClass} ${borderClass}`}>
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#52525B]/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <span className={`text-[10px] uppercase tracking-widest font-mono font-bold flex items-center justify-center gap-2 mb-3 ${isLight ? "text-[#71717A]" : "text-[#A1A1AA]"}`}>
            <span className="w-6 h-px bg-gradient-to-r from-[#52525B] to-[#71717A]" />
            Client Stories
            <span className="w-6 h-px bg-gradient-to-l from-[#52525B] to-[#71717A]" />
          </span>
          <h2 className={`text-3xl sm:text-4xl md:text-5xl font-serif font-black leading-tight ${textClass}`}>
            Loved by <span className="text-gradient-ocean">Creators</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {TESTIMONIALS.map((testimonial, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className={`p-6 sm:p-8 rounded-2xl border relative ${cardBgClass} ${borderClass}`}
            >
              <Quote className={`absolute top-6 right-6 w-8 h-8 opacity-10 ${isLight ? "text-[#52525B]" : "text-[#A1A1AA]"}`} />
              
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#C5A880] text-[#C5A880]" />
                ))}
              </div>
              
              <p className={`text-sm leading-relaxed mb-6 italic ${subTextClass}`}>
                "{testimonial.text}"
              </p>
              
              <div className="flex items-center gap-4">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-[#52525B]/20"
                />
                <div>
                  <h4 className={`text-sm font-bold font-serif ${textClass}`}>{testimonial.name}</h4>
                  <span className={`text-[10px] uppercase tracking-wider font-mono ${isLight ? "text-[#52525B]" : "text-[#A1A1AA]"}`}>
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
