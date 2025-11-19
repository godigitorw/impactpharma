import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  author: string;
  date: string;
  createdAt: Date;
}

async function getBlogPosts() {
  try {
    const posts = await prisma.blogPost.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return posts;
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
}

export default async function NewsPage() {
  const blogPosts = await getBlogPosts();

  if (blogPosts.length === 0) {
    return (
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary-50 via-blue-50 to-white py-20 pt-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(27,167,212,0.1),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(102,209,231,0.08),transparent_40%)]"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center">
              <h1 className="text-6xl font-medium text-gray-900 mb-6">
                Blog & Insights
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                Stay informed with the latest news, trends, and insights from the pharmaceutical industry
              </p>
            </div>
          </div>
        </section>

        {/* No Posts Message */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center py-12">
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
                    d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No blog posts yet</h3>
              <p className="text-gray-600">Check back soon for new articles and insights.</p>
            </div>
          </div>
        </section>
      </main>
    );
  }

  const featuredPost = blogPosts[0];
  const recentPosts = blogPosts.slice(1);

  return (
    <main>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 via-blue-50 to-white py-20 pt-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(27,167,212,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(102,209,231,0.08),transparent_40%)]"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-6xl font-medium text-gray-900 mb-6">
              Blog & Insights
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              Stay informed with the latest news, trends, and insights from the pharmaceutical industry
            </p>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-3xl font-semibold text-gray-900">Featured Article</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 bg-gradient-to-br from-primary-50 via-blue-50 to-white rounded-lg overflow-hidden border border-primary/20">
            <div className="relative h-[400px] lg:h-auto">
              <Image
                src={featuredPost.image}
                alt={featuredPost.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <div className="flex items-center gap-4 mb-4">
                <span className="px-3 py-1 bg-primary text-white text-sm font-medium rounded-full">
                  {featuredPost.category}
                </span>
                <span className="text-gray-600 text-sm">{featuredPost.date}</span>
              </div>
              <h3 className="text-3xl font-semibold text-gray-900 mb-4">
                {featuredPost.title}
              </h3>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                {featuredPost.excerpt}
              </p>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  {featuredPost.author.charAt(0)}
                </div>
                <span className="text-gray-700 font-medium">{featuredPost.author}</span>
              </div>
              <Link
                href={`/news/${featuredPost.slug}`}
                className="inline-flex items-center text-primary hover:text-primary-600 font-semibold transition-colors duration-200"
              >
                Read Full Article
                <svg
                  className="ml-2 w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      {recentPosts.length > 0 && (
        <section className="py-16 pb-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <h2 className="text-3xl font-semibold text-gray-900">Recent Articles</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recentPosts.map((post) => (
                <article
                  key={post.id}
                  className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-200"
                >
                  <div className="relative h-48">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                        {post.category}
                      </span>
                      <span className="text-gray-500 text-xs">{post.date}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary text-sm font-semibold">
                          {post.author.charAt(0)}
                        </div>
                        <span className="text-sm text-gray-700">{post.author}</span>
                      </div>
                      <Link
                        href={`/news/${post.slug}`}
                        className="text-primary hover:text-primary-600 font-medium text-sm transition-colors duration-200"
                      >
                        Read More →
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
