import type { Metadata } from 'next';
import { createPageMetadata } from '@/lib/seo';

export const metadata: Metadata = createPageMetadata(
  'Savings Goal Calculator — Plan Your Target',
  'Estimate how much to save each month to reach a savings goal, or how long your current contributions may take to get there.',
  '/tools/savings-goal-calculator'
);

export default function SavingsGoalCalculatorLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}