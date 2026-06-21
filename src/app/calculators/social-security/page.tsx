import RetirementCalculator from '@/components/calculators/RetirementCalculator';
import { constructMetadata } from '@/lib/seo';

export const metadata = constructMetadata({
  title: 'Social Security and Retirement Calculator',
  description: 'Estimate your retirement savings and plan your Social Security timing.',
  url: '/calculators/social-security',
});

export default function SocialSecurityCalculatorPage() {
  return (
    <div className="max-w-4xl mx-auto py-8">
      <header className="mb-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4 dark:text-blue-200">
          Social Security and Retirement Calculator
        </h1>
        <p className="text-xl text-gray-600 dark:text-slate-300">
          Estimate how your savings may grow before retirement.
        </p>
      </header>

      <RetirementCalculator />
    </div>
  );
}
