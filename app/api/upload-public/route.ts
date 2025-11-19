import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // Get the uploaded file
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    // Validate file type (only PDFs for public uploads)
    if (file.type !== "application/pdf") {
      return NextResponse.json(
        { error: "Only PDF files are allowed" },
        { status: 400 }
      );
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: "PDF size must be less than 10MB" },
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
    const filename = `quote-attachment-${timestamp}-${randomString}.${fileExtension}`;

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to Bunny CDN Storage
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
    const fileUrl = `${cdnUrl}/${filename}`;

    return NextResponse.json(
      {
        success: true,
        url: fileUrl,
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
