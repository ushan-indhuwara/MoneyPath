'use client';

import React from 'react';
import { Breadcrumbs } from './DisclaimerBox';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface CalculatorLayoutProps {
  title: string;
  subtitle: string;
  inputsPanel: React.ReactNode;
  resultsPanel: React.ReactNode;
  breadcrumbs?: BreadcrumbItem[];
  methodologyNotice?: React.ReactNode;
}

export function CalculatorLayout({
  title,
  subtitle,
  inputsPanel,
  resultsPanel,
  breadcrumbs,
  methodologyNotice,
}: CalculatorLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
            {title}
          </h1>
          <p className="mt-2 text-lg text-slate-600 max-w-3xl">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Inputs Panel */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-sm space-y-6">
            {inputsPanel}
          </div>

          {/* Results Panel */}
          <div className="lg:col-span-7 space-y-6">
            {resultsPanel}
          </div>
        </div>

        {methodologyNotice && (
          <div className="mt-12">
            {methodologyNotice}
          </div>
        )}
      </div>
    </div>
  );
}
