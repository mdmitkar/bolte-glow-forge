import sneaker1 from "@/assets/sneaker-1.png";
import sneaker2 from "@/assets/sneaker-2.png";
import sneaker3 from "@/assets/sneaker-3.png";
import sneaker4 from "@/assets/sneaker-4.png";
import sneaker5 from "@/assets/sneaker-5.png";

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  category: string;
  description: string;
  details: string[];
  sizes: string[];
  colors: string[];
  isNew?: boolean;
  isHot?: boolean;
}

export const products: Product[] = [
  {
    id: "blaze-runner-x",
    name: "Blaze Runner X",
    price: 899,
    originalPrice: 1299,
    image: sneaker1,
    category: "Running",
    isNew: true,
    isHot: true,
    description: "Experience ultimate speed and comfort with the Blaze Runner X. Designed for high-performance athletes.",
    details: [
      "Breathable mesh upper",
      "Response foam cushioning",
      "Durable rubber outsole",
      "Lightweight design (250g)"
    ],
    sizes: ["7", "8", "9", "10", "11"],
    colors: ["Neon Orange", "Midnight Black"]
  },
  {
    id: "phantom-high",
    name: "Phantom High",
    price: 1299,
    originalPrice: 1899,
    image: sneaker2,
    category: "Basketball",
    isNew: true,
    description: "Dominating the court requires grip and support. The Phantom High provides both with a premium aesthetic.",
    details: [
      "High-top ankle support",
      "Anti-slip sole pattern",
      "Synthetic leather overlays",
      "Air-cushioning technology"
    ],
    sizes: ["8", "9", "10", "11", "12"],
    colors: ["Electric Blue", "Grey Matter"]
  },
  {
    id: "urban-flex-360",
    name: "Urban Flex 360",
    price: 749,
    originalPrice: 999,
    image: sneaker3,
    category: "Casual",
    isHot: true,
    description: "Your go-to daily shoe. The Urban Flex 360 blends perfectly with any street outfit.",
    details: [
      "Slip-on comfort",
      "Memory foam insole",
      "Flexible knit upper",
      "Machine washable"
    ],
    sizes: ["6", "7", "8", "9", "10"],
    colors: ["Sandstone", "Deep Maroon"]
  },
  {
    id: "vortex-glide",
    name: "Vortex Glide",
    price: 999,
    originalPrice: 1499,
    image: sneaker4,
    category: "Training",
    description: "Stability meets style. The Vortex Glide is perfect for gym sessions and light jogging.",
    details: [
      "Side-wall stability support",
      "Sweat-wicking lining",
      "Heel pull-tab",
      "Non-marking sole"
    ],
    sizes: ["7", "8", "9", "10", "11"],
    colors: ["Lime Green", "Dark Shadow"]
  },
  {
    id: "daily-flex-max",
    name: "Daily Flex Max",
    price: 799,
    originalPrice: 1999,
    image: sneaker5,
    category: "Lifestyle",
    isHot: true,
    description: "The ultimate value proposition. Premium feel at a fraction of the cost.",
    details: [
      "Classic silhouette",
      "Padded collar",
      "Textile lining",
      "Classic lacing system"
    ],
    sizes: ["7", "8", "9", "10", "11"],
    colors: ["Core Black", "Cloud White"]
  },
  {
    id: "sonic-speed-pro",
    name: "Sonic Speed Pro",
    price: 1149,
    originalPrice: 1599,
    image: sneaker1,
    category: "Running",
    isNew: true,
    description: "Break your personal records with the Sonic Speed Pro. Engineered for efficiency.",
    details: [
      "Carbon fiber plate integration",
      "Ultra-responsive foam",
      "Aerodynamic upper",
      "Minimal weight for maximum velocity"
    ],
    sizes: ["7", "8", "9", "10", "11"],
    colors: ["Cyan Rush", "Volcanic Red"]
  },
  {
    id: "quantum-court-v2",
    name: "Quantum Court V2",
    price: 949,
    originalPrice: 1399,
    image: sneaker2,
    category: "Basketball",
    description: "Elevate your game with Quantum Court. Superior impact protection and ankle lockdown.",
    details: [
      "Multi-directional traction",
      "Impact absorbing midsole",
      "Reinforced toe box",
      "Padded collar for comfort"
    ],
    sizes: ["8", "9", "10", "11", "12"],
    colors: ["Royal Purple", "Gold Dust"]
  },
  {
    id: "street-zen-low",
    name: "Street Zen Low",
    price: 699,
    originalPrice: 899,
    image: sneaker3,
    category: "Casual",
    description: "Minimalist design for the modern urban dweller. Clean, simple, and comfortable.",
    details: [
      "Sleek low-profile design",
      "Vulcanized rubber sole",
      "Canvas upper for breathability",
      "Ortholite insole"
    ],
    sizes: ["6", "7", "8", "9", "10"],
    colors: ["Off White", "Slate Blue"]
  }
];
