import {
  CloudinaryConfig,
  CloudinaryError,
  CloudinaryResponse,
} from "@/types/portfolio.type";
import {
  v2 as cloudinary,
  UploadApiOptions,
  UploadApiResponse,
} from "cloudinary";

interface CloudinaryUploadOptions extends UploadApiOptions {
  folder: string;
  resource_type: "auto";
  allowed_formats: string[];
  transformation: Array<{
    width?: number;
    height?: number;
    crop?: string;
    quality?: string;
    fetch_format?: string;
  }>;
}

const config: CloudinaryConfig = {
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
};

const validateConfig = (): void => {
  const requiredKeys: (keyof CloudinaryConfig)[] = [
    "cloud_name",
    "api_key",
    "api_secret",
  ];
  const missingKeys = requiredKeys.filter((key) => !config[key]);

  if (missingKeys.length > 0) {
    throw new CloudinaryError(
      `Missing required Cloudinary configuration keys: ${missingKeys.join(
        ", "
      )}`
    );
  }
};

try {
  validateConfig();
  cloudinary.config(config);
} catch (error) {
  console.error("Cloudinary initialization error:", error);
  throw new CloudinaryError(
    "Failed to initialize Cloudinary",
    error instanceof Error ? error : new Error(String(error))
  );
}

export const uploadToCloudinary = async (
  file: string,
  folder: string = "portfolios"
): Promise<CloudinaryResponse> => {
  try {
    if (!file) {
      throw new CloudinaryError("File path is required for upload");
    }

    const uploadOptions: CloudinaryUploadOptions = {
      folder,
      resource_type: "auto",
      allowed_formats: ["jpg", "png", "jpeg", "gif", "webp"],
      transformation: [
        {
          width: 1200,
          height: 800,
          crop: "limit",
          quality: "auto",
          fetch_format: "auto",
        },
      ],
    };

    const result: UploadApiResponse = await cloudinary.uploader.upload(
      file,
      uploadOptions
    );

    return {
      secure_url: result.secure_url,
      public_id: result.public_id,
    };
  } catch (error) {
    console.error("Upload Error:", error);
    throw new CloudinaryError(
      "Failed to upload image to Cloudinary",
      error instanceof Error ? error : new Error(String(error))
    );
  }
};

export const deleteFromCloudinary = async (publicId: string): Promise<void> => {
  try {
    if (!publicId) {
      throw new CloudinaryError("Public ID is required for deletion");
    }

    const result = await cloudinary.uploader.destroy(publicId);

    if (result.result !== "ok") {
      throw new CloudinaryError(
        `Cloudinary deletion failed for public ID: ${publicId}`
      );
    }
  } catch (error) {
    console.error("Delete Error:", error);
    throw new CloudinaryError(
      `Failed to delete image with public ID: ${publicId}`,
      error instanceof Error ? error : new Error(String(error))
    );
  }
};

export const verifyCloudinaryConfig = (): boolean => {
  try {
    validateConfig();
    return true;
  } catch (error) {
    console.error("Cloudinary configuration validation failed:", error);
    return false;
  }
};
