import { NextRequest, NextResponse } from "next/server";
import { getProducts, addProduct } from "@/lib/store";

export async function GET() {
  return NextResponse.json(getProducts());
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const product = addProduct(body);
    return NextResponse.json(product, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Invalid product data" },
      { status: 400 }
    );
  }
}
