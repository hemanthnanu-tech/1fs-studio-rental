import React, { useState, useEffect } from "react";
import { UserCheck, Sun, Moon, Menu, X } from "lucide-react";
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
    { label: "Shoot Packages", href: "#packages" },
    { label: "Camera Rentals", href: "#rentals" },
    { label: "Contact", href: "#developer" },
  ];

  const navBg = scrolled
    ? isLight
      ? "border-b border-[#D0E8F5] bg-white/90 backdrop-blur-xl shadow-sm"
      : "border-b border-[#0E6BA8]/15 bg-[#040C14]/92 backdrop-blur-xl shadow-sm"
    : isLight
      ? "bg-[#F0F7FF]/95 border-b border-[#D0E8F5]/60"
      : "bg-[#040C14]/95 border-b border-[#0E6BA8]/10";

  return (
    <header className={`sticky top-0 z-40 w-full transition-all duration-500 ${navBg}`}>
      <div className="mx-auto flex max-w-7xl h-16 sm:h-20 items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* ── Brand Logo ── */}
        <a href="#" className="flex items-center gap-2.5 sm:gap-3 group min-w-0">
          {/* Gradient icon badge */}
          <div className="relative w-9 h-9 sm:w-11 sm:h-11 rounded-xl overflow-hidden flex items-center justify-center shrink-0">
            <div className="absolute inset-0 bg-gradient-to-br from-[#0E6BA8] via-[#00897B] to-[#6A5ACD] transition-all duration-500 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
            <span className="relative z-10 text-white font-serif font-black text-sm sm:text-base tracking-tight">1F</span>
          </div>

          <div className="min-w-0">
            {/* Signature font for studio name */}
            <div className="flex items-center gap-1.5">
              <span className={`font-signature text-xl sm:text-2xl leading-none transition-colors duration-500 ${
                isLight ? "text-[#0B2545]" : "text-[#EEF4F9]"
              }`}>
                1FS Photography
              </span>
              <span className="w-1.5 h-1.5 bg-[#00897B] rounded-full animate-pulse-ocean hidden sm:block" />
            </div>
            <p className={`text-[8px] sm:text-[9px] uppercase tracking-widest font-mono transition-colors duration-500 ${
              isLight ? "text-[#5E747F]" : "text-[#A8DADC]"
            }`}>
              Premium Camera Rental & Studio
            </p>
          </div>
        </a>

        {/* ── Desktop Nav ── */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`relative text-[11px] font-mono tracking-widest uppercase font-semibold transition-colors duration-300 group ${
                isLight ? "text-[#5E747F] hover:text-[#0E6BA8]" : "text-[#A8DADC] hover:text-[#A8DADC]"
              }`}
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-[#0E6BA8] to-[#00897B] group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </nav>

        {/* ── Action Buttons ── */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          <button
            id="theme-toggle"
            onClick={onToggleTheme}
            aria-label="Toggle theme"
            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center border transition-all duration-300 cursor-pointer ${
              isLight
                ? "bg-[#EEF4F9] border-[#D0E8F5] hover:border-[#0E6BA8]/50 text-[#0E6BA8]"
                : "bg-[#0A1628] border-[#0E6BA8]/20 hover:border-[#0E6BA8]/50 text-[#A8DADC]"
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

          {/* Pending badge */}
          {bookingsCount > 0 && (
            <div className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-[10px] font-mono uppercase font-bold border ${
              isLight
                ? "bg-[#0E6BA8]/8 border-[#0E6BA8]/20 text-[#0E6BA8]"
                : "bg-[#0E6BA8]/10 border-[#0E6BA8]/25 text-[#A8DADC]"
            }`}>
              <span className="w-1.5 h-1.5 bg-[#00897B] rounded-full animate-ping" />
              {bookingsCount} Active
            </div>
          )}

          {/* Admin */}
          <button
            id="admin-gateway-btn"
            onClick={onAdminClick}
            className={`hidden sm:flex items-center gap-1.5 px-3 sm:px-4 h-9 sm:h-10 border rounded-xl text-xs font-mono tracking-wider transition-all cursor-pointer group ${
              isLight
                ? "bg-white border-[#D0E8F5] text-[#0B2545] hover:border-[#0E6BA8]/60 hover:bg-[#EEF4F9]"
                : "bg-[#0A1628] border-[#0E6BA8]/20 text-[#A8DADC] hover:border-[#0E6BA8]/50 hover:text-[#EEF4F9]"
            }`}
          >
            <UserCheck className="w-3.5 h-3.5 text-[#0E6BA8]" />
            <span>Admin</span>
          </button>

          {/* Mobile toggle */}
          <button
            id="mobile-menu-btn"
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`md:hidden w-9 h-9 rounded-xl flex items-center justify-center border transition-all ${
              isLight ? "border-[#D0E8F5] bg-white text-[#0B2545]" : "border-[#0E6BA8]/20 bg-[#0A1628] text-[#A8DADC]"
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
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className={`overflow-hidden border-t md:hidden ${
              isLight ? "border-[#D0E8F5] bg-white/95 backdrop-blur-xl" : "border-[#0E6BA8]/15 bg-[#040C14]/95 backdrop-blur-xl"
            }`}
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-2.5 py-3 px-4 rounded-xl text-sm font-mono transition-all ${
                    isLight
                      ? "text-[#0B2545] hover:bg-[#EEF4F9] hover:text-[#0E6BA8]"
                      : "text-[#A8DADC] hover:bg-[#0E6BA8]/10 hover:text-[#EEF4F9]"
                  }`}
                >
                  <span className="w-1 h-1 bg-[#0E6BA8] rounded-full" />
                  {link.label}
                </a>
              ))}
              <button
                onClick={() => { onAdminClick(); setMobileOpen(false); }}
                className={`w-full flex items-center gap-2.5 py-3 px-4 rounded-xl text-sm font-mono transition-all ${
                  isLight ? "text-[#0E6BA8] hover:bg-[#EEF4F9]" : "text-[#0E6BA8] hover:bg-[#0E6BA8]/10"
                }`}
              >
                <UserCheck className="w-4 h-4" />
                Admin Gateway
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
