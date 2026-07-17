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
      className={`py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden transition-colors duration-500 ${
        isLight ? "bg-[#F9F9F9]" : "bg-[#09090B]"
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
          <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-sans font-bold uppercase tracking-widest mb-6 ${
            isLight ? "bg-black/5 text-[#171717]" : "bg-white/5 text-[#FAFAFA]"
          }`}>
            <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
            Curated Themes
          </span>
          <h2 className={`text-4xl md:text-6xl font-serif font-black tracking-tight leading-none mb-6 ${isLight ? "text-[#171717]" : "text-[#FAFAFA]"}`}>
            Premium Packages
          </h2>
          <p className={`text-sm md:text-base font-sans font-medium leading-relaxed ${isLight ? "text-gray-600" : "text-gray-400"}`}>
            Select a theme below to view our curated shoot packages. Every package is crafted to deliver breathtaking visuals and unforgettable memories.
          </p>
        </motion.div>

        {/* Bento Box Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
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
                className={`group cursor-pointer relative overflow-hidden rounded-[2rem] shadow-sm hover:shadow-xl transition-all ${colSpan} h-[350px] md:h-[450px]`}
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
            className={`group cursor-pointer relative overflow-hidden rounded-[2rem] shadow-sm hover:shadow-xl transition-all md:col-span-3 min-h-[200px] md:min-h-[250px] ${isLight ? "bg-white border border-gray-100" : "bg-white/5 border border-white/5"}`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-gray-500/10 to-gray-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="absolute inset-0 p-8 flex flex-col md:flex-row items-center justify-center md:justify-between z-10 text-center md:text-left gap-6">
              <div>
                <h3 className="text-2xl md:text-4xl font-serif font-bold text-white mb-2 leading-tight">
                  Build Your Own Custom Package
                </h3>
                <p className={`text-xs md:text-sm max-w-xl font-sans ${isLight ? "text-gray-500" : "text-gray-400"}`}>
                  Don't see exactly what you need? Use our Custom Package Builder to mix and match photography, videography, drone footage, and more to fit your specific requirements.
                </p>
              </div>
              
              <button className={`px-8 py-4 rounded-full font-sans text-sm font-bold uppercase tracking-wider flex items-center gap-2 hover:scale-[1.02] transition-transform shrink-0 shadow-sm ${isLight ? "bg-[#171717] text-white" : "bg-white text-[#171717]"}`}>
                <Settings2 className="w-4 h-4" /> Start Building
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
              className={`relative w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-[2rem] shadow-2xl p-6 sm:p-12 ${
                isLight ? "bg-[#F9F9F9] border border-black/5" : "bg-[#09090B] border border-white/5"
              }`}
            >
              <button 
                onClick={() => setSelectedCategory(null)}
                className={`absolute top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center z-20 transition-all ${
                  isLight ? "text-gray-400 hover:text-black hover:bg-black/5" : "text-gray-500 hover:text-white hover:bg-white/5"
                }`}
              >
                <X className="w-5 h-5" />
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
                    <div key={i} className={`h-full flex flex-col p-8 rounded-[1.5rem] transition-transform hover:scale-[1.02] ${
                      premium 
                        ? (isLight ? "bg-white shadow-lg border border-black/5 text-[#171717]" : "bg-[#18181B] shadow-2xl border border-white/10 text-[#FAFAFA]")
                        : (isLight ? "bg-transparent border border-black/10 text-gray-600" : "bg-transparent border border-white/10 text-gray-400")
                    }`}>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-8 flex-wrap gap-2">
                          <span className={`text-[10px] uppercase font-sans font-bold tracking-widest ${
                            premium ? (isLight ? "text-[#171717]" : "text-[#FAFAFA]") : "text-inherit"
                          }`}>
                            {option.label}
                          </span>
                          <div className="flex gap-2">
                            {bestValue && !premium && (
                              <span className="flex items-center gap-1 text-[9px] uppercase font-sans font-bold tracking-widest text-gray-400">
                                Best Value
                              </span>
                            )}
                            {premium && (
                              <span className={`flex items-center gap-1 text-[9px] uppercase font-sans font-bold tracking-widest px-3 py-1.5 rounded-full ${isLight ? "bg-black/5 text-[#171717]" : "bg-white/10 text-[#FAFAFA]"}`}>
                                Popular
                              </span>
                            )}
                          </div>
                        </div>
                        
                        <div className="pb-6 mb-6 border-b border-current/10">
                          <span className={`text-5xl font-serif font-black tracking-tight ${premium ? (isLight ? "text-[#171717]" : "text-[#FAFAFA]") : ""}`}>
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
                              ? (isLight ? "bg-[#171717] text-white hover:bg-black" : "bg-white text-[#171717] hover:bg-gray-200")
                              : (isLight ? "bg-black/5 text-[#171717] hover:bg-black/10" : "bg-white/5 text-[#FAFAFA] hover:bg-white/10")
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
