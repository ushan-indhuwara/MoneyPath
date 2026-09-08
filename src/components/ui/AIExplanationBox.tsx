'use client';

import React, { useState } from 'react';
import { useCountry } from '@/lib/country/context';
import { Sparkles, AlertCircle, RefreshCw } from 'lucide-react';

interface AIExplanationBoxProps {
  calculatorType: 'debt-payoff' | 'savings-goal' | 'retirement-growth';
  data: Record<string, any>;
}

export function AIExplanationBox({ calculatorType, data }: AIExplanationBoxProps) {
  const { country } = useCountry();
  const [loading, setLoading] = useState(false);
  const [explanation, setExplanation] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [hasRequested, setHasRequested] = useState(false);

  const fetchExplanation = async () => {
    setLoading(true);
    setError(null);
    setHasRequested(true);

    try {
      const res = await fetch('/api/explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          calculatorType,
          country,
          data,
        }),
      });

      const json = await res.json();
      if (json.explanation) {
        setExplanation(json.explanation);
      } else {
        setError(json.error || 'Your calculation is complete, but the optional AI explanation is currently unavailable.');
      }
    } catch (err) {
      setError('Your calculation is complete, but the optional AI explanation is currently unavailable.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-slate-900 text-white p-6 rounded-2xl shadow-md border border-slate-800 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Optional AI Insights</span>
          </div>
          <h3 className="text-lg font-bold text-white mt-1">Want a Plain-Language Explanation?</h3>
          <p className="text-xs text-slate-400">
            The calculator handled the math. AI can translate what these numbers mean for your options.
          </p>
        </div>

        {!hasRequested && (
          <button
            onClick={fetchExplanation}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 disabled:opacity-50"
          >
            <Sparkles className="w-4 h-4" />
            <span>Explain My Results</span>
          </button>
        )}
      </div>

      {loading && (
        <div className="flex items-center gap-3 py-4 text-slate-300">
          <RefreshCw className="w-5 h-5 animate-spin text-emerald-400" />
          <span className="text-sm font-medium">Generating plain-language explanation...</span>
        </div>
      )}

      {explanation && (
        <div className="pt-3 border-t border-slate-800 space-y-3">
          <div className="inline-block px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-emerald-950 text-emerald-300 border border-emerald-800">
            AI-generated explanation
          </div>
          <div className="text-sm leading-relaxed text-slate-200 space-y-2 whitespace-pre-line">
            {explanation}
          </div>
          <div className="flex items-center justify-between pt-2">
            <p className="text-[11px] text-slate-400 italic">
              Note: This explanation is hypothetical analysis based strictly on your calculated inputs. MoneyPath does not provide regulated advice.
            </p>
            <button
              onClick={fetchExplanation}
              className="text-xs text-emerald-400 hover:text-emerald-300 font-medium inline-flex items-center gap-1"
            >
              <RefreshCw className="w-3 h-3" /> Refresh
            </button>
          </div>
        </div>
      )}

      {error && (
        <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="text-xs text-slate-300 space-y-1">
            <p className="font-semibold text-slate-200">{error}</p>
            <p className="text-slate-400">
              You can still review all deterministic figures, interest comparisons, and month-by-month schedules above.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
