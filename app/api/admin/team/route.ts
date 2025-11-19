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

    // Fetch all team members, ordered by order field
    const teamMembers = await prisma.teamMember.findMany({
      orderBy: {
        order: "asc",
      },
    });

    return NextResponse.json(teamMembers);
  } catch (error) {
    console.error("Error fetching team members:", error);
    return NextResponse.json(
      { error: "Failed to fetch team members" },
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

    const { name, role, image, description, order } = await request.json();

    // Validate required fields
    if (!name || !role || !image || !description) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create new team member
    const teamMember = await prisma.teamMember.create({
      data: {
        name,
        role,
        image,
        description,
        order: order || 0,
      },
    });

    return NextResponse.json(
      { success: true, teamMember },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating team member:", error);
    return NextResponse.json(
      { error: "Failed to create team member" },
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

    const { id, name, role, image, description, order } = await request.json();

    // Validate required fields
    if (!id || !name || !role || !image || !description) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Update team member
    const teamMember = await prisma.teamMember.update({
      where: { id },
      data: {
        name,
        role,
        image,
        description,
        order: order || 0,
      },
    });

    return NextResponse.json({ success: true, teamMember });
  } catch (error) {
    console.error("Error updating team member:", error);
    return NextResponse.json(
      { error: "Failed to update team member" },
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
        { error: "Team member ID is required" },
        { status: 400 }
      );
    }

    // Delete team member
    await prisma.teamMember.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting team member:", error);
    return NextResponse.json(
      { error: "Failed to delete team member" },
      { status: 500 }
    );
  }
}
