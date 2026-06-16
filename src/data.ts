import { PhotoshootCategory, RentalItem } from "./types";

export const OUR_WORK_GALLERY = [
  "our work/04d32d767ce7cfea86ba8c4a13607dda.jpg.jpeg",
  "our work/0932d622ac9f694ef4f2f26526b6dd7f.jpg.jpeg",
  "our work/293a4458bc6d838ac4163fef41e1015f.jpg.jpeg",
  "our work/5421fdb6c5547e028981008ef76ebc53.jpg.jpeg",
  "our work/55b9df0606e00ec6500c8f5b039e2492.jpg.jpeg",
  "our work/6d9332810c8fda1687a715046be474c3.jpg.jpeg",
  "our work/76d6c81b218cc8efd0d6334502b7b8bb.jpg.jpeg",
  "our work/859d0f60369e045f998282438b6cb123.jpg.jpeg",
  "our work/9050312c9c07b7a885480042892a9058.jpg.jpeg",
  "our work/956830babee5786fa0cb79257c20926c.jpg.jpeg",
  "our work/9fa25e08ec4e9a3e75e29de7c4c32733.jpg.jpeg",
  "our work/b7b81e8937f99c109fa82ecf4c8c5f15.jpg.jpeg",
  "our work/b84997761d7446048358665cc1f502c7.jpg.jpeg",
  "our work/be18c5011ac5ca760d9c9734431670a3.jpg.jpeg",
  "our work/be44d4dad529717351473186a6697a9d.jpg.jpeg",
  "our work/cc2e65d6296bf18aaabc909b54232e02.jpg.jpeg",
  "our work/cdf99edf49846d642c54f2621318f1ef.jpg.jpeg",
  "our work/e4332ed13862fec0a8903cfa02a65c3f.jpg.jpeg",
  "our work/eb6dfd8d7b9345d6dd61a43db6e0d112.jpg.jpeg",
  "our work/IMG_20260613_211431.jpg.jpeg",
  "our work/IMG_20260613_211458.jpg.jpeg",
  "our work/IMG_20260613_211518.jpg.jpeg",
  "our work/IMG_20260613_211551.jpg.jpeg",
  "our work/IMG_20260613_211610.jpg.jpeg",
  "our work/IMG_20260613_211622.jpg.jpeg"
];

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
    image: "sony/712ywHZbdNL._AC_UF1000,1000_QL80_FMwebp_.webp",
    gallery: [
      "sony/61Qy3g2zkjL._AC_UF350,350_QL80_FMwebp_.webp",
      "sony/712ywHZbdNL._AC_UF1000,1000_QL80_FMwebp_.webp",
      "sony/713tObQ+bXL._AC_UF1000,1000_QL80_FMwebp_.webp",
      "sony/71UzEoJc5YL._AC_UF350,350_QL80_FMwebp_ (1).webp"
    ],
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
    image: "nikon/digital-camera-d3400-kit-with-lens-af-p-dx-nikkor-18-55-mm-f-3-5-original-imaemk39hqwhhhwj.jpeg",
    gallery: [
      "nikon/digital-camera-d3400-d3400-nikon-original-imaf5fheq5qggusq.jpeg",
      "nikon/digital-camera-d3400-d3400-nikon-original-imaf5fherxqzgknk.jpeg",
      "nikon/digital-camera-d3400-d3400-nikon-original-imaf5fhh8wzuve66.jpeg",
      "nikon/digital-camera-d3400-kit-with-lens-af-p-dx-nikkor-18-55-mm-f-3-5-original-imaemk39hqwhhhwj.jpeg"
    ],
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
    pricePerDay: 1499,
    image: "Gimbal/71LwGk3Qi9L._AC_UF1000,1000_QL80_FMwebp_.webp",
    gallery: [
      "Gimbal/51tP6geoT0L._AC_UF1000,1000_QL80_FMwebp_.webp",
      "Gimbal/619-20pzl8L._AC_UF1000,1000_QL80_FMwebp_ (1).webp",
      "Gimbal/619-20pzl8L._AC_UF1000,1000_QL80_FMwebp_.webp",
      "Gimbal/61bKRkvV7OL._AC_UF1000,1000_QL80_FMwebp_.webp",
      "Gimbal/61NsCOO4ffL._AC_UF1000,1000_QL80_FMwebp_.webp",
      "Gimbal/61Qy3g2zkjL._AC_UF350,350_QL80_FMwebp_.webp",
      "Gimbal/712ywHZbdNL._AC_UF1000,1000_QL80_FMwebp_.webp",
      "Gimbal/713tObQ+bXL._AC_UF1000,1000_QL80_FMwebp_.webp",
      "Gimbal/71LwGk3Qi9L._AC_UF1000,1000_QL80_FMwebp_.webp",
      "Gimbal/71U06UHsknL._AC_UF1000,1000_QL80_FMwebp_.webp",
      "Gimbal/71UzEoJc5YL._AC_UF350,350_QL80_FMwebp_ (1).webp"
    ],
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
