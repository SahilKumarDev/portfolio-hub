"use server";

import { connectDB } from "@/lib/mongodb";
import { uploadToCloudinary, deleteFromCloudinary } from "@/lib/cloudinary";

export async function uploadImage(formData: FormData) {
  try {
    await connectDB();

    const file = formData.get("file");
    if (!file) {
      throw new Error("No file provided");
    }

    const bytes = await (file as File).arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64String = buffer.toString("base64");
    const dataURI = `data:${(file as File).type};base64,${base64String}`;

    const { secure_url, public_id } = await uploadToCloudinary(
      dataURI,
      "uploads"
    );

    return { url: secure_url, publicId: public_id };
  } catch (error) {
    console.error("Upload error:", error);
    return { error: "Failed to upload image" };
  }
}

export async function deleteImage(publicId: string) {
  try {
    await connectDB();
    await deleteFromCloudinary(publicId);

    return { success: true };
  } catch (error) {
    console.error("Delete error:", error);
    return { error: "Failed to delete image" };
  }
}
