import Link from "next/link";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative h-[90vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center pt-[90px]">
        <div className="w-full lg:w-[60%]">
          <h1 className="font-medium text-gray-900 mb-6" style={{ fontSize: '85px', lineHeight: '85px' }}>
            Making a Lasting{" "}
            <span className="text-primary">Impact on Health.</span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-700 mb-8 leading-relaxed">
            Supplying quality medicines and medical supplies to hospitals, clinics, and pharmacies across the region
          </p>

          {/* CTA Button */}
          <div>
            <Link
              href="/request-quote"
              className="inline-flex items-center justify-center bg-primary hover:bg-primary-600 text-white px-7 py-3.5 rounded font-semibold text-base transition-all duration-200"
            >
              Request Quote
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

          {/* Quick Stats */}
          <div className="mt-20 flex items-center gap-8">
            <div className="text-center">
              <div className="text-2xl font-semibold text-primary mb-1">10+</div>
              <div className="text-sm text-gray-600 leading-tight">Years Experience</div>
            </div>
            <div className="h-12 w-px bg-gray-300"></div>
            <div className="text-center">
              <div className="text-2xl font-semibold text-primary mb-1">500+</div>
              <div className="text-sm text-gray-600 leading-tight">Products</div>
            </div>
            <div className="h-12 w-px bg-gray-300"></div>
            <div className="text-center">
              <div className="text-2xl font-semibold text-primary mb-1">200+</div>
              <div className="text-sm text-gray-600 leading-tight">Clients Served</div>
            </div>
            <div className="h-12 w-px bg-gray-300"></div>
            <div className="text-center">
              <div className="text-2xl font-semibold text-primary mb-1">5+</div>
              <div className="text-sm text-gray-600 leading-tight">Certifications</div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 flex">
        <div className="w-full lg:w-[60%] bg-gradient-to-br from-primary-50 via-blue-50 to-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(27,167,212,0.1),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(102,209,231,0.08),transparent_40%)]"></div>
        </div>
        <div className="hidden lg:block lg:w-[40%] relative">
          <Image
            src="https://impactpharma.b-cdn.net/pexels-ivan-s-4989175.jpg"
            alt="Pharmaceutical Distribution"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-50 to-transparent opacity-20"></div>
        </div>
      </div>
    </section>
  );
}
