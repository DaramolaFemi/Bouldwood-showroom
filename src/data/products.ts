export type Product = {
  id: string;
  name: string;
  price: number;
  images: string[];
  description: string;
  material?: string;
  dimensions?: string;
  colors?: string[];
  rating?: number;
  badges?: string[];
};

export const products: Product[] = [
  {
    id: "sora-sofa",
    name: "Sora 3‑Seater Sofa",
    price: 3299,
    images: ["/assets/editorial/sofa", "/assets/editorial/sofa"],
    description:
      "A minimal three-seater sofa with elegant proportions and tailored upholstery. Hand-stitched seams and a kiln-dried hardwood frame.",
    material: "Linen upholstery, hardwood frame",
    dimensions: "W 220cm • D 90cm • H 78cm",
    colors: ["Sand", "Graphite", "Olive"],
    rating: 4.8,
    badges: ["Best Seller"],
  },
  {
    id: "alto-armchair",
    name: "Alto Armchair",
    price: 1199,
    images: ["/assets/editorial/chair", "/assets/editorial/chair"],
    description:
      "A sculptural lounge chair with supportive curved back and plush seat foam.",
    material: "Wool blend, steel base",
    dimensions: "W 78cm • D 85cm • H 83cm",
    colors: ["Charcoal", "Ivory"],
    rating: 4.7,
    badges: [],
  },
  {
    id: "linen-dining",
    name: "Harlow Dining Table",
    price: 2399,
    images: ["/assets/editorial/table", "/assets/editorial/table"],
    description:
      "Solid oak table with chamfered edges and a refined matte finish. Built to last generations.",
    material: "Oak timber",
    dimensions: "W 200cm • D 95cm • H 76cm",
    colors: ["Natural Oak"],
    rating: 4.9,
    badges: ["New"],
  },
];

export default products;
