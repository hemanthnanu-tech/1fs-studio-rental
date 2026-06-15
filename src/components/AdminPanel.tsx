import React, { useState } from "react";
import {
  Lock, FileText, CheckCircle2, Trash2, TrendingUp, Coins, Ban,
  Plus, LogOut, Sliders, Calendar, X, AlertCircle, Shield, Copy
} from "lucide-react";
import { Booking, BlockedDate, RentalItem } from "../types";
import { motion, AnimatePresence } from "motion/react";

interface AdminPanelProps {
  bookings: Booking[];
  blockedDates: BlockedDate[];
  rentalItems: RentalItem[];
  onAddBlockedDate: (date: string, reason: string) => void;
  onRemoveBlockedDate: (date: string) => void;
  onUpdateBookingStatus: (id: string, status: "pending"|"confirmed"|"completed"|"cancelled") => void;
  onDeleteBooking: (id: string) => void;
  onToggleRentalAvailability: (id: string) => void;
  onClose: () => void;
  isLight: boolean;
}

export function AdminPanel({ bookings, blockedDates, rentalItems, onAddBlockedDate, onRemoveBlockedDate, onUpdateBookingStatus, onDeleteBooking, onToggleRentalAvailability, onClose, isLight }: AdminPanelProps) {
  const [authenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [blockDate, setBlockDate] = useState("");
  const [blockReason, setBlockReason] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "hemi" && password === "hemi") { setAuthenticated(true); setLoginError(""); }
    else setLoginError("Invalid credentials. Please try again.");
  };

  const handleBlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (!blockDate) return;
    onAddBlockedDate(blockDate, blockReason || "Admin block");
    setBlockDate(""); setBlockReason("");
  };

  const revenue = bookings.filter(b => b.status==="confirmed"||b.status==="completed").reduce((s,b)=>s+b.pricePaid,0);
  const pending  = bookings.filter(b => b.status==="pending").length;

  // Theme helpers
  const modalBg  = isLight ? "bg-white border-[#D0E8F5]" : "bg-[#060D18] border-[#0E6BA8]/20";
  const panelBg  = isLight ? "bg-[#F8FBFF] border-[#D0E8F5]"  : "bg-[#070E1A] border-[#0E6BA8]/12";
  const innerBg  = isLight ? "bg-white border-[#E0EEF8]"       : "bg-[#0A1628] border-[#0E6BA8]/10";
  const headText = isLight ? "text-[#0B2545]" : "text-[#EEF4F9]";
  const subText  = isLight ? "text-[#5E747F]" : "text-[#A8DADC]";
  const border   = isLight ? "border-[#D0E8F5]" : "border-[#0E6BA8]/12";
  const inputCls = isLight
    ? "input-light"
    : "w-full bg-[#0A1628] border border-[#0E6BA8]/20 rounded-xl py-2.5 px-3.5 text-sm text-[#EEF4F9] placeholder-[#3A5068] focus:outline-none focus:border-[#0E6BA8] focus:ring-2 focus:ring-[#0E6BA8]/15 transition-all font-mono";

  const statusCls = (s: string) => {
    const map: Record<string,string> = {
      confirmed: "bg-[#00897B]/10 text-[#00897B] border-[#00897B]/20",
      completed:  "bg-[#0E6BA8]/10 text-[#0E6BA8] border-[#0E6BA8]/20",
      cancelled:  "bg-red-500/10 text-red-500 border-red-400/20",
      pending:    "bg-yellow-400/10 text-yellow-500 border-yellow-400/20",
    };
    return map[s] || map.pending;
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-3 sm:p-4 overflow-y-auto"
        style={{ background: isLight ? "rgba(240,247,255,0.90)" : "rgba(4,12,20,0.90)", backdropFilter: "blur(20px)" }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ type: "spring", stiffness: 320, damping: 28 }}
          className={`relative w-full max-w-6xl rounded-2xl border shadow-2xl p-4 sm:p-6 md:p-8 my-4 sm:my-8 max-h-[92vh] overflow-y-auto ${modalBg}`}
          style={{ boxShadow: isLight
            ? "0 30px 100px -20px rgba(14,107,168,0.15)"
            : "0 30px 100px -20px rgba(0,0,0,0.8), 0 0 50px rgba(14,107,168,0.06)" }}
        >
          <div className={`absolute top-0 inset-x-0 h-px rounded-t-2xl ${isLight ? "bg-black/10" : "bg-white/10"}`} />

          {/* Close */}
          <button id="admin-close-btn" onClick={onClose}
            className={`absolute top-4 right-4 sm:top-6 sm:right-6 w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center border transition-all z-10 ${
              isLight ? "border-[#D0E8F5] hover:bg-[#EEF4F9] text-[#5E747F]" : "border-[#0E6BA8]/20 hover:bg-[#0E6BA8]/10 text-[#A8DADC]"
            }`}
          >
            <X className="w-4 h-4" />
          </button>

          {!authenticated ? (
            /* Login Form */
            <div className="max-w-sm mx-auto py-8 sm:py-12 flex flex-col items-center">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 border ${
                isLight ? "bg-[#0E6BA8]/8 border-[#0E6BA8]/15" : "bg-[#0E6BA8]/15 border-[#0E6BA8]/25"
              }`}>
                <Lock className="w-6 h-6 text-[#0E6BA8]" />
              </div>
              <span className="text-[10px] uppercase tracking-widest text-[#0E6BA8] font-mono font-bold mb-1">Staff Gateway</span>
              <h2 className={`text-2xl sm:text-3xl font-serif font-bold text-center mb-1 ${headText}`}>Admin Console</h2>
              <p className={`text-xs text-center mb-7 ${subText}`}>1FS Photography · Manage bookings & gear</p>

              <form id="admin-login-form" onSubmit={handleLogin} className="w-full space-y-4">
                <div>
                  <label className={`block text-[10px] uppercase tracking-wider font-mono mb-1.5 ${subText}`}>Username</label>
                  <input type="text" placeholder="Enter username" value={username} onChange={e=>setUsername(e.target.value)} className={inputCls} />
                </div>
                <div>
                  <label className={`block text-[10px] uppercase tracking-wider font-mono mb-1.5 ${subText}`}>Password</label>
                  <input type="password" placeholder="••••••" value={password} onChange={e=>setPassword(e.target.value)} className={inputCls} />
                </div>
                {loginError && (
                  <div className="flex items-center gap-2 text-xs bg-red-500/10 border border-red-400/20 text-red-500 p-3 rounded-xl">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{loginError}</span>
                  </div>
                )}
                <button id="admin-login-btn" type="submit"
                  className={`w-full py-3 hover:opacity-90 font-semibold rounded-xl text-sm transition-all cursor-pointer shadow-md mt-2 ${isLight ? "bg-[#0B2545] text-white" : "bg-white text-black"}`}
                >
                  Sign In
                </button>
              </form>
            </div>
          ) : (
            /* Dashboard */
            <div>
              {/* Dashboard header */}
              <div className={`flex flex-col sm:flex-row justify-between items-start sm:items-center border-b pb-5 mb-6 gap-3 ${border}`}>
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="w-1.5 h-1.5 bg-[#00897B] rounded-full animate-pulse" />
                    <span className="text-[10px] uppercase tracking-widest text-[#00897B] font-mono font-semibold">Live Session</span>
                  </div>
                  <h2 className={`text-xl sm:text-2xl font-serif font-black ${headText}`}>1FS Studio Dashboard</h2>
                  <p className={`text-xs mt-0.5 ${subText}`}>Manage bookings, gear availability & blocked dates.</p>
                </div>
                <button onClick={()=>setAuthenticated(false)}
                  className="flex items-center gap-2 px-3 py-1.5 border border-red-400/20 hover:bg-red-500/8 text-red-500 rounded-xl text-xs font-mono transition-all cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Logout
                </button>
              </div>

              {/* Metric cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
                {[
                  { label: "Bookings", value: bookings.length, icon: FileText, color: "text-[#0E6BA8]", card: isLight?"bg-[#0E6BA8]/5 border-[#0E6BA8]/15":"from-[#0E6BA8]/15 to-[#0E6BA8]/5 border-[#0E6BA8]/20" },
                  { label: "Revenue", value: `₹${revenue.toLocaleString("en-IN")}`, icon: Coins, color: "text-[#00897B]", card: isLight?"bg-[#00897B]/5 border-[#00897B]/15":"from-[#00897B]/15 to-[#00897B]/5 border-[#00897B]/20" },
                  { label: "Pending", value: pending, icon: TrendingUp, color: "text-yellow-500", card: isLight?"bg-yellow-400/5 border-yellow-400/15":"from-yellow-400/15 to-yellow-400/5 border-yellow-400/20" },
                  { label: "Blocked", value: blockedDates.length, icon: Ban, color: "text-red-500", card: isLight?"bg-red-400/5 border-red-400/15":"from-red-400/15 to-red-400/5 border-red-400/20" },
                ].map(({label,value,icon:Icon,color,card},i)=>(
                  <div key={i} className={`p-4 rounded-2xl border ${card}`}>
                    <span className={`text-[9px] uppercase font-mono tracking-widest ${subText}`}>{label}</span>
                    <div className="flex justify-between items-end mt-2">
                      <span className={`text-xl sm:text-2xl font-mono font-bold ${color}`}>{value}</span>
                      <Icon className={`w-4 h-4 ${color} opacity-70`} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Tools + Bookings */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">

                {/* Tools sidebar */}
                <div className="lg:col-span-5 space-y-5">

                  {/* Block date */}
                  <div className={`p-4 sm:p-5 rounded-2xl border ${panelBg}`}>
                    <h3 className="text-[10px] uppercase tracking-widest text-[#0E6BA8] font-mono font-semibold mb-3.5 flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5" />
                      Block Calendar Date
                    </h3>
                    <form onSubmit={handleBlock} className="space-y-2.5">
                      <div>
                        <label className={`block text-[9px] uppercase font-mono tracking-wider mb-1 ${subText}`}>Target Date</label>
                        <input type="date" required value={blockDate} onChange={e=>setBlockDate(e.target.value)} className={inputCls} />
                      </div>
                      <div>
                        <label className={`block text-[9px] uppercase font-mono tracking-wider mb-1 ${subText}`}>Reason</label>
                        <input type="text" placeholder="e.g. Pre-booked offline" value={blockReason} onChange={e=>setBlockReason(e.target.value)} className={inputCls} />
                      </div>
                      <button type="submit"
                        className={`w-full py-2 border rounded-xl text-xs font-semibold font-mono transition-all cursor-pointer flex items-center justify-center gap-2 ${
                          isLight
                            ? "bg-[#0E6BA8]/8 border-[#0E6BA8]/20 text-[#0E6BA8] hover:bg-[#0E6BA8] hover:text-white"
                            : `bg-transparent border-[#0E6BA8]/20 text-[#0E6BA8] hover:border-transparent ${isLight ? "hover:bg-[#0B2545] hover:text-white" : "hover:bg-white hover:text-black"}`
                        }`}
                      >
                        <Plus className="w-3.5 h-3.5" />
                        Add Block
                      </button>
                    </form>

                    {blockedDates.length > 0 && (
                      <div className={`mt-3.5 pt-3.5 border-t max-h-[140px] overflow-y-auto space-y-1.5 ${border}`}>
                        {blockedDates.map(item=>(
                          <div key={item.date} className={`flex justify-between items-center p-2.5 rounded-xl border text-xs ${innerBg}`}>
                            <div>
                              <span className={`font-mono block ${isLight ? "text-[#0B2545]" : "text-[#A8DADC]"}`}>{item.date}</span>
                              <span className={`text-[9px] ${subText}`}>{item.reason}</span>
                            </div>
                            <button onClick={()=>onRemoveBlockedDate(item.date)}
                              className="px-2 py-0.5 rounded-lg bg-red-500/10 border border-red-400/20 text-red-500 hover:bg-red-500 hover:text-white transition-all text-[9px] font-mono cursor-pointer"
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Gear availability */}
                  <div className={`p-4 sm:p-5 rounded-2xl border ${panelBg}`}>
                    <h3 className="text-[10px] uppercase tracking-widest text-[#0E6BA8] font-mono font-semibold mb-3.5 flex items-center gap-2">
                      <Sliders className="w-3.5 h-3.5" />
                      Gear Rental Availability
                    </h3>
                    <div className="space-y-2.5">
                      {rentalItems.map(item=>(
                        <div key={item.id} className={`flex items-center justify-between p-2.5 rounded-xl border ${innerBg}`}>
                          <div className="flex items-center gap-2.5 min-w-0">
                            <img src={item.image} className="w-9 h-9 object-cover rounded-lg border border-[#0E6BA8]/15 shrink-0" alt="" />
                            <div className="min-w-0">
                              <span className={`text-xs font-semibold block truncate ${headText}`}>{item.name}</span>
                              <span className="text-[9px] uppercase font-mono text-[#0E6BA8]">₹{item.pricePerDay}/day</span>
                            </div>
                          </div>
                          <button type="button" onClick={()=>onToggleRentalAvailability(item.id)}
                            className={`ml-2 shrink-0 px-2.5 py-1 text-[9px] font-mono font-bold rounded-full border transition-all cursor-pointer ${
                              item.availability
                                ? "bg-[#00897B]/10 text-[#00897B] border-[#00897B]/25 hover:bg-[#00897B] hover:text-white"
                                : "bg-red-500/10 text-red-500 border-red-400/25 hover:bg-red-500 hover:text-white"
                            }`}
                          >
                            {item.availability ? "AVAILABLE" : "RENTED"}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bookings log */}
                <div className={`lg:col-span-7 p-4 sm:p-5 rounded-2xl border flex flex-col ${panelBg}`}>
                  <h3 className="text-[10px] uppercase tracking-widest text-[#0E6BA8] font-mono font-semibold mb-4">
                    Reservations Register
                  </h3>

                  {bookings.length === 0 ? (
                    <div className={`text-center py-12 ${subText}`}>
                      <p className="text-sm">No bookings yet.</p>
                      <p className="text-[11px] mt-1">Customer bookings will appear here.</p>
                    </div>
                  ) : (
                    <div className="space-y-3 max-h-[480px] overflow-y-auto pr-1">
                      {bookings.map(b=>(
                        <div key={b.id} className={`p-3.5 rounded-xl border ${innerBg}`}>
                          <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 border-b mb-2.5 ${border}`}>
                            <div>
                              <div className="flex items-center gap-2 mb-1 flex-wrap">
                                <span className={`text-[9px] uppercase font-mono font-semibold px-2 py-0.5 rounded-full border ${
                                  b.type==="rental"
                                    ? "bg-[#0E6BA8]/10 text-[#0E6BA8] border-[#0E6BA8]/15"
                                    : "bg-[#6A5ACD]/10 text-[#6A5ACD] border-[#6A5ACD]/15"
                                }`}>
                                  {b.type==="rental" ? "Rental" : "Shoot"}
                                </span>
                                <span className={`text-[10px] font-mono ${subText}`}>
                                  {b.startDate===b.endDate ? b.startDate : `${b.startDate} → ${b.endDate}`}
                                </span>
                              </div>
                              <h4 className={`text-sm font-semibold ${headText}`}>{b.selectedItemName}</h4>
                            </div>
                            <div className="flex sm:flex-col items-center sm:items-end gap-2">
                              <span className="text-sm font-mono font-bold text-gradient-ocean">₹{b.pricePaid.toLocaleString("en-IN")}</span>
                              <select value={b.status} onChange={e=>onUpdateBookingStatus(b.id,e.target.value as any)}
                                className={`text-[9px] font-mono rounded-lg border py-1 px-2 focus:outline-none transition-all cursor-pointer ${
                                  isLight ? "bg-white " + statusCls(b.status) : "bg-[#070E1A] " + statusCls(b.status)
                                }`}
                              >
                                <option value="pending">Pending</option>
                                <option value="confirmed">Confirmed</option>
                                <option value="completed">Completed</option>
                                <option value="cancelled">Cancelled</option>
                              </select>
                            </div>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                            <div>
                              <span className={`block text-[9px] uppercase font-mono tracking-wider mb-0.5 ${subText}`}>Client</span>
                              <span className={`block font-semibold ${headText}`}>{b.customerName}</span>
                              <span className={`block font-mono text-[10px] ${subText}`}>{b.customerPhone}</span>
                              <span className={`block font-mono text-[10px] ${subText}`}>{b.customerEmail}</span>
                            </div>
                            <div className="flex flex-col items-start sm:items-end justify-between">
                              <div>
                                <span className={`block text-[9px] uppercase font-mono tracking-wider mb-0.5 text-left sm:text-right ${subText}`}>Notes</span>
                                <p className={`text-[10px] sm:text-right max-w-[180px] truncate ${subText}`}>{b.notes||"—"}</p>
                              </div>
                              <div className="flex items-center gap-3 mt-2">
                                {b.status === "confirmed" && (
                                  <button onClick={() => {
                                    const text = `🧾 1FS STUDIO RECEIPT\n-----------------------\nName: ${b.customerName}\nItem: ${b.selectedItemName}\nAmount Paid: ₹${b.pricePaid.toLocaleString("en-IN")}\nDate: ${b.startDate}\n-----------------------\nThank you for choosing 1FS Studio!`;
                                    navigator.clipboard.writeText(text);
                                    alert("Receipt copied to clipboard!");
                                  }}
                                    className="text-[#0E6BA8] hover:text-[#00897B] text-[9px] uppercase tracking-wider font-mono flex items-center gap-1 cursor-pointer"
                                  >
                                    <Copy className="w-3 h-3" />
                                    Receipt
                                  </button>
                                )}
                                <button onClick={()=>onDeleteBooking(b.id)}
                                  className="text-red-400 hover:text-red-500 text-[9px] uppercase tracking-wider font-mono flex items-center gap-1 cursor-pointer"
                                >
                                  <Trash2 className="w-3 h-3" />
                                  Delete
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
