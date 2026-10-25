import React from 'react';
import { Breadcrumbs, DisclaimerBox } from '@/components/ui/DisclaimerBox';
import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata(
  'Privacy Policy — MoneyPath AI',
  'How MoneyPath processes calculator inputs, optional AI explanation requests, and local market preferences.',
  '/privacy-policy'
);

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
              <h2 className="text-xl font-bold text-slate-900">1. Calculator inputs</h2>
              <p>
                Calculator math runs in your browser. Calculator inputs are not sent to our server unless you request an optional explanation. This site does not provide a user account or a feature to save calculator scenarios.
              </p>
            </section>

            <section className="space-y-2 border-t border-slate-100 pt-4">
              <h2 className="text-xl font-bold text-slate-900">2. No Personally Identifiable Information (PII)</h2>
              <p>
                The calculators do not ask for names, Social Security Numbers, National Insurance Numbers, bank account numbers, or home addresses. Do not enter identifying details in debt names or other free-text fields.
              </p>
            </section>

            <section className="space-y-2 border-t border-slate-100 pt-4">
              <h2 className="text-xl font-bold text-slate-900">3. AI Feature Data Handling</h2>
              <p>
                If you click &quot;Explain My Results&quot;, the displayed result figures and selected country are sent to this site&apos;s server. For savings and retirement scenarios, this includes entered amounts such as current savings and target amounts; debt account names and identifiers are not sent. If AI explanations are enabled by the site operator, the server sends the scenario figures to OpenAI to generate a response. Do not request an explanation if you do not want those figures processed this way. AI explanations are disabled unless the operator explicitly enables and configures them.
              </p>
            </section>

            <section className="space-y-2 border-t border-slate-100 pt-4">
              <h2 className="text-xl font-bold text-slate-900">4. Local Browser Storage</h2>
              <p>
                The selected US or UK market preference is stored in your browser&apos;s <code className="bg-slate-100 px-1 py-0.5 rounded">localStorage</code>. You can remove it through your browser settings.
              </p>
            </section>
          </div>

          <DisclaimerBox compact />
        </div>
      </div>
    </div>
  );
}
