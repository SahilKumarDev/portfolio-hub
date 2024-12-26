import { Portfolio } from "@/models/portfolio.model";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";

// Type for query parameters
type QueryParams = {
  type?: string;
  limit?: number | undefined;
  page?: number | undefined;
};

export async function GET(request: Request) {
  try {
    await connectDB();

    // Get URL and create URL object to parse query parameters
    const { searchParams } = new URL(request.url);

    // Extract query parameters
    const queryParams: QueryParams = {
      type: searchParams.get("type") || undefined,
      limit: Number(searchParams.get("limit")) || 10,
      page: Number(searchParams.get("page")) || 1,
    };

    // Build query object
    const query: Record<string, unknown> = {};
    if (queryParams.type) {
      query.type = queryParams.type;
    }

    // Calculate skip value for pagination
    const skip = (queryParams.page - 1) * queryParams.limit;

    // Get total count for pagination
    const totalCount = await Portfolio.countDocuments(query);

    // Fetch portfolios with pagination
    const portfolios = await Portfolio.find(query)
      .skip(skip)
      .limit(queryParams.limit)
      .sort({ createdAt: -1 }); // Sort by newest first

    // Prepare pagination info
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
 