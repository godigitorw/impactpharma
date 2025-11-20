import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";

async function getServices() {
  try {
    const services = await prisma.service.findMany({
      orderBy: {
        order: "asc",
      },
      take: 4, // Only show first 4 services on homepage
    });
    return services;
  } catch (error) {
    console.error("Error fetching services:", error);
    return [];
  }
}

export default async function ServicesSection() {
  const services = await getServices();

  return (
    <section className="py-10 sm:py-12 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        {/* Title, Description, and CTA - Centered */}
        <div className="text-center mb-6 sm:mb-8 lg:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-medium text-gray-900 mb-3 sm:mb-4 lg:mb-6">
            Comprehensive Solutions for Healthcare
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto px-2 sm:px-0 mb-6 sm:mb-8">
            We provide comprehensive distribution services for medical devices,
            equipment, consumables, laboratory reagents, and healthcare products,
            ensuring quality reaches healthcare facilities efficiently and reliably.
            Our commitment to excellence makes us the preferred partner for healthcare providers across the region.
          </p>
          <Link
            href="/services"
            className="inline-flex items-center justify-center bg-primary hover:bg-primary-600 text-white px-7 py-3.5 rounded font-semibold text-base transition-all duration-200"
          >
            View All Services
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

        {/* Services Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="border border-primary rounded-lg hover:bg-primary/5 transition-all duration-200 overflow-hidden group"
            >
              <div className="relative h-40 sm:h-48 w-full overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-4 sm:p-5 lg:p-6">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-3 sm:mb-4 text-xs sm:text-sm lg:text-base line-clamp-3">
                  {service.description}
                </p>
                <Link
                  href="/services"
                  className="inline-flex items-center text-primary hover:text-primary-600 font-medium transition-colors duration-200 text-sm sm:text-base"
                >
                  Learn More
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
