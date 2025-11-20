"use client";

import Image from "next/image";

export default function ClientLogos() {
  const logos = [
    {
      src: "https://impactpharma.b-cdn.net/Blue_Logo_CHUB.png",
      alt: "CHUB",
    },
    {
      src: "https://impactpharma.b-cdn.net/King-faisal-hospital-kigali-logo.png",
      alt: "King Faisal Hospital",
    },
    {
      src: "https://impactpharma.b-cdn.net/logo-apollo.png",
      alt: "Apollo",
    },
    {
      src: "https://impactpharma.b-cdn.net/logoMoh.png",
      alt: "Ministry of Health",
    },
    {
      src: "https://impactpharma.b-cdn.net/rbc-logo.png",
      alt: "RBC",
    },
    {
      src: "https://impactpharma.b-cdn.net/Blue_Logo_CHUB.png",
      alt: "CHUB",
    },
    {
      src: "https://impactpharma.b-cdn.net/King-faisal-hospital-kigali-logo.png",
      alt: "King Faisal Hospital",
    },
    {
      src: "https://impactpharma.b-cdn.net/logo-apollo.png",
      alt: "Apollo",
    },
  ];

  // Duplicate logos for seamless loop
  const duplicatedLogos = [...logos, ...logos];

  return (
    <section className="py-20 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900">
            Trusted by Leading Healthcare Institutions
          </h2>
        </div>
      </div>

      <div className="relative py-4">
        {/* Left fade */}
        <div className="absolute left-0 top-0 bottom-0 w-48 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none"></div>

        {/* Right fade */}
        <div className="absolute right-0 top-0 bottom-0 w-48 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none"></div>

        <div className="flex animate-scroll">
          {duplicatedLogos.map((logo, index) => (
            <div
              key={index}
              className="flex-shrink-0 mx-2 sm:mx-6 flex items-center justify-center w-[50px] h-[30px] sm:w-[120px] sm:h-[60px]"
            >
              <div className="relative w-full h-full flex items-center justify-center">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={120}
                  height={60}
                  className="object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll {
          animation: scroll 20s linear infinite;
          will-change: transform;
        }

        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
