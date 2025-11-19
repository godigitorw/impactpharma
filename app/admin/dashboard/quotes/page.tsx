"use client";

import { useState, useEffect } from "react";

interface QuoteRequest {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  company: string;
  position: string | null;
  organizationType: string;
  location: string;
  productCategory: string;
  productDetails: string;
  quantity: string;
  deliveryDate: string | null;
  specialRequirements: string | null;
  attachmentUrl: string | null;
  agreedToTerms: boolean;
  status: string;
  createdAt: string;
}

export default function QuoteRequestsPage() {
  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedQuote, setSelectedQuote] = useState<QuoteRequest | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("all");

  useEffect(() => {
    fetchQuotes();
  }, []);

  const fetchQuotes = async () => {
    try {
      const response = await fetch("/api/admin/quotes");
      const data = await response.json();

      if (Array.isArray(data)) {
        setQuotes(data);
      } else {
        setQuotes([]);
      }
    } catch (error) {
      console.error("Error fetching quote requests:", error);
      setQuotes([]);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: number, status: string) => {
    try {
      const response = await fetch("/api/admin/quotes", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });

      if (response.ok) {
        setQuotes(quotes.map((q) => (q.id === id ? { ...q, status } : q)));
        if (selectedQuote?.id === id) {
          setSelectedQuote({ ...selectedQuote, status });
        }
      } else {
        alert("Failed to update status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Error updating status");
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredQuotes = filterStatus === "all"
    ? quotes
    : quotes.filter((q) => q.status === filterStatus);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-600">Loading quote requests...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">Quote Requests</h1>
          <p className="text-gray-600">View and manage quote request submissions</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {filteredQuotes.length === 0 ? (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <div className="mb-4">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {filterStatus === "all" ? "No quote requests yet" : `No ${filterStatus} quotes`}
          </h3>
          <p className="text-gray-600">
            {filterStatus === "all"
              ? "Quote request submissions will appear here once customers start requesting quotes."
              : `There are no quotes with ${filterStatus} status.`}
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Contact
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Company
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Product Category
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Status
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredQuotes.map((quote) => (
                  <tr key={quote.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-900">{formatDate(quote.createdAt)}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-900">{quote.fullName}</p>
                      <p className="text-sm text-gray-600">{quote.email}</p>
                      <p className="text-sm text-gray-600">{quote.phone}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-900">{quote.company}</p>
                      <p className="text-sm text-gray-600 capitalize">{quote.organizationType}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-900 capitalize">
                        {quote.productCategory.replace(/-/g, " ")}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold capitalize ${getStatusColor(
                          quote.status
                        )}`}
                      >
                        {quote.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => setSelectedQuote(quote)}
                        className="text-primary hover:text-primary-600 font-medium text-sm"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Details Modal */}
      {selectedQuote && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    Quote Request Details
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Submitted on {formatDate(selectedQuote.createdAt)}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedQuote(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Contact Information */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Contact Information</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Full Name</p>
                    <p className="font-medium text-gray-900">{selectedQuote.fullName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-medium text-gray-900">{selectedQuote.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <p className="font-medium text-gray-900">{selectedQuote.phone}</p>
                  </div>
                  {selectedQuote.position && (
                    <div>
                      <p className="text-sm text-gray-600">Position</p>
                      <p className="font-medium text-gray-900">{selectedQuote.position}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Organization Details */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Organization Details</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Company</p>
                    <p className="font-medium text-gray-900">{selectedQuote.company}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Organization Type</p>
                    <p className="font-medium text-gray-900 capitalize">{selectedQuote.organizationType}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-gray-600">Location</p>
                    <p className="font-medium text-gray-900">{selectedQuote.location}</p>
                  </div>
                </div>
              </div>

              {/* Product Information */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Product Information</h4>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600">Product Category</p>
                    <p className="font-medium text-gray-900 capitalize">
                      {selectedQuote.productCategory.replace(/-/g, " ")}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Product Details</p>
                    <p className="font-medium text-gray-900 whitespace-pre-wrap">{selectedQuote.productDetails}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Quantity</p>
                    <p className="font-medium text-gray-900">{selectedQuote.quantity}</p>
                  </div>
                  {selectedQuote.deliveryDate && (
                    <div>
                      <p className="text-sm text-gray-600">Preferred Delivery Date</p>
                      <p className="font-medium text-gray-900">{selectedQuote.deliveryDate}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Special Requirements */}
              {selectedQuote.specialRequirements && (
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Special Requirements</h4>
                  <p className="text-gray-900 whitespace-pre-wrap">{selectedQuote.specialRequirements}</p>
                </div>
              )}

              {/* Attachment */}
              {selectedQuote.attachmentUrl && (
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Attachment</h4>
                  <div className="p-4 border border-gray-300 rounded bg-gray-50 flex items-center gap-3">
                    <div className="flex-shrink-0">
                      <svg className="w-10 h-10 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {selectedQuote.attachmentUrl.split('/').pop()}
                      </p>
                      <p className="text-xs text-gray-500">PDF Document</p>
                    </div>
                    <a
                      href={selectedQuote.attachmentUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      download
                      className="flex-shrink-0 px-4 py-2 bg-primary text-white rounded hover:bg-primary-600 transition-colors text-sm font-medium"
                    >
                      Download
                    </a>
                  </div>
                </div>
              )}

              {/* Status Update */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Update Status</h4>
                <div className="flex gap-2">
                  <button
                    onClick={() => updateStatus(selectedQuote.id, "pending")}
                    className={`px-4 py-2 rounded font-medium text-sm transition-colors ${
                      selectedQuote.status === "pending"
                        ? "bg-yellow-600 text-white"
                        : "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                    }`}
                  >
                    Pending
                  </button>
                  <button
                    onClick={() => updateStatus(selectedQuote.id, "processing")}
                    className={`px-4 py-2 rounded font-medium text-sm transition-colors ${
                      selectedQuote.status === "processing"
                        ? "bg-blue-600 text-white"
                        : "bg-blue-100 text-blue-800 hover:bg-blue-200"
                    }`}
                  >
                    Processing
                  </button>
                  <button
                    onClick={() => updateStatus(selectedQuote.id, "completed")}
                    className={`px-4 py-2 rounded font-medium text-sm transition-colors ${
                      selectedQuote.status === "completed"
                        ? "bg-green-600 text-white"
                        : "bg-green-100 text-green-800 hover:bg-green-200"
                    }`}
                  >
                    Completed
                  </button>
                  <button
                    onClick={() => updateStatus(selectedQuote.id, "cancelled")}
                    className={`px-4 py-2 rounded font-medium text-sm transition-colors ${
                      selectedQuote.status === "cancelled"
                        ? "bg-red-600 text-white"
                        : "bg-red-100 text-red-800 hover:bg-red-200"
                    }`}
                  >
                    Cancelled
                  </button>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end">
              <button
                onClick={() => setSelectedQuote(null)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-7 py-3.5 rounded font-semibold text-base transition-all duration-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
