import { AIExplanationRequest, AIExplanationResponse } from '@/types/financial';

export async function generateFinancialExplanation(
  req: AIExplanationRequest
): Promise<AIExplanationResponse> {
  const aiEnabled = process.env.AI_ENABLED !== 'false'; // Enabled by default or via fallback
  const apiKey = process.env.OPENAI_API_KEY || process.env.GEMINI_API_KEY;

  const timestamp = new Date().toISOString();

  // If live API key is present, attempt live LLM request
  if (apiKey) {
    try {
      const prompt = buildGuardrailedPrompt(req);
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content: `You are an educational financial AI assistant for MoneyPath AI. 
Your sole task is to explain PRE-CALCULATED financial scenario results in clear, plain language.

STRICT MANDATES:
1. You are NOT a bank, financial adviser, or investment adviser.
2. NEVER provide regulated financial advice or recommend specific stocks, funds, banks, or loans.
3. NEVER tell the user what they "should" do or claim guaranteed savings/returns.
4. Frame all explanations conditionally: use phrases like "Under the assumptions entered...", "The calculation estimates...", "One perspective to consider...".
5. Focus exclusively on trade-offs, mathematical mechanics (e.g. APR impact, compound interest effect), and assumptions.
6. Keep response concise (max 3 short paragraphs).`,
            },
            {
              role: 'user',
              content: prompt,
            },
          ],
          temperature: 0.3,
          max_tokens: 450,
        }),
      });

      if (response.ok) {
        const json = await response.json();
        const text = json.choices?.[0]?.message?.content || null;
        if (text) {
          return { explanation: text, error: null, timestamp };
        }
      }
    } catch (err) {
      // Fallback to guardrailed engine if API fails
    }
  }

  // Smart Educational Explanation Engine (Fallback when no API key configured)
  const explanation = buildSmartEducationalExplanation(req);
  return {
    explanation,
    error: null,
    timestamp,
  };
}

function buildSmartEducationalExplanation(req: AIExplanationRequest): string {
  const { calculatorType, country, data } = req;
  const curr = country === 'UK' ? '£' : '$';

  if (calculatorType === 'debt-payoff') {
    const interestSavedStr = data.interestSaved > 0 ? `${curr}${Number(data.interestSaved).toLocaleString('en-US')}` : `${curr}0`;
    const monthsSavedStr = data.monthsSaved > 0 ? `${data.monthsSaved} months` : '0 months';
    const avalancheDate = data.avalancheDate || 'the estimated target date';
    const snowballDate = data.snowballDate || 'the estimated target date';

    return `Under the assumptions entered, the Debt Avalanche strategy is calculated to achieve full debt freedom by ${avalancheDate}, saving an estimated ${interestSavedStr} in total interest compared to the Debt Snowball strategy. By prioritizing your account carrying the highest APR first, your payments eliminate interest accumulation at the fastest possible mathematical rate.

Conversely, the Debt Snowball strategy achieves debt freedom by ${snowballDate}. The Snowball method prioritizes clearing smaller balances first regardless of interest rates. While it incurs slightly higher total interest overall, clearing individual debt accounts early can provide valuable psychological momentum and simplify your monthly budgeting.

Both strategy models assume your entered monthly payments remain consistent over time. Consider whether maximum interest savings (Avalanche) or rapid account elimination wins (Snowball) best matches your personal financial habits.`;
  }

  if (calculatorType === 'savings-goal') {
    const targetStr = `${curr}${Number(data.targetAmount || 0).toLocaleString('en-US')}`;
    const monthlyStr = `${curr}${Number(data.monthlyContribution || 0).toLocaleString('en-US')}`;
    const growthStr = `${curr}${Number(data.estimatedGrowth || 0).toLocaleString('en-US')}`;
    const months = data.timeToGoalMonths || 12;

    return `Under the assumptions entered, reaching your target savings goal of ${targetStr} in ${months} months requires a monthly deposit of approximately ${monthlyStr} at an assumed annual return of ${data.annualInterestRate}%.

Compound interest is projected to contribute ${growthStr} toward your total ending balance. Earning compound interest reduces the net out-of-pocket funds you must contribute personally to reach your target.

These calculations assume consistent monthly deposits and predictable interest compounding. Real-world savings growth may vary depending on interest rate adjustments, account fees, and inflation.`;
  }

  if (calculatorType === 'retirement-growth') {
    const baseBal = `${curr}${Number(data.baseBalance || 0).toLocaleString('en-US')}`;
    const consBal = `${curr}${Number(data.conservativeBalance || 0).toLocaleString('en-US')}`;
    const optBal = `${curr}${Number(data.optimisticBalance || 0).toLocaleString('en-US')}`;

    return `Under the assumptions entered, your projected retirement wealth at age ${data.targetRetirementAge} ranges from ${consBal} in the Conservative scenario (${data.conservativeRate}% return) to ${optBal} in the Optimistic scenario (${data.optimisticRate}% return), with your Base scenario estimating ${baseBal}.

Long-term compound investment growth represents the majority of your projected balance over this ${data.yearsToRetirement}-year accumulation horizon, demonstrating the power of staying invested early.

Because investment markets experience natural annual fluctuations, these three scenarios provide a realistic risk spectrum for planning rather than guaranteed returns. Reviewing your trajectory periodically can help you adjust contributions as your career progresses.`;
  }

  return 'Under the assumptions entered, this calculation models your financial trajectory based on standard deterministic compounding rules.';
}

