import Image from "next/image";
import Link from "next/link";
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

export default async function ProductsPage() {
  const categoriesData = await getProductCategories();
  const categories = categoriesData.map((cat) => ({
    ...cat,
    products: JSON.parse(cat.products),
  }));

  return (
    <main>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 via-blue-50 to-white py-12 sm:py-16 lg:py-20 pt-24 sm:pt-28 lg:pt-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(27,167,212,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(102,209,231,0.08),transparent_40%)]"></div>

        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-gray-900 mb-4 sm:mb-6">
              Our Products
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto px-2 sm:px-0">
              Comprehensive pharmaceutical products and medical supplies across multiple categories
            </p>
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-10 sm:py-12 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="space-y-12 sm:space-y-16 lg:space-y-20">
            {categories.map((category, index) => (
              <div
                key={index}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Image */}
                <div
                  className={`relative h-48 sm:h-64 lg:h-[400px] rounded-lg overflow-hidden ${
                    index % 2 === 1 ? "lg:order-2" : ""
                  }`}
                >
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Content */}
                <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-gray-900 mb-3 sm:mb-4">
                    {category.name}
                  </h2>
                  <p className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed mb-4 sm:mb-6">
                    {category.description}
                  </p>

                  <div className="mb-6 sm:mb-8">
                    <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">
                      Product Range:
                    </h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                      {category.products.map((product: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-2">
                          <svg
                            className="w-4 h-4 sm:w-5 sm:h-5 text-primary mt-0.5 shrink-0"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          <span className="text-xs sm:text-sm lg:text-base text-gray-700">{product}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    href="/request-quote"
                    className="inline-flex items-center justify-center bg-primary hover:bg-primary-600 text-white px-5 sm:px-6 lg:px-7 py-2.5 sm:py-3 lg:py-3.5 rounded font-semibold text-sm sm:text-base transition-all duration-200"
                  >
                    Request a Quote
                    <svg
                      className="ml-2 w-4 h-4 sm:w-5 sm:h-5"
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

      {/* Quality Standards Section */}
      <section className="py-10 sm:py-12 lg:py-20 bg-gradient-to-br from-primary-50 via-blue-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(27,167,212,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(102,209,231,0.08),transparent_40%)]"></div>

        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 relative z-10">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-medium text-gray-900 mb-4 sm:mb-6">
              Quality Standards
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto px-2 sm:px-0">
              All our products meet the highest pharmaceutical standards and regulatory requirements
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            <div className="bg-white/80 backdrop-blur-sm p-4 sm:p-6 lg:p-8 rounded-lg border border-primary/20 text-center">
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-primary/10 rounded-lg flex items-center justify-center text-primary mx-auto mb-3 sm:mb-4">
                <svg className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-sm sm:text-base lg:text-xl font-semibold text-gray-900 mb-1.5 sm:mb-2">
                WHO Certified
              </h3>
              <p className="text-xs sm:text-sm lg:text-base text-gray-600">
                Products meet World Health Organization standards
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm p-4 sm:p-6 lg:p-8 rounded-lg border border-primary/20 text-center">
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-primary/10 rounded-lg flex items-center justify-center text-primary mx-auto mb-3 sm:mb-4">
                <svg className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-sm sm:text-base lg:text-xl font-semibold text-gray-900 mb-1.5 sm:mb-2">
                FDA Approved
              </h3>
              <p className="text-xs sm:text-sm lg:text-base text-gray-600">
                Compliance with international safety regulations
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm p-4 sm:p-6 lg:p-8 rounded-lg border border-primary/20 text-center">
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-primary/10 rounded-lg flex items-center justify-center text-primary mx-auto mb-3 sm:mb-4">
                <svg className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-sm sm:text-base lg:text-xl font-semibold text-gray-900 mb-1.5 sm:mb-2">
                ISO Certified
              </h3>
              <p className="text-xs sm:text-sm lg:text-base text-gray-600">
                Quality management system certification
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm p-4 sm:p-6 lg:p-8 rounded-lg border border-primary/20 text-center">
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-primary/10 rounded-lg flex items-center justify-center text-primary mx-auto mb-3 sm:mb-4">
                <svg className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <h3 className="text-sm sm:text-base lg:text-xl font-semibold text-gray-900 mb-1.5 sm:mb-2">
                GMP Compliant
              </h3>
              <p className="text-xs sm:text-sm lg:text-base text-gray-600">
                Good Manufacturing Practice standards
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-10 sm:py-12 lg:py-20 bg-primary">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-medium text-white mb-4 sm:mb-6">
            Need Help Finding Products?
          </h2>
          <p className="text-sm sm:text-base lg:text-xl text-white/90 leading-relaxed max-w-3xl mx-auto mb-6 sm:mb-8 px-2 sm:px-0">
            Our team is ready to assist you in finding the right pharmaceutical products for your needs
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link
              href="/request-quote"
              className="inline-flex items-center justify-center bg-white text-primary hover:bg-gray-50 px-5 sm:px-6 lg:px-7 py-2.5 sm:py-3 lg:py-3.5 rounded font-semibold text-sm sm:text-base transition-all duration-200"
            >
              Request a Quote
              <svg
                className="ml-2 w-4 h-4 sm:w-5 sm:h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary px-5 sm:px-6 lg:px-7 py-2.5 sm:py-3 lg:py-3.5 rounded font-semibold text-sm sm:text-base transition-all duration-200"
            >
              Contact Us
              <svg
                className="ml-2 w-4 h-4 sm:w-5 sm:h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
