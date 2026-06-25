import { NextRequest, NextResponse } from "next/server";
import { getFeedback, addFeedback } from "@/lib/feedback";

export async function GET(request: NextRequest) {
  const productId = request.nextUrl.searchParams.get("productId");
  const data = getFeedback(productId ? Number(productId) : undefined);
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.productId || !body.customerName || !body.rating || !body.comment) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    if (body.rating < 1 || body.rating > 5) {
      return NextResponse.json({ error: "Rating must be 1-5" }, { status: 400 });
    }
    const fb = addFeedback({
      productId: body.productId,
      customerName: body.customerName,
      rating: body.rating,
      comment: body.comment,
      approved: false,
    });
    return NextResponse.json(fb, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }
}
