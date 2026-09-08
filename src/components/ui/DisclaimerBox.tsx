'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldAlert, ChevronRight } from 'lucide-react';

interface DisclaimerBoxProps {
  compact?: boolean;
}

export function DisclaimerBox({ compact = false }: DisclaimerBoxProps) {
  if (compact) {
    return (
      <div className="p-4 rounded-xl bg-slate-100 border border-slate-200/80 text-slate-600 text-xs flex items-start gap-2.5">
        <ShieldAlert className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
        <p>
          <strong className="text-slate-700">Educational Disclaimer:</strong> MoneyPath provides educational calculators and general information only. Results are estimates based on the assumptions entered. MoneyPath does not provide financial, investment, tax, or legal advice.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 rounded-2xl bg-amber-50/60 border border-amber-200/80 text-amber-950 space-y-2 text-xs leading-relaxed">
      <div className="flex items-center gap-2 font-bold text-amber-900 text-sm">
        <ShieldAlert className="w-4 h-4 text-amber-700" />
        <span>Educational Purpose & Financial Disclaimer</span>
      </div>
      <p>
        MoneyPath provides educational calculators and general information only. Results are hypothetical estimates based on the math models and assumptions you enter and may not reflect fees, taxes, lender interest calculation methods, market performance, or your individual financial circumstances.
      </p>
      <p>
        MoneyPath is NOT a bank, mortgage broker, investment adviser, or financial adviser. Nothing on this website constitutes personalized financial, investment, tax, or legal advice. Before making significant financial decisions, consider consulting a qualified, independent financial professional.
      </p>
    </div>
  );
}

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="flex items-center space-x-2 text-xs text-slate-500">
        <li>
          <Link href="/" className="hover:text-emerald-700 font-medium transition-colors">
            Home
          </Link>
        </li>
        {items.map((item, idx) => (
          <li key={idx} className="flex items-center space-x-2">
            <ChevronRight className="w-3 h-3 text-slate-400" />
            {item.href ? (
              <Link href={item.href} className="hover:text-emerald-700 font-medium transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="font-semibold text-slate-800">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
