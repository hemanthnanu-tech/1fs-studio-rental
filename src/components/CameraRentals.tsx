import React, { useState, useMemo } from "react";
import { RentalItem } from "../types";
import { Check, Sparkles, AlertCircle, ShoppingCart } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface CameraRentalsProps {
  items: RentalItem[];
  isLight: boolean;
  onAddToCart: (items: RentalItem[]) => void;
  onProductClick?: (images: string[]) => void;
}

export function CameraRentals({ items, isLight, onAddToCart, onProductClick }: CameraRentalsProps) {
  const [categoryFilter, setCategoryFilter] = useState<string>("All");
  const [cart, setCart] = useState<RentalItem[]>([]);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const categories = ["All", ...Array.from(new Set(items.map(i => i.category)))];

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchesCategory = categoryFilter === "All" || item.category === categoryFilter;
      return matchesCategory;
    });
  }, [items, categoryFilter]);

  return (
    <section
      id="rentals"
      className={`py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden transition-colors duration-500 ${
        isLight ? "bg-gray-50" : "bg-[#050505]"
      }`}
    >
      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className={`text-5xl sm:text-6xl md:text-7xl font-sans font-bold tracking-tighter leading-none mb-6 ${isLight ? "text-black" : "text-white"}`}>
              Pro Gear.<br />Ready to Shoot.
            </h2>
            <p className={`text-lg sm:text-xl font-sans font-medium max-w-xl ${isLight ? "text-gray-500" : "text-gray-400"}`}>
              High-performance cameras and stabilizers available for daily rent. Essential for creators, videographers, and photographers.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className={`p-5 rounded-3xl max-w-sm flex items-start gap-4 backdrop-blur-xl border ${
              isLight ? "bg-white/50 border-gray-200" : "bg-white/5 border-white/10"
            }`}
          >
            <div className="w-10 h-10 rounded-2xl bg-black/5 dark:bg-white/10 flex items-center justify-center shrink-0">
              <AlertCircle className={`w-5 h-5 ${isLight ? "text-black" : "text-white"}`} />
            </div>
            <p className={`text-xs font-sans leading-relaxed ${isLight ? "text-gray-600" : "text-gray-400"}`}>
              All rentals require Aadhaar / Government ID verification. Charged per 24-hr slot. Safety accessories included.
            </p>
          </motion.div>
        </div>

        {/* Filters */}
        <div className="flex mb-12">
          <div className="flex gap-2 w-full overflow-x-auto pb-4 hide-scrollbar">
            {categories.map(cat => (
              <button 
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-6 py-2 rounded-full text-sm font-sans font-bold transition-all whitespace-nowrap cursor-pointer ${
                  categoryFilter === cat 
                    ? "bg-black text-white dark:bg-white dark:text-black shadow-md scale-105" 
                    : isLight 
                      ? "bg-white text-gray-500 hover:text-black border border-gray-200" 
                      : "bg-white/5 text-gray-400 hover:text-white border border-white/5 hover:bg-white/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.length === 0 && (
            <div className="col-span-full py-20 text-center font-sans text-xl text-gray-500">
              No gear found matching your criteria.
            </div>
          )}
          {filteredItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={`group flex flex-col rounded-[2.5rem] p-6 sm:p-8 transition-transform hover:-translate-y-2 border shadow-sm ${
                isLight ? "bg-white border-gray-200" : "bg-[#111] border-white/5 hover:border-white/15"
              }`}
            >
              {/* Product Image Area */}
              <div 
                onClick={() => item.gallery && onProductClick?.(item.gallery)}
                className={`relative aspect-[4/3] w-full rounded-[2rem] overflow-hidden mb-8 flex items-center justify-center ${
                  item.gallery ? "cursor-pointer" : ""
                } ${isLight ? "bg-gray-50" : "bg-black"}`}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-[80%] h-[80%] object-contain group-hover:scale-110 transition-transform duration-700 ease-[0.16,1,0.3,1]"
                  referrerPolicy="no-referrer"
                />
                
                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  <span className={`text-[10px] uppercase font-sans font-bold px-3 py-1.5 rounded-full backdrop-blur-md border ${
                    item.availability
                      ? (isLight ? "bg-green-100/50 text-green-700 border-green-200" : "bg-green-500/20 text-green-400 border-green-500/30")
                      : (isLight ? "bg-red-100/50 text-red-700 border-red-200" : "bg-red-500/20 text-red-400 border-red-500/30")
                  }`}>
                    {item.availability ? "Available" : "Out of Stock"}
                  </span>
                </div>
              </div>

              {/* Product Info */}
              <div className="flex flex-col flex-1">
                <span className={`text-[10px] font-sans font-bold uppercase tracking-widest mb-2 ${isLight ? "text-gray-400" : "text-gray-500"}`}>
                  {item.category}
                </span>
                
                <h3 className={`text-2xl font-sans font-bold tracking-tight mb-2 ${isLight ? "text-black" : "text-white"}`}>
                  {item.name}
                </h3>
                
                <p className={`text-sm font-sans line-clamp-2 mb-6 flex-1 ${isLight ? "text-gray-500" : "text-gray-400"}`}>
                  {item.description}
                </p>

                <div className="flex items-end justify-between mt-auto">
                  <div>
                    <span className={`text-3xl font-sans font-bold tracking-tighter ${isLight ? "text-black" : "text-white"}`}>
                      ₹{item.pricePerDay}
                    </span>
                    <span className={`text-xs font-sans ml-1 ${isLight ? "text-gray-500" : "text-gray-400"}`}>/ day</span>
                  </div>

                  <button 
                    onClick={() => {
                      if (cart.some(i => i.id === item.id)) {
                        setCart(cart.filter(i => i.id !== item.id));
                        showToast(`Removed ${item.name}`);
                      } else {
                        setCart([...cart, item]);
                        showToast(`Added ${item.name}`);
                      }
                    }}
                    disabled={!item.availability}
                    aria-label={cart.some(i => i.id === item.id) ? "Remove from cart" : "Add to cart"}
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                      !item.availability
                        ? (isLight ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-white/5 text-gray-600 cursor-not-allowed")
                        : cart.some(i => i.id === item.id)
                          ? "bg-[var(--ori-accent)] text-black"
                          : (isLight ? "bg-black text-white hover:scale-110" : "bg-white text-black hover:scale-110")
                    }`}
                  >
                    {!item.availability ? (
                      <ShoppingCart className="w-5 h-5 opacity-50" />
                    ) : cart.some(i => i.id === item.id) ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <ShoppingCart className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Floating Cart Button */}
      <AnimatePresence>
        {cart.length > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-sm"
          >
            <button
              onClick={() => {
                onAddToCart(cart);
                setCart([]);
              }}
              className="w-full bg-[var(--ori-accent)] text-black py-4 px-8 rounded-full shadow-[0_8px_32px_rgba(226,255,61,0.3)] flex items-center justify-between font-sans font-bold hover:scale-105 transition-transform"
            >
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-black/10 flex items-center justify-center text-xs">
                  {cart.length}
                </div>
                <span>Book Gear</span>
              </div>
              <span className="text-lg">₹{cart.reduce((sum, item) => sum + item.pricePerDay, 0)}</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast Notification */}
      <AnimatePresence>
        {toastMsg && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-32 left-1/2 -translate-x-1/2 z-[100] px-6 py-3 rounded-full shadow-2xl flex items-center gap-2 border bg-black text-white dark:bg-white dark:text-black border-white/20 dark:border-black/20"
          >
            <Check className="w-4 h-4 text-[var(--ori-accent)] dark:text-green-600" />
            <span className="text-sm font-sans font-bold tracking-wide">{toastMsg}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
