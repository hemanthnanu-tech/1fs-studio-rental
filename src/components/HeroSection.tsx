import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Camera, ChevronDown, Sparkles, ArrowRight } from "lucide-react";
import { STUDIO_STATISTICS } from "../data";

interface HeroSectionProps {
  isLight: boolean;
}

const STATS = [
  { value: "500+", label: "Shoots Delivered" },
  { value: "4K", label: "Production Grade" },
  { value: "4.9★", label: "Client Rating" },
];

export function HeroSection({ isLight }: HeroSectionProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const parallaxOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const parallaxScale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMouseX(((e.clientX - rect.left) / rect.width - 0.5) * 30);
    setMouseY(((e.clientY - rect.top) / rect.height - 0.5) * 30);
  };

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div
      ref={heroRef}
      onMouseMove={handleMouseMove}
      className={`relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 py-24 transition-colors duration-700 ${
        isLight ? "bg-[#F9F9F9]" : "bg-black"
      }`}
    >
      {/* Dynamic Mesh Gradient Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ x: [0, 50, 0], y: [0, -40, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full blur-[120px] mix-blend-screen opacity-50"
          style={{ background: "radial-gradient(circle, var(--ori-accent) 0%, transparent 70%)" }}
        />
        <motion.div
          animate={{ x: [0, -50, 0], y: [0, 40, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full blur-[140px] mix-blend-screen opacity-40"
          style={{ background: "radial-gradient(circle, var(--ori-accent-2) 0%, transparent 70%)" }}
        />
      </div>

      {/* Grid Overlay */}
      <div className={`absolute inset-0 pointer-events-none opacity-20 ${isLight ? "bg-ocean-grid-light" : "bg-ocean-grid"}`} style={{ maskImage: "radial-gradient(circle at center, black, transparent 80%)" }} />

      {/* Main Content */}
      <motion.div
        style={{ y: parallaxY, opacity: parallaxOpacity, scale: parallaxScale }}
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
        }}
        className="max-w-6xl w-full text-center relative z-10 flex flex-col items-center px-4 mt-12"
      >
        <motion.div variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 60, damping: 20 } } }}>
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border backdrop-blur-md mb-8 ${isLight ? "border-black/10 bg-black/5" : "border-white/10 bg-white/5"}`}>
            <span className="w-2 h-2 rounded-full bg-[var(--ori-accent)] animate-pulse" />
            <span className={`text-xs font-sans font-bold uppercase tracking-widest ${isLight ? "text-black" : "text-white"}`}>Professional Gear & Studio</span>
          </div>
          
          <h1 className={`fluid-text-h1 font-serif font-bold tracking-tighter ${isLight ? "text-black" : "text-white"}`}
              style={{ transform: `translate(${mouseX * -0.2}px, ${mouseY * -0.2}px)` }}>
            SHOOT <span className="text-[var(--ori-accent-2)] italic font-light">BEYOND</span>
            <br />
            LIMITS.
          </h1>

          <p className={`mt-6 sm:mt-8 text-sm sm:text-base md:text-xl max-w-2xl mx-auto font-sans font-medium leading-relaxed ${isLight ? "text-gray-600" : "text-gray-400"}`}>
            Uncompromising professional photography storytellers & ultra-flexible camera rentals. 
            Rent expert equipment instantly and capture unforgettable moments.
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
          className="mt-12 flex flex-col sm:flex-row gap-4 w-full sm:w-auto items-center justify-center"
        >
          <button
            onClick={() => scrollTo("packages")}
            className={`group px-8 h-14 rounded-full font-sans font-bold text-sm tracking-wide flex items-center justify-center gap-3 shadow-[0_8px_30px_rgba(128,0,255,0.3)] hover:scale-105 transition-all ${isLight ? "bg-black text-white" : "bg-white text-black"}`}
          >
            <Sparkles className={`w-4 h-4 ${isLight ? "text-[var(--ori-accent)]" : "text-[var(--ori-accent-2)]"}`} />
            Book Photoshoot
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => scrollTo("rentals")}
            className={`group px-8 h-14 border rounded-full font-sans font-bold text-sm tracking-wide flex items-center justify-center gap-3 backdrop-blur-md transition-all ${isLight ? "border-black/20 hover:bg-black/5 text-black" : "border-white/20 hover:bg-white/5 text-white"}`}
          >
            <Camera className={`w-4 h-4 ${isLight ? "text-black" : "text-white"}`} />
            <span>Rent Camera Gear</span>
          </button>
        </motion.div>

        {/* Stats Bento Cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 flex flex-wrap justify-center gap-4 w-full max-w-4xl mx-auto"
        >
          {STATS.map(({ value, label }, i) => (
            <div
              key={i}
              className={`flex-1 min-w-[150px] p-6 rounded-3xl border backdrop-blur-xl shadow-lg flex flex-col items-center justify-center hover:scale-105 transition-transform cursor-default ${isLight ? "border-black/5 bg-white/40" : "border-white/10 bg-black/40"}`}
            >
              <span className={`text-3xl md:text-4xl font-serif font-bold ${isLight ? "text-black" : "text-white"}`}>{value}</span>
              <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-gray-500 mt-2">{label}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer z-10"
        onClick={() => scrollTo("packages")}
      >
        <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-gray-500">Scroll</span>
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center p-1">
          <motion.div 
            animate={{ y: [0, 12, 0] }} 
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }} 
            className="w-1.5 h-1.5 bg-gray-400 rounded-full" 
          />
        </div>
      </div>
    </div>
  );
}
