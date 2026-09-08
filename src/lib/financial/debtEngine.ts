import {
  DebtItem,
  DebtStrategyResult,
  DebtComparisonResult,
  DebtPayoffScheduleMonth,
  SingleDebtPayoffDetail,
} from '@/types/financial';
import { getFutureDateString, toCents, fromCents } from './formatters';

const MAX_PAYOFF_MONTHS = 600; // 50 years safety limit

/**
 * Validates debt inputs and checks for insufficient minimum payments.
 */
export function validateDebts(debts: DebtItem[], extraMonthlyPayment: number = 0): {
  validDebts: DebtItem[];
  insufficientPaymentDebts: string[];
  warnings: string[];
} {
  const warnings: string[] = [];
  const insufficientPaymentDebts: string[] = [];
  const validDebts: DebtItem[] = [];

  for (const debt of debts) {
    if (debt.balance <= 0) continue; // Skip zero/negative balances
    
    const monthlyRate = (debt.apr / 100) / 12;
    const monthlyInterest = debt.balance * monthlyRate;

    // Check if minimum payment is strictly less than monthly interest
    if (debt.minPayment <= monthlyInterest && extraMonthlyPayment === 0) {
      insufficientPaymentDebts.push(debt.name);
      warnings.push(
        `Warning: Minimum payment for "${debt.name}" ($${debt.minPayment.toFixed(2)}) is less than or equal to its monthly interest ($${monthlyInterest.toFixed(2)}). Balance will not decrease without extra payments.`
      );
    }

    validDebts.push({
      ...debt,
      balance: Math.max(0, debt.balance),
      apr: Math.max(0, debt.apr),
      minPayment: Math.max(0, debt.minPayment),
    });
  }

  return { validDebts, insufficientPaymentDebts, warnings };
}

/**
 * Simulates debt repayment for a specific strategy ('snowball' | 'avalanche').
 */
