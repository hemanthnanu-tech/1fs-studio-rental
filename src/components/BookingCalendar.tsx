import React, { useState } from "react";
import { Calendar, ChevronLeft, ChevronRight, Info, Check, Send, AlertTriangle, X } from "lucide-react";
import { RentalItem, PhotoshootCategory, PriceOption, Booking } from "../types";
import { STUDIO_STATISTICS } from "../data";
import { motion, AnimatePresence } from "motion/react";

interface BookingCalendarProps {
  selectedItem: {
    type: "photoshoot";
    item: PhotoshootCategory;
    priceOption: PriceOption;
  } | {
    type: "rental";
    items: RentalItem[];
  } | null;
  manualBlockedDates: string[];
  allBookings: Booking[];
  onNewBookingAdded: (data: {
    customerName: string; customerPhone: string; customerEmail: string;
    type: "rental" | "photoshoot"; selectedItemName: string; pricePaid: number;
    startDate: string; endDate: string; timeSlot?: string; notes?: string;
  }) => void;
  onClose: () => void;
  isLight: boolean;
}

export function BookingCalendar({ selectedItem, manualBlockedDates, allBookings, onNewBookingAdded, onClose, isLight }: BookingCalendarProps) {
  if (!selectedItem) return null;
  const type = selectedItem.type;
  const isRental = selectedItem.type === "rental";
  
  const itemName = selectedItem.type === "rental" 
    ? selectedItem.items.map(i => i.name).join(" + ") 
    : selectedItem.item.name;

  const priceOption = selectedItem.type === "photoshoot" ? selectedItem.priceOption : null;

  const today = new Date();
  const [currentYear, setCurrentYear]   = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [startDateStr, setStartDateStr] = useState("");
  const [endDateStr, setEndDateStr]     = useState("");
  const [selectedSlot, setSelectedSlot] = useState("Full Day");
  const [clientName, setClientName]     = useState("");
  const [clientPhone, setClientPhone]   = useState("");
  const [clientEmail, setClientEmail]   = useState("");
  const [notes, setNotes]               = useState("");
  const [errorMsg, setErrorMsg]         = useState("");
  const [submitting, setSubmitting]     = useState(false);
  const [succeeded, setSucceeded]       = useState(false);
  const [showCouponStep, setShowCouponStep] = useState(false);
  
  const [couponCode, setCouponCode]     = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError]   = useState("");

  const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDay    = new Date(currentYear, currentMonth, 1).getDay();

  const prevMonth = () => { if (currentMonth===0){setCurrentMonth(11);setCurrentYear(y=>y-1);}else setCurrentMonth(m=>m-1); };
  const nextMonth = () => { if (currentMonth===11){setCurrentMonth(0);setCurrentYear(y=>y+1);}else setCurrentMonth(m=>m+1); };

  const fmt = (d: number) => `${currentYear}-${String(currentMonth+1).padStart(2,"0")}-${String(d).padStart(2,"0")}`;
  const isPast = (d: number) => new Date(currentYear, currentMonth, d) < new Date(today.getFullYear(), today.getMonth(), today.getDate());

  const isDateBlocked = (str: string) => {
    if (manualBlockedDates.includes(str)) return true;
    
    // Check bookings
    for (const b of allBookings) {
      if (b.status === "cancelled") continue;
      
      const start = new Date(b.startDate);
      const end = new Date(b.endDate);
      const check = new Date(str);
      
      if (check >= start && check <= end) {
        if (selectedItem.type === "photoshoot") {
          // Photoshoots block other photoshoots
          if (b.type === "photoshoot") return true;
        } else if (selectedItem.type === "rental") {
          // A rental item is blocked ONLY if that specific item was rented
          for (const item of selectedItem.items) {
            if (b.selectedItemName.includes(item.name)) return true;
          }
        }
      }
    }
    return false;
  };

  const handleDayClick = (str: string) => {
    if (isDateBlocked(str)) return;
    if (type === "photoshoot") { setStartDateStr(str); setEndDateStr(str); return; }
    if (!startDateStr || (startDateStr && endDateStr && startDateStr !== endDateStr)) {
      setStartDateStr(str); setEndDateStr(str);
    } else if (startDateStr && startDateStr === endDateStr) {
      const s = new Date(startDateStr), c = new Date(str);
      if (c >= s) {
        let t = new Date(s); let blocked = false;
        while (t <= c) { if (isDateBlocked(t.toISOString().split("T")[0])) { blocked=true; break; } t.setDate(t.getDate()+1); }
        if (blocked) { setStartDateStr(str); setEndDateStr(str); } else setEndDateStr(str);
      } else { setStartDateStr(str); setEndDateStr(str); }
    }
  };

  const handleApplyCoupon = () => {
    if (couponCode.toUpperCase() === "1FSNEW") {
      const used = localStorage.getItem("1fsnew_used");
      if (used) {
        setCouponError("Coupon already used on this device.");
        setCouponApplied(false);
      } else {
        setCouponApplied(true);
        setCouponError("");
      }
    } else {
      setCouponError("Invalid coupon code.");
      setCouponApplied(false);
    }
  };

  const duration = startDateStr && endDateStr
    ? Math.round(Math.abs(Date.UTC(new Date(endDateStr).getFullYear(), new Date(endDateStr).getMonth(), new Date(endDateStr).getDate()) - Date.UTC(new Date(startDateStr).getFullYear(), new Date(startDateStr).getMonth(), new Date(startDateStr).getDate())) / 86400000) + 1
    : 1;

  const basePrice = selectedItem.type === "rental"
    ? selectedItem.items.reduce((sum, i) => sum + i.pricePerDay, 0) * duration
    : (priceOption?.price ?? 3999);

  const totalPrice = couponApplied ? Math.max(0, basePrice - 100) : basePrice;

  const formatDate = (ds: string) => {
    if (!ds) return "";
    return new Date(ds).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
  };

  const sendWhatsApp = () => {
    if (couponApplied) {
      localStorage.setItem("1fsnew_used", "true");
    }
    const dateRange = startDateStr === endDateStr ? `on ${formatDate(startDateStr)}` : `from ${formatDate(startDateStr)} to ${formatDate(endDateStr)} (${duration} days)`;
    const slotText  = type === "photoshoot" ? `\n🕒 Time Slot: ${selectedSlot}` : "";
    const msg = `*✨ 1FS Photography Booking ✨*\n\nHello ${STUDIO_STATISTICS.developerName} (1FS Team),\n\n📅 *Booking Details:*\n• Name: ${clientName}\n• Phone: ${clientPhone}\n• Email: ${clientEmail}\n• Service: ${isRental ? "Camera Rental" : "Photoshoot"}\n• Package: ${itemName}${priceOption ? ` [${priceOption.label}]` : ""}\n• Date(s): ${dateRange}${slotText}\n• Total: ₹${totalPrice.toLocaleString("en-IN")}${couponApplied ? " (Includes ₹100 Off Coupon)" : ""}\n• Notes: ${notes || "None"}\n\nPlease confirm availability. Thank you! 📸`;
    window.open(`https://wa.me/${STUDIO_STATISTICS.whatsappNum}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!startDateStr || !clientName || !clientPhone || !clientEmail) {
      setErrorMsg("Please fill in all required fields and select a date.");
      return;
    }
    setErrorMsg("");
    setSubmitting(true);
    const name = isRental ? itemName : `${itemName} (${priceOption?.label})`;
    setTimeout(() => {
      onNewBookingAdded({ customerName: clientName, customerPhone: clientPhone, customerEmail: clientEmail, type, selectedItemName: name, pricePaid: totalPrice, startDate: startDateStr, endDate: endDateStr, timeSlot: type==="photoshoot" ? selectedSlot : "Full Day", notes });
      setSubmitting(false);
      setShowCouponStep(true);
    }, 500);
  };

  const finalizeBooking = () => {
    setShowCouponStep(false);
    setSucceeded(true);
  };

  // Theme-aware classes
  const modalBg    = isLight ? "bg-white border-[#E4E4E7]" : "bg-[#09090B] border-[#52525B]/20";
  const sectionBg  = isLight ? "bg-[#FAFAFA]" : "bg-[#18181B]";
  const headText   = isLight ? "text-[#171717]" : "text-[#FAFAFA]";
  const subText    = isLight ? "text-[#71717A]" : "text-[#A1A1AA]";
  const border     = isLight ? "border-[#E4E4E7]" : "border-[#52525B]/15";
  const inputCls   = isLight
    ? "input-light"
    : "w-full bg-[#18181B] border border-[#52525B]/20 rounded-xl py-2.5 px-3.5 text-sm text-[#FAFAFA] placeholder-[#52525B] focus:outline-none focus:border-[#52525B] focus:ring-2 focus:ring-[#52525B]/15 transition-all";

  // Calendar day builder
  const days = [];
  for (let i = 0; i < firstDay; i++) days.push(<div key={`e${i}`} />);
  for (let d = 1; d <= daysInMonth; d++) {
    const str = fmt(d);
    const past = isPast(d);
    const blocked = isDateBlocked(str);
    const todayStr = today.toISOString().split("T")[0];
    const sel = str === startDateStr || str === endDateStr;
    const inRange = startDateStr && endDateStr && str > startDateStr && str < endDateStr;

    days.push(
      <button
        key={d}
        type="button"
        disabled={past || blocked}
        onClick={() => handleDayClick(str)}
        className={`w-8 h-8 sm:w-10 sm:h-10 mx-auto text-xs sm:text-sm font-medium rounded-full relative transition-all duration-300 flex flex-col items-center justify-center
          ${past    ? "opacity-30 cursor-not-allowed " + (isLight ? "text-[#71717A]" : "text-[#52525B]") : ""}
          ${blocked ? "bg-red-500/10 text-red-400 line-through cursor-not-allowed border border-red-400/20" : ""}
          ${sel     ? (isLight ? "bg-black text-white font-bold shadow-lg scale-110" : "bg-white text-black font-bold shadow-[0_0_15px_rgba(255,255,255,0.4)] scale-110") : ""}
          ${inRange && !sel && !blocked ? (isLight ? "bg-black/5 text-black" : "bg-white/10 text-white") : ""}
          ${!sel && !inRange && !blocked && !past
            ? (isLight
                ? "text-[#171717] hover:bg-black/5 hover:text-black hover:scale-105"
                : "text-[#A1A1AA] hover:bg-white/10 hover:text-white hover:scale-105")
            : ""}
        `}
      >
        <span>{d}</span>
        {str === todayStr && !sel && <span className={`w-1 h-1 rounded-full absolute bottom-1 ${isLight ? "bg-black" : "bg-white"}`} />}
        {blocked && !past && <span className="text-[6px] uppercase tracking-tighter absolute bottom-0.5">Held</span>}
      </button>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-3 sm:p-4 overflow-y-auto"
        style={{ background: isLight ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.8)", backdropFilter: "blur(24px) saturate(1.5)" }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 30 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className={`relative w-full max-w-3xl rounded-[2.5rem] p-5 sm:p-8 my-4 sm:my-8 shadow-2xl border backdrop-blur-3xl ${
            isLight ? "bg-white/95 border-gray-200" : "bg-black/80 border-white/10"
          }`}
        >

          {/* Header */}
          <div className={`flex items-center justify-between border-b pb-5 mb-6 ${isLight ? "border-black/10" : "border-white/10"}`}>
            <div>
              <span className={`text-[10px] uppercase tracking-widest font-mono font-bold block mb-1 ${isLight ? "text-gray-500" : "text-gray-400"}`}>
                {type === "rental" ? "Camera Rental Booking" : "Photoshoot Reservation"}
              </span>
              <h2 className={`text-2xl sm:text-3xl font-serif font-black tracking-tight ${isLight ? "text-black" : "text-white"}`}>
                {isRental ? "Rent" : "Book"}: {itemName}
              </h2>
            </div>
            <button id="booking-close-btn" onClick={onClose}
              className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all ${
                isLight ? "border-gray-200 hover:bg-gray-100 text-black" : "border-white/20 hover:bg-white/10 text-white"
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {succeeded ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-8 sm:py-12 text-center"
            >
              <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-5 border ${
                isLight ? "bg-[#71717A]/8 border-[#71717A]/20" : "bg-[#71717A]/15 border-[#71717A]/25"
              }`}>
                <Check className="w-7 h-7 text-[#71717A]" />
              </div>
              <h3 className={`text-xl sm:text-2xl font-serif font-semibold mb-2 ${headText}`}>Booking Confirmed!</h3>
              <p className={`max-w-sm mx-auto mb-7 text-xs sm:text-sm leading-relaxed ${subText}`}>
                Tap below to send your booking request to{" "}
                <strong className={isLight ? "text-[#171717]" : "text-[#A1A1AA]"}>{STUDIO_STATISTICS.photographerName}</strong>{" "}
                via WhatsApp for instant confirmation.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button id="whatsapp-confirm-btn" onClick={sendWhatsApp}
                  className={`flex items-center justify-center gap-2 px-5 py-2.5 hover:opacity-90 font-semibold rounded-xl shadow-lg text-sm cursor-pointer ${isLight ? "bg-[#171717] text-white" : "bg-white text-black"}`}
                >
                  <Send className="w-4 h-4" />
                  Send via WhatsApp
                </button>
                <button onClick={onClose}
                  className={`px-5 py-2.5 border rounded-xl text-sm transition-all ${
                    isLight ? "border-[#E4E4E7] text-[#71717A] hover:bg-[#FAFAFA]" : "border-[#52525B]/20 text-[#A1A1AA] hover:border-[#52525B]/40"
                  }`}
                >
                  Close
                </button>
              </div>
            </motion.div>
          ) : showCouponStep ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-6 sm:py-10 text-center"
            >
              <h3 className={`text-xl sm:text-2xl font-serif font-semibold mb-2 ${headText}`}>Have a Coupon Code?</h3>
              <p className={`max-w-sm mx-auto mb-6 text-xs sm:text-sm leading-relaxed ${subText}`}>
                If you have a discount code, enter it below before confirming your booking.
              </p>
              
              <div className="flex flex-col items-center w-full max-w-xs mx-auto gap-4">
                <div className="w-full relative">
                  <input 
                    type="text" 
                    placeholder="e.g. 1FSNEW" 
                    value={couponCode} 
                    onChange={e => {setCouponCode(e.target.value); setCouponError("");}} 
                    className={`w-full px-4 py-3 rounded-xl border text-sm text-center uppercase tracking-widest font-mono font-bold transition-all ${
                      isLight 
                        ? "bg-[#FAFAFA] border-[#E4E4E7] focus:border-[#171717] focus:ring-1 focus:ring-[#171717] text-[#171717]" 
                        : "bg-[#18181B] border-[#52525B]/20 focus:border-[#52525B]/60 focus:ring-1 focus:ring-[#52525B]/60 text-[#FAFAFA]"
                    }`}
                    disabled={couponApplied}
                  />
                  {couponError && <p className="text-red-500 text-[10px] mt-2 absolute w-full text-center">{couponError}</p>}
                </div>

                {!couponApplied ? (
                  <button 
                    type="button" 
                    onClick={handleApplyCoupon}
                    disabled={!couponCode}
                    className={`w-full py-3 rounded-xl text-sm font-bold shadow-md hover:opacity-90 transition-all ${
                      isLight ? "bg-[#171717] text-white" : "bg-white text-black"
                    }`}
                  >
                    Apply Coupon
                  </button>
                ) : (
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }} 
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-full p-3 rounded-xl bg-green-500/10 border border-green-500/20 text-green-500 text-sm font-bold flex flex-col items-center gap-1"
                  >
                    <span className="flex items-center gap-1.5"><Check className="w-4 h-4" /> ₹100 Off Applied!</span>
                  </motion.div>
                )}

                <div className="flex w-full gap-2 mt-4">
                  <button 
                    onClick={finalizeBooking}
                    className={`flex-1 py-3 border rounded-xl text-xs font-semibold transition-all ${
                      isLight ? "border-[#E4E4E7] text-[#71717A] hover:bg-[#FAFAFA]" : "border-[#52525B]/20 text-[#A1A1AA] hover:border-[#52525B]/40"
                    }`}
                  >
                    Skip
                  </button>
                  <button 
                    onClick={finalizeBooking}
                    className={`flex-1 py-3 rounded-xl text-xs font-bold shadow-md hover:opacity-90 transition-all ${
                      isLight ? "bg-[#171717] text-white" : "bg-white text-black"
                    }`}
                  >
                    Continue
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-7">

              {/* Calendar */}
              <div className="lg:col-span-7">
                <div className="flex items-center justify-between mb-6">
                  <h3 className={`text-xs font-bold uppercase tracking-widest font-mono flex items-center gap-2 ${
                    isLight ? "text-black" : "text-white"
                  }`}>
                    <Calendar className="w-4 h-4" />
                    Select Date(s)
                  </h3>
                  <div className={`flex items-center gap-2 p-1 rounded-full border ${
                    isLight ? "bg-white/50 border-black/10 shadow-sm" : "bg-black/50 border-white/10"
                  }`}>
                    <button type="button" onClick={prevMonth} className={`p-2 rounded-full transition-all ${isLight ? "hover:bg-black/5 text-black" : "hover:bg-white/10 text-white"}`}>
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <span className={`text-[11px] font-mono min-w-[110px] text-center font-bold ${isLight ? "text-black" : "text-white"}`}>
                      {MONTHS[currentMonth]} {currentYear}
                    </span>
                    <button type="button" onClick={nextMonth} className={`p-2 rounded-full transition-all ${isLight ? "hover:bg-black/5 text-black" : "hover:bg-white/10 text-white"}`}>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className={`grid grid-cols-7 gap-y-2 gap-x-1 text-center mb-3 text-[10px] font-sans font-bold tracking-widest uppercase ${isLight ? "text-gray-500" : "text-gray-400"}`}>
                  {["Su","Mo","Tu","We","Th","Fr","Sa"].map(d => <div key={d}>{d}</div>)}
                </div>
                <div className="grid grid-cols-7 gap-y-2 gap-x-1 mb-6">{days}</div>

                {/* Selection summary */}
                {startDateStr ? (
                  <div className={`mt-3 rounded-xl p-3 border flex items-center justify-between text-xs ${
                    isLight ? "bg-[#52525B]/5 border-[#52525B]/15" : "bg-[#52525B]/8 border-[#52525B]/20"
                  }`}>
                    <div>
                      <span className={`block font-mono text-[9px] uppercase tracking-wider ${subText}`}>Selected</span>
                      <span className={`font-semibold text-xs ${headText}`}>{startDateStr === endDateStr ? formatDate(startDateStr) : `${formatDate(startDateStr)} → ${formatDate(endDateStr)}`}</span>
                    </div>
                    {type === "rental" && <div className="text-right">
                      <span className={`block font-mono text-[9px] uppercase tracking-wider ${subText}`}>Duration</span>
                      <span className={`font-semibold ${headText}`}>{duration} {duration===1?"Day":"Days"}</span>
                    </div>}
                  </div>
                ) : (
                  <div className={`mt-3 rounded-xl p-3 border flex items-start gap-2 text-xs ${
                    isLight ? "bg-[#FAFAFA] border-[#E4E4E7]" : "bg-[#52525B]/5 border-[#52525B]/10"
                  }`}>
                    <Info className="w-3.5 h-3.5 text-[#52525B] shrink-0 mt-0.5" />
                    <span className={subText}>{type==="rental" ? "Click start date, then end date. Red = unavailable." : "Tap a date to book your photoshoot slot."}</span>
                  </div>
                )}

                {/* Time slots */}
                {type === "photoshoot" && (
                  <div className="mt-4">
                    <h4 className={`text-[10px] uppercase tracking-widest font-mono font-semibold mb-2.5 ${subText}`}>Preferred Time Slot</h4>
                    <div className="grid grid-cols-3 gap-2">
                      {["Full Day", "Morning (9AM–2PM)", "Evening (3PM–8PM)"].map(slot => (
                        <button key={slot} type="button" onClick={() => setSelectedSlot(slot)}
                          className={`py-1.5 px-2 text-[9px] sm:text-[10px] font-medium rounded-xl border text-center transition-all cursor-pointer ${
                            selectedSlot === slot
                              ? (isLight ? "bg-[#171717] text-white border-transparent shadow-sm" : "bg-white text-black border-transparent shadow-sm")
                              : (isLight
                                  ? "bg-white border-[#E4E4E7] text-[#71717A] hover:border-[#52525B]/40"
                                  : "bg-[#18181B] border-[#52525B]/15 text-[#A1A1AA] hover:border-[#52525B]/40")
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Client form */}
              <div className={`lg:col-span-5 border-t lg:border-t-0 lg:border-l pt-5 lg:pt-0 lg:pl-6 xl:pl-8 flex flex-col justify-between ${border}`}>
                <div>
                  <h3 className={`text-xs font-semibold uppercase tracking-wider font-mono mb-4 ${isLight ? "text-[#171717]" : "text-[#A1A1AA]"}`}>
                    Your Details
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <label className={`block text-[10px] uppercase tracking-wider font-mono mb-1.5 ${subText}`}>Full Name *</label>
                      <input type="text" required placeholder="e.g. Rahul Sharma" value={clientName} onChange={e=>setClientName(e.target.value)} className={inputCls} />
                    </div>
                    <div>
                      <label className={`block text-[10px] uppercase tracking-wider font-mono mb-1.5 ${subText}`}>WhatsApp / Mobile *</label>
                      <input type="tel" required placeholder="e.g. +91 98765 43210" value={clientPhone} onChange={e=>setClientPhone(e.target.value)} className={inputCls} />
                    </div>
                    <div>
                      <label className={`block text-[10px] uppercase tracking-wider font-mono mb-1.5 ${subText}`}>Email *</label>
                      <input type="email" required placeholder="e.g. you@email.com" value={clientEmail} onChange={e=>setClientEmail(e.target.value)} className={inputCls} />
                    </div>
                    <div>
                      <label className={`block text-[10px] uppercase tracking-wider font-mono mb-1.5 ${subText}`}>Special Notes</label>
                      <textarea placeholder="Any specific requirements..." value={notes} onChange={e=>setNotes(e.target.value)}
                        rows={2} className={`${inputCls} resize-none`} />
                    </div>
                  </div>



                  {/* Price summary */}
                  <div className={`mt-4 rounded-2xl p-3.5 border ${
                    isLight ? "bg-white border-[#E4E4E7]" : "bg-[#09090B] border-[#52525B]/15"
                  }`}>
                    <div className={`flex justify-between items-center text-xs mb-1 ${subText}`}>
                      <span>Rate:</span>
                      <span>{selectedItem.type === "rental" ? `₹${selectedItem.items.reduce((s, i) => s + i.pricePerDay, 0)}/day` : priceOption?.label}</span>
                    </div>
                    {type==="rental" && duration>1 && (
                      <div className={`flex justify-between items-center text-xs mb-1 ${subText}`}>
                        <span>Days:</span><span>{duration}</span>
                      </div>
                    )}
                    <div className={`border-t mt-2 pt-2 flex justify-between items-end ${border}`}>
                      <span className="text-xs text-[#52525B] font-mono font-semibold">Total</span>
                      <div className="text-right">
                        {couponApplied && <span className="block text-[10px] text-green-500 font-bold mb-0.5">- ₹100 Discount Applied</span>}
                        <span className={`text-xl font-mono font-bold ${isLight ? "text-gradient-ocean" : "text-white"}`}>
                          ₹{totalPrice.toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>
                  </div>

                  {type==="rental" && (
                    <div className={`mt-2.5 flex items-start gap-1.5 text-[10px] ${subText}`}>
                      <AlertTriangle className="w-3.5 h-3.5 text-[#52525B]/60 shrink-0 mt-0.5" />
                      <span>Rentals require valid Government ID and a refundable deposit.</span>
                    </div>
                  )}
                </div>

                {errorMsg && (
                  <motion.div initial={{opacity:0, y:-10}} animate={{opacity:1, y:0}} className="mt-4 p-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs flex items-center gap-2">
                    <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errorMsg}</span>
                  </motion.div>
                )}

                <div className="mt-5 flex gap-2.5">
                  <button type="button" onClick={onClose}
                    className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-semibold border transition-all ${
                      isLight ? "border-[#E4E4E7] text-[#71717A] hover:bg-[#FAFAFA]" : "bg-[#18181B] border-[#52525B]/15 text-[#A1A1AA] hover:border-[#52525B]/40"
                    }`}
                  >
                    Cancel
                  </button>
                  <button id="confirm-rent-btn" type="submit" disabled={submitting || !startDateStr}
                    className={`flex-1 py-2.5 px-3 disabled:opacity-40 disabled:cursor-not-allowed rounded-xl text-xs font-bold shadow-md hover:opacity-90 transition-all flex items-center justify-center gap-1.5 cursor-pointer ${isLight ? "bg-[#171717] text-white" : "bg-white text-black"}`}
                  >
                    {submitting ? "Booking..." : `Confirm ${type==="rental" ? "Rental" : "Booking"}`}
                  </button>
                </div>
              </div>
            </form>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
