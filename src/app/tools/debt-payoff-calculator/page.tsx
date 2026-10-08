'use client';

import React, { useState, useMemo } from 'react';
import { useCountry } from '@/lib/country/context';
import { DebtItem } from '@/types/financial';
import { calculateDebtComparison } from '@/lib/financial/debtEngine';
import { formatCurrency, formatDuration } from '@/lib/financial/formatters';
import { CalculatorLayout } from '@/components/ui/CalculatorLayout';
import { CurrencyInput } from '@/components/ui/CurrencyInput';
import { PercentageInput } from '@/components/ui/PercentageInput';
import { ResultCard, ComparisonCard } from '@/components/ui/ResultCard';
import { ProjectionChart } from '@/components/ui/ProjectionChart';
import { AIExplanationBox } from '@/components/ui/AIExplanationBox';
import { DisclaimerBox, Breadcrumbs } from '@/components/ui/DisclaimerBox';
import { Plus, Trash2, Copy, Check, Printer, RotateCcw, AlertTriangle, Info } from 'lucide-react';
import Link from 'next/link';

const SAMPLE_DEBTS: DebtItem[] = [
  { id: 'd1', name: 'Credit Card A', balance: 4500, apr: 22.9, minPayment: 135 },
  { id: 'd2', name: 'Personal Loan', balance: 8000, apr: 11.5, minPayment: 210 },
  { id: 'd3', name: 'Store Credit Card', balance: 1200, apr: 26.9, minPayment: 45 },
];

