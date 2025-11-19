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
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Title, Description, CTA (Sticky) */}
          <div className="lg:sticky lg:top-24">
            <h2 className="text-5xl font-medium text-gray-900 mb-6">
              Comprehensive Solutions for Healthcare
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              We provide comprehensive pharmaceutical distribution services,
              ensuring quality products reach healthcare facilities efficiently
              and reliably. Our commitment to excellence makes us the preferred
              partner for healthcare providers across the region.
            </p>
            <Link
              href="/services"
              className="inline-flex items-center justify-center bg-primary hover:bg-primary-600 text-white px-7 py-3.5 rounded font-semibold text-base transition-all duration-200"
            >
              View All Services
              <svg
                className="ml-2 w-5 h-5"
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

          {/* Right Column - Services List (70% width, aligned right) */}
          <div className="w-[70%] ml-auto space-y-12">
            {services.map((service) => (
              <div
                key={service.id}
                className="space-y-3"
              >
                <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
