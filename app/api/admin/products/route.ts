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

    // Fetch all product categories, ordered by order field
    const productCategories = await prisma.productCategory.findMany({
      orderBy: {
        order: "asc",
      },
    });

    return NextResponse.json(productCategories);
  } catch (error) {
    console.error("Error fetching product categories:", error);
    return NextResponse.json(
      { error: "Failed to fetch product categories" },
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

    const { name, description, image, products, order } = await request.json();

    // Validate required fields
    if (!name || !description || !image || !products) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create new product category
    const productCategory = await prisma.productCategory.create({
      data: {
        name,
        description,
        image,
        products,
        order: order || 0,
      },
    });

    return NextResponse.json(
      { success: true, productCategory },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating product category:", error);
    return NextResponse.json(
      { error: "Failed to create product category" },
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

    const { id, name, description, image, products, order } = await request.json();

    // Validate required fields
    if (!id || !name || !description || !image || !products) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Update product category
    const productCategory = await prisma.productCategory.update({
      where: { id },
      data: {
        name,
        description,
        image,
        products,
        order: order || 0,
      },
    });

    return NextResponse.json({ success: true, productCategory });
  } catch (error) {
    console.error("Error updating product category:", error);
    return NextResponse.json(
      { error: "Failed to update product category" },
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
        { error: "Product category ID is required" },
        { status: 400 }
      );
    }

    // Delete product category
    await prisma.productCategory.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting product category:", error);
    return NextResponse.json(
      { error: "Failed to delete product category" },
      { status: 500 }
    );
  }
}
