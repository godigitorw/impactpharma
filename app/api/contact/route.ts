import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { name, email, phone, company, subject, message } = body;

    // Validate required fields
    if (!name || !email || !phone || !subject || !message) {
      return NextResponse.json(
        { error: "All required fields must be provided" },
        { status: 400 }
      );
    }

    // Create contact message in database
    const contactMessage = await prisma.contactMessage.create({
      data: {
        name,
        email,
        phone,
        company: company || "",
        subject,
        message,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Contact message received successfully",
        id: contactMessage.id
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving contact message:", error);
    return NextResponse.json(
      { error: "Failed to save contact message" },
      { status: 500 }
    );
  }
}