export function calculateSingleDebtStrategy(
  debts: DebtItem[],
  extraMonthlyPayment: number,
  strategy: 'snowball' | 'avalanche'
): DebtStrategyResult {
  const { validDebts, insufficientPaymentDebts } = validateDebts(debts, extraMonthlyPayment);

  if (validDebts.length === 0) {
    return {
      strategy,
      monthsToPayoff: 0,
      payoffDate: getFutureDateString(0),
      totalInterestPaid: 0,
      totalAmountPaid: 0,
      schedule: [],
      debtDetails: [],
      insufficientPaymentDebts: [],
    };
  }

  // Clone working state of active debts
  let activeDebts = validDebts.map((d) => ({
    id: d.id,
    name: d.name,
    balanceCents: toCents(d.balance),
    initialBalanceCents: toCents(d.balance),
    apr: d.apr,
    minPaymentCents: toCents(d.minPayment),
    totalInterestCents: 0,
    totalPaidCents: 0,
    monthsToPayoff: 0,
  }));

  const schedule: DebtPayoffScheduleMonth[] = [];
  let currentMonth = 0;
  let accumulatedExtraCents = toCents(Math.max(0, extraMonthlyPayment));

  while (currentMonth < MAX_PAYOFF_MONTHS) {
    // Check if all debts are paid
    const remainingDebts = activeDebts.filter((d) => d.balanceCents > 0);
    if (remainingDebts.length === 0) break;

    currentMonth++;
    let monthInterestCents = 0;
    let monthPaymentCents = 0;

    // 1. Accrue monthly interest on active debts
    for (const debt of remainingDebts) {
      const monthlyRate = (debt.apr / 100) / 12;
      const interestCents = Math.round(debt.balanceCents * monthlyRate);
      debt.balanceCents += interestCents;
      debt.totalInterestCents += interestCents;
      monthInterestCents += interestCents;
    }

    // 2. Determine payment allocation strategy target order
    const sortedRemaining = [...remainingDebts].sort((a, b) => {
      if (strategy === 'snowball') {
        // Lowest balance first; tiebreaker higher APR
        if (a.balanceCents !== b.balanceCents) return a.balanceCents - b.balanceCents;
        return b.apr - a.apr;
      } else {
        // Highest APR first; tiebreaker lowest balance
        if (a.apr !== b.apr) return b.apr - a.apr;
        return a.balanceCents - b.balanceCents;
      }
    });

    // 3. Pay minimum payments across all active debts first
    let availableExtraThisMonthCents = accumulatedExtraCents;

    for (const debt of remainingDebts) {
      if (debt.balanceCents <= 0) continue;
      
      const minPayment = Math.min(debt.minPaymentCents, debt.balanceCents);
      debt.balanceCents -= minPayment;
      debt.totalPaidCents += minPayment;
      monthPaymentCents += minPayment;

      if (debt.balanceCents === 0 && debt.monthsToPayoff === 0) {
        debt.monthsToPayoff = currentMonth;
      }
    }

    // 4. Apply extra payments (and freed up min payments) to prioritized target debt(s)
    for (const targetDebt of sortedRemaining) {
      if (availableExtraThisMonthCents <= 0) break;

      // Re-fetch current balance of target debt
      const currentTarget = activeDebts.find((d) => d.id === targetDebt.id);
      if (!currentTarget || currentTarget.balanceCents <= 0) continue;

      const extraApplied = Math.min(availableExtraThisMonthCents, currentTarget.balanceCents);
      currentTarget.balanceCents -= extraApplied;
      currentTarget.totalPaidCents += extraApplied;
      monthPaymentCents += extraApplied;
      availableExtraThisMonthCents -= extraApplied;

      if (currentTarget.balanceCents === 0 && currentTarget.monthsToPayoff === 0) {
        currentTarget.monthsToPayoff = currentMonth;
      }
    }

    // Record month snapshot
    const totalRemainingCents = activeDebts.reduce((sum, d) => sum + d.balanceCents, 0);
    const debtBalancesMap: Record<string, number> = {};
    activeDebts.forEach((d) => {
      debtBalancesMap[d.id] = fromCents(d.balanceCents);
    });

    schedule.push({
      month: currentMonth,
      dateStr: getFutureDateString(currentMonth),
      totalPayment: fromCents(monthPaymentCents),
      interestPaid: fromCents(monthInterestCents),
      principalPaid: fromCents(monthPaymentCents - monthInterestCents),
      remainingTotalBalance: fromCents(totalRemainingCents),
      debtBalances: debtBalancesMap,
    });
  }

  // Build individual debt detail list
  const debtDetails: SingleDebtPayoffDetail[] = activeDebts.map((d) => ({
    id: d.id,
    name: d.name,
    initialBalance: fromCents(d.initialBalanceCents),
    apr: d.apr,
    monthsToPayoff: d.monthsToPayoff || currentMonth,
    totalInterestPaid: fromCents(d.totalInterestCents),
    totalAmountPaid: fromCents(d.totalPaidCents),
  }));

  const totalInterestCents = activeDebts.reduce((sum, d) => sum + d.totalInterestCents, 0);
  const totalAmountPaidCents = activeDebts.reduce((sum, d) => sum + d.totalPaidCents, 0);

  return {
    strategy,
    monthsToPayoff: currentMonth,
    payoffDate: getFutureDateString(currentMonth),
    totalInterestPaid: fromCents(totalInterestCents),
    totalAmountPaid: fromCents(totalAmountPaidCents),
    schedule,
    debtDetails,
    insufficientPaymentDebts,
  };
}

/**
 * Main comparative entry point comparing Snowball vs Avalanche.
 */
export function calculateDebtComparison(
  debts: DebtItem[],
  extraMonthlyPayment: number = 0
): DebtComparisonResult {
  const validation = validateDebts(debts, extraMonthlyPayment);
  const snowball = calculateSingleDebtStrategy(debts, extraMonthlyPayment, 'snowball');
  const avalanche = calculateSingleDebtStrategy(debts, extraMonthlyPayment, 'avalanche');

  const interestDifference = snowball.totalInterestPaid - avalanche.totalInterestPaid;
  const monthsDifference = snowball.monthsToPayoff - avalanche.monthsToPayoff;

  let recommendedByMath: 'avalanche' | 'snowball' | 'equal' = 'equal';
  if (interestDifference > 1) {
    recommendedByMath = 'avalanche';
  } else if (interestDifference < -1) {
    recommendedByMath = 'snowball';
  }

  return {
    snowball,
    avalanche,
    interestDifference: Math.max(0, interestDifference),
    monthsDifference,
    recommendedByMath,
    warnings: validation.warnings,
  };
}
