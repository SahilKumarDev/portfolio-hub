import React, { useState } from "react";
 
 
import { IPortfolio } from "@/types/portfolio.type";
import ImageUpload from "./ImageUpload";

interface PortfolioFormProps {
  onSubmit: (data: IPortfolio) => Promise<void>;
  initialData?: IPortfolio;
}

const PortfolioForm: React.FC<PortfolioFormProps> = ({
  onSubmit,
  initialData,
}) => {
  const [formData, setFormData] = useState<IPortfolio>({
    portfolioName: initialData?.portfolioName || "",
    portfolioLink: initialData?.portfolioLink || "",
    portfolioOwnerName: initialData?.portfolioOwnerName || "",
    portfolioOwnerImage: initialData?.portfolioOwnerImage || "",
    portfolioImage: initialData?.portfolioImage || "",
    type: initialData?.type || "personal",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await onSubmit(formData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto p-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Portfolio Name
        </label>
        <input
          type="text"
          name="portfolioName"
          value={formData.portfolioName}
          onChange={handleChange}
          required
          maxLength={100}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Portfolio Link
        </label>
        <input
          type="url"
          name="portfolioLink"
          value={formData.portfolioLink}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Owner Name
        </label>
        <input
          type="text"
          name="portfolioOwnerName"
          value={formData.portfolioOwnerName}
          onChange={handleChange}
          required
          maxLength={50}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Type</label>
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="personal">Personal</option>
          <option value="professional">Professional</option>
          <option value="agency">Agency</option>
          <option value="other">Other</option>
        </select>
      </div>

      <ImageUpload
        onImageUpload={(url: string) =>
          setFormData((prev) => ({ ...prev, portfolioOwnerImage: url }))
        }
        label="Owner Image"
        currentImage={formData.portfolioOwnerImage}
      />

      <ImageUpload
        onImageUpload={(url: string) =>
          setFormData((prev) => ({ ...prev, portfolioImage: url }))
        }
        label="Portfolio Image"
        currentImage={formData.portfolioImage}
      />

      {error && <div className="text-red-600 text-sm">{error}</div>}

      <button
        type="submit"
        disabled={loading}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
      >
        {loading ? "Saving..." : "Save Portfolio"}
      </button>
    </form>
  );
};

export default PortfolioForm;
