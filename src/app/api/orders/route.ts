import { NextResponse } from "next/server";
import { getProducts } from "@/lib/store";

const orders = [
  {
    id: 1,
    customer: "Ahmed Khan",
    email: "ahmed@example.com",
    items: [
      { name: "Classic Navy Fit Shirt", qty: 2, price: 2499 },
    ],
    total: 4998,
    status: "Delivered",
    date: "2026-06-20",
  },
  {
    id: 2,
    customer: "Sara Ali",
    email: "sara@example.com",
    items: [
      { name: "Black Formal Trousers", qty: 1, price: 3299 },
    ],
    total: 3299,
    status: "Processing",
    date: "2026-06-24",
  },
  {
    id: 3,
    customer: "Usman Raza",
    email: "usman@example.com",
    items: [
      { name: "White Formal Shirt", qty: 1, price: 2199 },
      { name: "Navy Chino Trousers", qty: 1, price: 2999 },
    ],
    total: 5198,
    status: "Shipped",
    date: "2026-06-23",
  },
];

export async function GET() {
  return NextResponse.json(orders);
}
