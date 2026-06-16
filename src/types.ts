export interface PriceOption {
  label: string; // e.g. "START PRICE", "BASIC", "STANDARD", "PREMIUM", "LUXURY"
  price: number; // e.g. 3999
  features: string[];
}

export interface PhotoshootCategory {
  id: string;
  name: string; // e.g. "Baby Shoot / Baby Shower", "Car & Bike Delivery", "Traditional / House Warming", "Pre Wedding"
  description: string;
  prices: PriceOption[];
  icon: string; // Lucide icon identifier
  imagePlaceholder: string; // visual color or keyword for generation
}

export interface RentalItem {
  id: string;
  name: string; // Sony ZV-E10, Nikon D3400, DJI Ronin RS 4 Mini
  category: "Camera" | "Drone" | "Stabilizer";
  pricePerDay: number;
  specs: string[];
  description: string;
  availability: boolean;
  image: string;
  gallery?: string[];
}

export interface Booking {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  type: "rental" | "photoshoot";
  selectedItemName: string; // e.g. "Sony ZV-E10" or "Pre Wedding - Premium"
  pricePaid: number;
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD (same as start for single slot photoshoot)
  timeSlot?: string; // e.g. "Full Day", "09:00 AM - 01:00 PM", "02:00 PM - 06:00 PM"
  status: "pending" | "confirmed" | "completed" | "cancelled";
  whatsappSent: boolean;
  notes?: string;
  createdAt: string;
}

export interface BlockedDate {
  date: string; // YYYY-MM-DD
  reason: string; // e.g., "Booked out", "Maintenance", "Private holiday"
}
