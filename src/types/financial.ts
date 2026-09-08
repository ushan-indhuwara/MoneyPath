export type CountryLocale = 'US' | 'UK';

export interface CurrencySymbol {
  code: 'USD' | 'GBP';
  symbol: '$' | '£';
  label: string;
}

export interface DebtItem {
  id: string;
  name: string;
  balance: number;
  apr: number;
  minPayment: number;
}

export interface DebtPayoffScheduleMonth {
  month: number;
  dateStr: string;
  totalPayment: number;
  interestPaid: number;
  principalPaid: number;
  remainingTotalBalance: number;
  debtBalances: Record<string, number>;
}

export interface SingleDebtPayoffDetail {
  id: string;
  name: string;
  initialBalance: number;
  apr: number;
  monthsToPayoff: number;
  totalInterestPaid: number;
  totalAmountPaid: number;
}

export interface DebtStrategyResult {
  strategy: 'snowball' | 'avalanche';
  monthsToPayoff: number;
  payoffDate: string;
  totalInterestPaid: number;
  totalAmountPaid: number;
  schedule: DebtPayoffScheduleMonth[];
  debtDetails: SingleDebtPayoffDetail[];
  insufficientPaymentDebts: string[];
}

export interface DebtComparisonResult {
  snowball: DebtStrategyResult;
  avalanche: DebtStrategyResult;
  interestDifference: number; // Positive means Avalanche saved this much interest
  monthsDifference: number; // Positive means Avalanche is faster by this many months
  recommendedByMath: 'avalanche' | 'snowball' | 'equal';
  warnings: string[];
}

export type SavingsMode = 'MODE_A' | 'MODE_B'; // MODE_A: calculate monthly deposit; MODE_B: calculate time to target

export interface SavingsGoalInputs {
  mode: SavingsMode;
  targetAmount: number;
  currentSavings: number;
  goalTimeframeMonths: number; // Used in Mode A
  monthlyContribution: number; // Used in Mode B
  annualInterestRate: number; // e.g. 5 for 5%
}

export interface SavingsScheduleMonth {
  month: number;
  startingBalance: number;
  contribution: number;
  interestEarned: number;
  endingBalance: number;
  totalContributions: number;
  totalInterest: number;
}

export interface SavingsGoalResult {
  mode: SavingsMode;
  targetAmount: number;
  currentSavings: number;
  requiredMonthlyContribution: number;
  projectedEndingValue: number;
  totalUserContributions: number;
  estimatedGrowthInterest: number;
  timeToGoalMonths: number;
  schedule: SavingsScheduleMonth[];
}

export interface RetirementInputs {
  currentAge: number;
  targetRetirementAge: number;
  currentSavings: number;
  monthlyContribution: number;
  annualGrowthRate: number; // e.g. 7 for 7%
  annualContributionIncreasePercent: number; // e.g. 2 for 2% annual escalation
}

export interface RetirementMilestoneYear {
  age: number;
  yearIndex: number;
  totalContributions: number;
  totalGrowth: number;
  endingBalance: number;
}

export interface RetirementScenarioOutcome {
  scenarioName: 'Conservative' | 'Base' | 'Optimistic';
  growthRate: number;
  projectedBalance: number;
  totalContributions: number;
  totalGrowth: number;
  milestones: RetirementMilestoneYear[];
}

export interface RetirementResult {
  currentAge: number;
  targetRetirementAge: number;
  yearsToRetirement: number;
  baseScenario: RetirementScenarioOutcome;
  conservativeScenario: RetirementScenarioOutcome;
  optimisticScenario: RetirementScenarioOutcome;
}

export interface AIExplanationRequest {
  calculatorType: 'debt-payoff' | 'savings-goal' | 'retirement-growth';
  country: CountryLocale;
  data: Record<string, any>;
}

export interface AIExplanationResponse {
  explanation: string | null;
  error: string | null;
  timestamp: string;
}
