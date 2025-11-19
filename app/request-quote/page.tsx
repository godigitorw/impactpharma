"use client";

import { useState } from "react";
import FileUpload from "@/components/FileUpload";

export default function RequestQuotePage() {
  const [formData, setFormData] = useState({
    // Contact Information
    fullName: "",
    email: "",
    phone: "",
    company: "",
    position: "",
    // Organization Details
    organizationType: "",
    location: "",
    // Product Information
    productCategory: "",
    productDetails: "",
    quantity: "",
    // Additional Information
    deliveryDate: "",
    specialRequirements: "",
    attachmentUrl: "",
    // Consent
    agreedToTerms: false,
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const response = await fetch("/api/quotes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          company: "",
          position: "",
          organizationType: "",
          location: "",
          productCategory: "",
          productDetails: "",
          quantity: "",
          deliveryDate: "",
          specialRequirements: "",
          attachmentUrl: "",
          agreedToTerms: false,
        });
        // Scroll to top to show success message
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        setError(data.error || "Failed to submit quote request. Please try again.");
      }
    } catch (error) {
      setError("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    });
  };

  return (
    <main>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 via-blue-50 to-white py-20 pt-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(27,167,212,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(102,209,231,0.08),transparent_40%)]"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-6xl font-medium text-gray-900 mb-6">
              Request a Quote
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              Fill out the form below and our team will get back to you with a customized quote within 24 hours
            </p>
          </div>
        </div>
      </section>

      {/* Quote Form Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-6 py-4 rounded-lg mb-8">
              <h3 className="font-semibold mb-2">Quote Request Submitted Successfully!</h3>
              <p>Thank you for your quote request. Our team will review your requirements and get back to you within 24 hours with a customized quote.</p>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg mb-8">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-10">
            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 pb-2 border-b border-gray-200">
                Contact Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                    placeholder="+250 788 123 456"
                  />
                </div>

                <div>
                  <label
                    htmlFor="position"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Position/Title
                  </label>
                  <input
                    type="text"
                    id="position"
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                    placeholder="Procurement Manager"
                  />
                </div>
              </div>
            </div>

            {/* Organization Details */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 pb-2 border-b border-gray-200">
                Organization Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="company"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Company/Organization Name *
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    required
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                    placeholder="Your Hospital/Clinic"
                  />
                </div>

                <div>
                  <label
                    htmlFor="organizationType"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Organization Type *
                  </label>
                  <select
                    id="organizationType"
                    name="organizationType"
                    required
                    value={formData.organizationType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  >
                    <option value="">Select organization type</option>
                    <option value="hospital">Hospital</option>
                    <option value="clinic">Clinic</option>
                    <option value="pharmacy">Pharmacy</option>
                    <option value="laboratory">Laboratory</option>
                    <option value="health-center">Health Center</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label
                    htmlFor="location"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Location/Address *
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    required
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                    placeholder="City, District, Rwanda"
                  />
                </div>
              </div>
            </div>

            {/* Product Information */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 pb-2 border-b border-gray-200">
                Product Information
              </h2>
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="productCategory"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Product Category *
                  </label>
                  <select
                    id="productCategory"
                    name="productCategory"
                    required
                    value={formData.productCategory}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  >
                    <option value="">Select product category</option>
                    <option value="prescription-medicines">Prescription Medicines</option>
                    <option value="otc-products">Over-the-Counter Products</option>
                    <option value="medical-equipment">Medical Equipment</option>
                    <option value="surgical-supplies">Surgical Supplies</option>
                    <option value="laboratory-supplies">Laboratory Supplies</option>
                    <option value="ppe">Personal Protective Equipment</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="productDetails"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Product Details *
                  </label>
                  <textarea
                    id="productDetails"
                    name="productDetails"
                    required
                    rows={5}
                    value={formData.productDetails}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none"
                    placeholder="Please provide specific product names, brands, dosages, or any other relevant details..."
                  />
                </div>

                <div>
                  <label
                    htmlFor="quantity"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Estimated Quantity *
                  </label>
                  <input
                    type="text"
                    id="quantity"
                    name="quantity"
                    required
                    value={formData.quantity}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                    placeholder="e.g., 500 units, 10 boxes, etc."
                  />
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 pb-2 border-b border-gray-200">
                Additional Information
              </h2>
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="deliveryDate"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Preferred Delivery Date
                  </label>
                  <input
                    type="date"
                    id="deliveryDate"
                    name="deliveryDate"
                    value={formData.deliveryDate}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  />
                </div>

                <div>
                  <label
                    htmlFor="specialRequirements"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Special Requirements or Notes
                  </label>
                  <textarea
                    id="specialRequirements"
                    name="specialRequirements"
                    rows={4}
                    value={formData.specialRequirements}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none"
                    placeholder="Any special handling, storage requirements, or other notes..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Attachment (Optional)
                  </label>
                  <p className="text-sm text-gray-600 mb-3">
                    Upload a PDF file with additional details, specifications, or requirements
                  </p>
                  <FileUpload
                    value={formData.attachmentUrl}
                    onChange={(url) => setFormData({ ...formData, attachmentUrl: url })}
                    label="Click to upload PDF document"
                    accept=".pdf"
                    maxSize={10}
                  />
                </div>
              </div>
            </div>

            {/* Terms and Submit */}
            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="agreedToTerms"
                  name="agreedToTerms"
                  required
                  checked={formData.agreedToTerms}
                  onChange={handleChange}
                  className="mt-1 w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                />
                <label htmlFor="agreedToTerms" className="text-sm text-gray-600">
                  I agree to the terms and conditions and authorize Impact Pharma to process this quote request and contact me regarding my inquiry. *
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary hover:bg-primary-600 text-white px-7 py-4 rounded font-semibold text-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Submitting..." : "Submit Quote Request"}
              </button>

              <p className="text-sm text-gray-500 text-center">
                Our team will review your request and get back to you within 24 hours
              </p>
            </div>
          </form>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold text-gray-900 mb-4">
              What Happens Next?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              After submitting your quote request, here's what you can expect
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                1. We Review
              </h3>
              <p className="text-gray-600">
                Our team reviews your request and verifies product availability
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                2. We Quote
              </h3>
              <p className="text-gray-600">
                You receive a detailed quote with pricing and delivery information
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                3. We Deliver
              </h3>
              <p className="text-gray-600">
                Upon approval, we process and deliver your order promptly
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
