'use client';

import React from 'react';

interface ResultCardProps {
  label: string;
  value: string;
  subtext?: string;
  variant?: 'primary' | 'secondary' | 'accent' | 'neutral' | 'caution';
  icon?: React.ReactNode;
}

export function ResultCard({
  label,
  value,
  subtext,
  variant = 'neutral',
  icon,
}: ResultCardProps) {
  const variantStyles = {
    primary: 'bg-emerald-900 text-white border-emerald-800',
    secondary: 'bg-slate-900 text-white border-slate-800',
    accent: 'bg-blue-50 text-blue-900 border-blue-200',
    neutral: 'bg-white text-slate-900 border-slate-200',
    caution: 'bg-amber-50 text-amber-950 border-amber-200',
  };

  const labelStyles = {
    primary: 'text-emerald-200',
    secondary: 'text-slate-300',
    accent: 'text-blue-700',
    neutral: 'text-slate-500',
    caution: 'text-amber-800',
  };

  const subtextStyles = {
    primary: 'text-emerald-100/80',
    secondary: 'text-slate-400',
    accent: 'text-blue-600',
    neutral: 'text-slate-500',
    caution: 'text-amber-700',
  };

  return (
    <div className={`p-5 rounded-xl border shadow-sm transition-all ${variantStyles[variant]}`}>
      <div className="flex items-center justify-between">
        <p className={`text-xs font-semibold uppercase tracking-wider ${labelStyles[variant]}`}>
          {label}
        </p>
        {icon && <div className="p-1 rounded-md bg-white/10">{icon}</div>}
      </div>
      <p className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight">
        {value}
      </p>
      {subtext && (
        <p className={`mt-1 text-xs font-medium ${subtextStyles[variant]}`}>
          {subtext}
        </p>
      )}
    </div>
  );
}

interface ComparisonCardProps {
  title: string;
  badgeText: string;
  payoffDate: string;
  monthsToPayoff: string;
  totalInterest: string;
  totalAmountPaid: string;
  isHighlighted?: boolean;
  highlightText?: string;
  onSelectStrategy?: () => void;
}

export function ComparisonCard({
  title,
  badgeText,
  payoffDate,
  monthsToPayoff,
  totalInterest,
  totalAmountPaid,
  isHighlighted = false,
  highlightText,
}: ComparisonCardProps) {
  return (
    <div
      className={`p-5 rounded-2xl border transition-all ${
        isHighlighted
          ? 'border-emerald-500 bg-gradient-to-br from-white to-emerald-50 shadow-sm ring-1 ring-emerald-500/30'
          : 'border-slate-200 bg-white shadow-sm hover:border-slate-300'
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="text-xs font-bold uppercase tracking-wide text-slate-500">{title} · {badgeText}</div>
        {isHighlighted && highlightText && <span className="shrink-0 rounded-full bg-emerald-100 px-2 py-1 text-[10px] font-bold text-emerald-800">{highlightText}</span>}
      </div>
      <p className="mt-3 text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">{monthsToPayoff}</p>
      <p className="text-xs text-slate-500">Estimated time to debt-free</p>
      <div className="grid grid-cols-2 gap-2 mt-4">
        <div className="rounded-lg bg-slate-50 p-3"><p className="text-[11px] text-slate-500">Total interest</p><p className="mt-1 text-sm font-bold text-slate-900">{totalInterest}</p></div>
        <div className="rounded-lg bg-slate-50 p-3"><p className="text-[11px] text-slate-500">Debt-free around</p><p className="mt-1 text-sm font-bold text-slate-900">{payoffDate}</p></div>
      </div>
      <p className="sr-only">Total estimated amount paid: {totalAmountPaid}</p>
    </div>
  );
}
