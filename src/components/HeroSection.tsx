import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Camera, Sparkles, ArrowRight } from "lucide-react";

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
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const parallaxOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const parallaxScale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMouseX(((e.clientX - rect.left) / rect.width - 0.5) * 20);
    setMouseY(((e.clientY - rect.top) / rect.height - 0.5) * 20);
  };

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div
      ref={heroRef}
      onMouseMove={handleMouseMove}
      className={`relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 py-24 transition-colors duration-700 ${
        isLight ? "bg-light-mesh" : "bg-[#050505]"
      }`}
    >
      {/* Animated Mesh Gradient Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ x: [0, 60, 0], y: [0, -40, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-15%] left-[-10%] w-[55vw] h-[55vw] rounded-full blur-[100px] opacity-30"
          style={{ background: isLight
            ? "radial-gradient(circle, #a78bfa 0%, transparent 70%)"
            : "radial-gradient(circle, var(--ori-accent) 0%, transparent 70%)" }}
        />
        <motion.div
          animate={{ x: [0, -40, 0], y: [0, 50, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute bottom-[-15%] right-[-10%] w-[60vw] h-[60vw] rounded-full blur-[120px] opacity-25"
          style={{ background: isLight
            ? "radial-gradient(circle, #f0abfc 0%, transparent 70%)"
            : "radial-gradient(circle, var(--ori-accent-2) 0%, transparent 70%)" }}
        />
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 6 }}
          className="absolute top-[40%] left-[30%] w-[30vw] h-[30vw] rounded-full blur-[80px] opacity-20"
          style={{ background: isLight
            ? "radial-gradient(circle, #93c5fd 0%, transparent 70%)"
            : "radial-gradient(circle, #E2FF3D55 0%, transparent 70%)" }}
        />
      </div>

      {/* Subtle grid overlay */}
      <div
        className={`absolute inset-0 pointer-events-none ${isLight ? "bg-ocean-grid-light opacity-30" : "bg-ocean-grid opacity-20"}`}
        style={{ maskImage: "radial-gradient(circle at center, black 30%, transparent 75%)" }}
      />

      {/* Main Content */}
      <motion.div
        style={{ y: parallaxY, opacity: parallaxOpacity, scale: parallaxScale }}
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.15 } }
        }}
        className="max-w-5xl w-full text-center relative z-10 flex flex-col items-center mt-16"
      >
        {/* Badge */}
        <motion.div variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80, damping: 18 } } }}>
          <div className={`inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border backdrop-blur-md mb-10 ${
            isLight ? "border-purple-200 bg-purple-50/80 shadow-sm" : "border-white/10 bg-white/5"
          }`}>
            <span className="w-2 h-2 rounded-full bg-[var(--ori-accent)] animate-pulse" />
            <span className={`text-xs font-sans font-bold uppercase tracking-widest ${isLight ? "text-purple-700" : "text-gray-300"}`}>
              Bengaluru's Premium Studio
            </span>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.div
          variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 60, damping: 20 } } }}
          style={{ transform: `translate(${mouseX * -0.15}px, ${mouseY * -0.15}px)` }}
        >
          <h1 className={`fluid-text-h1 font-serif font-black tracking-tighter leading-[0.92] ${isLight ? "text-gray-900" : "text-white"}`}>
            SHOOT{" "}
            <span className={`italic font-light ${isLight ? "text-purple-600" : "text-[var(--ori-accent-2)]"}`}>
              BEYOND
            </span>
            <br />
            LIMITS.
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80, damping: 20 } } }}
          className={`mt-8 text-base sm:text-lg max-w-xl mx-auto font-sans font-medium leading-relaxed ${isLight ? "text-gray-500" : "text-gray-400"}`}
        >
          Professional photography storytellers & ultra-flexible camera rentals.
          Rent expert equipment instantly and capture unforgettable moments.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { delay: 0.1 } } }}
          className="mt-12 flex flex-col sm:flex-row gap-4 w-full sm:w-auto items-center justify-center"
        >
          <button
            onClick={() => scrollTo("packages")}
            className={`group w-full sm:w-auto px-8 h-14 rounded-full font-sans font-bold text-sm tracking-wide flex items-center justify-center gap-3 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 ${
              isLight
                ? "bg-gray-900 text-white shadow-gray-900/20 hover:bg-black"
                : "bg-white text-black hover:bg-gray-100"
            }`}
          >
            <Sparkles className={`w-4 h-4 ${isLight ? "text-[var(--ori-accent)]" : "text-[var(--ori-accent-2)]"}`} />
            Book Photoshoot
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => scrollTo("rentals")}
            className={`group w-full sm:w-auto px-8 h-14 border rounded-full font-sans font-bold text-sm tracking-wide flex items-center justify-center gap-3 backdrop-blur-sm hover:scale-105 transition-all duration-300 ${
              isLight
                ? "border-gray-300 hover:bg-gray-100 text-gray-800 bg-white/50"
                : "border-white/20 hover:bg-white/10 text-white"
            }`}
          >
            <Camera className="w-4 h-4" />
            <span>Rent Camera Gear</span>
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-20 flex flex-wrap justify-center gap-4 w-full max-w-xl mx-auto"
        >
          {STATS.map(({ value, label }, i) => (
            <div
              key={i}
              className={`flex-1 min-w-[130px] p-5 rounded-3xl border backdrop-blur-xl flex flex-col items-center justify-center hover:scale-105 transition-transform cursor-default ${
                isLight
                  ? "border-gray-200/80 bg-white/60 shadow-sm"
                  : "border-white/10 bg-white/5"
              }`}
            >
              <span className={`text-2xl sm:text-3xl font-serif font-black tracking-tight ${isLight ? "text-gray-900" : "text-white"}`}>{value}</span>
              <span className={`text-[10px] font-sans font-bold uppercase tracking-widest mt-2 ${isLight ? "text-gray-400" : "text-gray-500"}`}>{label}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer z-10"
        onClick={() => scrollTo("packages")}
      >
        <span className={`text-[9px] font-sans font-bold uppercase tracking-[0.2em] ${isLight ? "text-gray-400" : "text-gray-600"}`}>Scroll</span>
        <div className={`w-5 h-9 border-2 rounded-full flex justify-center p-1 ${isLight ? "border-gray-300" : "border-gray-700"}`}>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className={`w-1 h-1 rounded-full ${isLight ? "bg-gray-400" : "bg-gray-600"}`}
          />
        </div>
      </motion.div>
    </div>
  );
}
