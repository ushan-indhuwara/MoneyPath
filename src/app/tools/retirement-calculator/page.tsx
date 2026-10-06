'use client';

import React, { useState, useMemo } from 'react';
import { useCountry } from '@/lib/country/context';
import { RetirementInputs } from '@/types/financial';
import { calculateRetirement } from '@/lib/financial/retirementEngine';
import { formatCurrency } from '@/lib/financial/formatters';
import { CalculatorLayout } from '@/components/ui/CalculatorLayout';
import { CurrencyInput } from '@/components/ui/CurrencyInput';
import { PercentageInput } from '@/components/ui/PercentageInput';
import { ResultCard } from '@/components/ui/ResultCard';
import { ProjectionChart } from '@/components/ui/ProjectionChart';
import { AIExplanationBox } from '@/components/ui/AIExplanationBox';
import { DisclaimerBox } from '@/components/ui/DisclaimerBox';
import { Copy, Check, Printer, RotateCcw, Info, TrendingUp, Calendar, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function RetirementCalculatorPage() {
  const { country, pensionTerm } = useCountry();

  const [currentAge, setCurrentAge] = useState<number>(32);
  const [targetRetirementAge, setTargetRetirementAge] = useState<number>(65);
  const [currentSavings, setCurrentSavings] = useState<number>(25000);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(600);
  const [annualGrowthRate, setAnnualGrowthRate] = useState<number>(7.0);
  const [annualContributionIncreasePercent, setAnnualContributionIncreasePercent] = useState<number>(2.0);
  const [copied, setCopied] = useState<boolean>(false);
  const [selectedScenarioTab, setSelectedScenarioTab] = useState<'base' | 'conservative' | 'optimistic'>('base');

  const result = useMemo(() => {
    return calculateRetirement({
      currentAge,
      targetRetirementAge,
      currentSavings,
      monthlyContribution,
      annualGrowthRate,
      annualContributionIncreasePercent,
    });
  }, [currentAge, targetRetirementAge, currentSavings, monthlyContribution, annualGrowthRate, annualContributionIncreasePercent]);

  const activeOutcome =
    selectedScenarioTab === 'base'
      ? result.baseScenario
      : selectedScenarioTab === 'conservative'
      ? result.conservativeScenario
      : result.optimisticScenario;

  // Format data for chart
  const chartData = useMemo(() => {
    const baseMilestones = result.baseScenario.milestones;
    const consMilestones = result.conservativeScenario.milestones;
    const optMilestones = result.optimisticScenario.milestones;

    return baseMilestones.map((m, idx) => ({
      age: m.age,
      Base: m.endingBalance,
      Conservative: consMilestones[idx]?.endingBalance || 0,
      Optimistic: optMilestones[idx]?.endingBalance || 0,
    }));
  }, [result]);

  const loadExample = () => {
    setCurrentAge(30);
    setTargetRetirementAge(65);
    setCurrentSavings(15000);
    setMonthlyContribution(500);
    setAnnualGrowthRate(7.0);
    setAnnualContributionIncreasePercent(2.0);
  };

  const copySummaryText = () => {
    const text = `MoneyPath AI Retirement Projection (${country}):
Years to Retirement: ${result.yearsToRetirement} years (Retiring at Age ${targetRetirementAge})
Base Growth Scenario (${result.baseScenario.growthRate}%): ${formatCurrency(result.baseScenario.projectedBalance, country)}
Conservative Scenario (${result.conservativeScenario.growthRate}%): ${formatCurrency(result.conservativeScenario.projectedBalance, country)}
Optimistic Scenario (${result.optimisticScenario.growthRate}%): ${formatCurrency(result.optimisticScenario.projectedBalance, country)}
Total Personal Contributions: ${formatCurrency(result.baseScenario.totalContributions, country)}
Calculated at https://moneypath.ai/tools/retirement-calculator`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <CalculatorLayout
      title="Retirement Growth Estimator"
      subtitle={`Estimate your hypothetical long-term wealth accumulation across 3 growth scenarios for your ${pensionTerm}.`}
      breadcrumbs={[
        { label: 'Calculators', href: '/#calculators' },
        { label: 'Retirement Growth Estimator' },
      ]}
      inputsPanel={
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-lg font-bold text-slate-900">Retirement Profile</h2>
            <button
              onClick={loadExample}
              className="text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1 rounded-lg transition-colors"
            >
              Load Preset
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label htmlFor="current_age" className="block text-sm font-semibold text-slate-700">
                Current Age
              </label>
              <input
                type="number"
                id="current_age"
                value={currentAge}
                onChange={(e) => setCurrentAge(Math.max(18, parseInt(e.target.value) || 18))}
                min={18}
                max={90}
                className="block w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-base text-slate-900 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="target_age" className="block text-sm font-semibold text-slate-700">
                Retirement Age
              </label>
              <input
                type="number"
                id="target_age"
                value={targetRetirementAge}
                onChange={(e) => setTargetRetirementAge(Math.max(currentAge + 1, parseInt(e.target.value) || currentAge + 1))}
                min={currentAge + 1}
                max={100}
                className="block w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-base text-slate-900 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
              />
            </div>
          </div>

          <CurrencyInput
            id="current_retirement_savings"
            label={`Current ${pensionTerm} Balance`}
            value={currentSavings}
            onChange={setCurrentSavings}
          />

          <CurrencyInput
            id="monthly_contrib"
            label="Monthly Contribution"
            value={monthlyContribution}
            onChange={setMonthlyContribution}
          />

          <PercentageInput
            id="growth_rate"
            label="Assumed Annual Investment Return"
            value={annualGrowthRate}
            onChange={setAnnualGrowthRate}
            helpText="Historical broad market baseline e.g. 6% - 8%."
          />

          <PercentageInput
            id="annual_escalation"
            label="Annual Contribution Increase Rate"
            value={annualContributionIncreasePercent}
            onChange={setAnnualContributionIncreasePercent}
            helpText="Annual % escalation in monthly contribution as salary grows."
          />
        </div>
      }
      resultsPanel={
        <div className="space-y-6">
          {/* Key Metric Highlight */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ResultCard
              label={`Projected Balance at Age ${targetRetirementAge}`}
              value={formatCurrency(result.baseScenario.projectedBalance, country)}
              subtext={`Based on ${result.yearsToRetirement} years of accumulation at ${result.baseScenario.growthRate}% rate`}
              variant="primary"
              icon={<TrendingUp className="w-5 h-5 text-emerald-300" />}
            />
            <ResultCard
              label="Accumulation Time Horizon"
              value={`${result.yearsToRetirement} Years`}
              subtext={`From Age ${currentAge} to Age ${targetRetirementAge}`}
              variant="secondary"
              icon={<Calendar className="w-5 h-5 text-slate-300" />}
            />
          </div>

          {/* 3 Scenarios Comparison Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div
              onClick={() => setSelectedScenarioTab('conservative')}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${
                selectedScenarioTab === 'conservative'
                  ? 'border-amber-500 bg-amber-50/50 shadow-sm ring-1 ring-amber-500'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <p className="text-[11px] font-bold uppercase tracking-wider text-amber-800">
                Conservative (-2%)
              </p>
              <p className="text-xl font-bold text-slate-900 mt-1">
                {formatCurrency(result.conservativeScenario.projectedBalance, country, true)}
              </p>
              <p className="text-xs text-slate-500 mt-0.5">{result.conservativeScenario.growthRate}% annual return</p>
            </div>

            <div
              onClick={() => setSelectedScenarioTab('base')}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${
                selectedScenarioTab === 'base'
                  ? 'border-emerald-600 bg-emerald-50/50 shadow-sm ring-1 ring-emerald-600'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">
                Base Scenario
              </p>
              <p className="text-xl font-bold text-slate-900 mt-1">
                {formatCurrency(result.baseScenario.projectedBalance, country, true)}
              </p>
              <p className="text-xs text-slate-500 mt-0.5">{result.baseScenario.growthRate}% annual return</p>
            </div>

            <div
              onClick={() => setSelectedScenarioTab('optimistic')}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${
                selectedScenarioTab === 'optimistic'
                  ? 'border-teal-500 bg-teal-50/50 shadow-sm ring-1 ring-teal-500'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <p className="text-[11px] font-bold uppercase tracking-wider text-teal-800">
                Optimistic (+2%)
              </p>
              <p className="text-xl font-bold text-slate-900 mt-1">
                {formatCurrency(result.optimisticScenario.projectedBalance, country, true)}
              </p>
              <p className="text-xs text-slate-500 mt-0.5">{result.optimisticScenario.growthRate}% annual return</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ResultCard
              label="Total Personal Contributions"
              value={formatCurrency(activeOutcome.totalContributions, country)}
              subtext="Principal invested over time"
              variant="neutral"
            />
            <ResultCard
              label="Estimated Investment Growth"
              value={formatCurrency(activeOutcome.totalGrowth, country)}
              subtext="Hypothetical compound earnings"
              variant="accent"
            />
          </div>

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
          <ProjectionChart type="retirement" retirementData={chartData} />

          {/* AI Explanation */}
          <AIExplanationBox
            calculatorType="retirement-growth"
            data={{
              currentAge,
              targetRetirementAge,
              yearsToRetirement: result.yearsToRetirement,
              baseRate: result.baseScenario.growthRate,
              baseBalance: result.baseScenario.projectedBalance,
              conservativeRate: result.conservativeScenario.growthRate,
              conservativeBalance: result.conservativeScenario.projectedBalance,
              optimisticRate: result.optimisticScenario.growthRate,
              optimisticBalance: result.optimisticScenario.projectedBalance,
              totalContributions: activeOutcome.totalContributions,
            }}
          />

          <DisclaimerBox />
        </div>
      }
      methodologyNotice={
        <div className="p-6 bg-white rounded-2xl border border-slate-200 text-xs text-slate-600 space-y-2">
          <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
            <Info className="w-4 h-4 text-emerald-600" />
            <span>Retirement Projection Methodology</span>
          </div>
          <p>
            Projections compound monthly earnings on total balance. Contributions escalate at the end of each 12-month period according to the entered annual increase rate.
          </p>
          <Link href="/methodology" className="inline-block text-emerald-700 font-semibold hover:underline">
            Read full retirement calculation methodology →
          </Link>
        </div>
      }
    />
  );
}
