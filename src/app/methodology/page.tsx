import React from 'react';
import { Breadcrumbs, DisclaimerBox } from '@/components/ui/DisclaimerBox';
import { createPageMetadata } from '@/lib/seo';
import { Calculator, CheckCircle2, AlertCircle } from 'lucide-react';

export const metadata = createPageMetadata(
  'Calculation Methodology & Mathematical Formulas — MoneyPath AI',
  'Detailed technical documentation of our debt payoff algorithms (Snowball & Avalanche), compound interest formulas, and retirement scenario models.',
  '/methodology'
);

export default function MethodologyPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        <Breadcrumbs items={[{ label: 'Calculation Methodology' }]} />

        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200/90 shadow-sm space-y-8">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
              <Calculator className="w-3.5 h-3.5" />
              <span>Full Mathematical Transparency</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Calculation Methodology & Formulas
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed">
              At MoneyPath AI, trust comes first. Below is the exact mathematical logic, formulas, and assumptions used by our deterministic financial calculation engine.
            </p>
          </div>

          <div className="space-y-8 text-slate-800 text-base leading-relaxed">
            {/* Debt Payoff Methodology */}
            <section className="space-y-4 border-t border-slate-100 pt-6">
              <h2 className="text-2xl font-bold text-slate-900">1. Debt Payoff Amortization Logic</h2>
              <p>
                For each month m, monthly periodic interest is calculated on the current outstanding balance B using the stated APR:
              </p>
              <div className="p-4 rounded-xl bg-slate-900 text-emerald-300 font-mono text-sm">
                Monthly Interest = Balance × (APR / 100 / 12)
              </div>
              <p>
                The monthly budget is the sum of entered minimum payments plus the extra monthly amount. Minimums are paid first; any remaining budget, including minimums freed as debts are paid off, goes to the next debt in the chosen order:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Debt Snowball Strategy:</strong> Active debts are ordered by lowest remaining balance. Extra funds are directed to the smallest balance until paid off, then rolled into the next smallest.
                </li>
                <li>
                  <strong>Debt Avalanche Strategy:</strong> Active debts are ordered by highest APR. Extra funds are directed to the highest interest account first, maximizing interest savings.
                </li>
              </ul>
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1">
                <strong>Payment limits:</strong> The calculator flags minimum payments that do not exceed monthly interest when no extra payment is entered. Each projection is capped at 600 months; if debts remain after that, no payoff date is shown.
              </div>
            </section>

            {/* Savings Goal Methodology */}
            <section className="space-y-4 border-t border-slate-100 pt-6">
              <h2 className="text-2xl font-bold text-slate-900">2. Savings Goal Formulas</h2>
              <p>
                Savings growth assumes deposits are made at the end of each month and interest compounds monthly. The annual rate is divided by 12:
              </p>
              <div className="p-4 rounded-xl bg-slate-900 text-emerald-300 font-mono text-sm space-y-2">
                <p>Mode A (Required Deposit): PMT = [T - S₀ × (1 + r)ⁿ] × r / [(1 + r)ⁿ - 1]</p>
                <p>Mode B (Time to Goal): Iterates monthly balance until Balance ≥ Target T</p>
              </div>
              <p className="text-xs text-slate-500">
                Where T = Target Amount, S₀ = Current Savings, r = Monthly Interest Rate (Annual Rate / 12 / 100), n = Months.
              </p>
            </section>

            {/* Retirement Growth Methodology */}
            <section className="space-y-4 border-t border-slate-100 pt-6">
              <h2 className="text-2xl font-bold text-slate-900">3. Retirement Scenario Engine</h2>
              <p>
                Retirement balance projections compound a monthly rate for each month. Contributions increase at the end of each year when an annual escalation is entered. Three scenarios are generated:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li><strong>Base Scenario:</strong> User-selected annual growth rate.</li>
                <li><strong>Conservative Scenario:</strong> Base rate minus 2% (clamped at 0%).</li>
                <li><strong>Optimistic Scenario:</strong> Base rate plus 2%.</li>
              </ul>
            </section>

            {/* Model Limitations */}
            <section className="space-y-4 border-t border-slate-100 pt-6">
              <h2 className="text-2xl font-bold text-slate-900">4. Precision & Limitations</h2>
              <p>
                Debt payoff interest and payments are rounded to the nearest cent or penny each month. Savings and retirement projections use floating-point values internally and round displayed schedule values to two decimal places. Results are estimates, not lender statements.
              </p>
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-2">
                <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                  <AlertCircle className="w-4 h-4 text-slate-700" />
                  <span>Model Assumptions & Limitations</span>
                </div>
                <p>
                  Real-world credit card issuers may calculate interest daily or charge fees. Savings and investment returns vary over time and are not guaranteed. Taxes and inflation are excluded. These models do not include fees or account-specific rules.
                </p>
              </div>
            </section>
          </div>

          <DisclaimerBox compact />
        </div>
      </div>
    </div>
  );
}
