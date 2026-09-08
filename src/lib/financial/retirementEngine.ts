import {
  RetirementInputs,
  RetirementResult,
  RetirementScenarioOutcome,
  RetirementMilestoneYear,
} from '@/types/financial';

export function calculateRetirementScenario(
  inputs: RetirementInputs,
  growthRate: number,
  scenarioName: 'Conservative' | 'Base' | 'Optimistic'
): RetirementScenarioOutcome {
  const currentAge = Math.max(18, inputs.currentAge);
  const targetAge = Math.max(currentAge + 1, inputs.targetRetirementAge);
  const years = targetAge - currentAge;

  const effectiveGrowthRate = Math.max(0, growthRate);
  const monthlyRate = effectiveGrowthRate / 100 / 12;
  const annualEscalation = Math.max(0, inputs.annualContributionIncreasePercent) / 100;

  let currentBalance = Math.max(0, inputs.currentSavings);
  let totalContributions = Math.max(0, inputs.currentSavings);
  let currentMonthlyPMT = Math.max(0, inputs.monthlyContribution);

  const milestones: RetirementMilestoneYear[] = [
    {
      age: currentAge,
      yearIndex: 0,
      totalContributions: Math.round(totalContributions * 100) / 100,
      totalGrowth: 0,
      endingBalance: Math.round(currentBalance * 100) / 100,
    },
  ];

  for (let year = 1; year <= years; year++) {
    for (let month = 1; month <= 12; month++) {
      const interest = currentBalance * monthlyRate;
      currentBalance += interest + currentMonthlyPMT;
      totalContributions += currentMonthlyPMT;
    }

    milestones.push({
      age: currentAge + year,
      yearIndex: year,
      totalContributions: Math.round(totalContributions * 100) / 100,
      totalGrowth: Math.round(Math.max(0, currentBalance - totalContributions) * 100) / 100,
      endingBalance: Math.round(currentBalance * 100) / 100,
    });

    // Escalate monthly payment at year end
    currentMonthlyPMT = currentMonthlyPMT * (1 + annualEscalation);
  }

  const finalBalance = Math.round(currentBalance * 100) / 100;
  const finalContrib = Math.round(totalContributions * 100) / 100;
  const finalGrowth = Math.round(Math.max(0, finalBalance - finalContrib) * 100) / 100;

  return {
    scenarioName,
    growthRate: effectiveGrowthRate,
    projectedBalance: finalBalance,
    totalContributions: finalContrib,
    totalGrowth: finalGrowth,
    milestones,
  };
}

export function calculateRetirement(inputs: RetirementInputs): RetirementResult {
  const baseRate = Math.max(0, Math.min(20, inputs.annualGrowthRate));
  const conservativeRate = Math.max(0, baseRate - 2);
  const optimisticRate = baseRate + 2;

  const currentAge = Math.max(18, inputs.currentAge);
  const targetAge = Math.max(currentAge + 1, inputs.targetRetirementAge);

  const baseScenario = calculateRetirementScenario(inputs, baseRate, 'Base');
  const conservativeScenario = calculateRetirementScenario(inputs, conservativeRate, 'Conservative');
  const optimisticScenario = calculateRetirementScenario(inputs, optimisticRate, 'Optimistic');

  return {
    currentAge,
    targetRetirementAge: targetAge,
    yearsToRetirement: targetAge - currentAge,
    baseScenario,
    conservativeScenario,
    optimisticScenario,
  };
}
