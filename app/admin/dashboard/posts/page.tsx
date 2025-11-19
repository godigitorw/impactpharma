"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import DeleteModal from "@/components/DeleteModal";

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  category: string;
  author: string;
  date: string;
  createdAt: string;
  status?: string;
}

export default function BlogPostsManagement() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<number | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState<{ id: number; title: string } | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (session) {
      fetchPosts();
    }
  }, [session]);

  const fetchPosts = async () => {
    try {
      const response = await fetch("/api/admin/posts");
      if (response.ok) {
        const data = await response.json();
        setBlogPosts(data);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const openDeleteModal = (id: number, title: string) => {
    setPostToDelete({ id, title });
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setPostToDelete(null);
  };

  const handleDelete = async () => {
    if (!postToDelete) return;

    setDeleting(postToDelete.id);

    try {
      const response = await fetch(`/api/admin/posts?id=${postToDelete.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Remove the post from the list
        setBlogPosts(blogPosts.filter((post) => post.id !== postToDelete.id));
        closeDeleteModal();
      } else {
        alert("Failed to delete post");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("An error occurred while deleting the post");
    } finally {
      setDeleting(null);
    }
  };

  if (status === "loading" || loading) {
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
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">
            Blog Posts
          </h1>
          <p className="text-gray-600">
            Manage your blog articles and content
          </p>
        </div>
        <Link
          href="/admin/dashboard/posts/new"
          className="bg-primary hover:bg-primary-600 text-white px-7 py-3.5 rounded font-semibold text-base transition-all duration-200"
        >
          Create New Post
        </Link>
      </div>

      {/* Posts List */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Title
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Category
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Author
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Date
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
              {blogPosts.map((post) => (
                <tr key={post.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div>
                        <p className="font-medium text-gray-900">{post.title}</p>
                        <Link
                          href={`/news/${post.slug}`}
                          target="_blank"
                          className="text-sm text-primary hover:text-primary-600"
                        >
                          View on website →
                        </Link>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                      {post.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {post.author}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {post.date}
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                      Published
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/dashboard/posts/${post.id}`}
                        className="p-2 text-gray-600 hover:text-primary hover:bg-primary/5 rounded transition-colors"
                        title="Edit post"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </Link>
                      <button
                        onClick={() => openDeleteModal(post.id, post.title)}
                        className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                        title="Delete post"
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

      {/* Delete Modal */}
      <DeleteModal
        isOpen={deleteModalOpen}
        title={postToDelete?.title || ""}
        onConfirm={handleDelete}
        onCancel={closeDeleteModal}
        isDeleting={deleting !== null}
      />
    </div>
  );
}
