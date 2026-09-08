import { SavingsGoalInputs, SavingsGoalResult, SavingsScheduleMonth } from '@/types/financial';

const MAX_SAVINGS_MONTHS = 600;

export function calculateSavingsGoal(inputs: SavingsGoalInputs): SavingsGoalResult {
  const targetAmount = Math.max(0, inputs.targetAmount);
  const currentSavings = Math.max(0, inputs.currentSavings);
  const annualRate = Math.max(0, inputs.annualInterestRate);
  const monthlyRate = annualRate / 100 / 12;

  if (inputs.mode === 'MODE_A') {
    // Mode A: Calculate required monthly contribution
    const timeframeMonths = Math.max(1, inputs.goalTimeframeMonths);
    let requiredPMT = 0;

    if (monthlyRate === 0) {
      requiredPMT = Math.max(0, (targetAmount - currentSavings) / timeframeMonths);
    } else {
      const fvCurrentSavings = currentSavings * Math.pow(1 + monthlyRate, timeframeMonths);
      const fvNeeded = targetAmount - fvCurrentSavings;
      if (fvNeeded <= 0) {
        requiredPMT = 0;
      } else {
        const factor = (Math.pow(1 + monthlyRate, timeframeMonths) - 1) / monthlyRate;
        requiredPMT = fvNeeded / factor;
      }
    }

    // Build Schedule
    const schedule: SavingsScheduleMonth[] = [];
    let balance = currentSavings;
    let totalContrib = currentSavings;
    let totalInterest = 0;

    for (let m = 1; m <= timeframeMonths; m++) {
      const startBal = balance;
      const interest = startBal * monthlyRate;
      balance = startBal + interest + requiredPMT;
      totalContrib += requiredPMT;
      totalInterest += interest;

      schedule.push({
        month: m,
        startingBalance: Math.round(startBal * 100) / 100,
        contribution: Math.round(requiredPMT * 100) / 100,
        interestEarned: Math.round(interest * 100) / 100,
        endingBalance: Math.round(balance * 100) / 100,
        totalContributions: Math.round(totalContrib * 100) / 100,
        totalInterest: Math.round(totalInterest * 100) / 100,
      });
    }

    return {
      mode: 'MODE_A',
      targetAmount,
      currentSavings,
      requiredMonthlyContribution: Math.round(requiredPMT * 100) / 100,
      projectedEndingValue: Math.round(balance * 100) / 100,
      totalUserContributions: Math.round(totalContrib * 100) / 100,
      estimatedGrowthInterest: Math.round(totalInterest * 100) / 100,
      timeToGoalMonths: timeframeMonths,
      schedule,
    };
  } else {
    // Mode B: Calculate time to reach target balance given fixed monthly contribution
    const monthlyPMT = Math.max(0, inputs.monthlyContribution);
    const schedule: SavingsScheduleMonth[] = [];

    let balance = currentSavings;
    let totalContrib = currentSavings;
    let totalInterest = 0;
    let months = 0;

    while (balance < targetAmount && months < MAX_SAVINGS_MONTHS) {
      months++;
      const startBal = balance;
      const interest = startBal * monthlyRate;
      balance = startBal + interest + monthlyPMT;
      totalContrib += monthlyPMT;
      totalInterest += interest;

      schedule.push({
        month: months,
        startingBalance: Math.round(startBal * 100) / 100,
        contribution: Math.round(monthlyPMT * 100) / 100,
        interestEarned: Math.round(interest * 100) / 100,
        endingBalance: Math.round(balance * 100) / 100,
        totalContributions: Math.round(totalContrib * 100) / 100,
        totalInterest: Math.round(totalInterest * 100) / 100,
      });

      // Break if zero monthly contribution & zero rate with balance strictly below target
      if (monthlyPMT === 0 && monthlyRate === 0 && balance < targetAmount) {
        break;
      }
    }

    return {
      mode: 'MODE_B',
      targetAmount,
      currentSavings,
      requiredMonthlyContribution: monthlyPMT,
      projectedEndingValue: Math.round(balance * 100) / 100,
      totalUserContributions: Math.round(totalContrib * 100) / 100,
      estimatedGrowthInterest: Math.round(totalInterest * 100) / 100,
      timeToGoalMonths: months,
      schedule,
    };
  }
}
