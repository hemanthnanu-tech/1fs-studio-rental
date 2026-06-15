import React, { useState } from "react";
import { PhotoshootCategory, PriceOption } from "../types";
import { ThreeDCard } from "./ThreeDCard";
import { Baby, Car, Home, Heart, Check, Sparkles, CalendarDays, Star } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface PhotoshootPackagesProps {
  categories: PhotoshootCategory[];
  onBookPackageClick: (category: PhotoshootCategory, option: PriceOption) => void;
  isLight: boolean;
}

const THEMES: Record<string, {
  gradient: string;
  gradientText: string;
  icon: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  glow: string;
  glowDark: string;
  bgLight: string;
  bgDark: string;
  tabActiveGradient: string;
  cardInnerLight: string;
  cardInnerDark: string;
  bgImage?: string;
}> = {
  "baby-shoot": {
    gradient: "from-pink-400 to-rose-400",
    gradientText: "from-pink-500 to-rose-500",
    icon: "text-pink-500",
    badgeBg: "bg-pink-500/10",
    badgeBorder: "border-pink-500/20",
    badgeText: "text-pink-600 dark:text-pink-400",
    glow: "rgba(244,114,182,0.2)",
    glowDark: "rgba(244,114,182,0.4)",
    bgLight: "bg-pink-50/50",
    bgDark: "bg-[#1A0B12]",
    tabActiveGradient: "linear-gradient(135deg, #f472b6, #fb7185)",
    cardInnerLight: "bg-gradient-to-br from-pink-50 to-white",
    cardInnerDark: "bg-gradient-to-br from-[#1F1118] to-[#12070A]",
  },
  "car-bike": {
    gradient: "from-slate-600 to-slate-900",
    gradientText: "from-slate-600 to-slate-800",
    icon: "text-slate-600",
    badgeBg: "bg-slate-500/10",
    badgeBorder: "border-slate-500/20",
    badgeText: "text-slate-700 dark:text-slate-400",
    glow: "rgba(100,116,139,0.2)",
    glowDark: "rgba(100,116,139,0.4)",
    bgLight: "bg-slate-50",
    bgDark: "bg-[#0B0F19]",
    tabActiveGradient: "linear-gradient(135deg, #475569, #1e293b)",
    cardInnerLight: "bg-gradient-to-br from-slate-100 to-white",
    cardInnerDark: "bg-gradient-to-br from-[#121826] to-[#0A0D14]",
  },
  "pre-wedding": {
    gradient: "from-red-700 to-red-950",
    gradientText: "from-red-600 to-red-800",
    icon: "text-red-700",
    badgeBg: "bg-red-500/10",
    badgeBorder: "border-red-500/20",
    badgeText: "text-red-700 dark:text-red-500",
    glow: "rgba(220,38,38,0.2)",
    glowDark: "rgba(220,38,38,0.4)",
    bgLight: "bg-red-50/30",
    bgDark: "bg-[#1A0505]",
    tabActiveGradient: "linear-gradient(135deg, #b91c1c, #7f1d1d)",
    cardInnerLight: "bg-gradient-to-br from-red-50 to-white",
    cardInnerDark: "bg-gradient-to-br from-[#260A0A] to-[#140202]",
    bgImage: "url('https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=1920')",
  },
  "default": {
    gradient: "from-[#0E6BA8] to-[#00897B]",
    gradientText: "from-[#0E6BA8] to-[#00897B]",
    icon: "text-[#0E6BA8]",
    badgeBg: "bg-[#0E6BA8]/10",
    badgeBorder: "border-[#0E6BA8]/15",
    badgeText: "text-[#0E6BA8] dark:text-[#A8DADC]",
    glow: "rgba(14,107,168,0.2)",
    glowDark: "rgba(106,90,205,0.3)",
    bgLight: "bg-[#FFFFFF]",
    bgDark: "bg-[#060D18]",
    tabActiveGradient: "linear-gradient(135deg, #0E6BA8, #00897B)",
    cardInnerLight: "bg-gradient-to-br from-[#EEF4F9] to-[#F0F7FF]",
    cardInnerDark: "bg-gradient-to-br from-[#070E1A] to-[#060D18]",
  }
};

