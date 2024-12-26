export interface IPortfolio {
  portfolioName: string;
  portfolioLink: string;
  portfolioOwnerName: string;
  portfolioOwnerImage: string;
  portfolioImage: string;
  type: "personal" | "professional" | "agency" | "other";
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ImageUploadProps {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
  maxSize?: number;
  label: string;
  imageName: string;
}

export interface CloudinaryConfig {
  cloud_name: string | undefined;
  api_key: string | undefined;
  api_secret: string | undefined;
  secure: boolean;
}

export class CloudinaryError extends Error {
  constructor(message: string, public readonly originalError?: Error) {
    super(message);
    this.name = "CloudinaryError";
  }
}

export interface CloudinaryResponse {
  secure_url: string;
  public_id: string;
}
