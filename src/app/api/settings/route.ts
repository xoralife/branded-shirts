import { NextResponse } from "next/server";

let settings = {
  storeName: "Branded Store",
  storeEmail: "admin@store.com",
  storePhone: "+92 300 1234567",
  storeAddress: "Karachi, Pakistan",
  currency: "PKR",
  taxRate: "0",
  shippingFee: "200",
  freeShippingThreshold: "3000",
  jazzcashNumber: "03001234567",
  easypaisaNumber: "03001234567",
};

export async function GET() {
  return NextResponse.json(settings);
}

export async function PUT(request: Request) {
  const body = await request.json();
  settings = { ...settings, ...body };
  return NextResponse.json(settings);
}
