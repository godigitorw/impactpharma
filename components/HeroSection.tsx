import Link from "next/link";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative min-h-[85vh] sm:min-h-[90vh] flex flex-col">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 flex-grow flex items-center pt-[100px] sm:pt-[120px] pb-16 sm:pb-20 lg:pt-[90px] lg:pb-0">
        <div className="w-full lg:w-[60%] relative z-10">
          <h1 className="font-medium text-gray-900 mb-4 sm:mb-6 text-[2.5rem] leading-tight sm:text-5xl md:text-6xl lg:text-6xl xl:text-[85px] xl:leading-[85px]">
            Making a Lasting{" "}
            <span className="text-primary block sm:inline">Impact on Health.</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-6 sm:mb-8 leading-relaxed max-w-xl">
            Supplying quality medicines and medical supplies to hospitals, clinics, and pharmacies across the region
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-row gap-2 sm:gap-4 max-w-[70%] sm:max-w-none">
            <Link
              href="/request-quote"
              className="inline-flex items-center justify-center bg-primary hover:bg-primary-600 text-white px-3 sm:px-7 py-3 sm:py-3.5 rounded font-semibold text-sm sm:text-base transition-all duration-200 flex-1 sm:flex-initial sm:w-auto"
            >
              Request Quote
              <svg
                className="ml-1 sm:ml-2 w-4 h-4 sm:w-5 sm:h-5"
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
            <Link
              href="/about"
              className="inline-flex items-center justify-center bg-white hover:bg-gray-50 text-primary border-2 border-primary px-3 sm:px-7 py-3 sm:py-3.5 rounded font-semibold text-sm sm:text-base transition-all duration-200 flex-1 sm:flex-initial sm:w-auto"
            >
              About Us
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

          {/* Quick Stats */}
          <div className="mt-10 sm:mt-12 lg:mt-20 grid grid-cols-4 gap-4 sm:gap-6 md:gap-8 border-t border-gray-200 pt-6 sm:pt-8 md:border-none md:pt-0">
            <div className="text-center md:text-left">
              <div className="text-xl sm:text-2xl lg:text-3xl font-semibold text-primary mb-1">10+</div>
              <div className="text-xs sm:text-sm text-gray-600 leading-tight">Years Experience</div>
            </div>
            <div className="text-center md:text-left">
              <div className="text-xl sm:text-2xl lg:text-3xl font-semibold text-primary mb-1">500+</div>
              <div className="text-xs sm:text-sm text-gray-600 leading-tight">Products</div>
            </div>
            <div className="text-center md:text-left">
              <div className="text-xl sm:text-2xl lg:text-3xl font-semibold text-primary mb-1">200+</div>
              <div className="text-xs sm:text-sm text-gray-600 leading-tight">Clients Served</div>
            </div>
            <div className="text-center md:text-left">
              <div className="text-xl sm:text-2xl lg:text-3xl font-semibold text-primary mb-1">5+</div>
              <div className="text-xs sm:text-sm text-gray-600 leading-tight">Certifications</div>
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
