import React from 'react';
import { Breadcrumbs } from '@/components/ui/DisclaimerBox';
import { Metadata } from 'next';
import { ShieldCheck, Target, HeartHandshake, Code } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About MoneyPath AI — Mission & Platform Purpose',
  description: 'Learn about MoneyPath AI, our commitment to transparent math, privacy-first design, and educational finance tools.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        <Breadcrumbs items={[{ label: 'About MoneyPath' }]} />

        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200/90 shadow-sm space-y-8">
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              About MoneyPath AI
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed">
              "See your numbers. Understand your options."
            </p>
          </div>

          <div className="prose prose-slate max-w-none space-y-4 text-slate-800 leading-relaxed text-base">
            <p>
              MoneyPath AI was created to solve a widespread problem: personal finance spreadsheets are often frustrating to build, while financial advice online is frequently cluttered with pushy product sales, hidden commissions, or overly complex jargon.
            </p>

            <h2 className="text-xl font-bold text-slate-900 pt-4">Our Core Philosophy</h2>
            <p className="font-semibold text-emerald-800 bg-emerald-50 p-4 rounded-xl border border-emerald-200">
              CALCULATOR DOES THE MATH. AI EXPLAINS THE RESULT.
            </p>
            <p>
              We firmly believe that financial math should be 100% deterministic and transparent. Every payoff schedule, savings projection, and compound interest curve on MoneyPath is calculated by peer-reviewed TypeScript code—never by an unpredictable LLM. Optional server-side AI is used exclusively to translate structured mathematical outcomes into plain, understandable English.
            </p>

            <h2 className="text-xl font-bold text-slate-900 pt-4">Who We Target</h2>
            <p>
              MoneyPath provides localized support for users in the <strong>United States 🇺🇸</strong> and the <strong>United Kingdom 🇬🇧</strong>, respecting country-specific financial terms (401k/IRA vs Pensions/ISAs) and currency symbols.
            </p>

            <h2 className="text-xl font-bold text-slate-900 pt-4">MoneyPath Editorial Team</h2>
            <p>
              Our content is written and maintained by the <strong>MoneyPath Editorial Team</strong>, focusing on educational clarity, mathematical rigor, and strict compliance with financial publishing safety guidelines.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <h3 className="font-bold text-slate-900 text-sm">Not an Adviser</h3>
              <p className="text-xs text-slate-600">
                MoneyPath does not provide regulated financial, investment, or tax advice.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <Code className="w-5 h-5 text-blue-600" />
              <h3 className="font-bold text-slate-900 text-sm">Open & Deterministic</h3>
              <p className="text-xs text-slate-600">
                Calculations use exact monthly periodic interest formulas documented in our Methodology.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
