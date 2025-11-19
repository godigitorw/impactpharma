"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import DeleteModal from "@/components/DeleteModal";
import ImageUpload from "@/components/ImageUpload";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
  description: string;
  order: number;
}

export default function TeamPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState<{ id: number; name: string } | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    image: "",
    description: "",
    order: 0,
  });

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    try {
      const response = await fetch("/api/admin/team");
      const data = await response.json();

      if (Array.isArray(data)) {
        setTeamMembers(data);
      } else {
        setTeamMembers([]);
      }
    } catch (error) {
      console.error("Error fetching team members:", error);
      setTeamMembers([]);
    } finally {
      setLoading(false);
    }
  };

  const openDeleteModal = (id: number, name: string) => {
    setMemberToDelete({ id, name });
    setDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    if (!memberToDelete) return;

    try {
      const response = await fetch(`/api/admin/team?id=${memberToDelete.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setTeamMembers(teamMembers.filter((m) => m.id !== memberToDelete.id));
        setDeleteModalOpen(false);
        setMemberToDelete(null);
      } else {
        alert("Failed to delete team member");
      }
    } catch (error) {
      console.error("Error deleting team member:", error);
      alert("Error deleting team member");
    }
  };

  const openEditModal = (member: TeamMember | null = null) => {
    if (member) {
      setEditingMember(member);
      setFormData({
        name: member.name,
        role: member.role,
        image: member.image,
        description: member.description,
        order: member.order,
      });
    } else {
      setEditingMember(null);
      setFormData({
        name: "",
        role: "",
        image: "",
        description: "",
        order: 0,
      });
    }
    setEditModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.role || !formData.image || !formData.description) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      const url = "/api/admin/team";
      const method = editingMember ? "PATCH" : "POST";

      const body = editingMember
        ? { ...formData, id: editingMember.id }
        : formData;

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        setEditModalOpen(false);
        fetchTeamMembers();
      } else {
        alert("Failed to save team member");
      }
    } catch (error) {
      console.error("Error saving team member:", error);
      alert("Error saving team member");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-600">Loading team members...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">Team Members</h1>
          <p className="text-gray-600">Manage your team members</p>
        </div>
        <button
          onClick={() => openEditModal()}
          className="bg-primary hover:bg-primary-600 text-white px-7 py-3.5 rounded font-semibold text-base transition-all duration-200"
        >
          Add Team Member
        </button>
      </div>

      {teamMembers.length === 0 ? (
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
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No team members yet</h3>
          <p className="text-gray-600 mb-6">Get started by adding your first team member.</p>
          <button
            onClick={() => openEditModal()}
            className="inline-flex items-center bg-primary hover:bg-primary-600 text-white px-6 py-3 rounded font-semibold transition-colors duration-200"
          >
            Add Team Member
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Image
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Role
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Description
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
                {teamMembers.map((member) => (
                  <tr key={member.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden">
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-900">{member.name}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-600">{member.role}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-600 line-clamp-2 max-w-md">
                        {member.description}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">{member.order}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditModal(member)}
                          className="p-2 text-gray-600 hover:text-primary hover:bg-primary/5 rounded transition-colors"
                          title="Edit member"
                        >
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => openDeleteModal(member.id, member.name)}
                          className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                          title="Delete member"
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
                {editingMember ? "Edit Team Member" : "Add Team Member"}
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  placeholder="Dr. Jean Baptiste Uwimana"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Role *
                </label>
                <input
                  type="text"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  placeholder="Chief Executive Officer"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image *
                </label>
                <ImageUpload
                  value={formData.image}
                  onChange={(url) => setFormData({ ...formData, image: url })}
                  label="Upload Team Member Photo"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  placeholder="Leading Impact Pharma with over 15 years of pharmaceutical industry experience."
                  required
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
                  {editingMember ? "Update" : "Create"}
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
          setMemberToDelete(null);
        }}
        title={memberToDelete?.name || ""}
        type="team member"
      />
    </div>
  );
}
