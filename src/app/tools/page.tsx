import Link from 'next/link';
import { Calculator } from 'lucide-react';
import { constructMetadata } from '@/lib/seo';

export const metadata = constructMetadata({
  title: 'Retirement Tools and Calculators',
  description: 'Use senior benefits and retirement planning tools to estimate savings and compare options.',
  url: '/tools',
});

export default function ToolsPage() {
  return (
    <div className="max-w-5xl mx-auto py-8">
      <header className="mb-10">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-blue-900 mb-4 dark:text-blue-200">
          Retirement Tools and Calculators
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl dark:text-slate-300">
          Practical tools for planning savings, benefits, and retirement decisions.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/calculators/social-security" className="block group">
          <article className="border border-gray-200 rounded-xl p-6 h-full bg-white hover:shadow-lg transition-shadow dark:border-slate-700 dark:bg-slate-900">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-11 w-11 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
                <Calculator aria-hidden="true" size={24} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors dark:text-slate-100 dark:group-hover:text-blue-300">
                Social Security and Retirement Calculator
              </h2>
            </div>
            <p className="text-gray-600 dark:text-slate-300">
              Estimate retirement savings growth based on age, current savings, monthly contributions, and expected return.
            </p>
          </article>
        </Link>
      </div>
    </div>
  );
}
