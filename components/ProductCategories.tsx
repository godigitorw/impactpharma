import Link from "next/link";

export default function ProductCategories() {
  const categories = [
    {
      name: "Prescription Medicines",
      description: "Wide range of prescription medications for various treatments",
    },
    {
      name: "Over-the-Counter Products",
      description: "Quality OTC medications and health supplements",
    },
    {
      name: "Medical Equipment",
      description: "Professional medical devices and diagnostic equipment",
    },
    {
      name: "Surgical Supplies",
      description: "Comprehensive surgical instruments and supplies",
    },
    {
      name: "Laboratory Supplies",
      description: "Complete range of laboratory equipment and reagents",
    },
    {
      name: "Personal Protective Equipment",
      description: "High-quality PPE for healthcare professionals",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-medium text-gray-900 mb-6">
            Product Categories
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
            Explore our extensive range of pharmaceutical products and medical supplies
            across multiple categories
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <div
              key={index}
              className="p-6 border border-gray-200 rounded-lg hover:border-primary hover:shadow-lg transition-all duration-200"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {category.name}
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                {category.description}
              </p>
              <Link
                href="/products"
                className="inline-flex items-center text-primary hover:text-primary-600 font-medium transition-colors duration-200"
              >
                View Products
                <svg
                  className="ml-2 w-4 h-4"
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
          ))}
        </div>
      </div>
    </section>
  );
}
