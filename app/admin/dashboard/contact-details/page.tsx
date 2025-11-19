"use client";

import { useState, useEffect } from "react";
import DeleteModal from "@/components/DeleteModal";

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

export default function ContactDetailsPage() {
  const [contactDetails, setContactDetails] = useState<ContactDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [detailToDelete, setDetailToDelete] = useState<{ id: number; label: string } | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingDetail, setEditingDetail] = useState<ContactDetail | null>(null);
  const [formData, setFormData] = useState({
    type: "general",
    label: "",
    phone: "",
    email: "",
    address: "",
    hours: "",
    order: 0,
  });

  useEffect(() => {
    fetchContactDetails();
  }, []);

  const fetchContactDetails = async () => {
    try {
      const response = await fetch("/api/admin/contact-details");
      const data = await response.json();

      if (Array.isArray(data)) {
        setContactDetails(data);
      } else {
        setContactDetails([]);
      }
    } catch (error) {
      console.error("Error fetching contact details:", error);
      setContactDetails([]);
    } finally {
      setLoading(false);
    }
  };

  const openDeleteModal = (id: number, label: string) => {
    setDetailToDelete({ id, label });
    setDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    if (!detailToDelete) return;

    try {
      const response = await fetch(`/api/admin/contact-details?id=${detailToDelete.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setContactDetails(contactDetails.filter((d) => d.id !== detailToDelete.id));
        setDeleteModalOpen(false);
        setDetailToDelete(null);
      } else {
        alert("Failed to delete contact detail");
      }
    } catch (error) {
      console.error("Error deleting contact detail:", error);
      alert("Error deleting contact detail");
    }
  };

  const openEditModal = (detail: ContactDetail | null = null) => {
    if (detail) {
      setEditingDetail(detail);
      setFormData({
        type: detail.type,
        label: detail.label,
        phone: detail.phone || "",
        email: detail.email || "",
        address: detail.address || "",
        hours: detail.hours || "",
        order: detail.order,
      });
    } else {
      setEditingDetail(null);
      setFormData({
        type: "general",
        label: "",
        phone: "",
        email: "",
        address: "",
        hours: "",
        order: 0,
      });
    }
    setEditModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = editingDetail
        ? "/api/admin/contact-details"
        : "/api/admin/contact-details";

      const method = editingDetail ? "PATCH" : "POST";

      const body = editingDetail
        ? { ...formData, id: editingDetail.id }
        : formData;

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        setEditModalOpen(false);
        fetchContactDetails();
      } else {
        alert("Failed to save contact detail");
      }
    } catch (error) {
      console.error("Error saving contact detail:", error);
      alert("Error saving contact detail");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-600">Loading contact details...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">Contact Details</h1>
          <p className="text-gray-600">Manage company contact information</p>
        </div>
        <button
          onClick={() => openEditModal()}
          className="bg-primary hover:bg-primary-600 text-white px-7 py-3.5 rounded font-semibold text-base transition-all duration-200"
        >
          Add Contact Detail
        </button>
      </div>

      {contactDetails.length === 0 ? (
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
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No contact details yet</h3>
          <p className="text-gray-600 mb-6">Get started by adding your first contact detail.</p>
          <button
            onClick={() => openEditModal()}
            className="inline-flex items-center bg-primary hover:bg-primary-600 text-white px-6 py-3 rounded font-semibold transition-colors duration-200"
          >
            Add Contact Detail
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Type
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Label
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Contact Info
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Order
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {contactDetails.map((detail) => (
                  <tr key={detail.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        detail.type === 'general'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-green-100 text-green-700'
                      }`}>
                        {detail.type}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-900">{detail.label}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-600 space-y-1">
                        {detail.phone && <p>📞 {detail.phone}</p>}
                        {detail.email && <p>✉️ {detail.email}</p>}
                        {detail.address && <p>📍 {detail.address}</p>}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">{detail.order}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditModal(detail)}
                          className="p-2 text-gray-600 hover:text-primary hover:bg-primary/5 rounded transition-colors"
                          title="Edit detail"
                        >
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => openDeleteModal(detail.id, detail.label)}
                          className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                          title="Delete detail"
                        >
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Edit/Create Modal */}
      {editModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900">
                {editingDetail ? "Edit Contact Detail" : "Add Contact Detail"}
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type *
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  required
                >
                  <option value="general">General</option>
                  <option value="location">Location</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Label *
                </label>
                <input
                  type="text"
                  value={formData.label}
                  onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  placeholder="e.g., Head Office - Kigali"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone
                </label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  placeholder="+250 788 123 456"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  placeholder="info@impactpharma.rw"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  placeholder="KN 5 Rd, Kigali, Rwanda"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hours
                </label>
                <textarea
                  value={formData.hours}
                  onChange={(e) => setFormData({ ...formData, hours: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  placeholder="Monday - Friday: 8:00 AM - 6:00 PM"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Order
                </label>
                <input
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  min="0"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setEditModalOpen(false)}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-7 py-3.5 rounded font-semibold text-base transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-primary hover:bg-primary-600 text-white px-7 py-3.5 rounded font-semibold text-base transition-all duration-200"
                >
                  {editingDetail ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <DeleteModal
        isOpen={deleteModalOpen}
        onConfirm={handleDelete}
        onCancel={() => {
          setDeleteModalOpen(false);
          setDetailToDelete(null);
        }}
        title={detailToDelete?.label || ""}
        type="contact detail"
      />
    </div>
  );
}
