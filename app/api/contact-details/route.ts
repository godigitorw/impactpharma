import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    // Fetch general contact details only (type = "general") - PUBLIC endpoint
    const contactDetails = await prisma.contactDetails.findMany({
      where: {
        type: "general",
      },
      orderBy: {
        order: "asc",
      },
    });

    return NextResponse.json(contactDetails);
  } catch (error) {
    console.error("Error fetching contact details:", error);
    return NextResponse.json(
      { error: "Failed to fetch contact details" },
      { status: 500 }
    );
  }
}
