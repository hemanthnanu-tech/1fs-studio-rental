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
    if (window.confirm(`Are you sure you want to unblock ${date}?`)) {
      setManualBlockedDates(prev => prev.filter(b => b.date !== date));
    }
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
      isLight ? "bg-light-mesh text-black" : "bg-black text-white"
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

        <section id="portfolio" className={`py-20 sm:py-28 relative overflow-hidden transition-colors duration-500 ${
          isLight ? "bg-gray-50" : "bg-[#080808]"
        }`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col gap-16">

              {/* Top Text & Features */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className={`lg:col-span-2 p-8 sm:p-10 rounded-[2rem] border ${
                  isLight ? "bg-white border-gray-200 shadow-sm" : "bg-white/3 border-white/8"
                }`}>
                  <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-sans font-bold uppercase tracking-widest mb-6 ${
                    isLight ? "bg-gray-100 text-gray-600" : "bg-white/8 text-gray-400"
                  }`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--ori-accent)]" />
                    Our Portfolio
                  </span>
                  <h3 className={`text-3xl md:text-5xl font-serif font-black tracking-tighter leading-tight mb-5 ${
                    isLight ? "text-gray-900" : "text-white"
                  }`}>
                    Why Creators<br />Choose 1FS
                  </h3>
                  <p className={`text-base max-w-lg font-sans leading-relaxed ${
                    isLight ? "text-gray-500" : "text-gray-400"
                  }`}>
                    1FS Studio bridges top-tier hardware rentals and stunning visual storytelling. Baby themes, pre-wedding cinematic, house warming reveals, or automobile captures — we deliver memorable moments.
                  </p>
                </div>

                <div className="flex flex-col gap-4">
                  {[
                    { icon: Camera, title: "Maintained Fleet", desc: "Sensor-cleaned cameras & lenses always ready." },
                    { icon: Video, title: "Cinematic Edits", desc: "Expert color grading included in every package." },
                    { icon: ShieldAlert, title: "Verified Process", desc: "Secure deposits & full ID verification." },
                  ].map(({ icon: Icon, title, desc }, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      className={`flex-1 p-5 rounded-2xl border flex items-start gap-4 ${
                        isLight ? "bg-white border-gray-200 shadow-sm" : "bg-white/3 border-white/8"
                      }`}
                    >
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                        isLight ? "bg-gray-100" : "bg-white/8"
                      }`}>
                        <Icon className="w-4 h-4 text-[var(--ori-accent-2)]" />
                      </div>
                      <div>
                        <h4 className={`text-sm font-bold font-sans mb-1 ${
                          isLight ? "text-gray-900" : "text-white"
                        }`}>{title}</h4>
                        <p className={`text-xs font-sans leading-relaxed ${
                          isLight ? "text-gray-500" : "text-gray-400"
                        }`}>{desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Gallery Grid */}
              <div className="columns-2 sm:columns-3 lg:columns-4 gap-3 space-y-3">
                {OUR_WORK_GALLERY.map((src, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 40, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ type: "spring", stiffness: 200, damping: 25, delay: Math.random() * 0.4 }}
                    className="relative rounded-2xl overflow-hidden group cursor-pointer break-inside-avoid"
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
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-300 bg-white/15 backdrop-blur-sm px-4 py-2 rounded-full text-white text-xs font-bold font-sans tracking-wide flex items-center gap-2">
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

      {/* Welcome Coupon Modal */}
      <AnimatePresence>
        {showWelcomeCoupon && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.92, y: 24 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 24 }}
              transition={{ type: "spring", stiffness: 280, damping: 24 }}
              className={`relative max-w-sm w-full rounded-3xl shadow-2xl overflow-hidden border ${
                isLight ? "bg-white border-gray-200" : "bg-[#111] border-white/10"
              }`}
            >
              {/* Top stripe */}
              <div className="h-1 w-full bg-gradient-to-r from-[var(--ori-accent-2)] via-purple-400 to-[var(--ori-accent)]" />

              <div className="p-7 sm:p-8 text-center">
                <button
                  onClick={closeWelcomeCoupon}
                  className={`absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-xl transition-colors ${
                    isLight ? "hover:bg-gray-100 text-gray-400" : "hover:bg-white/10 text-gray-500"
                  }`}
                >
                  <X className="w-4 h-4" />
                </button>

                <div className={`w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-6 ${
                  isLight ? "bg-purple-50" : "bg-white/5"
                }`}>
                  <Star className="w-8 h-8 text-[var(--ori-accent-2)] fill-current" />
                </div>

                <h3 className={`text-2xl font-serif font-black mb-2 tracking-tight ${
                  isLight ? "text-gray-900" : "text-white"
                }`}>
                  Welcome to 1FS!
                </h3>
                <p className={`text-sm mb-7 leading-relaxed ${
                  isLight ? "text-gray-500" : "text-gray-400"
                }`}>
                  Book your first photoshoot or camera rental and enjoy a special ₹100 discount.
                </p>

                <div className={`p-4 rounded-2xl border-2 border-dashed mb-6 ${
                  isLight ? "bg-gray-50 border-gray-300" : "bg-white/5 border-white/15"
                }`}>
                  <span className={`font-mono text-2xl font-black tracking-[0.15em] ${
                    isLight ? "text-gray-900" : "text-white"
                  }`}>1FSNEW</span>
                  <p className={`text-[10px] mt-1 font-mono uppercase tracking-widest ${
                    isLight ? "text-gray-400" : "text-gray-600"
                  }`}>Your discount code</p>
                </div>

                <button
                  onClick={closeWelcomeCoupon}
                  className={`w-full py-3.5 rounded-2xl font-bold font-sans text-sm shadow-lg transition-all hover:scale-105 ${
                    isLight
                      ? "bg-gray-900 text-white hover:bg-black"
                      : "bg-white text-black hover:bg-gray-100"
                  }`}
                >
                  Got it, thanks!
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
