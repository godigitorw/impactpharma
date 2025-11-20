import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";

async function getProductCategories() {
  try {
    const categories = await prisma.productCategory.findMany({
      orderBy: {
        order: "asc",
      },
    });
    return categories;
  } catch (error) {
    console.error("Error fetching product categories:", error);
    return [];
  }
}

export default async function ProductCategories() {
  const categories = await getProductCategories();

  return (
    <section className="py-10 sm:py-12 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="text-center mb-6 sm:mb-8 lg:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-medium text-gray-900 mb-3 sm:mb-4 lg:mb-6">
            Product Categories
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto px-2 sm:px-0">
            Explore our extensive range of medical devices, equipment, consumables, laboratory reagents,
            and healthcare products across multiple categories
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {categories.map((category, index) => (
            <div
              key={index}
              className="border border-primary rounded-lg hover:bg-primary/5 transition-all duration-200 overflow-hidden group"
            >
              <div className="relative h-40 sm:h-48 w-full overflow-hidden">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-4 sm:p-5 lg:p-6">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">
                  {category.name}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-3 sm:mb-4 text-xs sm:text-sm lg:text-base">
                  {category.description}
                </p>
                <Link
                  href="/products"
                  className="inline-flex items-center text-primary hover:text-primary-600 font-medium transition-colors duration-200 text-sm sm:text-base"
                >
                  View Products
                  <svg
                    className="ml-2 w-3.5 h-3.5 sm:w-4 sm:h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
