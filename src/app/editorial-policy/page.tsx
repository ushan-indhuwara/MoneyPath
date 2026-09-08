import React from 'react';
import { Breadcrumbs, DisclaimerBox } from '@/components/ui/DisclaimerBox';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Editorial Policy & Standards — MoneyPath AI',
  description: 'Learn about MoneyPath AI editorial standards, authoritative sourcing guidelines, AI transparency, and affiliate independence.',
};

export default function EditorialPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        <Breadcrumbs items={[{ label: 'Editorial Policy' }]} />

        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200/90 shadow-sm space-y-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Editorial Policy & Standards
          </h1>

          <div className="prose prose-slate max-w-none space-y-6 text-slate-800 leading-relaxed text-base">
            <section className="space-y-2">
              <h2 className="text-xl font-bold text-slate-900">1. Authoritative Sourcing</h2>
              <p>
                MoneyPath AI relies on factual, verified information from recognized financial regulatory bodies and government institutions in our primary markets:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li><strong>United States:</strong> Consumer Financial Protection Bureau (CFPB), Federal Reserve, SEC Investor.gov, IRS, FDIC.</li>
                <li><strong>United Kingdom:</strong> MoneyHelper, Financial Conduct Authority (FCA), Bank of England, HMRC, GOV.UK.</li>
              </ul>
            </section>

            <section className="space-y-2 border-t border-slate-100 pt-4">
              <h2 className="text-xl font-bold text-slate-900">2. Deterministic Calculation Independence</h2>
              <p>
                All financial calculations on MoneyPath are produced by deterministic, coded algorithms. AI is never permitted to independently generate core financial math or balances.
              </p>
            </section>

            <section className="space-y-2 border-t border-slate-100 pt-4">
              <h2 className="text-xl font-bold text-slate-900">3. AI Transparency</h2>
              <p>
                When plain-language explanations are generated using our optional AI feature, they are explicitly labeled with an "AI-generated explanation" badge. AI output is constrained by system guardrails prohibiting financial product recommendations.
              </p>
            </section>

            <section className="space-y-2 border-t border-slate-100 pt-4">
              <h2 className="text-xl font-bold text-slate-900">4. Affiliate Independence</h2>
              <p>
                MoneyPath maintains strict editorial independence. Future affiliate partnerships or sponsorships will never influence calculation outcomes, strategy comparisons, or educational advice.
              </p>
            </section>
          </div>

          <DisclaimerBox compact />
        </div>
      </div>
    </div>
  );
}
