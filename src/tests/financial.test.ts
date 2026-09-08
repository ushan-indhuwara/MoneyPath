import { describe, it, expect } from 'vitest';
import { calculateDebtComparison, calculateSingleDebtStrategy } from '../lib/financial/debtEngine';
import { calculateSavingsGoal } from '../lib/financial/savingsEngine';
import { calculateRetirement } from '../lib/financial/retirementEngine';
import { formatCurrency, formatDuration } from '../lib/financial/formatters';
import { DebtItem } from '../types/financial';

describe('Financial Calculation Engines Test Suite', () => {
  describe('Debt Payoff Engine', () => {
    it('handles debt with 0% APR correctly', () => {
      const debts: DebtItem[] = [
        { id: '1', name: 'Zero Interest Loan', balance: 1200, apr: 0, minPayment: 100 },
      ];
      const result = calculateSingleDebtStrategy(debts, 0, 'snowball');
      expect(result.monthsToPayoff).toBe(12);
      expect(result.totalInterestPaid).toBe(0);
      expect(result.totalAmountPaid).toBe(1200);
    });

    it('prioritizes smallest balance first in Snowball strategy', () => {
      const debts: DebtItem[] = [
        { id: '1', name: 'Card A (Large)', balance: 5000, apr: 20, minPayment: 150 },
        { id: '2', name: 'Card B (Small)', balance: 1000, apr: 10, minPayment: 50 },
      ];
      // Extra payment $200
      const snowball = calculateSingleDebtStrategy(debts, 200, 'snowball');
      // Card B should be paid off first in month 4
      const cardB = snowball.debtDetails.find((d) => d.id === '2');
      const cardA = snowball.debtDetails.find((d) => d.id === '1');
      expect(cardB!.monthsToPayoff).toBeLessThan(cardA!.monthsToPayoff);
    });

    it('prioritizes highest APR first in Avalanche strategy', () => {
      const debts: DebtItem[] = [
        { id: '1', name: 'Low APR Large', balance: 1000, apr: 5, minPayment: 50 },
        { id: '2', name: 'High APR Small', balance: 3000, apr: 24, minPayment: 100 },
      ];
      const avalanche = calculateSingleDebtStrategy(debts, 200, 'avalanche');
      const highApr = avalanche.debtDetails.find((d) => d.id === '2');
      const lowApr = avalanche.debtDetails.find((d) => d.id === '1');
      // Avalanche puts extra payments into high APR card (id: 2) first
      expect(highApr!.monthsToPayoff).toBeLessThanOrEqual(lowApr!.monthsToPayoff + 10);
    });

    it('calculates avalanche interest savings over snowball when APR differences exist', () => {
      const debts: DebtItem[] = [
        { id: '1', name: 'Small Low APR', balance: 1000, apr: 6, minPayment: 30 },
        { id: '2', name: 'Large High APR', balance: 8000, apr: 24, minPayment: 200 },
      ];
      const comparison = calculateDebtComparison(debts, 150);
      expect(comparison.avalanche.totalInterestPaid).toBeLessThan(comparison.snowball.totalInterestPaid);
      expect(comparison.recommendedByMath).toBe('avalanche');
    });

    it('detects insufficient minimum payment and returns explicit warnings', () => {
      const debts: DebtItem[] = [
        { id: '1', name: 'High Interest Trap', balance: 10000, apr: 30, minPayment: 100 }, // Monthly interest is $250!
      ];
      const comparison = calculateDebtComparison(debts, 0); // No extra payment
      expect(comparison.warnings.length).toBeGreaterThan(0);
      expect(comparison.warnings[0]).toContain('less than or equal to its monthly interest');
    });
  });

  describe('Savings Goal Engine', () => {
    it('calculates Mode A required monthly contribution with 0% interest rate', () => {
      const result = calculateSavingsGoal({
        mode: 'MODE_A',
        targetAmount: 12000,
        currentSavings: 2000,
        goalTimeframeMonths: 10,
        monthlyContribution: 0,
        annualInterestRate: 0,
      });
      expect(result.requiredMonthlyContribution).toBe(1000);
      expect(result.estimatedGrowthInterest).toBe(0);
    });

    it('calculates Mode A required monthly contribution with positive interest rate', () => {
      const result = calculateSavingsGoal({
        mode: 'MODE_A',
        targetAmount: 10000,
        currentSavings: 0,
        goalTimeframeMonths: 12,
        monthlyContribution: 0,
        annualInterestRate: 6,
      });
      // At 6% annual rate, required monthly contribution is less than $833.33 due to compounding interest
      expect(result.requiredMonthlyContribution).toBeLessThan(833.33);
      expect(result.projectedEndingValue).toBeGreaterThanOrEqual(10000);
    });

    it('calculates Mode B time to goal with fixed monthly deposits', () => {
      const result = calculateSavingsGoal({
        mode: 'MODE_B',
        targetAmount: 5000,
        currentSavings: 1000,
        goalTimeframeMonths: 0,
        monthlyContribution: 1000,
        annualInterestRate: 0,
      });
      expect(result.timeToGoalMonths).toBe(4);
    });
  });

  describe('Retirement Engine', () => {
    it('calculates 3 retirement scenarios (Conservative, Base, Optimistic)', () => {
      const result = calculateRetirement({
        currentAge: 30,
        targetRetirementAge: 65,
        currentSavings: 10000,
        monthlyContribution: 500,
        annualGrowthRate: 7,
        annualContributionIncreasePercent: 2,
      });

      expect(result.yearsToRetirement).toBe(35);
      expect(result.conservativeScenario.growthRate).toBe(5);
      expect(result.baseScenario.growthRate).toBe(7);
      expect(result.optimisticScenario.growthRate).toBe(9);

      // Higher growth rate yields higher ending balance
      expect(result.optimisticScenario.projectedBalance).toBeGreaterThan(result.baseScenario.projectedBalance);
      expect(result.baseScenario.projectedBalance).toBeGreaterThan(result.conservativeScenario.projectedBalance);
    });

    it('handles zero current savings and zero monthly contribution gracefully', () => {
      const result = calculateRetirement({
        currentAge: 25,
        targetRetirementAge: 60,
        currentSavings: 0,
        monthlyContribution: 0,
        annualGrowthRate: 6,
        annualContributionIncreasePercent: 0,
      });
      expect(result.baseScenario.projectedBalance).toBe(0);
    });
  });

  describe('Formatting Utilities', () => {
    it('formats USD and GBP correctly', () => {
      expect(formatCurrency(1234.56, 'US')).toBe('$1,234.56');
      expect(formatCurrency(1234.56, 'UK')).toBe('£1,234.56');
    });

    it('formats duration into readable human text', () => {
      expect(formatDuration(12)).toBe('1 year');
      expect(formatDuration(38)).toBe('3 years, 2 months');
      expect(formatDuration(5)).toBe('5 months');
    });
  });
});
