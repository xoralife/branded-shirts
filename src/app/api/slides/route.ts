import { NextResponse } from "next/server";
import { getSlides, addSlide } from "@/lib/slides";

export async function GET() {
  return NextResponse.json(getSlides());
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const slide = addSlide(body);
    return NextResponse.json(slide, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }
}
