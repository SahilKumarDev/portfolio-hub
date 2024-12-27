"use client";

import { IPortfolio } from "@/types/portfolio.type";
import { useState, useEffect } from "react";
import { PortfolioCard } from "./PortfolioCard";
import Loader from "./SubComponents/Loader";

interface PaginationData {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  limit: number;
}

interface ApiResponse {
  success: boolean;
  data: IPortfolio[];
  pagination: PaginationData;
}

export default function FetchPortfolio() {
  const [pagination, setPagination] = useState<PaginationData | null>(null);
  const [portfolios, setPortfolios] = useState<IPortfolio[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/portfolios");

        if (!response.ok) {
          throw new Error("Failed to fetch portfolios");
        }

        const data: ApiResponse = await response.json();

        if (data.success) {
          setPortfolios(data.data);
          setPagination(data.pagination);
        } else {
          throw new Error("Failed to fetch portfolios");
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolios();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Portfolio List</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {portfolios.map((portfolio, index) => (
          <PortfolioCard data={portfolio} key={index} />
        ))}
      </div>

      {pagination && portfolios.length > 0 && (
        <div className="mt-6 flex justify-between items-center">
          <p className="text-sm text-gray-600">
            Showing {portfolios.length} of {pagination.totalItems} portfolios
          </p>
          <div className="flex gap-2">
            {pagination.hasPrevPage && (
              <button
                className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200"
                onClick={() => {
                  /* Add pagination handling */
                }}
              >
                Previous
              </button>
            )}
            {pagination.hasNextPage && (
              <button
                className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200"
                onClick={() => {
                  /* Add pagination handling */
                }}
              >
                Next
              </button>
            )}
          </div>
        </div>
      )}

      {portfolios.length === 0 && !loading && (
        <div className="text-center py-10 text-gray-500">
          No portfolios found
        </div>
      )}
    </div>
  );
}
