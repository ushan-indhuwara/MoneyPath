import React from 'react';
import { Breadcrumbs } from '@/components/ui/DisclaimerBox';
import { Metadata } from 'next';
import { Mail, MessageSquare, Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Us — MoneyPath AI',
  description: 'Get in touch with the MoneyPath AI team for questions, feedback, or calculator methodology inquiries.',
};

// Configurable contact email placeholder
const CONTACT_EMAIL = 'hello@moneypath.ai';

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
              Have feedback on our calculators or methodology? We would love to hear from you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                <Mail className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Email Us</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                For general inquiries, editorial corrections, or mathematical feedback:
              </p>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="inline-block font-bold text-emerald-700 hover:underline text-sm bg-white px-3 py-2 rounded-lg border border-slate-200"
              >
                {CONTACT_EMAIL}
              </a>
              <p className="text-[11px] text-slate-400">
                Note: Replace {CONTACT_EMAIL} in <code className="bg-slate-200 px-1 rounded">src/app/contact/page.tsx</code> before production launch.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Privacy Notice</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Please do not send private financial account details, Social Security Numbers, or passwords via email. We do not offer individual financial planning over email.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
