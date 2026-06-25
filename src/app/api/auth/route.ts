import { NextResponse } from "next/server";

const ADMIN_EMAIL = "admin@store.com";
const ADMIN_PASSWORD = "admin123";

export async function POST(request: Request) {
  const { email, password } = await request.json();

  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    const token = Buffer.from(
      JSON.stringify({ email, role: "admin", ts: Date.now() })
    ).toString("base64");

    return NextResponse.json({ success: true, token });
  }

  return NextResponse.json(
    { error: "Invalid credentials" },
    { status: 401 }
  );
}
