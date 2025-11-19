"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface ContactMessage {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: string | null;
  subject: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export default function ContactMessagesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [contacts, setContacts] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState<ContactMessage | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (session) {
      fetchContacts();
    }
  }, [session]);

  const fetchContacts = async () => {
    try {
      const response = await fetch("/api/admin/contacts");
      if (response.ok) {
        const data = await response.json();
        setContacts(data);
      }
    } catch (error) {
      console.error("Error fetching contacts:", error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id: number) => {
    try {
      const response = await fetch("/api/admin/contacts", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, read: true }),
      });

      if (response.ok) {
        setContacts(contacts.map(c => c.id === id ? { ...c, read: true } : c));
      }
    } catch (error) {
      console.error("Error marking as read:", error);
    }
  };

  const openContactModal = (contact: ContactMessage) => {
    setSelectedContact(contact);
    if (!contact.read) {
      markAsRead(contact.id);
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-gray-900 mb-2">
          Contact Messages
        </h1>
        <p className="text-gray-600">
          View and manage contact form submissions
        </p>
      </div>

      {contacts.length === 0 ? (
        <div className="bg-white rounded-lg border border-gray-200 p-12">
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No Contact Messages Yet
            </h3>
            <p className="text-gray-600 mb-4">
              Contact form submissions will appear here once customers start reaching out.
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Subject
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Date
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {contacts.map((contact) => (
                  <tr key={contact.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      {contact.read ? (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                          Read
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                          New
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-900">{contact.name}</p>
                      {contact.company && (
                        <p className="text-sm text-gray-500">{contact.company}</p>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {contact.email}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                        {contact.subject}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {formatDate(contact.createdAt)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => openContactModal(contact)}
                        className="p-2 text-gray-600 hover:text-primary hover:bg-primary/5 rounded transition-colors"
                        title="View message"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Contact Detail Modal */}
      {selectedContact && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    Contact Message
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {formatDate(selectedContact.createdAt)}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedContact(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Name</label>
                <p className="mt-1 text-gray-900">{selectedContact.name}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Email</label>
                <p className="mt-1 text-gray-900">{selectedContact.email}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Phone</label>
                <p className="mt-1 text-gray-900">{selectedContact.phone}</p>
              </div>

              {selectedContact.company && (
                <div>
                  <label className="text-sm font-medium text-gray-700">Company</label>
                  <p className="mt-1 text-gray-900">{selectedContact.company}</p>
                </div>
              )}

              <div>
                <label className="text-sm font-medium text-gray-700">Subject</label>
                <p className="mt-1 text-gray-900">{selectedContact.subject}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Message</label>
                <p className="mt-1 text-gray-900 whitespace-pre-wrap">{selectedContact.message}</p>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
              <a
                href={`mailto:${selectedContact.email}`}
                className="bg-primary hover:bg-primary-600 text-white px-7 py-3.5 rounded font-semibold text-base transition-all duration-200"
              >
                Reply via Email
              </a>
              <button
                onClick={() => setSelectedContact(null)}
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
