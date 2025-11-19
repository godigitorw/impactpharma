import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

async function getTeamMembers() {
  try {
    const teamMembers = await prisma.teamMember.findMany({
      orderBy: {
        order: "asc",
      },
    });
    return teamMembers;
  } catch (error) {
    console.error("Error fetching team members:", error);
    return [];
  }
}

export default async function AboutPage() {
  const team = await getTeamMembers();

  const values = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: "Quality First",
      description: "We prioritize quality in every aspect of our operations, ensuring all products meet the highest pharmaceutical standards.",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      title: "Customer Focus",
      description: "Our customers' success is our success. We build lasting partnerships through reliable service and support.",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Integrity",
      description: "We conduct our business with honesty, transparency, and ethical practices in all our dealings.",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Innovation",
      description: "We continuously improve our processes and services to better serve the healthcare industry.",
    },
  ];

  return (
    <main>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 via-blue-50 to-white py-20 pt-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(27,167,212,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(102,209,231,0.08),transparent_40%)]"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-6xl font-medium text-gray-900 mb-6">
              About Impact Pharma
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              Your trusted partner in pharmaceutical distribution for over a decade
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-5xl font-medium text-gray-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
                <p>
                  Founded in 2014, Impact Pharma has grown from a small pharmaceutical distributor
                  to become one of the most trusted names in healthcare supply chain management across
                  the region.
                </p>
                <p>
                  Our journey began with a simple mission: to ensure that quality medicines and
                  medical supplies reach healthcare providers reliably and efficiently. Over the years,
                  we have built strong relationships with manufacturers, healthcare facilities, and
                  regulatory bodies.
                </p>
                <p>
                  Today, we serve over 500 hospitals, clinics, and pharmacies, distributing thousands
                  of pharmaceutical products while maintaining the highest standards of quality and
                  compliance.
                </p>
              </div>
            </div>
            <div className="relative h-[500px] rounded-lg overflow-hidden">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
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

      {/* Mission & Vision */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-10 rounded-lg border border-primary/20">
              <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-6">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-3xl font-semibold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                To provide reliable, quality pharmaceutical products and medical supplies to
                healthcare providers across the region, ensuring timely delivery and exceptional
                service while maintaining the highest standards of safety and compliance.
              </p>
            </div>
            <div className="bg-white p-10 rounded-lg border border-primary/20">
              <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-6">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-3xl font-semibold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                To be the leading pharmaceutical wholesale distributor in East Africa, recognized
                for excellence in service delivery, innovation in supply chain management, and
                unwavering commitment to improving healthcare accessibility.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-medium text-gray-900 mb-6">
              Our Core Values
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
              These principles guide everything we do and shape our company culture
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center text-primary mx-auto mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team */}
      {team.length > 0 && (
        <section className="py-20 bg-gradient-to-br from-primary-50 via-blue-50 to-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(27,167,212,0.1),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(102,209,231,0.08),transparent_40%)]"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-medium text-gray-900 mb-6">
                Our Team
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
                Meet the dedicated professionals behind Impact Pharma's success
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member) => (
                <div key={member.id} className="bg-white/80 backdrop-blur-sm rounded-lg border border-primary/20 overflow-hidden hover:border-primary/40 transition-all duration-200">
                  <div className="relative h-64 w-full bg-gray-200">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">
                      {member.name}
                    </h3>
                    <p className="text-primary font-medium mb-3">
                      {member.role}
                    </p>
                    <p className="text-gray-600 leading-relaxed text-sm">
                      {member.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl font-medium text-white mb-6">
            Partner with Us Today
          </h2>
          <p className="text-xl text-white/90 leading-relaxed max-w-3xl mx-auto mb-8">
            Join hundreds of healthcare providers who trust Impact Pharma for their pharmaceutical supply needs
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center bg-white text-primary hover:bg-gray-50 px-7 py-3.5 rounded font-semibold text-base transition-all duration-200"
          >
            Get in Touch
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
      </section>
    </main>
  );
}
