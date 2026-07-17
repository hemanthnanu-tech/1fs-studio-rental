import React, { useState, useEffect } from "react";
import { UserCheck, Sun, Moon, Menu, X, ArrowRight } from "lucide-react";
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
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Packages", href: "#packages" },
    { label: "Gear", href: "#rentals" },
    { label: "Portfolio", href: "#portfolio" },
  ];

  const pillBg = scrolled 
    ? (isLight 
      ? "bg-white/80 border-gray-200 shadow-[0_8px_32px_rgba(0,0,0,0.05)] backdrop-blur-2xl" 
      : "bg-black/80 border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-2xl")
    : "bg-transparent border-transparent shadow-none backdrop-blur-none";

  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className={`fixed top-4 left-0 right-0 z-50 flex justify-center px-4 transition-all duration-500`}
    >
      <div className={`flex items-center justify-between px-2 py-2 rounded-[2rem] border w-full max-w-4xl transition-all duration-500 ${pillBg} ${scrolled ? "py-1.5" : "py-2.5"}`}>
        
        {/* ── Brand Logo ── */}
        <a href="#" className="flex items-center gap-3 pl-3 pr-4 group min-w-0">
          <div className={`relative w-8 h-8 rounded-full overflow-hidden flex items-center justify-center shrink-0 transition-transform duration-500 group-hover:scale-110 ${isLight ? "bg-black" : "bg-white"}`}>
            <span className={`relative z-10 font-serif font-bold text-xs tracking-tighter ${isLight ? "text-white" : "text-black"}`}>1FS</span>
          </div>
          <span className={`font-sans font-bold tracking-tight text-sm sm:text-base hidden sm:block ${isLight ? "text-black" : "text-white"}`}>
            1FS Studio
          </span>
        </a>

        {/* ── Desktop Nav ── */}
        <nav className="hidden md:flex items-center gap-1 bg-black/5 dark:bg-white/5 p-1 rounded-full">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(link.href.slice(1))?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`relative px-4 py-2 rounded-full text-xs font-sans font-bold tracking-wide transition-all duration-300 hover:scale-105 ${
                isLight ? "text-gray-600 hover:text-black hover:bg-white/80" : "text-gray-400 hover:text-white hover:bg-white/10"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* ── Action Buttons ── */}
        <div className="flex items-center gap-2 pr-1">
          {/* Theme Toggle */}
          <button
            onClick={onToggleTheme}
            aria-label="Toggle theme"
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 ${
              isLight ? "bg-gray-100 text-gray-600 hover:bg-gray-200" : "bg-white/10 text-gray-300 hover:bg-white/20"
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

          {/* Admin */}
          <button
            onClick={onAdminClick}
            className={`hidden sm:flex items-center gap-1.5 px-4 h-9 rounded-full text-xs font-sans font-bold tracking-wide transition-all hover:scale-105 ${
              isLight ? "bg-black text-white hover:bg-gray-800" : "bg-white text-black hover:bg-gray-200"
            }`}
          >
            <span>Admin</span>
            <ArrowRight className="w-3 h-3" />
          </button>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle mobile menu"
            className={`md:hidden w-9 h-9 rounded-full flex items-center justify-center transition-all ${
              isLight ? "bg-gray-100 text-black" : "bg-white/10 text-white"
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

      {/* ── Mobile Dropdown ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className={`absolute top-20 left-4 right-4 rounded-3xl p-2 shadow-2xl border backdrop-blur-3xl md:hidden z-40 ${
              isLight ? "bg-white/90 border-white/50" : "bg-black/90 border-white/10"
            }`}
          >
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    setMobileOpen(false);
                    setTimeout(() => {
                      document.getElementById(link.href.slice(1))?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                  className={`px-6 py-4 rounded-2xl text-lg font-sans font-bold tracking-tight transition-all ${
                    isLight ? "text-black hover:bg-gray-100" : "text-white hover:bg-white/10"
                  }`}
                >
                  {link.label}
                </a>
              ))}
              <div className={`h-px w-full my-2 ${isLight ? "bg-gray-200" : "bg-white/10"}`} />
              <button
                onClick={() => { onAdminClick(); setMobileOpen(false); }}
                className={`flex items-center justify-center gap-2 px-6 py-4 rounded-2xl text-lg font-sans font-bold transition-all ${
                  isLight ? "bg-black text-white" : "bg-white text-black"
                }`}
              >
                <UserCheck className="w-5 h-5" />
                Admin Access
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
