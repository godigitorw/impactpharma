"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

interface ContactDetail {
  id: number;
  type: string;
  label: string;
  phone: string | null;
  email: string | null;
  address: string | null;
  hours: string | null;
  order: number;
}

interface ProductCategory {
  id: number;
  name: string;
  slug: string;
}

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [contactDetails, setContactDetails] = useState<ContactDetail[]>([]);
  const [productCategories, setProductCategories] = useState<ProductCategory[]>([]);

  useEffect(() => {
    // Fetch general contact details
    fetch("/api/contact-details")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setContactDetails(data);
        }
      })
      .catch((error) => {
        console.error("Error fetching contact details:", error);
      });

    // Fetch product categories
    fetch("/api/admin/products")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setProductCategories(data.slice(0, 6)); // Show max 6 categories
        }
      })
      .catch((error) => {
        console.error("Error fetching product categories:", error);
      });
  }, []);

  const quickLinks = [
    { name: "About Us", href: "/about" },
    { name: "Products", href: "/products" },
    { name: "Services", href: "/services" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
    { name: "Request Quote", href: "/request-quote" },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-8 sm:py-10 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Column 1: Company Info */}
          <div>
            <div className="mb-3 sm:mb-4">
              <Image
                src="https://impactpharma.b-cdn.net/Impact%20Pharma%20new%20Logo.png"
                alt="Impact Pharma Logo"
                width={160}
                height={50}
                className="h-8 sm:h-10 w-auto brightness-0 invert"
              />
            </div>
            <p className="text-xs sm:text-sm mb-4 leading-relaxed">
              Leading distributor of medical devices, equipment, consumables, laboratory reagents, and healthcare products. Serving 2000+ healthcare facilities across East Africa since 2019.
            </p>
          </div>

          {/* Column 2: Quick Links & Product Categories */}
          <div className="grid grid-cols-2 gap-6 sm:gap-8">
            {/* Quick Links */}
            <div>
              <h3 className="text-white font-semibold text-base sm:text-lg mb-3 sm:mb-4">Quick Links</h3>
              <ul className="space-y-1.5 sm:space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-xs sm:text-sm hover:text-primary transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Product Categories */}
            <div>
              <h3 className="text-white font-semibold text-base sm:text-lg mb-3 sm:mb-4">Product Categories</h3>
              <ul className="space-y-1.5 sm:space-y-2">
                {productCategories.length > 0 ? (
                  productCategories.map((category) => (
                    <li key={category.id}>
                      <Link
                        href="/products"
                        className="text-xs sm:text-sm hover:text-primary transition-colors duration-200"
                      >
                        {category.name}
                      </Link>
                    </li>
                  ))
                ) : (
                  <>
                    <li>
                      <Link
                        href="/products"
                        className="text-xs sm:text-sm hover:text-primary transition-colors duration-200"
                      >
                        All Products
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/request-quote"
                        className="text-xs sm:text-sm hover:text-primary transition-colors duration-200"
                      >
                        Request a Quote
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h3 className="text-white font-semibold text-base sm:text-lg mb-3 sm:mb-4">Contact Us</h3>
            {contactDetails.length > 0 ? (
              <ul className="space-y-3 sm:space-y-4 text-xs sm:text-sm">
                {contactDetails.map((detail) => (
                  <li key={detail.id} className="space-y-3">
                    {detail.phone && (
                      <div className="flex items-center">
                        <svg
                          className="h-5 w-5 text-primary mr-3 flex-shrink-0"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                        <a href={`tel:${detail.phone}`} className="hover:text-primary transition-colors">
                          {detail.phone}
                        </a>
                      </div>
                    )}
                    {detail.email && (
                      <div className="flex items-center">
                        <svg
                          className="h-5 w-5 text-primary mr-3 flex-shrink-0"
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
                        <a href={`mailto:${detail.email}`} className="hover:text-primary transition-colors">
                          {detail.email}
                        </a>
                      </div>
                    )}
                    {detail.address && (
                      <div className="flex items-start">
                        <svg
                          className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        <span className="leading-relaxed">{detail.address}</span>
                      </div>
                    )}
                    {detail.hours && (
                      <div className="flex items-center">
                        <svg
                          className="h-5 w-5 text-primary mr-3 flex-shrink-0"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span>{detail.hours}</span>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <div>
                <p className="text-xs sm:text-sm mb-3 sm:mb-4 leading-relaxed">
                  Get in touch with us for any inquiries about our products, services, or to request a quote.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-primary text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg hover:bg-primary-600 transition-colors font-medium text-xs sm:text-sm"
                >
                  <svg
                    className="h-4 w-4 sm:h-5 sm:w-5"
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
                  Contact Us
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6">
          <div className="text-center">
            <p className="text-xs sm:text-sm">
              © {currentYear} Impact Pharma Rwanda. All Rights Reserved.
            </p>
            <p className="text-[10px] sm:text-xs text-gray-500 mt-1 sm:mt-2">
              Leading medical equipment and healthcare product distributor in East Africa
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
