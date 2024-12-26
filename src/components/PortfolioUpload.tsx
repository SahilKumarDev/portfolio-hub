"use client";

import { useState } from "react";
import { ImageUpload } from "./_components/ImageUpload";

export default function PortfolioPage() {
  const [portfolioImages, setPortfolioImages] = useState<string[]>([]);
  const [ownerImages, setOwnerImages] = useState<string[]>([]);

  const handlePortfolioImageAdd = (url: string) => {
    setPortfolioImages((prev) => [...prev, url]);
  };

  const handlePortfolioImageRemove = (url: string) => {
    setPortfolioImages((prev) => prev.filter((image) => image !== url));
  };

  const handleOwnerImageAdd = (url: string) => {
    setOwnerImages((prev) => [...prev, url]);
  };

  const handleOwnerImageRemove = (url: string) => {
    setOwnerImages((prev) => prev.filter((image) => image !== url));
  };

  return (
    <>
      <div className="p-6">
        <ImageUpload
          onRemove={handlePortfolioImageRemove}
          htmlFor="portfolio-images"
          onChange={handlePortfolioImageAdd}
          label="Portfolio Images"
          value={portfolioImages}
          maxSize={5}
        />
      </div>

      <div className="p-6">
        <ImageUpload
          onRemove={handleOwnerImageRemove}
          htmlFor="owner-images"
          onChange={handleOwnerImageAdd}
          label="Owner Images"
          value={ownerImages}
          maxSize={5}
        />
      </div>
    </>
  );
}
