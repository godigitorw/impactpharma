import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

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

async function getBlogPost(slug: string) {
  try {
    const post = await prisma.blogPost.findUnique({
      where: { slug },
    });
    return post;
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return null;
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <main>
      {/* Hero Section with Background Image */}
      <section className="relative py-20 pt-32 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 via-gray-900/70 to-gray-900/80"></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link
            href="/news"
            className="inline-flex items-center text-white hover:text-primary-200 font-medium mb-6 transition-colors duration-200"
          >
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Blog
          </Link>

          <div className="flex items-center gap-4 mb-6">
            <span className="px-3 py-1 bg-primary text-white text-sm font-medium rounded-full">
              {post.category}
            </span>
            <span className="text-white">{post.date}</span>
          </div>

          <h1 className="text-5xl font-medium text-white mb-6">
            {post.title}
          </h1>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white font-semibold text-lg">
              {post.author.charAt(0)}
            </div>
            <div>
              <p className="text-white font-medium">{post.author}</p>
              <p className="text-white/80 text-sm">Author</p>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-12 pb-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <article className="prose prose-lg max-w-none">
            {/* Excerpt */}
            <p className="text-xl text-gray-700 leading-relaxed mb-8 font-medium">
              {post.excerpt}
            </p>

            {/* Content - rendered as HTML from WYSIWYG editor */}
            <div
              className="article-content"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </article>

          {/* CTA */}
          <div className="mt-12 bg-gradient-to-br from-primary-50 via-blue-50 to-white rounded-lg p-8 text-center">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Have Questions About Our Services?
            </h3>
            <p className="text-gray-600 mb-6">
              Our team is ready to assist you with your pharmaceutical supply needs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/request-quote"
                className="inline-flex items-center justify-center bg-primary hover:bg-primary-600 text-white px-7 py-3.5 rounded font-semibold text-base transition-all duration-200"
              >
                Request a Quote
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white px-7 py-3.5 rounded font-semibold text-base transition-all duration-200"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
