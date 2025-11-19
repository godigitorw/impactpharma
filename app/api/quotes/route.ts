import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      fullName,
      email,
      phone,
      company,
      position,
      organizationType,
      location,
      productCategory,
      productDetails,
      quantity,
      deliveryDate,
      specialRequirements,
      attachmentUrl,
      agreedToTerms,
    } = body;

    // Validate required fields
    if (
      !fullName ||
      !email ||
      !phone ||
      !company ||
      !organizationType ||
      !location ||
      !productCategory ||
      !productDetails ||
      !quantity ||
      !agreedToTerms
    ) {
      return NextResponse.json(
        { error: "All required fields must be provided" },
        { status: 400 }
      );
    }

    // Create quote request in database
    const quoteRequest = await prisma.quoteRequest.create({
      data: {
        fullName,
        email,
        phone,
        company,
        position: position || "",
        organizationType,
        location,
        productCategory,
        productDetails,
        quantity,
        deliveryDate: deliveryDate || "",
        specialRequirements: specialRequirements || "",
        attachmentUrl: attachmentUrl || "",
        agreedToTerms,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Quote request received successfully",
        id: quoteRequest.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving quote request:", error);
    return NextResponse.json(
      { error: "Failed to save quote request" },
      { status: 500 }
    );
  }
}
