import { Portfolio } from "@/models/portfolio.model";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";

export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();

    const {
      portfolioName,
      portfolioLink,
      portfolioOwnerName,
      type,
      portfolioImage,
      portfolioOwnerImage,
    } = body;

    if (
      !portfolioName ||
      !portfolioLink ||
      !portfolioOwnerName ||
      !type ||
      !portfolioImage ||
      !portfolioOwnerImage
    ) {
      return NextResponse.json(
        { error: "All fields are required, including image URLs" },
        { status: 400 }
      );
    }

    const portfolio = await Portfolio.create({
      portfolioName,
      portfolioLink,
      portfolioOwnerName,
      type,
      portfolioImage,
      portfolioOwnerImage,
    });

    return NextResponse.json(portfolio, { status: 201 });
  } catch (error) {
    console.error("Error creating portfolio:", error);
    return NextResponse.json(
      { error: "Failed to create portfolio" },
      { status: 500 }
    );
  }
}
