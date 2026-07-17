import { Booking, BlockedDate, RentalItem } from "./types";
import { RENTAL_ITEMS } from "./data";

const BOOKINGS_KEY = "1fs_bookings";
const BLOCKED_DATES_KEY = "1fs_blocked_dates";
const RENTAL_ITEMS_KEY = "1fs_rental_items";
const WELCOME_COUPON_KEY = "1fsnew_used";

export const API = {
  // ── Bookings ──
  getBookings: (): Booking[] => {
    try {
      const saved = localStorage.getItem(BOOKINGS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.warn("Failed to parse bookings, resetting to empty array.", e);
      localStorage.removeItem(BOOKINGS_KEY);
    }
    return [];
  },

  saveBookings: (bookings: Booking[]) => {
    try {
      localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
    } catch (e) {
      console.error("Storage quota exceeded or saving failed.", e);
    }
  },

  // ── Manual Blocked Dates ──
  getManualBlockedDates: (): BlockedDate[] => {
    try {
      const saved = localStorage.getItem(BLOCKED_DATES_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          // Auto-clean expired blocked dates
          const today = new Date().toISOString().split("T")[0];
          const validDates = parsed.filter(d => d.date >= today);
          if (validDates.length !== parsed.length) {
            localStorage.setItem(BLOCKED_DATES_KEY, JSON.stringify(validDates));
          }
          return validDates;
        }
      }
    } catch (e) {
      console.warn("Failed to parse blocked dates, resetting.", e);
      localStorage.removeItem(BLOCKED_DATES_KEY);
    }
    return [];
  },

  saveManualBlockedDates: (dates: BlockedDate[]) => {
    try {
      localStorage.setItem(BLOCKED_DATES_KEY, JSON.stringify(dates));
    } catch (e) {
      console.error("Failed to save blocked dates.", e);
    }
  },

  // ── Rental Inventory ──
  getRentalInventory: (): RentalItem[] => {
    try {
      const saved = localStorage.getItem(RENTAL_ITEMS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn("Failed to parse rental inventory, resetting to defaults.", e);
      localStorage.removeItem(RENTAL_ITEMS_KEY);
    }
    return RENTAL_ITEMS;
  },

  saveRentalInventory: (items: RentalItem[]) => {
    try {
      localStorage.setItem(RENTAL_ITEMS_KEY, JSON.stringify(items));
    } catch (e) {
      console.error("Failed to save rental inventory.", e);
    }
  },

  // ── Coupons ──
  isCouponUsed: (): boolean => {
    return localStorage.getItem(WELCOME_COUPON_KEY) === "true";
  },

  markCouponUsed: () => {
    localStorage.setItem(WELCOME_COUPON_KEY, "true");
  }
};
