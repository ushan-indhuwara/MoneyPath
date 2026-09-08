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
      className={`p-6 rounded-2xl border transition-all ${
        isHighlighted
          ? 'border-emerald-600 bg-emerald-50/40 shadow-md ring-2 ring-emerald-600/20'
          : 'border-slate-200 bg-white shadow-sm hover:border-slate-300'
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="inline-block px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-100 text-slate-700">
            {badgeText}
          </span>
          <h3 className="text-xl font-bold text-slate-900 mt-1">{title}</h3>
        </div>
        {isHighlighted && highlightText && (
          <span className="bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
            {highlightText}
          </span>
        )}
      </div>

      <div className="space-y-3 pt-2">
        <div className="flex justify-between items-baseline border-b border-slate-100 pb-2">
          <span className="text-sm text-slate-600 font-medium">Debt-Free Date</span>
          <span className="text-lg font-bold text-slate-900">{payoffDate}</span>
        </div>
        <div className="flex justify-between items-baseline border-b border-slate-100 pb-2">
          <span className="text-sm text-slate-600 font-medium">Total Time</span>
          <span className="text-base font-semibold text-slate-800">{monthsToPayoff}</span>
        </div>
        <div className="flex justify-between items-baseline border-b border-slate-100 pb-2">
          <span className="text-sm text-slate-600 font-medium">Total Interest</span>
          <span className="text-lg font-bold text-emerald-700">{totalInterest}</span>
        </div>
        <div className="flex justify-between items-baseline">
          <span className="text-sm text-slate-600 font-medium">Total Paid</span>
          <span className="text-base font-semibold text-slate-800">{totalAmountPaid}</span>
        </div>
      </div>
    </div>
  );
}
