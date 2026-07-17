import React, { useState } from "react";
import { X, Calculator, Send, Check, Sparkles, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface CustomPackageBuilderProps {
  isLight: boolean;
  onClose: () => void;
}

const CUSTOMIZATION_OPTIONS = [
  { id: "photo", label: "Professional Photography", price: 5000, description: "Unlimited raw shots with top-tier cameras." },
  { id: "video", label: "Cinematic Videography", price: 8000, description: "4K cinematic coverage with stabilizers & grading." },
  { id: "drone", label: "Drone Footage", price: 4000, description: "Aerial 4K cinematic shots." },
  { id: "album", label: "Premium Photo Album", price: 3000, description: "High quality 15-sheet printed memory book." },
  { id: "edit", label: "Advanced Retouching", price: 2000, description: "High-end skin retouching and color manipulation." },
  { id: "makeup", label: "Makeup & Styling", price: 4000, description: "Professional makeup artist on-site." },
  { id: "lighting", label: "Studio Lighting Setup", price: 3500, description: "Professional strobes and softboxes for indoor/outdoor lighting." },
  { id: "shooter", label: "Additional Photographer", price: 4000, description: "A second shooter for comprehensive event coverage." },
  { id: "rush", label: "Rush Delivery", price: 2500, description: "24-hour turnaround time for finalized media." },
  { id: "raw", label: "Raw File Handover", price: 1500, description: "Provide all unedited raw photo and video files." }
];

export function CustomPackageBuilder({ isLight, onClose }: CustomPackageBuilderProps) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [shootType, setShootType] = useState<string>("Baby Shoot");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [customShootName, setCustomShootName] = useState("");
  const [customNotes, setCustomNotes] = useState<string>("");

  const EVENT_TYPES = [
    { id: "Baby Shoot", label: "Baby Shoot / Shower" },
    { id: "House Warming", label: "Traditional & House Warming" },
    { id: "Automobile Shoot", label: "Car & Bike Delivery" },
    { id: "Pre Wedding", label: "Pre Wedding" },
    { id: "Other", label: "Other Event" }
  ];

  const toggleOption = (id: string) => {
    setSelectedOptions(prev => 
      prev.includes(id) ? prev.filter(o => o !== id) : [...prev, id]
    );
  };

  const estimatedPrice = selectedOptions.reduce((acc, optId) => {
    const opt = CUSTOMIZATION_OPTIONS.find(o => o.id === optId);
    return acc + (opt?.price || 0);
  }, 0);

  const handleWhatsApp = () => {
    const selectedLabels = selectedOptions.map(id => CUSTOMIZATION_OPTIONS.find(o => o.id === id)?.label).join("\n- ");
    const finalShootType = shootType === "Other" && customShootName ? customShootName : shootType;
    let msg = `Hi 1FS Studio! I'm interested in a custom package for a ${finalShootType}.\n\nMy Requirements:\n${selectedLabels ? "- " + selectedLabels : "None selected yet."}\n`;
    
    if (customNotes.trim()) {
      msg += `\nAdditional Notes/Custom Requests:\n${customNotes.trim()}\n`;
    }
    
    msg += `\nEstimated Budget: ₹${estimatedPrice.toLocaleString("en-IN")}\n\nPlease let me know the availability so we can finalize the price.`;
    window.open(`https://wa.me/917795849384?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm"
      />

      {/* Modal Content */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className={`relative w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-[2rem] shadow-2xl border backdrop-blur-3xl p-2 sm:p-4 ${
          isLight ? "bg-white/95 border-gray-200" : "bg-black/80 border-white/10"
        }`}
      >
        <button 
          onClick={onClose}
          className={`absolute top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center border z-20 transition-colors ${
            isLight ? "bg-white border-gray-200 text-black hover:bg-gray-100" : "bg-black/50 border-white/20 text-white hover:bg-white/10"
          }`}
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-12">
          <div className="mb-8 md:mb-12 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-sans font-bold uppercase tracking-widest mb-4 md:mb-6 bg-[var(--ori-accent)]/10 text-[var(--ori-accent)]">
              <Sparkles className="w-3 h-3" />
              Tailor Your Experience
            </div>
            <h2 className={`text-3xl md:text-5xl font-serif font-black mb-4 tracking-tight ${isLight ? "text-black" : "text-white"}`}>
              Custom Package Builder
            </h2>
            <p className={`text-sm md:text-base font-sans leading-relaxed ${isLight ? "text-gray-600" : "text-gray-400"}`}>
              Mix and match services to build exactly what you need. Get an instant estimate and finalize details over a quick chat.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Options Selection */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <label className={`block text-xs font-bold uppercase tracking-widest mb-4 ${isLight ? "text-gray-500" : "text-gray-400"}`}>
                  1. Select Event Type
                </label>
                <div className="relative">
                  <div 
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className={`w-full p-4 sm:p-5 rounded-2xl border font-sans font-bold text-sm flex items-center justify-between transition-all cursor-pointer ${
                      isLight 
                        ? `bg-white/60 backdrop-blur-md ${isDropdownOpen ? "border-black shadow-lg" : "border-gray-200 hover:border-gray-300"}` 
                        : `bg-white/5 backdrop-blur-md ${isDropdownOpen ? "border-white shadow-[0_0_15px_rgba(255,255,255,0.1)]" : "border-white/10 hover:border-white/20"}`
                    }`}
                  >
                    <span className={isLight ? "text-black" : "text-white"}>
                      {EVENT_TYPES.find(t => t.id === shootType)?.label || shootType}
                    </span>
                    <motion.div animate={{ rotate: isDropdownOpen ? 180 : 0 }}>
                      <ChevronDown className={`w-4 h-4 ${isLight ? "text-gray-500" : "text-gray-400"}`} />
                    </motion.div>
                  </div>
                  
                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div 
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        className={`absolute top-full left-0 right-0 mt-2 z-50 rounded-2xl border shadow-2xl overflow-hidden backdrop-blur-xl ${
                          isLight ? "bg-white/95 border-gray-200" : "bg-[#18181B]/95 border-white/10"
                        }`}
                      >
                        {EVENT_TYPES.map(type => (
                          <div 
                            key={type.id}
                            onClick={() => { setShootType(type.id); setIsDropdownOpen(false); }}
                            className={`p-4 text-sm font-sans font-bold cursor-pointer transition-colors ${
                              shootType === type.id 
                                ? (isLight ? "bg-black/5 text-black" : "bg-white/10 text-white") 
                                : (isLight ? "text-gray-600 hover:bg-black/5 hover:text-black" : "text-gray-400 hover:bg-white/5 hover:text-white")
                            }`}
                          >
                            {type.label}
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <AnimatePresence>
                  {shootType === "Other" && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0, marginTop: 0 }}
                      animate={{ opacity: 1, height: "auto", marginTop: 16 }}
                      exit={{ opacity: 0, height: 0, marginTop: 0 }}
                      className="overflow-hidden"
                    >
                      <input 
                        type="text" 
                        placeholder="E.g. Engagement Party"
                        value={customShootName}
                        onChange={(e) => setCustomShootName(e.target.value)}
                        className={`w-full p-4 sm:p-5 rounded-2xl border font-sans text-sm focus:outline-none transition-all ${
                          isLight 
                            ? "bg-gray-50 border-gray-200 focus:border-black focus:ring-1 focus:ring-black text-black" 
                            : "bg-[#18181B] border-white/10 focus:border-white focus:ring-1 focus:ring-white text-white placeholder:text-gray-600"
                        }`}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div>
                <label className={`block text-xs font-bold uppercase tracking-widest mb-4 flex items-center justify-between ${isLight ? "text-gray-500" : "text-gray-400"}`}>
                  <span>2. Select Add-ons</span>
                  <span className="text-[10px] font-normal lowercase bg-black/5 dark:bg-white/10 px-2 py-1 rounded-full">{selectedOptions.length} selected</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <AnimatePresence>
                    {CUSTOMIZATION_OPTIONS.map((opt, i) => {
                      const isSelected = selectedOptions.includes(opt.id);
                      return (
                        <motion.div 
                          layout
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.05, layout: { type: "spring", stiffness: 300, damping: 30 } }}
                          key={opt.id}
                          onClick={() => toggleOption(opt.id)}
                          className={`relative p-5 rounded-2xl border cursor-pointer transition-all duration-300 hover:scale-[1.02] ${
                            isSelected 
                              ? (isLight ? "border-black bg-black text-white shadow-xl shadow-black/10" : "border-white bg-white text-black shadow-xl shadow-white/10")
                              : (isLight ? "border-gray-200 bg-white hover:border-gray-300" : "border-[#27272A] bg-[#18181B] hover:border-gray-600")
                          }`}
                        >
                          <div className="flex items-start gap-4">
                            <div className={`mt-0.5 w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-all ${
                              isSelected 
                                ? (isLight ? "bg-white text-black" : "bg-black text-white")
                                : (isLight ? "border border-gray-300 bg-gray-50" : "border border-gray-600 bg-[#27272A]")
                            }`}>
                              {isSelected && <Check className="w-3.5 h-3.5" />}
                            </div>
                            <div>
                              <h4 className={`text-sm font-bold font-sans leading-none mb-1.5 ${
                                isSelected ? (isLight ? "text-white" : "text-black") : (isLight ? "text-black" : "text-white")
                              }`}>
                                {opt.label}
                              </h4>
                              <p className={`text-[11px] leading-relaxed font-sans line-clamp-2 ${
                                isSelected ? (isLight ? "text-gray-300" : "text-gray-700") : (isLight ? "text-gray-500" : "text-gray-400")
                              }`}>
                                {opt.description}
                              </p>
                              <p className={`text-xs font-bold mt-2 font-mono ${
                                isSelected ? (isLight ? "text-gray-300" : "text-gray-700") : (isLight ? "text-gray-400" : "text-gray-500")
                              }`}>
                                +₹{opt.price.toLocaleString("en-IN")}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>
              </div>

              <div>
                <label className={`block text-xs font-bold uppercase tracking-widest mb-4 ${isLight ? "text-gray-500" : "text-gray-400"}`}>
                  3. Any Specific Requests?
                </label>
                <textarea
                  value={customNotes}
                  onChange={(e) => setCustomNotes(e.target.value)}
                  placeholder="Tell us about specific locations, props, styles, or anything else you have in mind..."
                  className={`w-full p-5 rounded-2xl border font-sans text-sm focus:outline-none focus:ring-2 focus:ring-[var(--ori-accent)] transition-all resize-none h-32 ${
                    isLight ? "bg-gray-50 border-gray-200 text-black placeholder:text-gray-400 focus:bg-white" : "bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:bg-[#18181B]"
                  }`}
                />
              </div>
            </div>

            {/* Pricing Summary */}
            <div className="lg:col-span-1">
              <div className={`sticky top-6 p-8 rounded-[2rem] border flex flex-col shadow-2xl backdrop-blur-xl ${
                isLight ? "bg-white/60 border-gray-200" : "bg-black/40 border-white/10 shadow-[0_8px_32px_rgba(255,255,255,0.02)]"
              }`}>
                <div className="w-12 h-12 bg-[var(--ori-accent)] text-black rounded-full flex items-center justify-center mb-6 shadow-lg shadow-[var(--ori-accent)]/20">
                  <Calculator className="w-5 h-5" />
                </div>

                <h3 className={`text-sm font-bold uppercase tracking-widest mb-6 ${isLight ? "text-black" : "text-white"}`}>
                  Your Package
                </h3>
                
                <div className="flex-1 space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                  {selectedOptions.length === 0 ? (
                    <div className="h-full flex items-center justify-center">
                      <p className={`text-sm italic text-center ${isLight ? "text-gray-400" : "text-gray-500"}`}>
                        Select add-ons on the left to build your package.
                      </p>
                    </div>
                  ) : (
                    selectedOptions.map(id => {
                      const opt = CUSTOMIZATION_OPTIONS.find(o => o.id === id);
                      return opt && (
                        <div key={id} className="flex justify-between text-sm font-sans items-center group">
                          <span className={`line-clamp-1 pr-4 ${isLight ? "text-gray-600" : "text-gray-400"}`}>{opt.label}</span>
                          <span className={`font-mono font-bold shrink-0 ${isLight ? "text-black" : "text-white"}`}>₹{opt.price.toLocaleString("en-IN")}</span>
                        </div>
                      );
                    })
                  )}
                </div>

                <div className={`mt-8 pt-8 border-t ${isLight ? "border-gray-200" : "border-white/10"}`}>
                  <div className="flex justify-between items-end mb-8">
                    <span className={`text-xs font-bold uppercase tracking-widest ${isLight ? "text-gray-500" : "text-gray-400"}`}>
                      Estimated Total
                    </span>
                    <span className={`text-4xl font-serif font-black tracking-tighter ${isLight ? "text-black" : "text-white"}`}>
                      ₹{estimatedPrice.toLocaleString("en-IN")}
                    </span>
                  </div>

                  <button 
                    onClick={handleWhatsApp}
                    className={`w-full py-5 rounded-2xl flex items-center justify-center gap-2 font-sans font-bold text-sm tracking-wide transition-all duration-300 ${
                      selectedOptions.length === 0 && !customNotes.trim()
                        ? "opacity-50 cursor-not-allowed bg-gray-200 text-gray-400 dark:bg-[#27272A] dark:text-gray-600"
                        : "bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 shadow-xl hover:scale-105"
                    }`}
                    disabled={selectedOptions.length === 0 && !customNotes.trim()}
                  >
                    <Send className="w-4 h-4" />
                    Request via WhatsApp
                  </button>
                  <p className={`text-[10px] text-center mt-4 font-sans leading-relaxed ${isLight ? "text-gray-500" : "text-gray-400"}`}>
                    Prices are estimates. Final quote will be provided on WhatsApp based on duration, location, and your custom requests.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
