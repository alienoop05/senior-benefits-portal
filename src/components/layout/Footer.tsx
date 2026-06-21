import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-100 text-gray-800 border-t border-gray-200 mt-16 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold text-blue-900 mb-4 dark:text-blue-200">Senior Benefits</h3>
            <p className="text-gray-600 dark:text-slate-300">
              Your trusted resource for Social Security, Medicare, retirement planning, and senior benefits in the USA.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-blue-900 mb-4 dark:text-blue-200">Topics</h4>
            <ul className="space-y-2">
              <li><Link href="/social-security" className="hover:text-blue-700 hover:underline">Social Security</Link></li>
              <li><Link href="/medicare" className="hover:text-blue-700 hover:underline">Medicare</Link></li>
              <li><Link href="/retirement-planning" className="hover:text-blue-700 hover:underline">Retirement Planning</Link></li>
              <li><Link href="/state-retirement-guides" className="hover:text-blue-700 hover:underline">State Guides</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-blue-900 mb-4 dark:text-blue-200">About Us</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="hover:text-blue-700 hover:underline">Who We Are</Link></li>
              <li><Link href="/editorial-policy" className="hover:text-blue-700 hover:underline">Editorial Policy</Link></li>
              <li><Link href="/contact" className="hover:text-blue-700 hover:underline">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-blue-900 mb-4 dark:text-blue-200">Legal</h4>
            <ul className="space-y-2">
              <li><Link href="/privacy-policy" className="hover:text-blue-700 hover:underline">Privacy Policy</Link></li>
              <li><Link href="/terms-of-service" className="hover:text-blue-700 hover:underline">Terms of Service</Link></li>
              <li><Link href="/disclaimer" className="hover:text-blue-700 hover:underline">Disclaimer</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-300 text-center text-sm text-gray-500 dark:border-slate-700 dark:text-slate-400">
          <p>&copy; {currentYear} Senior Benefits & Retirement Resource Portal. All rights reserved.</p>
          <p className="mt-2 text-xs">
            Disclaimer: This site is for informational purposes only and is not affiliated with the SSA or any government agency.
          </p>
        </div>
      </div>
    </footer>
  );
}
