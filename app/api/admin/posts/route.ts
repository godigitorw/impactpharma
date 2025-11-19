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

    // Fetch all blog posts, ordered by most recent first
    const posts = await prisma.blogPost.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog posts" },
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

    const {
      title,
      slug,
      excerpt,
      content,
      image,
      category,
      author,
      date,
    } = body;

    // Validate required fields
    if (
      !title ||
      !slug ||
      !excerpt ||
      !content ||
      !image ||
      !category ||
      !author ||
      !date
    ) {
      return NextResponse.json(
        { error: "All required fields must be provided" },
        { status: 400 }
      );
    }

    // Create blog post in database
    const blogPost = await prisma.blogPost.create({
      data: {
        title,
        slug,
        excerpt,
        content,
        image,
        category,
        author,
        date,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Blog post created successfully",
        post: blogPost,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating blog post:", error);
    return NextResponse.json(
      { error: "Failed to create blog post" },
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

    const {
      id,
      title,
      slug,
      excerpt,
      content,
      image,
      category,
      author,
      date,
    } = body;

    // Validate required fields
    if (!id) {
      return NextResponse.json(
        { error: "Post ID is required" },
        { status: 400 }
      );
    }

    // Update blog post in database
    const blogPost = await prisma.blogPost.update({
      where: { id: parseInt(id) },
      data: {
        ...(title && { title }),
        ...(slug && { slug }),
        ...(excerpt && { excerpt }),
        ...(content && { content }),
        ...(image && { image }),
        ...(category && { category }),
        ...(author && { author }),
        ...(date && { date }),
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Blog post updated successfully",
        post: blogPost,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating blog post:", error);
    return NextResponse.json(
      { error: "Failed to update blog post" },
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
        { error: "Post ID is required" },
        { status: 400 }
      );
    }

    // Delete blog post from database
    await prisma.blogPost.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Blog post deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting blog post:", error);
    return NextResponse.json(
      { error: "Failed to delete blog post" },
      { status: 500 }
    );
  }
}