export default function DebtPayoffCalculatorPage() {
  const { country, currencySymbol } = useCountry();

  const [debts, setDebts] = useState<DebtItem[]>(SAMPLE_DEBTS);
  const [extraPayment, setExtraPayment] = useState<number>(250);
  const [copied, setCopied] = useState<boolean>(false);
  const [selectedStrategyTab, setSelectedStrategyTab] = useState<'avalanche' | 'snowball'>('avalanche');

  const addDebt = () => {
    const newId = `debt_${Date.now()}`;
    setDebts([
      ...debts,
      { id: newId, name: `Debt #${debts.length + 1}`, balance: 2000, apr: 18.9, minPayment: 60 },
    ]);
  };

  const removeDebt = (id: string) => {
    if (debts.length <= 1) return;
    setDebts(debts.filter((d) => d.id !== id));
  };

  const updateDebt = (id: string, field: keyof DebtItem, value: any) => {
    setDebts(
      debts.map((d) => (d.id === id ? { ...d, [field]: value } : d))
    );
  };

  const loadExample = () => {
    setDebts(SAMPLE_DEBTS);
    setExtraPayment(250);
  };

  const resetAll = () => {
    setDebts([{ id: 'd1', name: 'Credit Card', balance: 3000, apr: 19.9, minPayment: 90 }]);
    setExtraPayment(100);
  };

  // Perform deterministic calculations
  const comparison = useMemo(() => {
    return calculateDebtComparison(debts, extraPayment);
  }, [debts, extraPayment]);

  const activeStrategyResult =
    selectedStrategyTab === 'avalanche' ? comparison.avalanche : comparison.snowball;

  // Chart data formatting
  const chartData = useMemo(() => {
    const maxMonths = Math.max(comparison.snowball.schedule.length, comparison.avalanche.schedule.length);
    const dataPoints: { dateStr: string; Snowball: number; Avalanche: number }[] = [];

    // Step by 3 months if timeline is long
    const step = maxMonths > 36 ? 3 : 1;

    for (let i = 0; i < maxMonths; i += step) {
      const snowballMonth = comparison.snowball.schedule[i] || comparison.snowball.schedule[comparison.snowball.schedule.length - 1];
      const avalancheMonth = comparison.avalanche.schedule[i] || comparison.avalanche.schedule[comparison.avalanche.schedule.length - 1];

      dataPoints.push({
        dateStr: avalancheMonth ? avalancheMonth.dateStr : `Month ${i + 1}`,
        Snowball: snowballMonth ? snowballMonth.remainingTotalBalance : 0,
        Avalanche: avalancheMonth ? avalancheMonth.remainingTotalBalance : 0,
      });
    }

    return dataPoints;
  }, [comparison]);

  const copySummaryText = () => {
    const text = `MoneyPath AI Debt Payoff Estimate (${country}):
Avalanche Strategy: Debt-free in ${formatDuration(comparison.avalanche.monthsToPayoff)} (${comparison.avalanche.payoffDate}), Total Interest: ${formatCurrency(comparison.avalanche.totalInterestPaid, country)}
Snowball Strategy: Debt-free in ${formatDuration(comparison.snowball.monthsToPayoff)} (${comparison.snowball.payoffDate}), Total Interest: ${formatCurrency(comparison.snowball.totalInterestPaid, country)}
Estimated Avalanche Interest Saved: ${formatCurrency(comparison.interestDifference, country)}
Calculated at https://moneypathai.vercel.app/tools/debt-payoff-calculator`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <CalculatorLayout
      title="Debt Payoff Planner"
      subtitle="Compare Debt Snowball vs Debt Avalanche strategies to find your fastest path to becoming debt-free."
      breadcrumbs={[
        { label: 'Calculators', href: '/#calculators' },
        { label: 'Debt Payoff Planner' },
      ]}
      inputsPanel={
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-lg font-bold text-slate-900">Your Debts</h2>
            <div className="flex gap-2">
              <button
                onClick={loadExample}
                className="text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1 rounded-lg transition-colors"
              >
                Load Example Data
              </button>
              <button
                onClick={resetAll}
                className="text-xs font-medium text-slate-500 hover:text-slate-700 p-1"
                title="Reset form"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
            {debts.map((debt, index) => (
              <div
                key={debt.id}
                className="p-4 rounded-xl bg-slate-50 border border-slate-200/90 space-y-3 relative group"
              >
                <div className="flex items-center justify-between">
                  <input
                    type="text"
                    value={debt.name}
                    onChange={(e) => updateDebt(debt.id, 'name', e.target.value)}
                    className="font-bold text-sm text-slate-900 bg-transparent border-b border-dashed border-slate-300 focus:border-emerald-600 focus:outline-none px-1 py-0.5"
                    placeholder="Debt Name"
                  />
                  {debts.length > 1 && (
                    <button
                      onClick={() => removeDebt(debt.id)}
                      className="text-slate-400 hover:text-rose-600 p-1 transition-colors"
                      title="Remove debt"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <CurrencyInput
                    id={`bal_${debt.id}`}
                    label="Balance"
                    value={debt.balance}
                    onChange={(val) => updateDebt(debt.id, 'balance', val)}
                  />
                  <PercentageInput
                    id={`apr_${debt.id}`}
                    label="APR"
                    value={debt.apr}
                    onChange={(val) => updateDebt(debt.id, 'apr', val)}
                  />
                  <CurrencyInput
                    id={`min_${debt.id}`}
                    label="Min Payment"
                    value={debt.minPayment}
                    onChange={(val) => updateDebt(debt.id, 'minPayment', val)}
                  />
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={addDebt}
            className="w-full py-2.5 rounded-xl border-2 border-dashed border-slate-300 hover:border-emerald-600 text-slate-700 hover:text-emerald-700 font-semibold text-sm flex items-center justify-center gap-2 transition-colors"
          >
            <Plus className="w-4 h-4" /> Add Another Debt
          </button>

          <div className="pt-4 border-t border-slate-200">
            <CurrencyInput
              id="extra_payment"
              label="Extra Monthly Payment Available"
              value={extraPayment}
              onChange={setExtraPayment}
              helpText="Additional money paid each month on top of all minimum payments."
            />
          </div>
        </div>
      }
      resultsPanel={
        <div className="space-y-6">
          {/* Warnings Banner if payments insufficient */}
          {comparison.warnings.length > 0 && (
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs space-y-1">
              <div className="flex items-center gap-2 font-bold text-amber-950">
                <AlertTriangle className="w-4 h-4 text-amber-700" />
                <span>Insufficient Payment Warning</span>
              </div>
              {comparison.warnings.map((w, idx) => (
                <p key={idx}>{w}</p>
              ))}
            </div>
          )}

          {/* Strategy Comparison Side-by-Side */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ComparisonCard
              title="Debt Avalanche"
              badgeText="Highest APR First"
              payoffDate={comparison.avalanche.payoffDate}
              monthsToPayoff={formatDuration(comparison.avalanche.monthsToPayoff)}
              totalInterest={formatCurrency(comparison.avalanche.totalInterestPaid, country)}
              totalAmountPaid={formatCurrency(comparison.avalanche.totalAmountPaid, country)}
              isHighlighted={comparison.recommendedByMath === 'avalanche'}
              highlightText="Saves Most Interest"
            />

            <ComparisonCard
              title="Debt Snowball"
              badgeText="Smallest Balance First"
              payoffDate={comparison.snowball.payoffDate}
              monthsToPayoff={formatDuration(comparison.snowball.monthsToPayoff)}
              totalInterest={formatCurrency(comparison.snowball.totalInterestPaid, country)}
              totalAmountPaid={formatCurrency(comparison.snowball.totalAmountPaid, country)}
              isHighlighted={comparison.recommendedByMath === 'snowball'}
              highlightText="Quickest Wins"
            />
          </div>

          {/* Key Delta Outcome Card */}
          <div className="p-5 rounded-2xl bg-emerald-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-emerald-300">
                Mathematical Comparison Difference
              </p>
              <h3 className="text-2xl font-bold text-white mt-1">
                {comparison.interestDifference > 0 ? (
                  <>Avalanche saves {formatCurrency(comparison.interestDifference, country)} in interest</>
                ) : (
                  <>Both strategies yield identical interest cost</>
                )}
              </h3>
              <p className="text-xs text-emerald-200 mt-1">
                {comparison.monthsDifference > 0
                  ? `Avalanche achieves debt freedom ${comparison.monthsDifference} months faster.`
                  : comparison.monthsDifference < 0
                  ? `Snowball achieves debt freedom ${Math.abs(comparison.monthsDifference)} months faster.`
                  : `Both methods take ${comparison.avalanche.monthsToPayoff} months to clear all debt.`}
              </p>
            </div>

            <div className="flex gap-2 shrink-0">
              <button
                onClick={copySummaryText}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy Summary'}</span>
              </button>
              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print</span>
              </button>
            </div>
          </div>

          {/* Chart */}
          <ProjectionChart type="debt" debtData={chartData} />

          {/* Strategy Tabs & Individual Debts Breakdown */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">Debt Payoff Timeline Details</h3>
              <div className="flex bg-slate-100 p-1 rounded-xl">
                <button
                  onClick={() => setSelectedStrategyTab('avalanche')}
                  className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                    selectedStrategyTab === 'avalanche' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
                  }`}
                >
                  Avalanche Schedule
                </button>
                <button
                  onClick={() => setSelectedStrategyTab('snowball')}
                  className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                    selectedStrategyTab === 'snowball' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
                  }`}
                >
                  Snowball Schedule
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider">
                    <th className="pb-3">Debt Name</th>
                    <th className="pb-3">Starting Balance</th>
                    <th className="pb-3">APR</th>
                    <th className="pb-3">Payoff Time</th>
                    <th className="pb-3">Total Interest</th>
                    <th className="pb-3">Total Paid</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {activeStrategyResult.debtDetails.map((detail) => (
                    <tr key={detail.id} className="hover:bg-slate-50">
                      <td className="py-3 font-semibold text-slate-900">{detail.name}</td>
                      <td className="py-3 text-slate-700">{formatCurrency(detail.initialBalance, country)}</td>
                      <td className="py-3 text-slate-700">{detail.apr}%</td>
                      <td className="py-3 font-medium text-emerald-700">
                        {formatDuration(detail.monthsToPayoff)}
                      </td>
                      <td className="py-3 text-slate-700">{formatCurrency(detail.totalInterestPaid, country)}</td>
                      <td className="py-3 font-semibold text-slate-900">
                        {formatCurrency(detail.totalAmountPaid, country)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* AI Explanation Feature */}
          <AIExplanationBox
            calculatorType="debt-payoff"
            data={{
              snowballMonths: comparison.snowball.monthsToPayoff,
              snowballDate: comparison.snowball.payoffDate,
              snowballInterest: comparison.snowball.totalInterestPaid,
              avalancheMonths: comparison.avalanche.monthsToPayoff,
              avalancheDate: comparison.avalanche.payoffDate,
              avalancheInterest: comparison.avalanche.totalInterestPaid,
              interestSaved: comparison.interestDifference,
              monthsSaved: comparison.monthsDifference,
            }}
          />

          <DisclaimerBox />
        </div>
      }
      methodologyNotice={
        <div className="p-6 bg-white rounded-2xl border border-slate-200 text-xs text-slate-600 space-y-2">
          <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
            <Info className="w-4 h-4 text-emerald-600" />
            <span>How This Debt Calculation Works</span>
          </div>
          <p>
            Calculations convert APR to a monthly periodic interest rate applied to outstanding balance. Minimum payments are applied to active debts first; remaining extra funds are rolled into prioritized debts according to the selected strategy.
          </p>
          <Link href="/methodology" className="inline-block text-emerald-700 font-semibold hover:underline">
            Read full calculation methodology & assumptions →
          </Link>
        </div>
      }
    />
  );
}
