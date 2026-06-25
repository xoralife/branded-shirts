import fs from "fs";
import path from "path";

const dataFile = path.join(process.cwd(), "src", "data", "slides.json");

export interface Slide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  cta: string;
  link: string;
  image: string | null;
  gradient: string;
  active: boolean;
}

const defaults: Slide[] = [
  { id: 1, title: "Premium Collection", subtitle: "Shirts & Trousers", description: "Elevate your style with our premium branded collection", cta: "Shop Now", link: "/shirts", image: null, gradient: "from-[#1E3A5F] via-[#1E3A5F] to-[#2A4F7F]", active: true },
  { id: 2, title: "New Arrivals", subtitle: "Summer Collection 2026", description: "Discover the latest trends in men's fashion", cta: "Explore", link: "/trousers", image: null, gradient: "from-[#1E3A5F] via-[#162D4A] to-[#1E3A5F]", active: true },
  { id: 3, title: "Premium Quality", subtitle: "Crafted for Perfection", description: "Experience unmatched comfort and style", cta: "View Collection", link: "#categories", image: null, gradient: "from-[#0F2440] via-[#1E3A5F] to-[#1E3A5F]", active: true },
];

export function getSlides(): Slide[] {
  try {
    if (fs.existsSync(dataFile)) {
      return JSON.parse(fs.readFileSync(dataFile, "utf-8"));
    }
  } catch {}
  return defaults;
}

export function saveSlides(slides: Slide[]): void {
  fs.writeFileSync(dataFile, JSON.stringify(slides, null, 2), "utf-8");
}

export function addSlide(slide: Omit<Slide, "id">): Slide {
  const slides = getSlides();
  const maxId = slides.reduce((max, s) => Math.max(max, s.id), 0);
  const newSlide = { ...slide, id: maxId + 1 };
  slides.push(newSlide);
  saveSlides(slides);
  return newSlide;
}

export function updateSlide(id: number, data: Partial<Slide>): Slide | null {
  const slides = getSlides();
  const idx = slides.findIndex((s) => s.id === id);
  if (idx === -1) return null;
  slides[idx] = { ...slides[idx], ...data };
  saveSlides(slides);
  return slides[idx];
}

export function deleteSlide(id: number): boolean {
  const slides = getSlides();
  const filtered = slides.filter((s) => s.id !== id);
  if (filtered.length === slides.length) return false;
  saveSlides(filtered);
  return true;
}
