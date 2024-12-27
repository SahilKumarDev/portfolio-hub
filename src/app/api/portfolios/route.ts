import { Portfolio } from "@/models/portfolio.model";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { QueryParams } from "@/types/portfolio.type";

export async function GET(request: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);

    const queryParams: QueryParams = {
      type: searchParams.get("type") || undefined,
      limit: Number(searchParams.get("limit")) || 10,
      page: Number(searchParams.get("page")) || 1,
    };

    const query: Record<string, unknown> = {};
    if (queryParams.type) {
      query.type = queryParams.type;
    }

    const skip = (queryParams.page - 1) * queryParams.limit;

    const totalCount = await Portfolio.countDocuments(query);

    const portfolios = await Portfolio.find(query)
      .skip(skip)
      .limit(queryParams.limit)
      .sort({ createdAt: -1 });

    const totalPages = Math.ceil(totalCount / queryParams.limit);
    const hasNextPage = queryParams.page < totalPages;
    const hasPrevPage = queryParams.page > 1;

    return NextResponse.json(
      {
        success: true,
        data: portfolios,
        pagination: {
          currentPage: queryParams.page,
          totalPages,
          totalItems: totalCount,
          hasNextPage,
          hasPrevPage,
          limit: queryParams.limit,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching portfolios:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch portfolios" },
      { status: 500 }
    );
  }
}
