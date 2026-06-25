import fs from "fs";
import path from "path";

const dataFile = path.join(process.cwd(), "src", "data", "products.json");

export interface Product {
  id: number;
  name: string;
  category: "shirts" | "trousers";
  price: number;
  originalPrice: number | null;
  image: string;
  description: string;
  sizes: string[];
  badge: string | null;
}

export function getProducts(): Product[] {
  const raw = fs.readFileSync(dataFile, "utf-8");
  return JSON.parse(raw);
}

export function saveProducts(products: Product[]): void {
  fs.writeFileSync(dataFile, JSON.stringify(products, null, 2), "utf-8");
}

export function getProduct(id: number): Product | undefined {
  return getProducts().find((p) => p.id === id);
}

export function addProduct(product: Omit<Product, "id">): Product {
  const products = getProducts();
  const maxId = products.reduce((max, p) => Math.max(max, p.id), 0);
  const newProduct = { ...product, id: maxId + 1 };
  products.push(newProduct);
  saveProducts(products);
  return newProduct;
}

export function updateProduct(
  id: number,
  data: Partial<Product>
): Product | null {
  const products = getProducts();
  const idx = products.findIndex((p) => p.id === id);
  if (idx === -1) return null;
  products[idx] = { ...products[idx], ...data };
  saveProducts(products);
  return products[idx];
}

export function deleteProduct(id: number): boolean {
  const products = getProducts();
  const filtered = products.filter((p) => p.id !== id);
  if (filtered.length === products.length) return false;
  saveProducts(filtered);
  return true;
}
