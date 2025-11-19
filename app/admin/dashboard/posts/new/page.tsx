"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import ImageUpload from "@/components/ImageUpload";

const RichTextEditor = dynamic(() => import("@/components/RichTextEditor"), {
  ssr: false,
});

export default function NewBlogPost() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    image: "",
    category: "",
    author: "",
    date: new Date().toISOString().split("T")[0],
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  // Auto-generate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setFormData({
      ...formData,
      title,
      slug: generateSlug(title),
    });
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleContentChange = (content: string) => {
    setFormData({
      ...formData,
      content,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        router.push("/admin/dashboard/posts");
      } else {
        setError(data.error || "Failed to create post. Please try again.");
      }
    } catch (error) {
      setError("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
          <Link
            href="/admin/dashboard/posts"
            className="hover:text-primary transition-colors"
          >
            Blog Posts
          </Link>
          <span>/</span>
          <span className="text-gray-900">New Post</span>
        </div>
        <h1 className="text-3xl font-semibold text-gray-900">
          Create New Blog Post
        </h1>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleTitleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Enter post title"
              />
            </div>

            <div className="md:col-span-2">
              <label
                htmlFor="slug"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Slug <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="slug"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="post-url-slug"
              />
              <p className="text-sm text-gray-500 mt-1">
                Auto-generated from title. Edit if needed.
              </p>
            </div>

            <div className="md:col-span-2">
              <label
                htmlFor="excerpt"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Excerpt <span className="text-red-500">*</span>
              </label>
              <textarea
                id="excerpt"
                name="excerpt"
                value={formData.excerpt}
                onChange={handleChange}
                required
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Brief summary of the post"
              />
            </div>

            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Category <span className="text-red-500">*</span>
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">Select a category</option>
                <option value="Industry News">Industry News</option>
                <option value="Quality Assurance">Quality Assurance</option>
                <option value="Market Trends">Market Trends</option>
                <option value="Regulatory Updates">Regulatory Updates</option>
                <option value="Company News">Company News</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="author"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Author <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="author"
                name="author"
                value={formData.author}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Author name"
              />
            </div>

            <div>
              <label
                htmlFor="date"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Publish Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Featured Image <span className="text-red-500">*</span>
              </label>
              <ImageUpload
                value={formData.image}
                onChange={(url) => setFormData({ ...formData, image: url })}
              />
            </div>

            <div className="md:col-span-2">
              <label
                htmlFor="content"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Content <span className="text-red-500">*</span>
              </label>
              <RichTextEditor
                content={formData.content}
                onChange={handleContentChange}
              />
            </div>
          </div>

          <div className="flex items-center gap-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-primary hover:bg-primary-600 text-white px-7 py-3.5 rounded font-semibold text-base transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Creating..." : "Create Post"}
            </button>
            <Link
              href="/admin/dashboard/posts"
              className="text-gray-600 hover:text-gray-900 px-7 py-3.5 font-medium transition-colors"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
