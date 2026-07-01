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
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error("Failed to parse bookings", e);
    }
    return [];
  },

  saveBookings: (bookings: Booking[]) => {
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
  },

  // ── Manual Blocked Dates ──
  getManualBlockedDates: (): BlockedDate[] => {
    try {
      const saved = localStorage.getItem(BLOCKED_DATES_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error("Failed to parse blocked dates", e);
    }
    return [];
  },

  saveManualBlockedDates: (dates: BlockedDate[]) => {
    localStorage.setItem(BLOCKED_DATES_KEY, JSON.stringify(dates));
  },

  // ── Rental Inventory ──
  getRentalInventory: (): RentalItem[] => {
    try {
      const saved = localStorage.getItem(RENTAL_ITEMS_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error("Failed to parse rental inventory", e);
    }
    return RENTAL_ITEMS;
  },

  saveRentalInventory: (items: RentalItem[]) => {
    localStorage.setItem(RENTAL_ITEMS_KEY, JSON.stringify(items));
  },

  // ── Coupons ──
  isCouponUsed: (): boolean => {
    return localStorage.getItem(WELCOME_COUPON_KEY) === "true";
  },

  markCouponUsed: () => {
    localStorage.setItem(WELCOME_COUPON_KEY, "true");
  }
};
