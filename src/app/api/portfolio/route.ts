import { uploadToCloudinary } from "@/lib/cloudinary";
import { Portfolio } from "@/models/portfolio.model";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";

export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();

    // Upload image to Cloudinary
    const { secure_url, public_id } = await uploadToCloudinary(
      body.portfolioImage,
      "portfolios"
    );

    // Create portfolio with Cloudinary image data
    const portfolio = await Portfolio.create({
      ...body,
      portfolioImage: {
        url: secure_url,
        publicId: public_id,
      },
      portfolioOwnerImage: {
        url: secure_url,
        publicId: public_id,
      },
    });

    return NextResponse.json(portfolio, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
