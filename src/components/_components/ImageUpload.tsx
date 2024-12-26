"use client";

import { uploadImage, deleteImage } from "@/lib/actions/upload.action";
import { ImageUploadProps } from "@/types/portfolio.type";
import { ImagePlus, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PuffLoader } from "react-spinners";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import Image from "next/image";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

export function ImageUpload({
  disabled,
  label,
  onChange,
  onRemove,
  imageName,
  value,
  maxSize = 5,
}: ImageUploadProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const validateFile = (file: File): boolean => {
    if (file.size > maxSize * 1024 * 1024) {
      toast.error(`File size must be less than ${maxSize}MB`);
      return false;
    }

    if (!file.type.startsWith("image/")) {
      toast.error("Only image files are allowed");
      return false;
    }

    return true;
  };

  const onUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0];
      if (!file || !validateFile(file)) return;

      setIsLoading(true);
      setProgress(0);

      const formData = new FormData();
      formData.append("file", file);

      // Simulate progress
      const progressInterval = setInterval(() => {
        setProgress((prev) => (prev >= 95 ? prev : prev + 5));
      }, 100);

      // Perform upload
      const response = await uploadImage(formData);

      clearInterval(progressInterval);
      if (response?.url) {
        onChange(response.url);

        // TODO : Console
        // console.log("====================================");
        // console.log("Image upload successfully url:", response.url);
        // console.log("====================================");

        toast.success("Image uploaded successfully");
      } else {
        toast.error("Failed to upload image");
      }
    } catch (error) {
      toast.error("Error uploading image");
      console.error("Upload error:", error);
    } finally {
      setIsLoading(false);
      setProgress(0);
    }
  };

  const handleDelete = async (url: string) => {
    try {
      setIsLoading(true);

      const regex = /\/v\d+\/(.+?)\.(jpg|jpeg|png|gif|webp)$/;
      const match = url.match(regex);

      if (!match || !match[1]) {
        throw new Error("Failed to extract public ID from URL");
      }

      const publicId = match[1];

      await deleteImage(publicId);

      onRemove(url);

      // TODO : Console
      // console.log("Image removed successfully, public ID:", publicId);

      toast.success("Image removed successfully");
    } catch (error) {
      toast.error("Error removing image");
      console.error("Delete error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className="w-full space-y-1">
      {value && value.length > 0 ? (
        <div className="mb-4 flex items-center gap-4 flex-wrap">
          {value.map((url) => (
            <div
              key={url}
              className="relative w-52 h-52 rounded-md overflow-hidden group"
            >
              <Image
                fill
                src={url}
                alt="Upload"
                className="object-cover"
                sizes="(max-width: 208px) 100vw, 208px"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  type="button"
                  onClick={() => handleDelete(url)}
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2"
                  disabled={isLoading || disabled}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="w-52 h-52 rounded-md border-2 border-dashed border-gray-300 dark:border-gray-700">
          {isLoading ? (
            <div className="h-full flex flex-col items-center justify-center">
              <PuffLoader size={30} color="#555" />
              <p className="mt-2 text-sm text-gray-500">{`${progress.toFixed(
                0
              )}%`}</p>
            </div>
          ) : (
            <Label className="h-full flex flex-col items-center justify-center cursor-pointer">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <ImagePlus className="h-8 w-8 text-gray-500 mb-2" />
                <p className="text-sm text-gray-500">Click to upload {label}</p>
                <p className="text-xs text-gray-400 mt-1">{`Max size: ${maxSize}MB`}</p>
              </div>
              <Input
                name={imageName}
                type="file"
                className="hidden"
                onChange={onUpload}
                accept="image/*"
                disabled={isLoading || disabled}
              />
            </Label>
          )}
        </div>
      )}
    </div>
  );
}
