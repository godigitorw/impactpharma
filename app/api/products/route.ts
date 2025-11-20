import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
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
