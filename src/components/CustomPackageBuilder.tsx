import React, { useState } from "react";
import { X, Calculator, Send, Check } from "lucide-react";
import { motion } from "motion/react";

interface CustomPackageBuilderProps {
  isLight: boolean;
  onClose: () => void;
}

const CUSTOMIZATION_OPTIONS = [
  { id: "photo", label: "Professional Photography", price: 5000, description: "Unlimited raw shots with top-tier DSLR/Mirrorless." },
  { id: "video", label: "Cinematic Videography", price: 8000, description: "4K cinematic coverage with stabilizers & grading." },
  { id: "drone", label: "Drone Footage", price: 4000, description: "Aerial 4K cinematic shots for majestic views." },
  { id: "album", label: "Premium Photo Album", price: 3000, description: "High quality 15-sheet printed memory book." },
  { id: "edit", label: "Advanced Retouching", price: 2000, description: "High-end skin retouching and color manipulation for 50+ photos." },
  { id: "makeup", label: "Makeup & Styling", price: 4000, description: "Professional makeup artist on-site." }
];

export function CustomPackageBuilder({ isLight, onClose }: CustomPackageBuilderProps) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [shootType, setShootType] = useState<string>("Baby Shoot");

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
    const selectedLabels = selectedOptions.map(id => CUSTOMIZATION_OPTIONS.find(o => o.id === id)?.label).join(", ");
    const msg = `Hi 1FS Studio! I'm interested in a custom package for a ${shootType}.\n\nMy Requirements:\n${selectedLabels || "None selected yet."}\n\nEstimated Budget: ₹${estimatedPrice.toLocaleString("en-IN")}\n\nPlease let me know the availability and final quote.`;
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
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
      />

      {/* Modal Content */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className={`relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[2rem] shadow-2xl border backdrop-blur-3xl p-6 sm:p-10 ${
          isLight ? "bg-white/95 border-gray-200" : "bg-[#111]/95 border-white/10"
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

        <div className="mb-10 text-center max-w-2xl mx-auto">
          <div className="w-16 h-16 mx-auto bg-[var(--ori-accent)] text-black rounded-full flex items-center justify-center mb-4 shadow-lg shadow-[var(--ori-accent)]/20">
            <Calculator className="w-8 h-8" />
          </div>
          <h2 className={`text-4xl font-serif font-bold mb-3 ${isLight ? "text-black" : "text-white"}`}>
            Custom Package Builder
          </h2>
          <p className={`text-sm font-sans ${isLight ? "text-gray-600" : "text-gray-400"}`}>
            Tailor your photoshoot to your exact needs. Select the services you want, see an estimated price, and we'll craft the perfect experience.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Options Selection */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <label className={`block text-xs font-bold uppercase tracking-widest mb-3 ${isLight ? "text-gray-500" : "text-gray-400"}`}>
                Select Shoot Type
              </label>
              <select 
                value={shootType}
                onChange={(e) => setShootType(e.target.value)}
                className={`w-full p-4 rounded-xl border appearance-none font-sans font-medium text-sm focus:outline-none focus:ring-2 focus:ring-[var(--ori-accent-2)] transition-colors ${
                  isLight ? "bg-gray-50 border-gray-200 text-black" : "bg-white/5 border-white/10 text-white"
                }`}
              >
                <option value="Baby Shoot">Baby Shoot / Shower</option>
                <option value="House Warming">Traditional & House Warming</option>
                <option value="Automobile Shoot">Car & Bike Delivery</option>
                <option value="Pre Wedding">Pre Wedding</option>
                <option value="Other">Other Event</option>
              </select>
            </div>

            <div>
              <label className={`block text-xs font-bold uppercase tracking-widest mb-3 ${isLight ? "text-gray-500" : "text-gray-400"}`}>
                Select Requirements (Multi-Select)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {CUSTOMIZATION_OPTIONS.map((opt) => {
                  const isSelected = selectedOptions.includes(opt.id);
                  return (
                    <div 
                      key={opt.id}
                      onClick={() => toggleOption(opt.id)}
                      className={`relative p-4 rounded-xl border cursor-pointer transition-all ${
                        isSelected 
                          ? (isLight ? "border-black bg-black/5" : "border-white bg-white/10")
                          : (isLight ? "border-gray-200 bg-white hover:bg-gray-50" : "border-white/10 bg-black hover:bg-white/5")
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`mt-0.5 w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
                          isSelected 
                            ? (isLight ? "bg-black border-black text-white" : "bg-white border-white text-black")
                            : (isLight ? "border-gray-300 bg-white" : "border-gray-600 bg-black")
                        }`}>
                          {isSelected && <Check className="w-3.5 h-3.5" />}
                        </div>
                        <div>
                          <h4 className={`text-sm font-bold font-sans leading-none mb-1 ${isLight ? "text-black" : "text-white"}`}>
                            {opt.label}
                          </h4>
                          <p className={`text-[11px] leading-tight font-sans ${isLight ? "text-gray-500" : "text-gray-400"}`}>
                            {opt.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Pricing Summary */}
          <div className="lg:col-span-1">
            <div className={`sticky top-6 p-6 rounded-2xl border flex flex-col h-full ${
              isLight ? "bg-gray-50 border-gray-200" : "bg-white/5 border-white/10"
            }`}>
              <h3 className={`text-sm font-bold uppercase tracking-widest mb-6 ${isLight ? "text-black" : "text-white"}`}>
                Summary
              </h3>
              
              <div className="flex-1 space-y-3">
                {selectedOptions.length === 0 ? (
                  <p className={`text-sm italic ${isLight ? "text-gray-400" : "text-gray-500"}`}>
                    No requirements selected yet.
                  </p>
                ) : (
                  selectedOptions.map(id => {
                    const opt = CUSTOMIZATION_OPTIONS.find(o => o.id === id);
                    return opt && (
                      <div key={id} className="flex justify-between text-sm font-sans">
                        <span className={isLight ? "text-gray-600" : "text-gray-400"}>{opt.label}</span>
                        <span className={`font-bold ${isLight ? "text-black" : "text-white"}`}>₹{opt.price.toLocaleString("en-IN")}</span>
                      </div>
                    );
                  })
                )}
              </div>

              <div className={`mt-8 pt-6 border-t ${isLight ? "border-gray-200" : "border-white/10"}`}>
                <div className="flex justify-between items-end mb-6">
                  <span className={`text-xs font-bold uppercase tracking-widest ${isLight ? "text-gray-500" : "text-gray-400"}`}>
                    Estimated Total
                  </span>
                  <span className={`text-3xl font-serif font-bold ${isLight ? "text-black" : "text-white"}`}>
                    ₹{estimatedPrice.toLocaleString("en-IN")}
                  </span>
                </div>

                <button 
                  onClick={handleWhatsApp}
                  disabled={selectedOptions.length === 0}
                  className={`w-full py-4 rounded-xl flex items-center justify-center gap-2 font-sans font-bold text-sm tracking-wide transition-all ${
                    selectedOptions.length === 0 
                      ? "opacity-50 cursor-not-allowed bg-gray-300 text-gray-500 dark:bg-gray-800 dark:text-gray-600"
                      : "bg-[#25D366] hover:bg-[#1DA851] text-white shadow-lg shadow-[#25D366]/20 hover:scale-[1.02]"
                  }`}
                >
                  <Send className="w-4 h-4" />
                  Request via WhatsApp
                </button>
                <p className={`text-[10px] text-center mt-3 font-sans ${isLight ? "text-gray-500" : "text-gray-400"}`}>
                  Prices are estimates. Final quote will be provided on WhatsApp.
                </p>
              </div>
            </div>
          </div>
        </div>

      </motion.div>
    </div>
  );
}
