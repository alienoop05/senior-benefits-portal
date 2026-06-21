import { constructMetadata } from '@/lib/seo';

export const metadata = constructMetadata({
  title: 'Disclaimer',
  description: 'Important disclaimer for Senior Benefits and Retirement Resource Portal.',
  url: '/disclaimer',
});

export default function DisclaimerPage() {
  return (
    <div className="max-w-3xl mx-auto py-12">
      <h1 className="text-4xl font-bold text-blue-900 mb-6 dark:text-blue-200">Disclaimer</h1>
      <div className="prose prose-lg text-gray-700 dark:text-slate-300">
        <p>
          Senior Benefits and Retirement Resource Portal is an independent educational website and is not affiliated with the Social Security Administration, Medicare, the IRS, or any government agency.
        </p>
        <p>
          Always verify benefit, tax, healthcare, and retirement decisions with official sources or qualified professionals before acting.
        </p>
      </div>
    </div>
  );
}
