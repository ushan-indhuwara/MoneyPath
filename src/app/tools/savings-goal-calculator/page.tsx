'use client';

import React, { useState, useMemo } from 'react';
import { useCountry } from '@/lib/country/context';
import { SavingsGoalInputs, SavingsMode } from '@/types/financial';
import { calculateSavingsGoal } from '@/lib/financial/savingsEngine';
import { formatCurrency, formatDuration } from '@/lib/financial/formatters';
import { CalculatorLayout } from '@/components/ui/CalculatorLayout';
import { CurrencyInput } from '@/components/ui/CurrencyInput';
import { PercentageInput } from '@/components/ui/PercentageInput';
import { ResultCard } from '@/components/ui/ResultCard';
import { ProjectionChart } from '@/components/ui/ProjectionChart';
import { AIExplanationBox } from '@/components/ui/AIExplanationBox';
import { DisclaimerBox } from '@/components/ui/DisclaimerBox';
import { Copy, Check, Printer, RotateCcw, Info, PiggyBank, Target, Calendar, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function SavingsGoalCalculatorPage() {
  const { country } = useCountry();

  const [mode, setMode] = useState<SavingsMode>('MODE_A');
  const [targetAmount, setTargetAmount] = useState<number>(25000);
  const [currentSavings, setCurrentSavings] = useState<number>(5000);
  const [goalTimeframeMonths, setGoalTimeframeMonths] = useState<number>(24);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(750);
  const [annualInterestRate, setAnnualInterestRate] = useState<number>(4.5);
  const [copied, setCopied] = useState<boolean>(false);

  const result = useMemo(() => {
    return calculateSavingsGoal({
      mode,
      targetAmount,
      currentSavings,
      goalTimeframeMonths,
      monthlyContribution,
      annualInterestRate,
    });
  }, [mode, targetAmount, currentSavings, goalTimeframeMonths, monthlyContribution, annualInterestRate]);

  // Format data for chart
  const chartData = useMemo(() => {
    const step = result.schedule.length > 36 ? 3 : 1;
    return result.schedule
      .filter((_, idx) => idx % step === 0 || idx === result.schedule.length - 1)
      .map((item) => ({
        month: item.month,
        Balance: item.endingBalance,
        Contributions: item.totalContributions,
        Interest: item.totalInterest,
      }));
  }, [result]);

  const loadExample = () => {
    setMode('MODE_A');
    setTargetAmount(20000);
    setCurrentSavings(3000);
    setGoalTimeframeMonths(18);
    setAnnualInterestRate(5.0);
  };

  const copySummaryText = () => {
    const text = `MoneyPath AI Savings Goal Calculation (${country}):
Target Goal: ${formatCurrency(result.targetAmount, country)}
Required Monthly Deposit: ${formatCurrency(result.requiredMonthlyContribution, country)}
Timeframe to Goal: ${formatDuration(result.timeToGoalMonths)}
Total Personal Deposits: ${formatCurrency(result.totalUserContributions, country)}
Estimated Interest Growth: ${formatCurrency(result.estimatedGrowthInterest, country)} (${annualInterestRate}% APR)
Calculated at https://moneypath.ai/tools/savings-goal-calculator`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <CalculatorLayout
      title="Savings Goal Calculator"
      subtitle="Calculate how much you need to save each month or how long it will take to reach your target goal."
      breadcrumbs={[
        { label: 'Calculators', href: '/#calculators' },
        { label: 'Savings Goal Calculator' },
      ]}
      inputsPanel={
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-lg font-bold text-slate-900">Savings Target Inputs</h2>
            <button
              onClick={loadExample}
              className="text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1 rounded-lg transition-colors"
            >
              Load Example
            </button>
          </div>

          {/* Mode Switcher */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
              Calculation Mode
            </label>
            <div className="grid grid-cols-2 gap-2 bg-slate-100 p-1 rounded-xl border border-slate-200">
              <button
                onClick={() => setMode('MODE_A')}
                className={`py-2 px-3 text-xs font-bold rounded-lg transition-all text-center ${
                  mode === 'MODE_A'
                    ? 'bg-white text-slate-900 shadow-sm border border-slate-200'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Monthly Deposit Required
              </button>
              <button
                onClick={() => setMode('MODE_B')}
                className={`py-2 px-3 text-xs font-bold rounded-lg transition-all text-center ${
                  mode === 'MODE_B'
                    ? 'bg-white text-slate-900 shadow-sm border border-slate-200'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Time to Reach Target
              </button>
            </div>
          </div>

          <CurrencyInput
            id="target_amount"
            label="Target Savings Goal Amount"
            value={targetAmount}
            onChange={setTargetAmount}
          />

          <CurrencyInput
            id="current_savings"
            label="Current Savings Already Saved"
            value={currentSavings}
            onChange={setCurrentSavings}
          />

          {mode === 'MODE_A' ? (
            <div className="w-full space-y-1.5">
              <label htmlFor="timeframe" className="block text-sm font-semibold text-slate-700">
                Target Timeframe (Months)
              </label>
              <input
                type="number"
                id="timeframe"
                value={goalTimeframeMonths}
                onChange={(e) => setGoalTimeframeMonths(Math.max(1, parseInt(e.target.value) || 1))}
                min={1}
                max={360}
                className="block w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-base text-slate-900 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
              />
              <p className="text-xs text-slate-500">
                Equals approx. {(goalTimeframeMonths / 12).toFixed(1)} years.
              </p>
            </div>
          ) : (
            <CurrencyInput
              id="monthly_contribution"
              label="Fixed Monthly Contribution"
              value={monthlyContribution}
              onChange={setMonthlyContribution}
            />
          )}

          <PercentageInput
            id="interest_rate"
            label="Expected Annual Interest Rate / Return"
            value={annualInterestRate}
            onChange={setAnnualInterestRate}
            helpText="0% for uninvested cash or high-yield rate (e.g., 4.5% - 5%)."
          />
        </div>
      }
      resultsPanel={
        <div className="space-y-6">
          {/* Key Metric Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ResultCard
              label={mode === 'MODE_A' ? 'Required Monthly Deposit' : 'Estimated Time to Goal'}
              value={
                mode === 'MODE_A'
                  ? formatCurrency(result.requiredMonthlyContribution, country)
                  : formatDuration(result.timeToGoalMonths)
              }
              subtext={
                mode === 'MODE_A'
                  ? `To reach ${formatCurrency(result.targetAmount, country)} in ${formatDuration(result.timeToGoalMonths)}`
                  : `With ${formatCurrency(result.requiredMonthlyContribution, country)} monthly deposit`
              }
              variant="primary"
              icon={<Target className="w-5 h-5 text-emerald-300" />}
            />

            <ResultCard
              label="Projected Ending Value"
              value={formatCurrency(result.projectedEndingValue, country)}
              subtext={`Target: ${formatCurrency(result.targetAmount, country)}`}
              variant="secondary"
              icon={<PiggyBank className="w-5 h-5 text-slate-300" />}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ResultCard
              label="Your Personal Contributions"
              value={formatCurrency(result.totalUserContributions, country)}
              subtext="Total principal saved out-of-pocket"
              variant="accent"
            />
            <ResultCard
              label="Estimated Interest Growth"
              value={formatCurrency(result.estimatedGrowthInterest, country)}
              subtext={`At ${annualInterestRate}% compounded monthly`}
              variant="neutral"
              icon={<TrendingUp className="w-5 h-5 text-emerald-600" />}
            />
          </div>

          {/* Action Row */}
          <div className="flex justify-end gap-3 no-print">
            <button
              onClick={copySummaryText}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy Summary'}</span>
            </button>
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Results</span>
            </button>
          </div>

          {/* Chart */}
          <ProjectionChart type="savings" savingsData={chartData} />

          {/* AI Explanation */}
          <AIExplanationBox
            calculatorType="savings-goal"
            data={{
              targetAmount: result.targetAmount,
              currentSavings: result.currentSavings,
              mode: result.mode,
              monthlyContribution: result.requiredMonthlyContribution,
              timeToGoalMonths: result.timeToGoalMonths,
              totalContributions: result.totalUserContributions,
              estimatedGrowth: result.estimatedGrowthInterest,
              annualInterestRate,
            }}
          />

          <DisclaimerBox />
        </div>
      }
      methodologyNotice={
        <div className="p-6 bg-white rounded-2xl border border-slate-200 text-xs text-slate-600 space-y-2">
          <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
            <Info className="w-4 h-4 text-emerald-600" />
            <span>Hypothetical Calculation Notice</span>
          </div>
          <p>
            Savings growth assumes interest compounds at the end of each monthly period. Rates of return are hypothetical estimates and do not guarantee future earnings or protect against market risks.
          </p>
          <Link href="/methodology" className="inline-block text-emerald-700 font-semibold hover:underline">
            Read savings compound interest methodology →
          </Link>
        </div>
      }
    />
  );
}
