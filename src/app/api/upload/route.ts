import { uploadImage, deleteImage } from "@/lib/actions/upload.action";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const result = await uploadImage(formData);
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Upload API error:", error);
    return NextResponse.json(
      { error: "Failed to upload image" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { publicId } = await request.json();
    if (!publicId) {
      return NextResponse.json({ error: "Missing publicId" }, { status: 400 });
    }

    const result = await deleteImage(publicId);
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Delete API error:", error);
    return NextResponse.json(
      { error: "Failed to delete image" },
      { status: 500 }
    );
  }
}
