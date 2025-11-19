import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check authentication
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const contactDetailId = parseInt(params.id);

    const contactDetail = await prisma.contactDetails.findUnique({
      where: { id: contactDetailId },
    });

    if (!contactDetail) {
      return NextResponse.json(
        { error: "Contact detail not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(contactDetail);
  } catch (error) {
    console.error("Error fetching contact detail:", error);
    return NextResponse.json(
      { error: "Failed to fetch contact detail" },
      { status: 500 }
    );
  }
}
