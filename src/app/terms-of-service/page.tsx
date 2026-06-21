import { constructMetadata } from '@/lib/seo';

export const metadata = constructMetadata({
  title: 'Terms of Service',
  description: 'Terms of service for Senior Benefits and Retirement Resource Portal.',
  url: '/terms-of-service',
});

export default function TermsOfServicePage() {
  return (
    <div className="max-w-3xl mx-auto py-12">
      <h1 className="text-4xl font-bold text-blue-900 mb-6 dark:text-blue-200">Terms of Service</h1>
      <div className="prose prose-lg text-gray-700 dark:text-slate-300">
        <p>
          This website provides educational information only. By using the site, you agree not to treat the content as personalized financial, legal, tax, or medical advice.
        </p>
        <p>
          We may update, remove, or revise content at any time to improve accuracy and usefulness.
        </p>
      </div>
    </div>
  );
}
