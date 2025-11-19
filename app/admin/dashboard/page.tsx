"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState({
    posts: 0,
    contacts: 0,
    quotes: 0,
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (session) {
      fetchStats();
    }
  }, [session]);

  const fetchStats = async () => {
    try {
      const [postsRes, contactsRes, quotesRes] = await Promise.all([
        fetch("/api/admin/posts"),
        fetch("/api/admin/contacts"),
        fetch("/api/admin/quotes"),
      ]);

      const [posts, contacts, quotes] = await Promise.all([
        postsRes.json(),
        contactsRes.json(),
        quotesRes.json(),
      ]);

      setStats({
        posts: posts.length || 0,
        contacts: contacts.length || 0,
        quotes: quotes.length || 0,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
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

  const statsDisplay = [
    {
      name: "Total Blog Posts",
      value: stats.posts.toString(),
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      color: "bg-blue-500",
    },
    {
      name: "Contact Messages",
      value: stats.contacts.toString(),
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      color: "bg-green-500",
    },
    {
      name: "Quote Requests",
      value: stats.quotes.toString(),
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
      color: "bg-purple-500",
    },
    {
      name: "Total Views",
      value: "Coming Soon",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      ),
      color: "bg-orange-500",
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-gray-900 mb-2">
          Dashboard
        </h1>
        <p className="text-gray-600">
          Welcome back, {session.user?.name || "Admin"}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statsDisplay.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-lg border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.color} text-white p-3 rounded-lg`}>
                {stat.icon}
              </div>
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-1">
              {stat.value}
            </h3>
            <p className="text-gray-600 text-sm">{stat.name}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <a
            href="/admin/dashboard/posts"
            className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5 transition-all duration-200"
          >
            <div className="w-10 h-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <div>
              <p className="font-medium text-gray-900">Create New Post</p>
              <p className="text-sm text-gray-600">Add a new blog article</p>
            </div>
          </a>

          <a
            href="/admin/dashboard/contacts"
            className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5 transition-all duration-200"
          >
            <div className="w-10 h-10 bg-green-500/10 text-green-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p className="font-medium text-gray-900">View Messages</p>
              <p className="text-sm text-gray-600">Check contact submissions</p>
            </div>
          </a>

          <a
            href="/admin/dashboard/quotes"
            className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5 transition-all duration-200"
          >
            <div className="w-10 h-10 bg-purple-500/10 text-purple-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div>
              <p className="font-medium text-gray-900">Quote Requests</p>
              <p className="text-sm text-gray-600">Review quote submissions</p>
            </div>
          </a>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Recent Activity
        </h2>
        <div className="text-center py-12 text-gray-500">
          <svg className="w-12 h-12 mx-auto mb-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p>No recent activity</p>
          <p className="text-sm mt-2">Activity will appear here once you start managing content</p>
        </div>
      </div>
    </div>
  );
}
