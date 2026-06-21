import { getPostBySlug, getAllPostsMeta, getCategoryBySlug, getPostsByCategory, slugifyCategory } from '@/lib/mdx';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { constructMetadata, generateArticleSchema, generateBreadcrumbSchema } from '@/lib/seo';
import StructuredData from '@/components/seo/StructuredData';
import Link from 'next/link';
import Image from 'next/image';
import type { ComponentProps } from 'react';

export async function generateStaticParams() {
  const posts = getAllPostsMeta();
  const articleParams = posts.map((post) => ({
    slug: post.slug.split('/'),
  }));
  const categoryParams = Array.from(new Set(posts.map((post) => post.category)))
    .filter(Boolean)
    .map((category) => ({
      slug: [slugifyCategory(category)],
    }));

  return [...articleParams, ...categoryParams];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) {
    const category = slug.length === 1 ? getCategoryBySlug(slug[0]) : undefined;
    if (!category) return constructMetadata();

    return constructMetadata({
      title: `${category} Guides`,
      description: `Browse complete senior benefits and retirement guides for ${category}.`,
      url: `/${slugifyCategory(category)}`,
    });
  }

  return constructMetadata({
    title: `${post.meta.title} | Complete Guide ${new Date().getFullYear()}`,
    description: post.meta.description,
    url: `/${post.meta.slug}`,
    type: "article",
  });
}

// Custom components for MDX
const components = {
  h1: (props: ComponentProps<'h1'>) => <h1 className="text-4xl font-bold mt-8 mb-6 text-blue-900 dark:text-blue-200" {...props} />,
  h2: (props: ComponentProps<'h2'>) => <h2 className="text-3xl font-semibold mt-10 mb-4 text-gray-800 border-b border-gray-200 pb-2 dark:border-slate-700 dark:text-slate-100" {...props} />,
  h3: (props: ComponentProps<'h3'>) => <h3 className="text-2xl font-medium mt-6 mb-3 text-gray-800 dark:text-slate-100" {...props} />,
  p: (props: ComponentProps<'p'>) => <p className="text-lg leading-relaxed text-gray-700 mb-6 dark:text-slate-300" {...props} />,
  ul: (props: ComponentProps<'ul'>) => <ul className="list-disc pl-8 mb-6 text-lg text-gray-700 dark:text-slate-300" {...props} />,
  li: (props: ComponentProps<'li'>) => <li className="mb-2" {...props} />,
  a: (props: ComponentProps<'a'>) => <a className="text-blue-600 hover:text-blue-800 underline" {...props} />,
  strong: (props: ComponentProps<'strong'>) => <strong className="font-semibold text-gray-900 dark:text-white" {...props} />,
  blockquote: (props: ComponentProps<'blockquote'>) => <blockquote className="border-l-4 border-blue-500 pl-4 py-1 bg-gray-50 italic text-gray-700 mb-6 dark:bg-slate-800 dark:text-slate-200" {...props} />,
  img: ({ src, alt }: { src?: string; alt?: string }) => {
    if (!src) return null;

    return (
      <div className="relative w-full h-64 md:h-96 my-8 rounded-xl overflow-hidden border border-gray-200 dark:border-slate-700">
        <Image src={src} alt={alt || "Article Image"} fill className="object-cover" />
      </div>
    );
  },
};

