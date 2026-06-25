import fs from "fs";
import path from "path";

const dataFile = path.join(process.cwd(), "src", "data", "feedback.json");

export interface Feedback {
  id: number;
  productId: number;
  customerName: string;
  rating: number;
  comment: string;
  createdAt: string;
  approved: boolean;
}

function read(): Feedback[] {
  try {
    if (fs.existsSync(dataFile)) {
      return JSON.parse(fs.readFileSync(dataFile, "utf-8"));
    }
  } catch {}
  return [];
}

function write(data: Feedback[]): void {
  fs.writeFileSync(dataFile, JSON.stringify(data, null, 2), "utf-8");
}

export function getFeedback(productId?: number): Feedback[] {
  const all = read();
  if (productId) return all.filter((f) => f.productId === productId);
  return all;
}

export function getApprovedFeedback(productId: number): Feedback[] {
  return read().filter((f) => f.productId === productId && f.approved);
}

export function getFeedbackStats(productId: number) {
  const all = getApprovedFeedback(productId);
  if (all.length === 0) return { average: 0, total: 0, distribution: [0, 0, 0, 0, 0] };
  const sum = all.reduce((s, f) => s + f.rating, 0);
  const distribution = [0, 0, 0, 0, 0];
  all.forEach((f) => { if (f.rating >= 1 && f.rating <= 5) distribution[f.rating - 1]++; });
  return { average: Math.round((sum / all.length) * 10) / 10, total: all.length, distribution };
}

export function addFeedback(data: Omit<Feedback, "id" | "createdAt">): Feedback {
  const all = read();
  const maxId = all.reduce((m, f) => Math.max(m, f.id), 0);
  const fb: Feedback = { ...data, id: maxId + 1, createdAt: new Date().toISOString().split("T")[0] };
  all.push(fb);
  write(all);
  return fb;
}

export function updateFeedback(id: number, data: Partial<Feedback>): Feedback | null {
  const all = read();
  const idx = all.findIndex((f) => f.id === id);
  if (idx === -1) return null;
  all[idx] = { ...all[idx], ...data };
  write(all);
  return all[idx];
}

export function deleteFeedback(id: number): boolean {
  const all = read();
  const filtered = all.filter((f) => f.id !== id);
  if (filtered.length === all.length) return false;
  write(filtered);
  return true;
}
