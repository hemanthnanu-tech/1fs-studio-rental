import { PhotoshootCategory, RentalItem } from "./types";

export const PHOTOSHOOT_CATEGORIES: PhotoshootCategory[] = [
  {
    id: "baby-shoot",
    name: "Baby Shoot & Baby Shower",
    description: "Joyful, whimsical captures of your tiny treasures and lovely baby showers. Multi-theme custom setups, professional lighting, and timeless photo styling.",
    imagePlaceholder: "baby",
    icon: "Baby",
    prices: [
      {
        label: "START PRICE",
        price: 3999,
        features: [
          "Professional Photography session",
          "Expert lighting setup (indoor or outdoor)",
          "Beautifully edited digital photos",
          "Deliverables: High-res digital JPGs"
        ]
      },
      {
        label: "BASIC",
        price: 6999,
        features: [
          "Professional Photography",
          "Cinematic Videography session",
          "Edited premium digital photos",
          "1 Creative Baby Theme preset setup"
        ]
      },
      {
        label: "STANDARD",
        price: 9999,
        features: [
          "Cinematic Videography & Photography",
          "Unlimited edited digital photos",
          "2 Creative Baby Theme custom setups",
          "1 Elegant Physical Photo Frame",
          "All Raw and JPG outputs delivered"
        ]
      },
      {
        label: "PREMIUM",
        price: 19999,
        features: [
          "Full-day comprehensive coverage",
          "Master-crafted Cinematic Videography & Portraits",
          "Unlimited digital edits + complete galleries",
          "10 Premium physical prints (8x10)",
          "1 Luxury customized Photo Frame",
          "2 Baby Theme customized layouts",
          "1 Exquisite custom Leather-bound Photo Album",
          "Deliverables: Super fast delivery in pendrive"
        ]
      }
    ]
  },
  {
    id: "car-bike",
    name: "Car & Bike Delivery / Showcase",
    description: "Cinematic reveals of keys, tires, and gorgeous exhaust notes. Perfect for automobile owners, bike delivery milestones, and commercial car profiles.",
    imagePlaceholder: "automotive",
    icon: "Car",
    prices: [
      {
        label: "BASIC PRICE",
        price: 4999,
        features: [
          "Premium Videography capturing highlights",
          "Ultra HD Vehicle Photography",
          "Basic delivery dynamic tracking shots",
          "Standard light editing workflow"
        ]
      },
      {
        label: "STANDARD PRICE",
        price: 6999,
        features: [
          "Professional Automobile Videography",
          "2 highly polished Cinematic Highlight Videos",
          "Advanced Vehicle Close-up Photography",
          "Completely edited digital assets"
        ]
      },
      {
        label: "PREMIUM PRICE",
        price: 14999,
        features: [
          "Expert Automobile Videography & Photography",
          "2 Cinematic vehicle reveal short videos",
          "Both fully edited and complete raw files delivered",
          "1 High-Concept outside road trip video + photos",
          "Photographers are automotive aesthetic specialists"
        ]
      }
    ]
  },
  {
    id: "traditional-house",
    name: "Traditional & House Warming",
    description: "Warming the hearth and making deep memories. Sacred Indian classical ceremonies, housewarming events (Griha Pravesha), and elegant family gatherings.",
    imagePlaceholder: "traditional",
    icon: "Home",
    prices: [
      {
        label: "STANDARD PRICE",
        price: 10499,
        features: [
          "Full-day master photographer coverage",
          "Cinematic event highlight videography",
          "Unlimited digital photography captures",
          "Carefully curated and edited digital photos",
          "Online high-speed digital output delivery"
        ]
      },
      {
        label: "PREMIUM PRICE",
        price: 15599,
        features: [
          "Full-day photography & videography coverage",
          "Cinematic story highlights edit",
          "Unlimited edited digital photos",
          "15 Physical premium album copy prints (Custom layout)",
          "Fast digital delivery of all outputs"
        ]
      },
      {
        label: "LUXURY PRICE",
        price: 20699,
        features: [
          "Over-the-top full-day wedding/event coverage",
          "Beautiful cinematic family videos",
          "Unlimited HD photography captures",
          "Careful details & portraits dynamic edits",
          "15 Premium custom album copy pages",
          "Exclusive delivery in premium USB drive"
        ]
      },
      {
        label: "PREMIUM PLUS (+)",
        price: 16799,
        features: [
          "Full-day multi-camera angle coverage",
          "Cinematic editing of highlight reels",
          "Unlimited photography & digital delivery",
          "All digital assets edited premium grade"
        ]
      }
    ]
  },
  {
    id: "pre-wedding",
    name: "Pre Wedding Cinematic Chronicles",
    description: "For stories built before the big day. Romantic sunsets, beach views, dramatic slow-motions, and magnificent couple storytelling.",
    imagePlaceholder: "wedding",
    icon: "Heart",
    prices: [
      {
        label: "STANDARD",
        price: 14999,
        features: [
          "2 Cinematic romantic story teaser videos",
          "Both Traditional & Modern couple portraits",
          "2 Unique 'Save the Date' customized graphics",
          "Scenic indoor and outdoor locations",
          "Cinematic custom-graded couple photography",
          "Unlimited raw captures delivered",
          "20 to 50 curated high-retouched digital photos"
        ]
      },
      {
        label: "PREMIUM",
        price: 29999,
        features: [
          "3 High-end cinematic love narrative videos",
          "Traditional, Modern, and Casual Western looks",
          "Multiple stunning indoor and outdoor locations",
          "Portrait and gorgeous landscape photography orientation",
          "50 to 100 professionally retouched photos",
          "Unlimited raw photographic outputs",
          "Pre-shoot couple posing consultation"
        ]
      },
      {
        label: "LUXURY",
        price: 49999,
        features: [
          "Complete full-day couple storytelling wrap",
          "Full professional makeup & couture costume support",
          "Master Class cinematic videography & directing",
          "100+ fully cinematic-graded digital photos",
          "Secure online couple gallery with 1-year hosting",
          "10 Giant ultra-glossy physical prints Album book",
          "All raw photo and video files loaded in luxury pendrive"
        ]
      }
    ]
  }
];

