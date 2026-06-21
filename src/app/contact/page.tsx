import { constructMetadata } from '@/lib/seo';

export const metadata = constructMetadata({
  title: 'Contact Us',
  description: 'Contact the Senior Benefits and Retirement Resource Portal team.',
  url: '/contact',
});

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto py-12">
      <h1 className="text-4xl font-bold text-blue-900 mb-6 dark:text-blue-200">Contact Us</h1>
      <div className="prose prose-lg text-gray-700 dark:text-slate-300">
        <p>
          For questions, corrections, or editorial feedback, contact the Senior Benefits and Retirement Resource Portal team.
        </p>
        <p>
          Email: <a href="mailto:editorial@auro.boats">editorial@auro.boats</a>
        </p>
      </div>
    </div>
  );
}
