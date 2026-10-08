'use client';

import React from 'react';
import Link from 'next/link';
import { useCountry } from '@/lib/country/context';
import {
  Calculator,
  PiggyBank,
  TrendingUp,
  ArrowRight,
  ShieldCheck,
  Brain,
  Lock,
  CheckCircle2,
  Sparkles,
  Zap,
} from 'lucide-react';

export default function HomePage() {
  const { country, currencySymbol } = useCountry();

  const articles = [
    {
      slug: 'debt-snowball-vs-avalanche',
      title: "Debt Snowball vs Debt Avalanche: What's the Difference?",
      excerpt: 'Compare psychological momentum against interest savings to determine which debt payoff method fits your goal.',
      category: 'Debt Strategy',
    },
    {
      slug: 'what-is-apr-explained',
      title: 'What Is APR and How Does It Affect Debt?',
      excerpt: 'Learn how Annual Percentage Rates translate into monthly interest charges on credit cards and personal loans.',
      category: 'Debt Basics',
    },
    {
      slug: 'how-compound-interest-works',
      title: 'How Compound Interest Works',
      excerpt: 'Understand the mathematical exponential engine behind savings growth and retirement projections.',
      category: 'Investing Basics',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-900 text-white pt-16 pb-20 lg:pt-24 lg:pb-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-900/40 via-slate-900 to-slate-950"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Hero Copy */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Deterministic Math + Optional AI Explanations</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                Make sense of <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">
                  your money.
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-slate-300 max-w-2xl leading-relaxed">
                Free calculators that help you understand debt, savings and long-term financial scenarios—without confusing spreadsheets.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <a
                  href="#calculators"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-base shadow-lg shadow-emerald-900/30 transition-all text-center flex items-center justify-center gap-2"
                >
                  <span>Explore Calculators</span>
                  <ArrowRight className="w-5 h-5" />
                </a>
                <Link
                  href="/tools/debt-payoff-calculator"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-base border border-slate-700 transition-all text-center"
                >
                  Start With Debt Payoff
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-400 font-medium">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 100% Free & No Sign-Up
                </span>
                <span className="flex items-center gap-1.5">
                  <Lock className="w-4 h-4 text-emerald-400" /> Privacy-First (No PII Stored)
                </span>
                <span className="flex items-center gap-1.5">
                  <Brain className="w-4 h-4 text-emerald-400" /> Code Does Math, AI Explains
                </span>
              </div>
            </div>

            {/* Hero Visual Mockup */}
            <div className="lg:col-span-5">
              <div className="p-6 rounded-2xl bg-slate-800/90 border border-slate-700/80 shadow-2xl space-y-4">
                <div className="flex items-center justify-between border-b border-slate-700 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                    <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                  </div>
                  <span className="text-xs font-mono text-slate-400">moneypathai.vercel.app/demo</span>
                </div>

                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-700 flex justify-between items-center">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-emerald-400">Avalanche Payoff</p>
                      <p className="text-xl font-bold text-white mt-0.5">March 2028</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-slate-400">Interest Saved</p>
                      <p className="text-lg font-bold text-emerald-400">{currencySymbol}1,480</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-700 flex justify-between items-center">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-blue-400">Snowball Payoff</p>
                      <p className="text-xl font-bold text-white mt-0.5">July 2028</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-slate-400">Quick Wins</p>
                      <p className="text-sm font-semibold text-slate-300">Small debt paid in 3 mo</p>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-800/50 text-xs text-emerald-300 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 shrink-0 text-emerald-400" />
                    <span>AI Insights: Avalanche minimizes total interest paid across high APR credit accounts.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Calculators Section */}
      <section id="calculators" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Popular Calculators</h2>
          <p className="mt-2 text-base text-slate-600">
            Select a tool below to run deterministic math calculations tailored to your financial scenario.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Debt Payoff Card */}
          <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                <Calculator className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Debt Payoff Planner</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Add multiple credit cards or loans. Compare Debt Snowball vs Debt Avalanche side-by-side to find your fastest path to zero debt.
              </p>
            </div>
            <Link
              href="/tools/debt-payoff-calculator"
              className="inline-flex items-center gap-2 text-sm font-bold text-emerald-700 hover:text-emerald-800 pt-4"
            >
              <span>Calculate Debt Payoff</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Savings Goal Card */}
          <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                <PiggyBank className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Savings Goal Calculator</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Determine your required monthly contribution or estimate how long it will take to save for a home deposit, emergency fund, or vacation.
              </p>
            </div>
            <Link
              href="/tools/savings-goal-calculator"
              className="inline-flex items-center gap-2 text-sm font-bold text-blue-700 hover:text-blue-800 pt-4"
            >
              <span>Calculate Savings Goal</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Retirement Estimator Card */}
          <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center font-bold">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Retirement Growth Estimator</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Project your retirement balance across Conservative, Base, and Optimistic compound growth scenarios with annual contribution increases.
              </p>
            </div>
            <Link
              href="/tools/retirement-calculator"
              className="inline-flex items-center gap-2 text-sm font-bold text-teal-700 hover:text-teal-800 pt-4"
            >
              <span>Estimate Retirement Growth</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why MoneyPath Section */}
      <section className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-extrabold tracking-tight">Why MoneyPath AI Is Different</h2>
            <p className="mt-2 text-slate-400">
              We built MoneyPath around clarity, mathematical accuracy, and user privacy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-3">
              <Zap className="w-6 h-6 text-emerald-400" />
              <h3 className="text-base font-bold">100% Deterministic Math</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Calculators run on tested TypeScript amortization algorithms. An LLM never calculates financial math.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-3">
              <Brain className="w-6 h-6 text-teal-400" />
              <h3 className="text-base font-bold">AI Explains Results</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Optional AI translates calculated numbers into plain-language trade-offs and options without pushing products.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-3">
              <Lock className="w-6 h-6 text-blue-400" />
              <h3 className="text-base font-bold">Privacy-First Architecture</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Your data stays in your browser. We never collect account numbers, SSNs, or store personal debt records.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-3">
              <ShieldCheck className="w-6 h-6 text-amber-400" />
              <h3 className="text-base font-bold">Transparent Assumptions</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                All interest rules, compounding frequencies, and limitations are documented openly in our Methodology.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Financial Learning Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Financial Learning Hub</h2>
            <p className="mt-1 text-slate-600">
              Clear, educational guides on APR, debt paydown strategies, and compound interest.
            </p>
          </div>
          <Link
            href="/learn"
            className="text-sm font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
          >
            <span>View All Articles</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((art) => (
            <Link
              key={art.slug}
              href={`/learn/${art.slug}`}
              className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-3 group"
            >
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                {art.category}
              </span>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                {art.title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">{art.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
