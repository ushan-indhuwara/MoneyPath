'use client';

import React from 'react';
import Link from 'next/link';
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
  const articles = [
    {
      slug: 'debt-snowball-vs-avalanche',
      title: 'Debt Snowball vs. Debt Avalanche: Which Should You Choose?',
      excerpt: 'Compare the debt snowball and debt avalanche methods, see a practical example, and choose a repayment strategy that fits your priorities.',
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
    <div className="min-h-screen bg-white text-slate-900 space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#f3f8f5] text-slate-900 pt-14 pb-16 lg:pt-20 lg:pb-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_78%_20%,rgba(16,185,129,0.12),transparent_38%)]"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Hero Copy */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-white text-emerald-800 border border-emerald-200 shadow-sm">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Free, practical tools for your next money decision</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-950 leading-[1.08]">
                Make your next money move <span className="text-emerald-700">with more clarity.</span>
              </h1>
              <p className="text-lg sm:text-xl text-slate-600 max-w-2xl leading-relaxed">
                See how different debt payments, savings plans, and retirement assumptions could change your estimates—with the math and assumptions made clear.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <a
                  href="#calculators"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-base shadow-lg shadow-emerald-900/15 transition-all text-center flex items-center justify-center gap-2"
                >
                  <span>Explore Calculators</span>
                  <ArrowRight className="w-5 h-5" />
                </a>
                <Link
                  href="/tools/debt-payoff-calculator"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-semibold text-base border border-slate-200 shadow-sm transition-all text-center"
                >
                  Start With Debt Payoff
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="pt-6 border-t border-slate-200 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-600 font-medium">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" /> Free tools · No sign-up
                </span>
                <span className="flex items-center gap-1.5">
                  <Lock className="w-4 h-4 text-emerald-700" /> Calculations run in your browser
                </span>
                <span className="flex items-center gap-1.5">
                  <Brain className="w-4 h-4 text-emerald-700" /> AI explanations are optional
                </span>
              </div>
            </div>

            {/* Hero Visual Mockup */}
            <div className="lg:col-span-5">
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xl shadow-slate-900/10 space-y-4 rotate-0 lg:rotate-1">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                    <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                  </div>
                  <span className="text-xs font-semibold text-slate-500">A clearer way to compare</span>
                </div>

                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex justify-between items-center gap-3">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">Start with a question</p>
                      <p className="text-lg font-bold text-slate-900 mt-0.5">Which debt should I pay first?</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-slate-500">Compare</p>
                      <p className="text-sm font-bold text-emerald-800">Two strategies</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-white border border-slate-200 flex justify-between items-center gap-3">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-blue-700">See the trade-off</p>
                      <p className="text-lg font-bold text-slate-900 mt-0.5">Motivation or interest?</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-slate-500">Results include</p>
                      <p className="text-sm font-semibold text-slate-700">Time and interest estimates</p>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-100 text-xs text-emerald-900 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-700" />
                    <span>Educational estimates, with assumptions shown alongside results.</span>
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
            Start with the decision you’re working through. Change the assumptions and compare possible outcomes.
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
                For credit cards and loans: compare Snowball and Avalanche payoff estimates, including projected time and interest.
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
      <section className="bg-slate-50 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-wider text-emerald-700">A clearer way to plan</p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950">Useful answers, without the guesswork.</h2>
            <p className="mt-3 text-base leading-relaxed text-slate-600">
              MoneyPath helps you explore possible outcomes. You stay in control of your choices and can see how each estimate is made.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <article className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
              <div className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center"><Zap className="w-5 h-5 text-emerald-700" /></div>
              <div><h3 className="text-base font-bold text-slate-900">Numbers from clear formulas</h3><p className="mt-2 text-sm text-slate-600 leading-relaxed">The calculators handle the math. AI does not decide your balances, growth, or payoff schedule.</p></div>
            </article>

            <article className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
              <div className="w-11 h-11 rounded-xl bg-teal-50 flex items-center justify-center"><Brain className="w-5 h-5 text-teal-700" /></div>
              <div><h3 className="text-base font-bold text-slate-900">Explanations when you want them</h3><p className="mt-2 text-sm text-slate-600 leading-relaxed">Optional AI can explain a result in plain language. You can use every calculator without it.</p></div>
            </article>

            <article className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
              <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center"><Lock className="w-5 h-5 text-blue-700" /></div>
              <div><h3 className="text-base font-bold text-slate-900">Your inputs stay on your device</h3><p className="mt-2 text-sm text-slate-600 leading-relaxed">Calculator inputs are processed in your browser. An AI explanation sends the information described in our privacy policy.</p><Link href="/privacy-policy" className="mt-3 inline-flex text-sm font-bold text-blue-700 hover:text-blue-900">Read the privacy policy <ArrowRight className="ml-1 h-4 w-4" /></Link></div>
            </article>

            <article className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
              <div className="w-11 h-11 rounded-xl bg-amber-50 flex items-center justify-center"><ShieldCheck className="w-5 h-5 text-amber-700" /></div>
              <div><h3 className="text-base font-bold text-slate-900">Assumptions made visible</h3><p className="mt-2 text-sm text-slate-600 leading-relaxed">Results are estimates, not promises. Review the calculation methods and limits before relying on them.</p><Link href="/methodology" className="mt-3 inline-flex text-sm font-bold text-amber-800 hover:text-amber-950">See how calculations work <ArrowRight className="ml-1 h-4 w-4" /></Link></div>
            </article>
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
