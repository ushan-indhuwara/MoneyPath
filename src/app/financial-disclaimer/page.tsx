import React from 'react';
import { Breadcrumbs, DisclaimerBox } from '@/components/ui/DisclaimerBox';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Financial Disclaimer — MoneyPath AI',
  description: 'MoneyPath AI full legal financial disclaimer regarding educational tools, calculation assumptions, and regulatory boundaries.',
};

export default function FinancialDisclaimerPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        <Breadcrumbs items={[{ label: 'Financial Disclaimer' }]} />

        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200/90 shadow-sm space-y-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Financial Disclaimer
          </h1>

          <div className="prose prose-slate max-w-none space-y-6 text-slate-800 leading-relaxed text-base">
            <p>
              MoneyPath AI provides educational personal-finance calculators, interactive visual scenario models, and general informative content only.
            </p>
            <p>
              <strong>MONEYPATH IS NOT A BANK, MORTGAGE BROKER, INVESTMENT ADVISER, OR REGISTERED FINANCIAL ADVISER.</strong> The application and its outputs do not constitute personalized financial, investment, tax, or legal advice.
            </p>
            <p>
              All calculation results, timelines, payoff dates, interest savings estimates, and retirement projections are hypothetical scenario estimations produced by deterministic mathematical formulas based strictly on the data entered by the user. Actual financial outcomes may differ significantly due to lender interest calculation rules, daily compounding variances, loan fees, market volatility, tax law shifts, inflation, or individual borrower circumstances.
            </p>
            <p>
              You should not rely on MoneyPath AI as a substitute for professional financial advice. Before making major financial commitments, debt consolidation decisions, or investment allocations, consult a qualified independent financial adviser or certified tax professional licensed in your jurisdiction.
            </p>
          </div>

          <DisclaimerBox />
        </div>
      </div>
    </div>
  );
}
