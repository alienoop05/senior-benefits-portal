import { constructMetadata } from '@/lib/seo';

export const metadata = constructMetadata({
  title: "Editorial Policy",
  description: "Read our strict editorial guidelines and fact-checking processes.",
});

export default function EditorialPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold text-blue-900 mb-8 dark:text-blue-200">Editorial Policy & Fact-Checking</h1>
      
      <div className="prose prose-lg text-gray-700 dark:text-slate-300">
        <p>
          At the Senior Benefits & Retirement Resource Portal, we take the accuracy and integrity of our content seriously. Our readers rely on us for critical financial and healthcare information.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4 dark:text-slate-100">Fact-Checking Process</h2>
        <ul className="list-disc pl-6 mb-6">
          <li><strong>Primary Sources:</strong> We rely exclusively on primary sources, including the Social Security Administration (SSA), Medicare.gov, the IRS, and other official government portals.</li>
          <li><strong>Expert Review:</strong> All comprehensive guides and calculators are reviewed by certified financial professionals.</li>
          <li><strong>Regular Updates:</strong> We review our content annually and immediately following major legislative changes (e.g., COLA announcements, new tax brackets).</li>
        </ul>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4 dark:text-slate-100">Independence and Objectivity</h2>
        <p>
          While we may receive compensation through affiliate links or advertisements, this does not influence our editorial content. Our reviews and recommendations are independent and objective.
        </p>
      </div>
    </div>
  );
}