export function PhotoshootPackages({ categories, onBookPackageClick, isLight }: PhotoshootPackagesProps) {
  const [selectedCategoryId, setSelectedCategoryId] = useState(categories[0].id);
  const activeCategory = categories.find(c => c.id === selectedCategoryId) || categories[0];
  
  const theme = THEMES[activeCategory.id] || THEMES["default"];

  const renderIcon = (iconName: string, active = false) => {
    const cls = `w-4 h-4 ${active ? "text-white" : theme.icon}`;
    switch (iconName) {
      case "Baby":  return <Baby className={cls} />;
      case "Car":   return <Car className={cls} />;
      case "Home":  return <Home className={cls} />;
      case "Heart": return <Heart className={cls} />;
      default:      return <Sparkles className={cls} />;
    }
  };

  const isPremium = (label: string) =>
    label.toLowerCase().includes("premium") || label.toLowerCase().includes("luxury");

  const border = isLight ? "border-black/5" : "border-white/5";
  const headingCls = isLight ? "text-[#0B2545]" : "text-[#EEF4F9]";
  const subCls = isLight ? "text-[#5E747F]" : "text-[#A8DADC]";

  return (
    <section
      id="packages"
      className={`py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b relative overflow-hidden transition-colors duration-700 ${isLight ? theme.bgLight : theme.bgDark} ${border}`}
    >
      {/* Dynamic Background Image for Pre-wedding */}
      <AnimatePresence>
        {theme.bgImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isLight ? 0.05 : 0.08 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 z-0 bg-cover bg-center pointer-events-none"
            style={{ backgroundImage: theme.bgImage }}
          />
        )}
      </AnimatePresence>

      {/* Accent blobs */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full blur-[160px] pointer-events-none transition-colors duration-700"
        style={{ background: isLight ? theme.glow : theme.glowDark }} />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full blur-[140px] pointer-events-none transition-colors duration-700"
        style={{ background: isLight ? theme.glow : theme.glowDark }} />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-10 sm:mb-14"
        >
          <span className={`text-[10px] uppercase tracking-widest font-mono font-bold flex items-center justify-center gap-2 mb-3 ${theme.icon}`}>
            <span className={`w-6 h-px bg-gradient-to-r from-transparent to-current opacity-50`} />
            <Sparkles className="w-3 h-3" />
            1FS Photography Rate Card
            <span className={`w-6 h-px bg-gradient-to-l from-transparent to-current opacity-50`} />
          </span>
          <h2 className={`text-3xl sm:text-5xl font-serif font-black leading-tight ${headingCls}`}>
            Premium <span className={`bg-gradient-to-r ${theme.gradientText} text-transparent bg-clip-text transition-colors duration-700`}>Shoot Packages</span>
          </h2>
          <p className={`mt-3 text-sm leading-relaxed ${subCls}`}>
            Choose your occasion, select a tier that matches your visual dreams, and lock your date. All shoots include top-tier cameras, edited files, and custom cinematics.
          </p>
        </motion.div>

        {/* Category tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-nowrap sm:flex-wrap justify-start sm:justify-center gap-2 sm:gap-3 mb-10 sm:mb-12 overflow-x-auto pb-2 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide"
          style={{ scrollbarWidth: "none" }}
        >
          {categories.map((cat) => {
            const active = selectedCategoryId === cat.id;
            const catTheme = THEMES[cat.id] || THEMES["default"];
            return (
              <button
                key={cat.id}
                id={`cat-tab-${cat.id}`}
                onClick={() => setSelectedCategoryId(cat.id)}
                className={`flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-2xl text-[10px] sm:text-xs uppercase tracking-wider font-mono font-bold border transition-all duration-500 cursor-pointer ${
                  active
                    ? "text-white border-transparent shadow-lg"
                    : (isLight
                        ? `bg-white/60 backdrop-blur ${border} text-[#5E747F] hover:border-black/10 hover:${catTheme.icon}`
                        : `bg-black/20 backdrop-blur ${border} text-[#A8DADC] hover:border-white/10 hover:${catTheme.icon}`)
                }`}
                style={active ? { 
                  background: catTheme.tabActiveGradient,
                  boxShadow: `0 10px 25px -5px ${isLight ? catTheme.glow : catTheme.glowDark}` 
                } : {}}
              >
                {renderIcon(cat.icon, active)}
                <span className="whitespace-nowrap">{cat.name}</span>
              </button>
            );
          })}
        </motion.div>

        {/* Category + Pricing */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategoryId}
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8"
          >
            {/* Profile card */}
            <div className="lg:col-span-4">
              <div className={`p-5 sm:p-7 rounded-2xl border h-full transition-colors duration-700 ${isLight ? theme.cardInnerLight : theme.cardInnerDark} ${border}`}>
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${theme.gradient} flex items-center justify-center mb-4 shadow-lg transition-all duration-700`}
                  style={{ boxShadow: `0 10px 25px -5px ${isLight ? theme.glow : theme.glowDark}` }}>
                  {renderIcon(activeCategory.icon, true)}
                </div>
                <span className={`text-[9px] uppercase font-mono tracking-widest ${theme.icon} font-bold block mb-1 transition-colors duration-700`}>Occasion Profile</span>
                <h3 className={`text-xl sm:text-2xl font-serif font-bold mb-3 ${headingCls}`}>{activeCategory.name}</h3>
                <p className={`text-xs sm:text-sm leading-relaxed mb-6 ${subCls}`}>{activeCategory.description}</p>
                <div className={`border-t pt-4 space-y-3 ${border}`}>
                  <span className={`text-[9px] font-mono uppercase tracking-widest block ${subCls}`}>Deliverables Scope:</span>
                  {["All High-Res Retouched JPGs", "Pristine Raw Photos Delivered", "Cinematic MP4 Videos on USB"].map((item, i) => (
                    <div key={i} className={`flex items-center gap-2.5 text-xs ${isLight ? "text-[#0B2545]" : "text-[#EEF4F9]"}`}>
                      <div className={`w-4 h-4 rounded-full ${theme.badgeBg} border ${theme.badgeBorder} flex items-center justify-center shrink-0`}>
                        <Check className={`w-2.5 h-2.5 ${theme.icon}`} />
                      </div>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Pricing cards */}
            <div className="lg:col-span-8">
              <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 ${
                activeCategory.prices.length >= 3 ? "sm:grid-cols-2 xl:grid-cols-3" : "sm:grid-cols-2"
              }`}>
                {activeCategory.prices.map((option, i) => {
                  const premium = isPremium(option.label);
                  return (
                    <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08, duration: 0.4 }}>
                      <ThreeDCard isLight={isLight} className="h-full" glowColor={premium ? theme.glowDark : theme.glow}>
                        <div className="flex flex-col h-full justify-between">
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span className={`text-[9px] uppercase tracking-widest font-mono border py-1 px-2.5 rounded-full font-bold transition-colors duration-700 ${theme.badgeBg} ${theme.badgeBorder} ${theme.badgeText}`}>
                                {option.label}
                              </span>
                              {premium && (
                                <span className="flex items-center gap-1 text-[8px] uppercase font-mono bg-[#6A5ACD]/10 text-[#6A5ACD] px-2 py-0.5 rounded-full border border-[#6A5ACD]/20 font-bold">
                                  <Star className="w-2.5 h-2.5" />Best
                                </span>
                              )}
                            </div>
                            <div className={`flex items-baseline gap-1.5 py-3 border-b mb-4 ${border}`}>
                              <span className={`text-xl sm:text-2xl font-serif font-black bg-gradient-to-r ${theme.gradientText} text-transparent bg-clip-text transition-colors duration-700`}>
                                ₹{option.price.toLocaleString("en-IN")}
                              </span>
                              <span className={`text-[9px] font-mono ${subCls}`}>complete rate</span>
                            </div>
                            <ul className="space-y-2">
                              {option.features.map((feat, idx) => (
                                <li key={idx} className={`flex items-start gap-2 text-[11px] ${isLight ? "text-[#0B2545]" : "text-[#EEF4F9]"}`}>
                                  <div className={`w-3.5 h-3.5 rounded-full ${theme.badgeBg} flex items-center justify-center shrink-0 mt-0.5`}>
                                    <Check className={`w-2 h-2 ${theme.icon}`} />
                                  </div>
                                  <span className="leading-snug">{feat}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="mt-6 pt-3">
                            <button
                              id={`book-pkg-${i}`}
                              onClick={() => onBookPackageClick(activeCategory, option)}
                              className={`w-full py-2.5 px-4 border font-semibold rounded-xl text-xs uppercase font-mono tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 group ${
                                premium
                                  ? `bg-gradient-to-r ${theme.gradient} text-white border-transparent hover:opacity-90 shadow-md`
                                  : (isLight
                                      ? `bg-white ${theme.badgeBorder} ${theme.badgeText} hover:bg-gradient-to-r hover:${theme.gradient} hover:text-white hover:border-transparent`
                                      : `bg-black/20 ${theme.badgeBorder} ${theme.badgeText} hover:bg-gradient-to-r hover:${theme.gradient} hover:text-white hover:border-transparent`)
                              }`}
                            >
                              <CalendarDays className="w-3.5 h-3.5" />
                              Book This Rate
                            </button>
                          </div>
                        </div>
                      </ThreeDCard>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