export const RENTAL_ITEMS: RentalItem[] = [
  {
    id: "sony-zve10",
    name: "Sony ZV-E10 Mirrorless",
    category: "Camera",
    pricePerDay: 1499,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=800",
    specs: [
      "24.2 MP APS-C Exmor CMOS Sensor",
      "Fast Hybrid Autofocus & ISO 100-32000",
      "Dynamic 4K 30p Video / S-Log3 / HLG Profile",
      "Product Showcase Auto-Focus & Background Defocus Switch",
      "Includes SEL 16-50mm Power Zoom Lens + High Speed Card"
    ],
    description: "An incredibly compact mirrorless powerhouse. Unparalleled realtime eye-tracking and pristine color profiles, optimized heavily for portraiture, pre-wedding vlogging, and indoor studio shoots.",
    availability: true
  },
  {
    id: "nikon-d3400",
    name: "Nikon D3400 DSLR Dual Lens Kit",
    category: "Camera",
    pricePerDay: 799,
    image: "https://images.unsplash.com/photo-1502920917128-1aa34503dd25?auto=format&fit=crop&q=80&w=800",
    specs: [
      "AF-P DX NIKKOR 18-55 mm f/3.5 - 5.6G VR Premium Lens",
      "AF-P DX NIKKOR 70-300 mm f/4.5 - 6.3G ED VR Telephoto Lens",
      "High Speed Class 10 16 GB SD Card Included",
      "Premium Protective Shockproof Camera Bag (Black)",
      "24.2 MP DX-Format CMOS Sensor & EXPEED 4 Processor"
    ],
    description: "NIKON D3400 DSLR Camera Body with Dual Lens: AF-P DX NIKKOR 18-55 mm f/3.5 - 5.6G VR + AF-P DX NIKKOR 70-300 mm f/4.5 - 6.3G ED VR (16 GB SD Card + Camera Bag) for magnificent zoom flexibility and pin-sharp clarity.",
    availability: true
  },
  {
    id: "dji-rs4mini",
    name: "DJI RS 4 Mini Ronin Gimbal Stabilizer",
    category: "Stabilizer",
    pricePerDay: 1199,
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=800",
    specs: [
      "Ultralight professional form factor & Carbon build",
      "High capacity 2kg (4.4 lbs) payload tolerance",
      "Native 3rd Gen RS Stabilization Algorithm",
      "10-Hour high capacity battery grip with quick charging",
      "Wireless Bluetooth direct camera shutter control"
    ],
    description: "The lightweight 3-axis professional dual-grip gimbal stabilizer. Imparts complete fluid cinematic tracking to mirrorless cameras like the Sony ZV-E10, enabling gorgeous walking, running, and low-angle shots.",
    availability: true
  }
];

export const STUDIO_STATISTICS = {
  photographerName: "Darshan B",
  developerName: "Hemanth Kumar K",
  instagramHandle: "_.hemxnth__",
  phone: "7795849384",
  email: "oneframestudio0163@gmail.com",
  studioBrand: "1FS Photography",
  address: "Bengaluru, Karnataka, India",
  whatsappNum: "917795849384" // Darshan B booking WhatsApp
};