export default async function ArticlePage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) {
    const category = slug.length === 1 ? getCategoryBySlug(slug[0]) : undefined;
    if (!category) return notFound();

    const posts = getPostsByCategory(category);

    return (
      <div className="max-w-5xl mx-auto py-8">
        <nav className="text-sm text-gray-500 mb-8 flex space-x-2 dark:text-slate-400">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <span>&gt;</span>
          <span>{category}</span>
        </nav>

        <header className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-blue-900 mb-4 dark:text-blue-200">
            {category} Guides
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl dark:text-slate-300">
            Browse our latest articles and resources for {category.toLowerCase()}.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((categoryPost) => (
            <Link key={categoryPost.slug} href={`/${categoryPost.slug}`} className="block group">
              <article className="border border-gray-200 rounded-xl p-6 h-full bg-white hover:shadow-lg transition-shadow dark:border-slate-700 dark:bg-slate-900">
                <div className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-2">
                  {categoryPost.category}
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-700 transition-colors dark:text-slate-100 dark:group-hover:text-blue-300">
                  {categoryPost.title}
                </h2>
                <p className="text-gray-600 mb-4 dark:text-slate-300">{categoryPost.description}</p>
                <div className="text-sm text-gray-500 pt-4 border-t border-gray-100 flex justify-between items-center dark:border-slate-800 dark:text-slate-400">
                  <span>{new Date(categoryPost.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  <span className="text-blue-600 font-medium group-hover:underline">Read more &rarr;</span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    );
  }

  const articleSchema = generateArticleSchema({
    title: post.meta.title,
    description: post.meta.description,
    url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://www.auro.boats'}/${post.meta.slug}`,
    publishedAt: post.meta.date,
    updatedAt: post.meta.updatedAt || post.meta.date,
    authorName: post.meta.author,
    images: [`${process.env.NEXT_PUBLIC_APP_URL || 'https://www.auro.boats'}/og.jpg`],
  });

  const breadcrumbs = [
    { name: 'Home', item: `${process.env.NEXT_PUBLIC_APP_URL || 'https://www.auro.boats'}` },
    { name: post.meta.category, item: `${process.env.NEXT_PUBLIC_APP_URL || 'https://www.auro.boats'}/${slugifyCategory(post.meta.category)}` },
    { name: post.meta.title, item: `${process.env.NEXT_PUBLIC_APP_URL || 'https://www.auro.boats'}/${post.meta.slug}` },
  ];

  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);

  // Internal Linking Strategy: Find related posts
  const allPosts = getAllPostsMeta();
  const relatedPosts = allPosts
    .filter((p) => p.category === post.meta.category && p.slug !== post.meta.slug)
    .slice(0, 3);

  return (
    <article className="max-w-4xl mx-auto py-8">
      <StructuredData data={articleSchema} />
      <StructuredData data={breadcrumbSchema} />

      {/* Breadcrumbs UI */}
      <nav className="text-sm text-gray-500 mb-8 flex space-x-2 dark:text-slate-400">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span>&gt;</span>
          <Link href={`/${slugifyCategory(post.meta.category)}`} className="capitalize hover:text-blue-600 dark:hover:text-blue-300">{post.meta.category}</Link>
        <span>&gt;</span>
        <span className="truncate max-w-xs">{post.meta.title}</span>
      </nav>

      <header className="mb-10">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-blue-900 mb-4 leading-tight dark:text-blue-200">
          {post.meta.title}
        </h1>
        <p className="text-xl text-gray-600 mb-6 dark:text-slate-300">
          {post.meta.description}
        </p>
        <div className="flex items-center text-sm text-gray-500 border-t border-b border-gray-200 py-3 dark:border-slate-700 dark:text-slate-400">
          <div className="font-medium mr-4">By {post.meta.author}</div>
          <div className="mr-4">•</div>
          <div>Last updated: {new Date(post.meta.updatedAt || post.meta.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
        </div>
      </header>

      {/* Ad Placeholder */}
      <div className="w-full h-32 bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-400 mb-10 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-500">
        Advertisement Placement
      </div>

      <div className="prose prose-lg max-w-none">
        <MDXRemote source={post.content} components={components} />
      </div>

      <footer className="mt-16 pt-8 border-t border-gray-200 dark:border-slate-700">
        <h3 className="text-2xl font-bold text-gray-900 mb-4 dark:text-slate-100">About the Author</h3>
        <div className="bg-blue-50 p-6 rounded-lg flex items-start dark:bg-slate-900">
          <div className="w-16 h-16 bg-blue-200 rounded-full flex-shrink-0 flex items-center justify-center text-blue-700 font-bold text-xl mr-6 dark:bg-blue-900 dark:text-blue-200">
            {post.meta.author.charAt(0)}
          </div>
          <div>
            <h4 className="text-lg font-bold text-blue-900 dark:text-blue-200">{post.meta.author}</h4>
            <p className="text-gray-700 mt-2 dark:text-slate-300">
              {post.meta.author} is a senior benefits expert with over 15 years of experience helping Americans navigate Social Security, Medicare, and retirement planning.
            </p>
          </div>
        </div>

        {relatedPosts.length > 0 && (
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 dark:text-slate-100">Related Guides</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link key={relatedPost.slug} href={`/${relatedPost.slug}`} className="block group">
                  <div className="border border-gray-200 rounded-lg p-5 h-full hover:shadow-md transition-shadow dark:border-slate-700 dark:bg-slate-900">
                    <div className="text-xs font-semibold text-blue-600 uppercase mb-2">{relatedPost.category}</div>
                    <h4 className="font-bold text-gray-900 group-hover:text-blue-700 mb-2 dark:text-slate-100 dark:group-hover:text-blue-300">{relatedPost.title}</h4>
                    <span className="text-blue-600 text-sm font-medium">Read more &rarr;</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </footer>
    </article>
  );
}
