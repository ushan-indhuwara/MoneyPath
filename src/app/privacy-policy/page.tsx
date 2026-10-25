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
                Calculator math runs in your browser. Inputs are not sent to our server unless you request an optional AI explanation. If you choose to save a scenario, its inputs and summary are stored in this browser&apos;s local storage; the site has no user account or server-side scenario library. You can remove saved scenarios from the calculator or clear browser storage.
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
              <h2 className="text-xl font-bold text-slate-900">4. Local browser storage</h2>
              <p>
                Saved scenarios, the selected US or UK market preference, and your analytics choice are stored in <code className="bg-slate-100 px-1 py-0.5 rounded">localStorage</code>. Exporting a scenario downloads a file containing its inputs and estimates. The Share Calculator button shares only the calculator page URL, without scenario amounts. You can delete saved scenarios in the tool or clear local storage in browser settings.
              </p>
            </section>

            <section className="space-y-2 border-t border-slate-100 pt-4">
              <h2 className="text-xl font-bold text-slate-900">5. Optional analytics</h2>
              <p>
                Analytics are disabled unless the site operator configures a Google Analytics measurement ID. When configured, analytics scripts load only after you choose Accept. If you decline, or do not make a choice, analytics stays off. With consent, the site records page views and limited actions such as saving, loading, or exporting a scenario and clicking from a guide to a calculator. It does not send calculator inputs, balances, or result amounts. Google Analytics may use cookies and browser signals. You can change your choice using the Privacy choices link in the footer. See <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">Google&apos;s privacy policy</a> for how Google processes analytics data.
              </p>
            </section>
          </div>

          <DisclaimerBox compact />
        </div>
      </div>
    </div>
  );
}
