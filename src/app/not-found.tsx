import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Calculator } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] bg-slate-50 flex items-center justify-center px-4 py-20">
      <div className="max-w-md w-full text-center space-y-6 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/90 shadow-sm">
        <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
          <Calculator className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">404 — Page Not Found</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            We couldn't calculate a path to this page.
          </h1>
          <p className="text-sm text-slate-600">
            The route you are looking for may have moved or doesn't exist. Let's get you back on track.
          </p>
        </div>
        <div>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm shadow-md transition-colors w-full"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to MoneyPath</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
