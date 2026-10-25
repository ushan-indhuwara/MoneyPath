import React from 'react';
import { Breadcrumbs } from '@/components/ui/DisclaimerBox';
import { createPageMetadata } from '@/lib/seo';
import { Mail, MessageSquare, Shield } from 'lucide-react';

export const metadata = createPageMetadata(
  'Contact Us — MoneyPath AI',
  'Get in touch with the MoneyPath AI team for questions, feedback, or calculator methodology inquiries.',
  '/contact'
);

const FEEDBACK_URL = 'https://github.com/ushanindhuwara-ship-it/MoneyPath/issues/new';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        <Breadcrumbs items={[{ label: 'Contact Us' }]} />

        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200/90 shadow-sm space-y-8">
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Contact MoneyPath AI
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed">
              Report a confusing result, a calculation issue, or a suggestion for the site.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                <Mail className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Report an issue</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Open a GitHub issue to send feedback to the project maintainers. You may need a GitHub account. Reports are public, so do not include balances, account details, or other private information.
              </p>
              <a
                href={FEEDBACK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block font-bold text-emerald-700 hover:underline text-sm bg-white px-3 py-2 rounded-lg border border-slate-200"
              >
                Open MoneyPath issue tracker
              </a>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Privacy Notice</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Please do not include private financial account details, government identifiers, or passwords in a report. MoneyPath does not offer individual financial planning.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
