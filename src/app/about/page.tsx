import { constructMetadata } from '@/lib/seo';

export const metadata = constructMetadata({
  title: "About Us",
  description: "Learn more about the team behind Senior Benefits & Retirement Resource Portal.",
});

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold text-blue-900 mb-8 dark:text-blue-200">About Us</h1>

      <div className="prose prose-lg text-gray-700 dark:text-slate-300">
        <p className="lead text-xl text-gray-600 mb-8 dark:text-slate-300">
          The Senior Benefit&apos;s & Retirement Resource Portal is dedicated to providing Americans aged 40-75 with accurate, actionable, and comprehensive information regarding Social Security, Medicare, and retirement planning.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4 dark:text-slate-100">Our Mission</h2>
        <p>
          Navigating the complexities of federal and state benefits can be overwhelming. Our mission is to simplify these processes, empowering you to make informed decisions that secure your financial future and well-being.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4 dark:text-slate-100">Our Expertise</h2>
        <p>
          Our team consists of certified financial planners, former government employees, and retirement experts with decades of combined experience. We meticulously research and update our guides to reflect the latest legislation and policy changes.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4 dark:text-slate-100">Our Commitment to Accuracy</h2>
        <p>
          We adhere to strict editorial guidelines. Every article is fact-checked and reviewed by industry experts before publication. We do not provide personalized financial advice, but rather educational resources to help you navigate your options.
        </p>
      </div>
    </div>
  );
}
