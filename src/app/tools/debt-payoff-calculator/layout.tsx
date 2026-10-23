import type { Metadata } from 'next';
import { createPageMetadata } from '@/lib/seo';

export const metadata: Metadata = createPageMetadata(
  'Debt Payoff Calculator — Snowball vs Avalanche',
  'Compare debt snowball and avalanche payoff strategies, estimate payoff timelines, and understand potential interest savings.',
  '/tools/debt-payoff-calculator'
);

export default function DebtPayoffCalculatorLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}