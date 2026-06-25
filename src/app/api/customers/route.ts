import { NextResponse } from "next/server";

const customers = [
  { id: 1, name: "Ahmed Khan", email: "ahmed@example.com", phone: "+92 300 1111111", orders: 3, totalSpent: 12995, joined: "2026-01-15" },
  { id: 2, name: "Sara Ali", email: "sara@example.com", phone: "+92 300 2222222", orders: 1, totalSpent: 3299, joined: "2026-03-20" },
  { id: 3, name: "Usman Raza", email: "usman@example.com", phone: "+92 300 3333333", orders: 2, totalSpent: 8197, joined: "2026-02-10" },
  { id: 4, name: "Hamza Ali", email: "hamza@example.com", phone: "+92 300 4444444", orders: 1, totalSpent: 1999, joined: "2026-04-05" },
  { id: 5, name: "Zainab Fatima", email: "zainab@example.com", phone: "+92 300 5555555", orders: 4, totalSpent: 15996, joined: "2026-01-28" },
  { id: 6, name: "Bilal Ahmad", email: "bilal@example.com", phone: "+92 300 6666666", orders: 2, totalSpent: 5498, joined: "2026-05-12" },
];

export async function GET() {
  return NextResponse.json(customers);
}
