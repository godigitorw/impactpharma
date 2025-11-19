"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function NewServicePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    features: [""],
    order: 0,
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("Image size should be less than 5MB");
      return;
    }

    setUploadingImage(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok && data.url) {
        setImageUrl(data.url);
        setFormData((prev) => ({ ...prev, image: data.url }));
      } else {
        alert(data.error || "Failed to upload image");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Error uploading image");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData({ ...formData, features: newFeatures });
  };

  const addFeature = () => {
    setFormData({ ...formData, features: [...formData.features, ""] });
  };

  const removeFeature = (index: number) => {
    const newFeatures = formData.features.filter((_, i) => i !== index);
    setFormData({ ...formData, features: newFeatures });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.description || !formData.image) {
      alert("Please fill in all required fields");
      return;
    }

    // Filter out empty features
    const features = formData.features.filter((f) => f.trim() !== "");
    if (features.length === 0) {
      alert("Please add at least one feature");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/admin/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          features: JSON.stringify(features),
        }),
      });

      if (response.ok) {
        router.push("/admin/dashboard/services");
      } else {
        const data = await response.json();
        alert(data.error || "Failed to create service");
      }
    } catch (error) {
      console.error("Error creating service:", error);
      alert("Error creating service");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <Link
          href="/admin/dashboard/services"
          className="inline-flex items-center text-primary hover:text-primary-600 font-medium mb-4 transition-colors duration-200"
        >
          <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Services
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Create New Service</h1>
        <p className="text-gray-600 mt-2">Add a new service to your website</p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-3xl">
        <div className="bg-white rounded-lg border border-gray-200 p-8 space-y-6">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Service Title *
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="e.g., Pharmaceutical Distribution"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Describe the service..."
              required
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Service Image *
            </label>
            <div className="mt-2">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded file:border-0
                  file:text-sm file:font-semibold
                  file:bg-primary file:text-white
                  hover:file:bg-primary-600
                  file:cursor-pointer cursor-pointer"
              />
              {uploadingImage && (
                <p className="mt-2 text-sm text-gray-500">Uploading image...</p>
              )}
              {imageUrl && (
                <div className="mt-4 relative w-full h-48 rounded overflow-hidden border border-gray-200">
                  <Image src={imageUrl} alt="Service preview" fill className="object-cover" />
                </div>
              )}
            </div>
          </div>

          {/* Features */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Features *
            </label>
            <div className="space-y-3">
              {formData.features.map((feature, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => handleFeatureChange(index, e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Feature description"
                  />
                  {formData.features.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeFeature(index)}
                      className="px-4 py-2 text-red-600 hover:text-red-800 transition-colors duration-200"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={addFeature}
              className="mt-3 text-primary hover:text-primary-600 font-medium transition-colors duration-200"
            >
              + Add Feature
            </button>
          </div>

          {/* Order */}
          <div>
            <label htmlFor="order" className="block text-sm font-medium text-gray-700 mb-2">
              Display Order
            </label>
            <input
              type="number"
              id="order"
              value={formData.order}
              onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="0"
              min="0"
            />
            <p className="mt-1 text-sm text-gray-500">
              Services are displayed in ascending order (0 comes first)
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={loading || uploadingImage}
              className="bg-primary hover:bg-primary-600 text-white px-6 py-3 rounded font-semibold transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Creating..." : "Create Service"}
            </button>
            <Link
              href="/admin/dashboard/services"
              className="bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-3 rounded font-semibold transition-colors duration-200"
            >
              Cancel
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
