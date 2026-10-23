import type { Metadata } from 'next';
import { createPageMetadata } from '@/lib/seo';

export const metadata: Metadata = createPageMetadata(
  'Retirement Calculator — Project Your Savings',
  'Explore conservative, base, and optimistic retirement savings projections using your age, contributions, and estimated growth rate.',
  '/tools/retirement-calculator'
);

export default function RetirementCalculatorLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}