import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch all quote requests, ordered by most recent first
    const quotes = await prisma.quoteRequest.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(quotes);
  } catch (error) {
    console.error("Error fetching quotes:", error);
    return NextResponse.json(
      { error: "Failed to fetch quote requests" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id, status } = await request.json();

    const updatedQuote = await prisma.quoteRequest.update({
      where: { id: parseInt(id) },
      data: { status },
    });

    return NextResponse.json(updatedQuote);
  } catch (error) {
    console.error("Error updating quote:", error);
    return NextResponse.json(
      { error: "Failed to update quote request" },
      { status: 500 }
    );
  }
}
