import Link from "next/link";
import Image from "next/image";

export default function AboutSection() {
  return (
    <section className="py-10 sm:py-12 lg:py-20 bg-[#F9F9F9]">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
          {/* Left Column - Content */}
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-medium text-gray-900 mb-4 sm:mb-6">
              Your Trusted Partner in <br />
              Medical Equipment Distribution
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed mb-6 sm:mb-8">
              Since 2019, Impact Pharma has been a leading distributor of medical devices, equipment, consumables, laboratory reagents, and healthcare products. We serve over 2000 clients with a comprehensive range of 1000+ products, delivering excellence and reliability across the region.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center justify-center bg-primary hover:bg-primary-600 text-white px-7 py-3.5 rounded font-semibold text-base transition-all duration-200"
            >
              Learn More About Us
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

          {/* Right Column - Video (hidden on mobile) */}
          <div className="hidden lg:block relative lg:h-[500px]">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover rounded-lg"
            >
              <source
                src="https://impactpharma.b-cdn.net/68a08156a0c959a572e3f565_68c6ad11d1780ea07f798b89_neg-transcode.mp4"
                type="video/mp4"
              />
            </video>
          </div>
        </div>
      </div>
    </section>
  );
}
