import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get the uploaded file
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    // Validate file type (images and PDFs)
    const allowedTypes = ["image/", "application/pdf"];
    const isValidType = allowedTypes.some((type) => file.type.startsWith(type) || file.type === type);

    if (!isValidType) {
      return NextResponse.json(
        { error: "File must be an image or PDF" },
        { status: 400 }
      );
    }

    // Validate file size (max 10MB for PDFs, 5MB for images)
    const maxSize = file.type === "application/pdf" ? 10 * 1024 * 1024 : 5 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: file.type === "application/pdf" ? "PDF size must be less than 10MB" : "Image size must be less than 5MB" },
        { status: 400 }
      );
    }

    // Get Bunny CDN configuration
    const apiKey = process.env.BUNNY_STORAGE_API_KEY;
    const storageZoneName = process.env.BUNNY_STORAGE_ZONE_NAME;
    const cdnUrl = process.env.BUNNY_CDN_URL;

    if (!apiKey || !storageZoneName || !cdnUrl) {
      return NextResponse.json(
        { error: "Bunny CDN configuration is missing" },
        { status: 500 }
      );
    }

    // Generate unique filename
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(7);
    const fileExtension = file.name.split(".").pop();
    const prefix = file.type === "application/pdf" ? "quote-attachment" : "blog";
    const filename = `${prefix}-${timestamp}-${randomString}.${fileExtension}`;

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to Bunny CDN Storage
    // Bunny Storage API uses storage.bunnycdn.com without region prefix
    const bunnyUrl = `https://storage.bunnycdn.com/${storageZoneName}/${filename}`;

    const uploadResponse = await fetch(bunnyUrl, {
      method: "PUT",
      headers: {
        AccessKey: apiKey,
        "Content-Type": file.type,
      },
      body: buffer,
    });

    if (!uploadResponse.ok) {
      const errorText = await uploadResponse.text();
      console.error("Bunny CDN upload error:", errorText);
      return NextResponse.json(
        { error: "Failed to upload to Bunny CDN" },
        { status: 500 }
      );
    }

    // Return the CDN URL
    const imageUrl = `${cdnUrl}/${filename}`;

    return NextResponse.json(
      {
        success: true,
        url: imageUrl,
        filename: filename,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    );
  }
}
