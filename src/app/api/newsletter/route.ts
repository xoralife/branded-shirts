import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const dataFile = path.join(process.cwd(), "src", "data", "subscribers.json");

function getSubscribers(): string[] {
  try {
    if (fs.existsSync(dataFile)) {
      return JSON.parse(fs.readFileSync(dataFile, "utf-8"));
    }
  } catch {}
  return [];
}

function saveSubscribers(list: string[]): void {
  fs.writeFileSync(dataFile, JSON.stringify(list, null, 2), "utf-8");
}

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    const list = getSubscribers();
    if (list.includes(email)) {
      return NextResponse.json({ message: "Already subscribed" });
    }

    list.push(email);
    saveSubscribers(list);

    return NextResponse.json({ message: "Subscribed successfully" }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
