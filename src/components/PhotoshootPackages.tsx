import React, { useState } from "react";
import { PhotoshootCategory, PriceOption } from "../types";
import { ThreeDCard } from "./ThreeDCard";
import { Baby, Car, Home, Heart, Check, Sparkles, CalendarDays, Star, X, Settings2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { CustomPackageBuilder } from "./CustomPackageBuilder";

interface PhotoshootPackagesProps {
  categories: PhotoshootCategory[];
  onBookPackageClick: (category: PhotoshootCategory, option: PriceOption) => void;
  isLight: boolean;
}

const CATEGORY_STYLES: Record<string, { bgImage: string }> = {
  "baby-shoot": { bgImage: "package/Baby_Shoot_Baby_Shower.png" },
  "car-bike": { bgImage: "package/Car_Bike_Delivery.png" },
  "traditional-house": { bgImage: "package/Traditional_House_Warming.png" },
  "pre-wedding": { bgImage: "package/Pre_Wedding.png" }
};

export function PhotoshootPackages({ categories, onBookPackageClick, isLight }: PhotoshootPackagesProps) {
  const [selectedCategory, setSelectedCategory] = useState<PhotoshootCategory | null>(null);
  const [isCustomBuilderOpen, setIsCustomBuilderOpen] = useState(false);

  const renderIcon = (iconName: string, className = "w-6 h-6") => {
    switch (iconName) {
      case "Baby":  return <Baby className={className} />;
      case "Car":   return <Car className={className} />;
      case "Home":  return <Home className={className} />;
      case "Heart": return <Heart className={className} />;
      default:      return <Sparkles className={className} />;
    }
  };

  React.useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedCategory(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <section
      id="packages"
      className={`py-24 px-4 sm:px-6 lg:px-8 border-b relative overflow-hidden transition-colors duration-500 ${
        isLight ? "bg-white border-gray-200" : "bg-black border-white/10"
      }`}
    >
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-sans font-bold uppercase tracking-widest mb-4 ${
            isLight ? "bg-black/5 text-black" : "bg-white/10 text-white"
          }`}>
            <span className="w-2 h-2 rounded-full bg-[var(--ori-accent)]" />
            Curated Themes
          </span>
          <h2 className={`text-4xl md:text-6xl font-serif font-bold tracking-tighter leading-none mb-4 md:mb-6 ${isLight ? "text-black" : "text-white"}`}>
            Premium Packages
          </h2>
          <p className={`text-sm md:text-base font-sans font-medium leading-relaxed ${isLight ? "text-gray-600" : "text-gray-400"}`}>
            Select a theme below to view our curated shoot packages. Every package is crafted to deliver breathtaking visuals and unforgettable memories.
          </p>
        </motion.div>

        {/* Bento Box Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {categories.map((cat, idx) => {
            const style = CATEGORY_STYLES[cat.id] || CATEGORY_STYLES["baby-shoot"];
            // Bento logic: first and last span 2 columns
            const colSpan = idx === 0 || idx === 3 ? "md:col-span-2" : "md:col-span-1";
            
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                onClick={() => setSelectedCategory(cat)}
                className={`group cursor-pointer relative overflow-hidden rounded-[2.5rem] shadow-lg bg-black ${colSpan} h-[300px] md:h-[400px]`}
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <img 
                    src={style.bgImage} 
                    alt={cat.name} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                </div>
                
                {/* Content Overlay */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end z-10 transition-transform duration-500 ease-out">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 bg-white/20 backdrop-blur-md border border-white/20">
                    {renderIcon(cat.icon, "w-6 h-6 text-white")}
                  </div>
                  
                  <h3 className="text-3xl font-serif font-bold text-white mb-2 leading-tight">
                    {cat.name}
                  </h3>
                  
                  <p className="text-gray-300 text-sm line-clamp-2 max-w-sm font-sans">
                    {cat.description}
                  </p>
                  
                  {/* Hover Button Reveal */}
                  <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0">
                    <button className="px-6 py-3 bg-white text-black rounded-full font-sans text-xs font-bold uppercase tracking-wider flex items-center gap-2 hover:bg-gray-200 transition-colors">
                      View Pricing <Sparkles className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            onClick={() => setIsCustomBuilderOpen(true)}
            className={`group cursor-pointer relative overflow-hidden rounded-[2.5rem] shadow-lg bg-black md:col-span-3 min-h-[200px] md:min-h-[250px] border ${isLight ? "border-gray-200" : "border-white/10"}`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--ori-accent-2)] to-[var(--ori-accent)] opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            
            <div className="absolute inset-0 p-8 flex flex-col md:flex-row items-center justify-center md:justify-between z-10 text-center md:text-left gap-6">
              <div>
                <h3 className="text-2xl md:text-4xl font-serif font-bold text-white mb-2 leading-tight">
                  Build Your Own Custom Package
                </h3>
                <p className="text-gray-300 text-xs md:text-sm max-w-xl font-sans">
                  Don't see exactly what you need? Use our Custom Package Builder to mix and match photography, videography, drone footage, and more to fit your specific requirements.
                </p>
              </div>
              
              <button className="px-8 py-4 bg-[var(--ori-accent)] text-black rounded-full font-sans text-sm font-bold uppercase tracking-wider flex items-center gap-2 hover:scale-105 transition-transform shrink-0">
                <Settings2 className="w-5 h-5" /> Start Building
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Pricing Modal */}
      <AnimatePresence>
        {selectedCategory && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCategory(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />

            {/* Modal Content */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className={`relative w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-[2rem] md:rounded-[3rem] shadow-2xl border backdrop-blur-3xl p-5 sm:p-12 ${
                isLight ? "bg-white/95 border-gray-200" : "bg-[#111]/95 border-white/10"
              }`}
            >
              <button 
                onClick={() => setSelectedCategory(null)}
                className={`absolute top-6 right-6 w-12 h-12 rounded-full flex items-center justify-center border z-20 transition-colors ${
                  isLight ? "bg-white border-gray-200 text-black hover:bg-gray-100" : "bg-black/50 border-white/20 text-white hover:bg-white/10"
                }`}
              >
                <X className="w-6 h-6" />
              </button>

              <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-12">
                <div className={`w-20 h-20 rounded-[2rem] flex items-center justify-center shrink-0 shadow-xl ${isLight ? "bg-black text-white" : "bg-white text-black"}`}>
                  {renderIcon(selectedCategory.icon, "w-10 h-10")}
                </div>
                <div className="text-center md:text-left">
                  <h3 className={`text-3xl sm:text-5xl font-serif font-bold mb-2 tracking-tight ${isLight ? "text-black" : "text-white"}`}>
                    {selectedCategory.name}
                  </h3>
                  <p className={`text-xs sm:text-base font-sans font-medium max-w-2xl ${isLight ? "text-gray-600" : "text-gray-400"}`}>
                    {selectedCategory.description} All tiers include professional cameras and expert editing. Select a package below to book your date.
                  </p>
                </div>
              </div>

              {/* Pricing Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {selectedCategory.prices.map((option, i) => {
                  const maxPrice = Math.max(...selectedCategory.prices.map(p => p.price));
                  const minPrice = Math.min(...selectedCategory.prices.map(p => p.price));
                  const premium = option.price === maxPrice;
                  const bestValue = option.label.toLowerCase().includes("standard") || (option.price > minPrice && option.price < maxPrice && i === 1);
                  
                  return (
                    <div key={i} className={`h-full flex flex-col p-8 rounded-[2rem] border transition-transform hover:scale-[1.02] ${
                      premium 
                        ? "bg-[var(--ori-accent)] border-transparent text-black" 
                        : (isLight ? "bg-gray-50 border-gray-200 text-black" : "bg-white/5 border-white/10 text-white")
                    }`}>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
                          <span className={`text-[10px] uppercase font-sans font-bold tracking-widest px-4 py-2 rounded-full border ${
                            premium ? "border-black/20 bg-black/5" : (isLight ? "border-gray-300 bg-white" : "border-white/20")
                          }`}>
                            {option.label}
                          </span>
                          <div className="flex gap-2">
                            {bestValue && !premium && (
                              <span className="flex items-center gap-1 text-[10px] uppercase font-sans font-bold tracking-widest px-3 py-2 rounded-full bg-[var(--ori-accent-2)] text-white">
                                <Star className="w-3 h-3" /> Best Value
                              </span>
                            )}
                            {premium && (
                              <span className="flex items-center gap-1 text-[10px] uppercase font-sans font-bold tracking-widest px-3 py-2 rounded-full bg-black text-white">
                                <Star className="w-3 h-3 text-[var(--ori-accent)]" /> Popular
                              </span>
                            )}
                          </div>
                        </div>
                        
                        <div className="pb-6 border-b mb-6 border-current/10">
                          <span className="text-4xl font-serif font-bold tracking-tighter">
                            ₹{option.price.toLocaleString("en-IN")}
                          </span>
                        </div>
                        
                        <ul className="space-y-4">
                          {option.features.map((feat, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-sm font-sans font-medium">
                              <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                                premium ? "bg-black/10" : (isLight ? "bg-black/5" : "bg-white/10")
                              }`}>
                                <Check className="w-3.5 h-3.5" />
                              </div>
                              <span className="leading-tight pt-1">{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="mt-8 pt-4">
                        <button
                          onClick={() => {
                            onBookPackageClick(selectedCategory, option);
                            setSelectedCategory(null);
                          }}
                          className={`w-full py-4 px-6 rounded-full font-sans font-bold text-sm tracking-wide transition-all flex items-center justify-center gap-2 ${
                            premium
                              ? "bg-black text-white hover:bg-gray-800"
                              : (isLight ? "bg-black text-white hover:bg-gray-800" : "bg-white text-black hover:bg-gray-200")
                          }`}
                        >
                          <CalendarDays className="w-4 h-4" />
                          Book Package
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isCustomBuilderOpen && (
          <CustomPackageBuilder 
            isLight={isLight} 
            onClose={() => setIsCustomBuilderOpen(false)} 
          />
        )}
      </AnimatePresence>
    </section>
  );
}
