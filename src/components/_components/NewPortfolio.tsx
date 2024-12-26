"use client";
import { IPortfolio } from "@/types/portfolio.type";
import PortfolioForm from "./PortfolioForm";
import { useRouter } from "next/navigation";

export default function NewPortfolio() {
  const router = useRouter();

  const handleSubmit = async (data: IPortfolio) => {
    const response = await fetch("/api/portfolio", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to create portfolio");
    }

    router.push("/portfolios");
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Create New Portfolio
        </h1>
        <PortfolioForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
