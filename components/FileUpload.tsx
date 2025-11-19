"use client";

import { useState, useRef } from "react";

interface FileUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  accept?: string;
  maxSize?: number; // in MB
}

export default function FileUpload({
  value,
  onChange,
  label = "Upload File",
  accept = ".pdf",
  maxSize = 10,
}: FileUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [fileName, setFileName] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    const acceptedExtensions = accept.split(',').map(ext => ext.trim().replace('.', ''));

    if (!acceptedExtensions.includes(fileExtension || '')) {
      setError(`Please select a valid file type (${accept})`);
      return;
    }

    // Validate file size
    if (file.size > maxSize * 1024 * 1024) {
      setError(`File size should be less than ${maxSize}MB`);
      return;
    }

    setError("");
    setUploading(true);

    try {
      // Create FormData
      const formData = new FormData();
      formData.append("file", file);

      // Upload to API route (use public endpoint for PDFs)
      const uploadEndpoint = accept === ".pdf" ? "/api/upload-public" : "/api/upload";
      const response = await fetch(uploadEndpoint, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        const fileUrl = data.url;
        setFileName(file.name);
        onChange(fileUrl);
      } else {
        setError(data.error || "Failed to upload file");
      }
    } catch (error) {
      setError("An error occurred while uploading the file");
      console.error("Upload error:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemove = () => {
    setFileName("");
    onChange("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Extract filename from URL if value exists but fileName doesn't
  const displayFileName = fileName || (value ? value.split('/').pop() : '');

  return (
    <div className="space-y-3">
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="hidden"
      />

      {value ? (
        <div className="space-y-3">
          <div className="p-4 border border-gray-300 rounded bg-gray-50 flex items-center gap-3">
            <div className="flex-shrink-0">
              <svg className="w-10 h-10 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {displayFileName}
              </p>
              <p className="text-xs text-gray-500">PDF Document</p>
            </div>
            <a
              href={value}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 text-primary hover:text-primary-600 text-sm font-medium"
            >
              View
            </a>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleButtonClick}
              disabled={uploading}
              className="px-4 py-2 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              {uploading ? "Uploading..." : "Change File"}
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
          className="w-full border-2 border-dashed border-gray-300 rounded p-6 flex flex-col items-center justify-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-colors"
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
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
              </svg>
              <p className="mt-2 text-sm text-gray-600">
                {label}
              </p>
              <p className="text-xs text-gray-500">
                {accept.toUpperCase()} up to {maxSize}MB
              </p>
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
