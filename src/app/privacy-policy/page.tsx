import React from 'react';
import { Breadcrumbs, DisclaimerBox } from '@/components/ui/DisclaimerBox';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy — MoneyPath AI',
  description: 'MoneyPath AI privacy policy detailing zero client financial data storage, local browser calculations, and AI privacy protections.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        <Breadcrumbs items={[{ label: 'Privacy Policy' }]} />

        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200/90 shadow-sm space-y-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Privacy Policy
          </h1>

          <div className="prose prose-slate max-w-none space-y-6 text-slate-800 leading-relaxed text-base">
            <section className="space-y-2">
              <h2 className="text-xl font-bold text-slate-900">1. Zero Financial Data Persistence</h2>
              <p>
                MoneyPath AI is designed from the ground up to respect user privacy. All inputs entered into our calculators (debt balances, APRs, savings amounts, retirement balances) are processed dynamically in your web browser. <strong>We do not save, store, or transmit your financial inputs to any persistent database.</strong>
              </p>
            </section>

            <section className="space-y-2 border-t border-slate-100 pt-4">
              <h2 className="text-xl font-bold text-slate-900">2. No Personally Identifiable Information (PII)</h2>
              <p>
                We do not ask for or collect names, Social Security Numbers, National Insurance Numbers, bank account numbers, credit card numbers, or home addresses.
              </p>
            </section>

            <section className="space-y-2 border-t border-slate-100 pt-4">
              <h2 className="text-xl font-bold text-slate-900">3. AI Feature Data Handling</h2>
              <p>
                If you voluntarily click the optional &quot;Explain My Results&quot; button, only minimum non-identifiable numeric scenario outputs (e.g., payoff months count, calculated interest difference) are sent to our server API route for plain-language interpretation. No personal identity data is ever attached or transmitted.
              </p>
            </section>

            <section className="space-y-2 border-t border-slate-100 pt-4">
              <h2 className="text-xl font-bold text-slate-900">4. Local Browser Storage</h2>
              <p>
                We may store minor preference settings (such as your chosen market currency preference US $ or UK £) in your browser&apos;s <code className="bg-slate-100 px-1 py-0.5 rounded">localStorage</code> for convenience. You can clear this storage at any time via browser settings.
              </p>
            </section>
          </div>

          <DisclaimerBox compact />
        </div>
      </div>
    </div>
  );
}
