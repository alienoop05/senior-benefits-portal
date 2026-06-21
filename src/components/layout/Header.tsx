import Link from 'next/link';
import ThemeToggle from '@/components/theme/ThemeToggle';

export default function Header() {
  return (
    <header className="bg-blue-900 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold tracking-tight text-white hover:text-blue-100 transition-colors">
          Senior Benefits & Retirement
        </Link>
        <nav className="hidden md:flex space-x-6 text-lg font-medium">
          <Link href="/social-security" className="hover:underline underline-offset-4">Social Security</Link>
          <Link href="/medicare" className="hover:underline underline-offset-4">Medicare</Link>
          <Link href="/retirement-planning" className="hover:underline underline-offset-4">Retirement</Link>
          <Link href="/tools" className="hover:underline underline-offset-4">Calculators</Link>
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}
