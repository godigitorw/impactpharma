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

    // Fetch all contact details, ordered by order field
    const contactDetails = await prisma.contactDetails.findMany({
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

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    const { type, label, phone, email, address, hours, order } = body;

    // Validate required fields
    if (!type || !label) {
      return NextResponse.json(
        { error: "Type and label are required" },
        { status: 400 }
      );
    }

    // Create contact detail in database
    const contactDetail = await prisma.contactDetails.create({
      data: {
        type,
        label,
        phone: phone || null,
        email: email || null,
        address: address || null,
        hours: hours || null,
        order: order || 0,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Contact detail created successfully",
        contactDetail,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating contact detail:", error);
    return NextResponse.json(
      { error: "Failed to create contact detail" },
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

    const body = await request.json();

    const { id, type, label, phone, email, address, hours, order } = body;

    // Validate required fields
    if (!id) {
      return NextResponse.json(
        { error: "Contact detail ID is required" },
        { status: 400 }
      );
    }

    // Update contact detail in database
    const contactDetail = await prisma.contactDetails.update({
      where: { id: parseInt(id) },
      data: {
        ...(type && { type }),
        ...(label && { label }),
        ...(phone !== undefined && { phone: phone || null }),
        ...(email !== undefined && { email: email || null }),
        ...(address !== undefined && { address: address || null }),
        ...(hours !== undefined && { hours: hours || null }),
        ...(order !== undefined && { order }),
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Contact detail updated successfully",
        contactDetail,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating contact detail:", error);
    return NextResponse.json(
      { error: "Failed to update contact detail" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Contact detail ID is required" },
        { status: 400 }
      );
    }

    // Delete contact detail from database
    await prisma.contactDetails.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Contact detail deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting contact detail:", error);
    return NextResponse.json(
      { error: "Failed to delete contact detail" },
      { status: 500 }
    );
  }
}
