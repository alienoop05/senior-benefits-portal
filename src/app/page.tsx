import Link from 'next/link';
import { getCategories, getAllPostsMeta, slugifyCategory } from '@/lib/mdx';
import { constructMetadata, generateWebSiteSchema, generateOrganizationSchema } from '@/lib/seo';
import StructuredData from '@/components/seo/StructuredData';
import SiteToggleWatcher from '@/components/SiteToggleWatcher';

export const metadata = constructMetadata({
  url: "/",
});

export default function Home() {
  const categories = getCategories();
  const latestPosts = getAllPostsMeta().slice(0, 6);

  return (
    <div className="space-y-16 py-8">
      <span className="sr-only">Site Toggle Watcher</span>
      <SiteToggleWatcher />
      <StructuredData data={generateWebSiteSchema()} />
      <StructuredData data={generateOrganizationSchema()} />
      
      {/* Hero Section */}
      <section className="bg-blue-900 text-white rounded-2xl p-8 md:p-16 text-center shadow-xl">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
          Navigate Your Retirement with Confidence
        </h1>
        <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-10">
          The ultimate resource for Social Security, Medicare, and retirement planning. Get the most out of your benefits and secure your financial future.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/social-security-guide-1" className="bg-white text-blue-900 font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition shadow-lg text-lg">
            Start Your Plan
          </Link>
          <Link href="/medicare" className="bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded-full hover:bg-blue-800 transition text-lg">
            Explore Medicare
          </Link>
        </div>
      </section>

      {/* Categories Grid */}
      <section>
        <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b pb-2 dark:border-slate-700 dark:text-slate-100">Explore Topics</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <Link key={cat} href={`/${slugifyCategory(cat)}`} className="block group">
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 h-full hover:shadow-md transition-shadow hover:border-blue-300 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-blue-500">
                <h3 className="text-xl font-bold text-blue-900 mb-2 group-hover:text-blue-600 transition-colors dark:text-blue-200 dark:group-hover:text-blue-300">{cat}</h3>
                <p className="text-gray-600 dark:text-slate-300">Complete guides and resources for {cat.toLowerCase()}.</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Latest Guides */}
      <section>
        <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b pb-2 dark:border-slate-700 dark:text-slate-100">Latest Guides</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {latestPosts.map((post) => (
            <Link key={post.slug} href={`/${post.slug}`} className="flex flex-col group">
              <article className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all flex flex-col h-full bg-white dark:border-slate-700 dark:bg-slate-900">
                <div className="p-6 flex flex-col flex-grow">
                  <div className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-2">{post.category}</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-700 transition-colors dark:text-slate-100 dark:group-hover:text-blue-300">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4 flex-grow dark:text-slate-300">
                    {post.description}
                  </p>
                  <div className="text-sm text-gray-500 mt-auto pt-4 border-t border-gray-100 flex justify-between items-center dark:border-slate-800 dark:text-slate-400">
                    <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    <span className="text-blue-600 font-medium group-hover:underline">Read more →</span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>

      {/* Calculator Promo */}
      <section className="bg-blue-50 border border-blue-100 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <div className="flex-1">
          <h2 className="text-3xl font-bold text-blue-900 mb-4 dark:text-blue-200">When should you claim Social Security?</h2>
          <p className="text-lg text-gray-700 mb-6 dark:text-slate-300">
            Claiming too early can cost you thousands. Use our advanced calculator to find your optimal claiming strategy based on your life expectancy and marital status.
          </p>
          <Link href="/calculators/social-security" className="inline-block bg-blue-600 text-white font-bold py-3 px-8 rounded-full hover:bg-blue-700 transition shadow-md">
            Try the Calculator
          </Link>
        </div>
        <div className="flex-1 w-full flex justify-center">
          <div className="w-full max-w-sm bg-white rounded-xl shadow-md border border-gray-200 p-6 flex flex-col gap-4 dark:border-slate-700 dark:bg-slate-800">
             {/* Mock Calculator UI */}
             <div className="h-4 bg-gray-200 rounded w-1/2 dark:bg-slate-700"></div>
             <div className="h-10 bg-gray-100 border border-gray-300 rounded dark:border-slate-600 dark:bg-slate-700"></div>
             <div className="h-4 bg-gray-200 rounded w-3/4 dark:bg-slate-700"></div>
             <div className="h-10 bg-gray-100 border border-gray-300 rounded dark:border-slate-600 dark:bg-slate-700"></div>
             <div className="h-10 bg-blue-600 rounded mt-2"></div>
          </div>
        </div>
      </section>
    </div>
  );
}