import { connectDB } from "@/lib/mongodb";
import { Portfolio } from "@/models/portfolio.model";

import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();
    const portfolio = await Portfolio.create(body);

    return NextResponse.json(portfolio, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
