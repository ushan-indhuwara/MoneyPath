import React from 'react';
import Link from 'next/link';
import { ARTICLES } from '@/content/articles';
import { Breadcrumbs } from '@/components/ui/DisclaimerBox';
import { BookOpen, ArrowRight } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Financial Learning Hub — Educational Guides & Debt Payoff Strategies',
  description:
    'Free educational articles on Debt Snowball vs Avalanche, APR, credit card interest mechanics, compound interest formulas, and retirement estimates.',
};

export default function LearnIndexPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Breadcrumbs items={[{ label: 'Financial Learning Hub' }]} />

        <div className="mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Educational Content</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Financial Learning Hub
          </h1>
          <p className="mt-2 text-lg text-slate-600 max-w-3xl">
            Clear, original guides designed to help you understand personal finance mechanics without technical jargon or product sales pitches.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ARTICLES.map((art) => (
            <Link
              key={art.slug}
              href={`/learn/${art.slug}`}
              className="p-8 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
                  <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 uppercase tracking-wider">
                    {art.category}
                  </span>
                  <span>{art.readTime}</span>
                </div>
                <h2 className="text-xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors leading-snug">
                  {art.title}
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed">{art.excerpt}</p>
              </div>

              <div className="pt-6 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-700 group-hover:text-emerald-800">
                <span>Read Full Article</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
