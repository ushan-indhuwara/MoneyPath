import { NextRequest, NextResponse } from 'next/server';
import { generateFinancialExplanation } from '@/lib/ai/explanation';
import { AIExplanationRequest } from '@/types/financial';

export async function GET() {
  return NextResponse.json({ enabled: process.env.AI_ENABLED === 'true' && Boolean(process.env.OPENAI_API_KEY) });
}

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    if (new TextEncoder().encode(rawBody).byteLength > 16_384) {
      return NextResponse.json({ explanation: null, error: 'Request is too large.' }, { status: 413 });
    }
    let body: unknown;
    try {
      body = JSON.parse(rawBody);
    } catch {
      return NextResponse.json({ explanation: null, error: 'Request body must be valid JSON.' }, { status: 400 });
    }

    if (!isValidRequest(body)) {
      return NextResponse.json(
        { explanation: null, error: 'Invalid request parameters.', timestamp: new Date().toISOString() },
        { status: 400 }
      );
    }

    const result = await generateFinancialExplanation(body);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      {
        explanation: null,
        error: 'Your calculation is complete, but the optional AI explanation is currently unavailable.',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}

function isValidRequest(value: unknown): value is AIExplanationRequest {
  if (!value || typeof value !== 'object') return false;
  const request = value as Record<string, unknown>;
  if (!['debt-payoff', 'savings-goal', 'retirement-growth'].includes(String(request.calculatorType))) return false;
  if (request.country !== 'US' && request.country !== 'UK') return false;
  if (!request.data || typeof request.data !== 'object' || Array.isArray(request.data)) return false;

  const data = request.data as Record<string, unknown>;
  const allowedKeys: Record<string, string[]> = {
    'debt-payoff': ['snowballMonths', 'snowballDate', 'snowballInterest', 'avalancheMonths', 'avalancheDate', 'avalancheInterest', 'interestSaved', 'monthsSaved'],
    'savings-goal': ['targetAmount', 'currentSavings', 'mode', 'monthlyContribution', 'timeToGoalMonths', 'totalContributions', 'estimatedGrowth', 'annualInterestRate'],
    'retirement-growth': ['currentAge', 'targetRetirementAge', 'yearsToRetirement', 'baseRate', 'baseBalance', 'conservativeRate', 'conservativeBalance', 'optimisticRate', 'optimisticBalance', 'totalContributions'],
  };
  const allowed = allowedKeys[String(request.calculatorType)];
  return allowed.every((key) => key in data) && Object.entries(data).every(([key, item]) => {
    if (!allowed.includes(key)) return false;
    if (key === 'mode') return item === 'MODE_A' || item === 'MODE_B';
    if (key.endsWith('Date')) return typeof item === 'string' && item.length <= 32;
    return typeof item === 'number' && Number.isFinite(item) && Math.abs(item) <= 1_000_000_000_000;
  });
}
