import Link from "next/link";
import Image from "next/image";

export default function ProductCategories() {
  const categories = [
    {
      name: "Prescription Medicines",
      description: "Wide range of prescription medications for various treatments",
      image: "https://impactpharma.b-cdn.net/pexels-pietrozj-360622.jpg",
    },
    {
      name: "Over-the-Counter Products",
      description: "Quality OTC medications and health supplements",
      image: "https://impactpharma.b-cdn.net/pexels-julie-viken-148496-593451.jpg",
    },
    {
      name: "Medical Equipment",
      description: "Professional medical devices and diagnostic equipment",
      image: "https://impactpharma.b-cdn.net/pexels-shvetsa-3845129.jpg",
    },
    {
      name: "Surgical Supplies",
      description: "Comprehensive surgical instruments and supplies",
      image: "https://impactpharma.b-cdn.net/pexels-karola-g-6627704.jpg",
    },
    {
      name: "Laboratory Supplies",
      description: "Complete range of laboratory equipment and reagents",
      image: "https://impactpharma.b-cdn.net/pexels-jess-vide-9268926.jpg",
    },
    {
      name: "Personal Protective Equipment",
      description: "High-quality PPE for healthcare professionals",
      image: "https://impactpharma.b-cdn.net/pexels-cdc-library-3993241.jpg",
    },
  ];

  return (
    <section className="py-10 sm:py-12 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="text-center mb-6 sm:mb-8 lg:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-medium text-gray-900 mb-3 sm:mb-4 lg:mb-6">
            Product Categories
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto px-2 sm:px-0">
            Explore our extensive range of pharmaceutical products and medical supplies
            across multiple categories
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
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
