import React, { useState, useEffect } from "react";
import { Sun, Moon, Menu, X, ArrowRight, Camera } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface NavbarProps {
  onAdminClick: () => void;
  bookingsCount: number;
  isLight: boolean;
  onToggleTheme: () => void;
}

export function Navbar({ onAdminClick, bookingsCount, isLight, onToggleTheme }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Packages", href: "packages" },
    { label: "Gear", href: "rentals" },
    { label: "Portfolio", href: "portfolio" },
    { label: "Contact", href: "contact" },
  ];

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 80);
  };

  const pillBg = scrolled
    ? isLight
      ? "bg-white/70 backdrop-blur-2xl border-white/40 shadow-sm"
      : "bg-[#0a0a0a]/70 backdrop-blur-2xl border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
    : "bg-transparent border-transparent shadow-none backdrop-blur-none";

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 120, damping: 22 }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4"
    >
      <div className={`flex items-center justify-between py-2 rounded-2xl border w-full max-w-3xl transition-all duration-500 ${pillBg}`}>

        {/* Brand */}
        <a href="#" className="flex items-center gap-3 pl-3 pr-4 group min-w-0" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
          <div className={`relative w-8 h-8 rounded-full overflow-hidden flex items-center justify-center shrink-0 transition-transform duration-500 group-hover:scale-110 ${isLight ? "bg-black" : "bg-white"}`}>
            <span className={`relative z-10 font-serif font-bold text-xs tracking-tighter ${isLight ? "text-white" : "text-black"}`}>1FS</span>
          </div>
          <span className={`font-sans font-bold tracking-tight text-sm sm:text-base hidden sm:block ${isLight ? "text-black" : "text-white"}`}>
            1FS Photography
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-0.5">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className={`relative px-4 py-2 rounded-xl text-xs font-sans font-semibold tracking-wide transition-all duration-200 hover:scale-105 ${
                isLight
                  ? "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
                  : "text-gray-400 hover:text-white hover:bg-white/10"
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-1.5 pr-1">
          {/* Theme Toggle */}
          <button
            onClick={onToggleTheme}
            aria-label="Toggle theme"
            className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 ${
              isLight ? "bg-gray-100 text-gray-600 hover:bg-gray-200" : "bg-white/8 text-gray-300 hover:bg-white/15"
            }`}
          >
            <AnimatePresence mode="wait">
              {isLight ? (
                <motion.div key="moon" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <Moon className="w-4 h-4" />
                </motion.div>
              ) : (
                <motion.div key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <Sun className="w-4 h-4" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>

          {/* Admin button */}
          <button
            onClick={onAdminClick}
            className={`hidden sm:flex items-center gap-2 px-4 h-9 rounded-xl text-xs font-sans font-bold tracking-wide transition-all duration-200 hover:scale-105 ${
              isLight ? "bg-gray-900 text-white hover:bg-black" : "bg-white text-black hover:bg-gray-100"
            }`}
          >
            <span>Admin</span>
            {bookingsCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center">
                {bookingsCount}
              </span>
            )}
          </button>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle mobile menu"
            className={`md:hidden w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
              isLight ? "bg-gray-100 text-gray-800 hover:bg-gray-200" : "bg-white/10 text-white hover:bg-white/15"
            }`}
          >
            <AnimatePresence mode="wait">
              {mobileOpen ? (
                <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                  <X className="w-4 h-4" />
                </motion.div>
              ) : (
                <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                  <Menu className="w-4 h-4" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            className={`absolute top-[4.5rem] left-4 right-4 rounded-2xl p-2 shadow-xl border backdrop-blur-3xl md:hidden z-40 ${
              isLight ? "bg-white/95 border-gray-200" : "bg-[#111]/95 border-white/10"
            }`}
          >
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className={`w-full text-left px-5 py-3.5 rounded-xl text-base font-sans font-semibold tracking-tight transition-all ${
                    isLight ? "text-gray-800 hover:bg-gray-100" : "text-white hover:bg-white/10"
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <div className={`h-px w-full my-1.5 ${isLight ? "bg-gray-100" : "bg-white/10"}`} />
              <button
                onClick={() => { onAdminClick(); setMobileOpen(false); }}
                className={`flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-base font-sans font-bold transition-all ${
                  isLight ? "bg-gray-900 text-white" : "bg-white text-black"
                }`}
              >
                <Camera className="w-4 h-4" />
                Admin Access
                {bookingsCount > 0 && (
                  <span className="ml-1 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
                    {bookingsCount}
                  </span>
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