function buildGuardrailedPrompt(req: AIExplanationRequest): string {
  const { calculatorType, country, data } = req;
  const currencySymbol = country === 'UK' ? '£' : '$';

  if (calculatorType === 'debt-payoff') {
    return `Calculated Debt Payoff Scenario (${country}):
Avalanche Strategy: Payoff in ${data.avalancheMonths} months (${data.avalancheDate}), Total Interest: ${currencySymbol}${data.avalancheInterest}.
Snowball Strategy: Payoff in ${data.snowballMonths} months (${data.snowballDate}), Total Interest: ${currencySymbol}${data.snowballInterest}.
Estimated Interest Saved with Avalanche: ${currencySymbol}${data.interestSaved}.
Time Saved: ${data.monthsSaved} months.

Explain the key trade-offs between Snowball (psychological momentum) and Avalanche (mathematical interest savings) for this calculated output.`;
  }

  if (calculatorType === 'savings-goal') {
    return `Calculated Savings Goal Scenario (${country}):
Target: ${currencySymbol}${data.targetAmount}, Current: ${currencySymbol}${data.currentSavings}.
Mode: ${data.mode === 'MODE_A' ? 'Required Monthly Contribution' : 'Time to Goal'}.
Calculated Monthly Deposit: ${currencySymbol}${data.monthlyContribution}.
Calculated Time to Goal: ${data.timeToGoalMonths} months.
Total Personal Deposits: ${currencySymbol}${data.totalContributions}.
Estimated Growth / Interest: ${currencySymbol}${data.estimatedGrowth}.
Annual Interest Rate: ${data.annualInterestRate}%.

Explain what this outcome means, the effect of compound interest, and key assumptions.`;
  }

  if (calculatorType === 'retirement-growth') {
    return `Calculated Retirement Scenario (${country}):
Current Age: ${data.currentAge}, Target Age: ${data.targetRetirementAge} (${data.yearsToRetirement} years).
Base Growth Rate (${data.baseRate}%): Projected Balance ${currencySymbol}${data.baseBalance}.
Conservative Rate (${data.conservativeRate}%): Projected Balance ${currencySymbol}${data.conservativeBalance}.
Optimistic Rate (${data.optimisticRate}%): Projected Balance ${currencySymbol}${data.optimisticBalance}.
Total Personal Contributions: ${currencySymbol}${data.totalContributions}.

Explain how growth rate variability impacts long-term wealth accumulation and why projections are estimates rather than guarantees.`;
  }

  return 'Explain the calculated financial scenario results in plain language.';
}
