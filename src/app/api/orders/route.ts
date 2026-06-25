import { NextResponse } from "next/server";
import { getOrders, addOrder } from "@/lib/orders";

export async function GET() {
  return NextResponse.json(getOrders());
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const order = addOrder(body);
    return NextResponse.json(order, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid order data" }, { status: 400 });
  }
}
