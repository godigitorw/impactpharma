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

    // Fetch all contact messages, ordered by most recent first
    const contacts = await prisma.contactMessage.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(contacts);
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return NextResponse.json(
      { error: "Failed to fetch contact messages" },
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

    const { id, read } = await request.json();

    const updatedContact = await prisma.contactMessage.update({
      where: { id: parseInt(id) },
      data: { read },
    });

    return NextResponse.json(updatedContact);
  } catch (error) {
    console.error("Error updating contact:", error);
    return NextResponse.json(
      { error: "Failed to update contact message" },
      { status: 500 }
    );
  }
}
