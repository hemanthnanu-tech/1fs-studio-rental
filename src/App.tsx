/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { PhotoshootPackages } from "./components/PhotoshootPackages";
import { CameraRentals } from "./components/CameraRentals";
import { BookingCalendar } from "./components/BookingCalendar";
import { AdminPanel } from "./components/AdminPanel";
import { Lightbox } from "./components/Lightbox";
import { SocialFooter } from "./components/SocialFooter";
import { FAQ } from "./components/FAQ";
import { ThreeDCard } from "./components/ThreeDCard";
import { PHOTOSHOOT_CATEGORIES, RENTAL_ITEMS, STUDIO_STATISTICS, OUR_WORK_GALLERY } from "./data";
import { Booking, BlockedDate, RentalItem, PriceOption, PhotoshootCategory } from "./types";
import { Camera, ShieldAlert, Check, Video, Waves, X, ShoppingCart, Star } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { API } from "./api";

export default function App() {
  // ── Bookings ──
  const [bookings, setBookings] = useState<Booking[]>(() => API.getBookings());

  // ── Blocked dates (Manual) ──
  const [manualBlockedDates, setManualBlockedDates] = useState<BlockedDate[]>(() => API.getManualBlockedDates());
  const manualBlockedDateStrings = manualBlockedDates.map(b => b.date);

  // ── Rental items ──
  const [rentalItems, setRentalItems] = useState<RentalItem[]>(() => API.getRentalInventory());

  useEffect(() => { API.saveBookings(bookings); }, [bookings]);
  useEffect(() => { API.saveManualBlockedDates(manualBlockedDates); }, [manualBlockedDates]);
  useEffect(() => { API.saveRentalInventory(rentalItems); }, [rentalItems]);

  // ── Theme — default LIGHT ──
  const [isLight, setIsLight] = useState<boolean>(() => {
    const stored = localStorage.getItem("1fs_theme");
    if (stored === "light") return true;
    return false;
  });

  const handleToggleTheme = () => {
    setIsLight(prev => {
      const next = !prev;
      try { localStorage.setItem("1fs_theme", next ? "light" : "dark"); } catch(e) {}
      return next;
    });
  };

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", !isLight);
    root.classList.toggle("light", isLight);
  }, [isLight]);

  // ── Booking modal ──
  const [selectedBookingItem, setSelectedBookingItem] = useState<{
    type: "photoshoot";
    item: PhotoshootCategory;
    priceOption: PriceOption;
  } | {
    type: "rental";
    items: RentalItem[];
  } | null>(null);
  const [cartItems, setCartItems] = useState<RentalItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);

  const [isAdminOpen, setIsAdminOpen] = useState(false);

  const [showWelcomeCoupon, setShowWelcomeCoupon] = useState(false);

  useEffect(() => {
    if (!API.isCouponUsed()) {
      setTimeout(() => setShowWelcomeCoupon(true), 1500);
    }
  }, []);

  const closeWelcomeCoupon = () => {
    setShowWelcomeCoupon(false);
    API.markCouponUsed();
  };



  const handleAddBlockedDate = (date: string, reason: string) => {
    if (manualBlockedDates.some(b => b.date === date)) return;
    setManualBlockedDates(prev => [...prev, { date, reason }]);
  };

  const handleRemoveBlockedDate = (date: string) => {
    setManualBlockedDates(prev => prev.filter(b => b.date !== date));
  };

  const handleUpdateBookingStatus = (id: string, status: "pending"|"confirmed"|"completed"|"cancelled") => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b));
  };

  const handleDeleteBooking = (id: string) => {
    if (window.confirm("Delete this booking entry?")) {
      setBookings(prev => prev.filter(b => b.id !== id));
    }
  };

  const handleToggleRentalAvailability = (itemId: string) => {
    setRentalItems(prev => prev.map(item =>
      item.id === itemId ? { ...item, availability: !item.availability } : item
    ));
  };

  const handleAddNewBooking = (data: {
    customerName: string; customerPhone: string; customerEmail: string;
    type: "rental"|"photoshoot"; selectedItemName: string; pricePaid: number;
    startDate: string; endDate: string; timeSlot?: string; notes?: string;
  }) => {
    const record: Booking = {
      id: "booking-" + Date.now(),
      ...data,
      status: "pending",
      whatsappSent: false,
      createdAt: new Date().toISOString()
    };
    setBookings(prev => [record, ...prev]);
  };

  const handleRentClick = (items: RentalItem[]) =>
    setSelectedBookingItem({ type: "rental", items });

  const handlePhotoshootOptionClick = (category: PhotoshootCategory, priceOption: PriceOption) =>
    setSelectedBookingItem({ type: "photoshoot", item: category, priceOption });

  return (
    <div className={`min-h-screen flex flex-col justify-between transition-colors duration-500 ${
      isLight ? "bg-[#F9F9F9] text-black" : "bg-black text-white"
    }`}>


      <Navbar
        onAdminClick={() => setIsAdminOpen(true)}
        bookingsCount={bookings.filter(b => b.status === "pending").length}
        isLight={isLight}
        onToggleTheme={handleToggleTheme}
      />

      <main className="flex-grow">
        <HeroSection isLight={isLight} />

        <PhotoshootPackages
          categories={PHOTOSHOOT_CATEGORIES}
          onBookPackageClick={handlePhotoshootOptionClick}
          isLight={isLight}
        />

        <CameraRentals 
          items={RENTAL_ITEMS} 
          onAddToCart={handleRentClick} 
          isLight={isLight}
          onProductClick={(gallery) => {
            setLightboxImages(gallery);
            setIsLightboxOpen(true);
          }}
        />

        <section id="portfolio" className={`py-24 relative overflow-hidden transition-colors duration-500 ${
          isLight ? "bg-white" : "bg-black"
        }`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col gap-16">
              
              {/* Top Text & Features (Bento Style) */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className={`lg:col-span-2 p-10 rounded-[2rem] border backdrop-blur-xl ${
                  isLight ? "bg-gray-50 border-gray-200" : "bg-white/5 border-white/10"
                }`}>
                  <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-sans font-bold uppercase tracking-widest mb-6 ${
                    isLight ? "bg-black/5 text-black" : "bg-white/10 text-white"
                  }`}>
                    <span className="w-2 h-2 rounded-full bg-[var(--ori-accent)]" />
                    Our Portfolio
                  </span>
                  <h3 className="text-4xl md:text-5xl font-serif font-bold tracking-tighter leading-none mb-6">
                    Why Creators <br />Choose 1FS
                  </h3>
                  <p className={`text-base md:text-lg max-w-xl font-sans leading-relaxed ${isLight ? "text-gray-600" : "text-gray-400"}`}>
                    1FS Studio bridges top-tier hardware rentals and stunning visual storytelling. Baby themes, pre-wedding cinematic, house warming reveals, or automobile captures — we deliver memorable moments.
                  </p>
                </div>

                <div className="flex flex-col gap-6">
                  {[
                    { icon: Camera, title: "Maintained Fleet", desc: "Sensor-cleaned cameras & lenses." },
                    { icon: Video, title: "Cinematic Edits", desc: "Expert color grading included." },
                    { icon: ShieldAlert, title: "Verified Process", desc: "Secure deposits & ID verification." },
                  ].map(({ icon: Icon, title, desc }, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      className={`flex-1 p-6 rounded-[2rem] border flex flex-col justify-center ${
                        isLight ? "bg-gray-50 border-gray-200" : "bg-white/5 border-white/10"
                      }`}
                    >
                      <Icon className="w-6 h-6 mb-3 text-[var(--ori-accent-2)]" />
                      <h4 className="text-sm font-bold font-sans mb-1">{title}</h4>
                      <p className={`text-xs font-sans ${isLight ? "text-gray-500" : "text-gray-400"}`}>{desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Full Width Masonry Grid for All Images */}
              <div className="columns-2 sm:columns-3 lg:columns-4 gap-4 space-y-4">
                {OUR_WORK_GALLERY.map((src, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: (i % 8) * 0.1 }}
                    className={`relative rounded-3xl overflow-hidden group cursor-pointer break-inside-avoid shadow-sm`}
                    onClick={() => {
                      setLightboxImages(OUR_WORK_GALLERY);
                      setIsLightboxOpen(true);
                    }}
                  >
                    <img 
                      src={src} 
                      alt={`1FS Studio Portfolio ${i + 1}`} 
                      className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700" 
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-300 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-white text-xs font-bold font-sans tracking-wide flex items-center gap-2">
                        <Camera className="w-3.5 h-3.5" />
                        Expand
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

            </div>
          </div>
        </section>
        <FAQ isLight={isLight} />
      </main>

      <SocialFooter isLight={isLight} />

      {isLightboxOpen && (
        <Lightbox 
          images={lightboxImages} 
          onClose={() => setIsLightboxOpen(false)} 
        />
      )}

      {/* Floating Cart Button */}
      <AnimatePresence>
        {cartItems.length > 0 && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={() => setIsCartOpen(true)}
            className={`fixed bottom-6 right-6 z-40 p-4 rounded-full shadow-2xl flex items-center gap-2 font-mono text-xs uppercase font-bold hover:scale-105 transition-transform ${isLight ? "bg-[#171717] text-white" : "bg-white text-black"}`}
          >
            <ShoppingCart className="w-5 h-5" />
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${isLight ? "bg-white text-[#171717]" : "bg-black text-white"}`}>
              {cartItems.length}
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── Cart Drawer ── */}
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-50 flex justify-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className={`relative w-full max-w-md h-full shadow-2xl border-l flex flex-col z-10 ${
                isLight ? "bg-[#F4F4F5] border-[#E4E4E7]" : "bg-[#09090B] border-[#52525B]/20"
              }`}
            >
              <div className={`p-6 border-b flex justify-between items-center ${isLight ? "border-[#E4E4E7]" : "border-[#52525B]/20"}`}>
                <h2 className={`text-xl font-serif font-black ${isLight ? "text-[#171717]" : "text-white"}`}>Your Gear Cart</h2>
                <button onClick={() => setIsCartOpen(false)} className={`p-2 rounded-xl border transition-colors ${
                  isLight ? "border-[#E4E4E7] text-[#171717] hover:bg-[#FAFAFA]" : "border-[#52525B]/20 text-[#A1A1AA] hover:bg-[#18181B]"
                }`}>
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {cartItems.length === 0 ? (
                  <p className={`text-sm font-mono text-center mt-10 ${isLight ? "text-[#71717A]" : "text-[#A1A1AA]"}`}>
                    Your cart is completely empty.
                  </p>
                ) : (
                  cartItems.map(item => (
                    <motion.div layout key={item.id} className={`flex gap-4 p-3 rounded-2xl border ${
                      isLight ? "border-[#E4E4E7] bg-white" : "border-[#52525B]/20 bg-[#18181B]"
                    }`}>
                      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-xl" />
                      <div className="flex-1 py-1">
                        <h4 className={`text-xs font-bold font-serif line-clamp-1 ${isLight ? "text-[#171717]" : "text-[#FAFAFA]"}`}>{item.name}</h4>
                        <p className={`text-sm font-mono font-bold mt-1 ${isLight ? "text-[#52525B]" : "text-[#71717A]"}`}>₹{item.pricePerDay}<span className="text-[9px] text-gray-500">/day</span></p>
                      </div>
                      <button onClick={() => setCartItems(prev => prev.filter(i => i.id !== item.id))} className="text-red-500 p-2 hover:bg-red-500/10 rounded-xl transition-colors self-center">
                        <X className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ))
                )}
              </div>
              {cartItems.length > 0 && (
                <div className={`p-6 border-t ${isLight ? "border-[#E4E4E7] bg-white" : "border-[#52525B]/20 bg-[#09090B]"}`}>
                  <div className="flex justify-between items-center mb-4">
                    <span className={`text-xs font-mono uppercase tracking-widest ${isLight ? "text-[#71717A]" : "text-[#A1A1AA]"}`}>Subtotal/Day</span>
                    <span className={`text-xl font-serif font-black ${isLight ? "text-[#171717]" : "text-white"}`}>
                      ₹{cartItems.reduce((acc, item) => acc + item.pricePerDay, 0).toLocaleString("en-IN")}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      const msg = `Hi 1FS Studio! I'd like to rent the following gear:\n${cartItems.map(i => `- ${i.name} (₹${i.pricePerDay}/day)`).join("\n")}\n\nPlease let me know the availability.`;
                      window.open(`https://wa.me/917795849384?text=${encodeURIComponent(msg)}`, "_blank");
                    }}
                    className={`w-full py-4 rounded-xl font-mono text-xs font-bold uppercase tracking-widest hover:opacity-90 shadow-lg ${isLight ? "bg-[#171717] text-white" : "bg-white text-black"}`}
                  >
                    Checkout via WhatsApp
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedBookingItem && (
          <BookingCalendar
            selectedItem={selectedBookingItem}
            manualBlockedDates={manualBlockedDateStrings}
            allBookings={bookings}
            onNewBookingAdded={handleAddNewBooking}
            onClose={() => setSelectedBookingItem(null)}
            isLight={isLight}
          />
        )}
      </AnimatePresence>

      {isAdminOpen && (
        <AdminPanel
          bookings={bookings}
          blockedDates={manualBlockedDates}
          rentalItems={rentalItems}
          onAddBlockedDate={handleAddBlockedDate}
          onRemoveBlockedDate={handleRemoveBlockedDate}
          onUpdateBookingStatus={handleUpdateBookingStatus}
          onDeleteBooking={handleDeleteBooking}
          onToggleRentalAvailability={handleToggleRentalAvailability}
          onClose={() => setIsAdminOpen(false)}
          isLight={isLight}
        />
      )}

      {/* First Time Welcome Coupon Modal */}
      <AnimatePresence>
        {showWelcomeCoupon && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className={`relative max-w-sm w-full p-6 sm:p-8 rounded-2xl shadow-2xl text-center border overflow-hidden ${
                isLight ? "bg-white border-[#E4E4E7]" : "bg-[#09090B] border-[#52525B]/30"
              }`}
            >
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-amber-400 to-orange-500" />
              <button 
                onClick={closeWelcomeCoupon}
                className={`absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full transition-colors ${
                  isLight ? "hover:bg-gray-100 text-gray-500" : "hover:bg-white/10 text-gray-400"
                }`}
              >
                <X className="w-4 h-4" />
              </button>
              
              <div className="w-16 h-16 mx-auto bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mb-5">
                <Star className="w-8 h-8 fill-current" />
              </div>
              
              <h3 className={`text-2xl font-serif font-black mb-2 ${isLight ? "text-gray-900" : "text-white"}`}>
                Welcome to 1FS!
              </h3>
              <p className={`text-sm mb-6 ${isLight ? "text-gray-600" : "text-gray-400"}`}>
                Book your first photoshoot or camera rental with us and enjoy a special ₹100 discount.
              </p>
              
              <div className={`p-4 rounded-xl border-2 border-dashed mb-6 font-mono text-xl font-black tracking-widest ${
                isLight ? "bg-gray-50 border-gray-300 text-gray-900" : "bg-white/5 border-white/20 text-white"
              }`}>
                1FSNEW
              </div>
              
              <button 
                onClick={closeWelcomeCoupon}
                className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-black font-bold shadow-lg transition-colors"
              >
                Got it, thanks!
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
