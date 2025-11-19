"use client";

import { useState, useRef } from "react";
import Image from "next/image";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export default function ImageUpload({
  value,
  onChange,
  label = "Upload Image",
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [preview, setPreview] = useState(value);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError("Please select an image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("Image size should be less than 5MB");
      return;
    }

    setError("");
    setUploading(true);

    try {
      // Create FormData
      const formData = new FormData();
      formData.append("file", file);

      // Upload to API route
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        const imageUrl = data.url;
        setPreview(imageUrl);
        onChange(imageUrl);
      } else {
        setError(data.error || "Failed to upload image");
      }
    } catch (error) {
      setError("An error occurred while uploading the image");
      console.error("Upload error:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemove = () => {
    setPreview("");
    onChange("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-3">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {preview ? (
        <div className="space-y-3">
          <div className="relative w-full h-64 border border-gray-300 rounded overflow-hidden bg-gray-50">
            <Image
              src={preview}
              alt="Preview"
              fill
              className="object-cover"
              unoptimized
            />
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleButtonClick}
              disabled={uploading}
              className="px-4 py-2 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              {uploading ? "Uploading..." : "Change Image"}
            </button>
            <button
              type="button"
              onClick={handleRemove}
              disabled={uploading}
              className="px-4 py-2 bg-white border border-red-300 text-red-600 rounded hover:bg-red-50 transition-colors disabled:opacity-50"
            >
              Remove
            </button>
          </div>
        </div>
      ) : (
        <div
          onClick={handleButtonClick}
          className="w-full h-64 border-2 border-dashed border-gray-300 rounded flex flex-col items-center justify-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-colors"
        >
          {uploading ? (
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-gray-600">Uploading...</p>
            </div>
          ) : (
            <div className="text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p className="mt-2 text-sm text-gray-600">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
            </div>
          )}
        </div>
      )}

      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}
