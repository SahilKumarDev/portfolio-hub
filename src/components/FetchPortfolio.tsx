"use client";

import { IPortfolio } from "@/types/portfolio.type";
import { useState, useEffect } from "react";
 

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

export default function UserList() {
  const [portfolios, setPortfolios] = useState<IPortfolio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<PaginationData | null>(null);

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
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolios();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-500 rounded-lg">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Portfolio List</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {portfolios.map((portfolio) => (
          <div 
            key={portfolio.portfolioLink}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="relative h-48">
              <img
                src={portfolio.portfolioImage}
                alt={portfolio.portfolioName}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={portfolio.portfolioOwnerImage}
                  alt={portfolio.portfolioOwnerName}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h2 className="font-semibold">{portfolio.portfolioName}</h2>
                  <p className="text-sm text-gray-600">{portfolio.portfolioOwnerName}</p>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                  {portfolio.type}
                </span>
                <a
                  href={portfolio.portfolioLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-600"
                >
                  View Portfolio
                </a>
              </div>
            </div>
          </div>
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
                onClick={() => {/* Add pagination handling */}}
              >
                Previous
              </button>
            )}
            {pagination.hasNextPage && (
              <button
                className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200"
                onClick={() => {/* Add pagination handling */}}
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