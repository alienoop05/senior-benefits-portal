import { constructMetadata } from '@/lib/seo';

export const metadata = constructMetadata({
  title: 'Privacy Policy',
  description: 'Privacy policy for Senior Benefits and Retirement Resource Portal.',
  url: '/privacy-policy',
});

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto py-12">
      <h1 className="text-4xl font-bold text-blue-900 mb-6 dark:text-blue-200">Privacy Policy</h1>
      <div className="prose prose-lg text-gray-700 dark:text-slate-300">
        <p>
          We collect basic analytics and site usage information to improve our educational resources. We do not sell personal financial or healthcare information.
        </p>
        <p>
          If contact forms, newsletter forms, or advertising tools are added, this page should be updated to describe those services and user choices.
        </p>
      </div>
    </div>
  );
}
