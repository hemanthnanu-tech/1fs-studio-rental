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
    name: "Baby Shoot / Baby Shower",
    description: "T&C: Shoot Including indore & outdore. Deliverables: All Raw & JPG photos & videos in pendrive",
    imagePlaceholder: "baby",
    icon: "Baby",
    prices: [
      {
        label: "START PRICE",
        price: 3999,
        features: [
          "Photography",
          "Edited digital photos"
        ]
      },
      {
        label: "BASIC",
        price: 6999,
        features: [
          "Photography",
          "Cinematic Videography",
          "Edited digital photos",
          "1 baby theme shoot"
        ]
      },
      {
        label: "STANDARD",
        price: 9999,
        features: [
          "Cinematic videography",
          "Photography",
          "Unlimited edited digital photos",
          "2 baby theme shoot",
          "1 photo frame"
        ]
      },
      {
        label: "PREMIUM",
        price: 19999,
        features: [
          "Full-day coverage",
          "Cinematic videography",
          "Photography",
          "Unlimited + edited digital photos",
          "10 prints (8x10)",
          "1 photo frame",
          "2 baby theme shoot",
          "Custom photo album"
        ]
      }
    ]
  },
  {
    id: "traditional-house",
    name: "Traditional & House Warming",
    description: "For additional photography or videography please feel free to contact us. Deliverables : All Raw & JPG photos & Edited videos in pendrive",
    imagePlaceholder: "traditional",
    icon: "Home",
    prices: [
      {
        label: "STANDARD PRICE",
        price: 10499,
        features: [
          "Full-day coverage",
          "Cinematic videography",
          "Unlimited Photography",
          "Edited digital photos",
          "Digital output"
        ]
      },
      {
        label: "PREMIUM PRICE",
        price: 15599,
        features: [
          "Full-day coverage",
          "Cinematic videography",
          "Unlimited Photography",
          "Edited digital photos",
          "15 prints album copy",
          "Digital output"
        ]
      },
      {
        label: "PREMIUM+",
        price: 16799,
        features: [
          "Full-day coverage",
          "Cinematic videography",
          "Unlimited Photography",
          "Edited digital photos",
          "Drone video footage",
          "Digital output"
        ]
      },
      {
        label: "LUXURY PRICE",
        price: 20699,
        features: [
          "Full-day coverage",
          "Cinematic videography",
          "Unlimited Photography",
          "Edited digital photos",
          "Drone video footage",
          "15 prints album copy",
          "Digital output"
        ]
      }
    ]
  },
  {
    id: "car-bike",
    name: "Car & Bike Delivery",
    description: "Photographer & Cinematic Expert in photo edits & visual magic capturing life's precious moments. For additional photography or videography please feel free to contact us.",
    imagePlaceholder: "car",
    icon: "Car",
    prices: [
      {
        label: "BASIC PRICE",
        price: 4999,
        features: [
          "videography",
          "photography"
        ]
      },
      {
        label: "STANDARD PRICE",
        price: 6999,
        features: [
          "Videography",
          "2 cinmatic video",
          "photography",
          "Edited photos"
        ]
      },
      {
        label: "PRIMIUM PRICE",
        price: 14999,
        features: [
          "videography",
          "photography",
          "2 cinmatic video",
          "Drone video footage",
          "Edited photos+Raw photos",
          "1 outside video and photo"
        ]
      }
    ]
  },
  {
    id: "pre-wedding",
    name: "Pre Wedding Cinematic Chronicles",
    description: "Deliverables: All Raw & JPG photos & Edited videos in pendrive",
    imagePlaceholder: "wedding",
    icon: "Heart",
    prices: [
      {
        label: "STANDARD",
        price: 14999,
        features: [
          "2-Cinematic videos Traditional & Modren",
          "2- Save date Indoor & outdoor",
          "Cinematic photography",
          "Unlimited Raw photos",
          "20-50 edited digital photos"
        ]
      },
      {
        label: "PREMIUM",
        price: 29999,
        features: [
          "3 cinematic videos Traditional ,Modren & Western Indoor & outdoor",
          "Photography landscape and portrait",
          "50-100 editeding photos",
          "Unlimited raw photos"
        ]
      },
      {
        label: "LUXURY",
        price: 49999,
        features: [
          "Full-day coverage",
          "Makeup & costume",
          "Cinematic videography",
          "Cinematic photography",
          "100+ edited digital photos",
          "Online gallery access",
          "10 prints Album"
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
    pricePerDay: 1199,
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
  photographerName: "1FS Photography",
  developerName: "Hemanth Kumar K",
  instagramHandle: "_.hemxnth__",
  phone: "7795849384",
  email: "oneframestudio0163@gmail.com",
  studioBrand: "1FS Photography",
  address: "Bengaluru, Karnataka, India",
  whatsappNum: "917795849384" // Booking WhatsApp
};
