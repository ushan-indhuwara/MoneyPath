import { NextRequest, NextResponse } from 'next/server';
import { generateFinancialExplanation } from '@/lib/ai/explanation';
import { AIExplanationRequest } from '@/types/financial';

export async function POST(req: NextRequest) {
  try {
    const body: AIExplanationRequest = await req.json();

    if (!body.calculatorType || !body.data) {
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
