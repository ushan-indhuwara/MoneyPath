'use client';

import React from 'react';
import { useCountry } from '@/lib/country/context';

interface CurrencyInputProps {
  id: string;
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  placeholder?: string;
  helpText?: string;
  error?: string;
  disabled?: boolean;
}

export function CurrencyInput({
  id,
  label,
  value,
  onChange,
  min = 0,
  max = 10000000,
  step = 1,
  placeholder = '0',
  helpText,
  error,
  disabled = false,
}: CurrencyInputProps) {
  const { currencySymbol } = useCountry();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    if (isNaN(val)) {
      onChange(0);
    } else {
      onChange(Math.max(min, Math.min(max, val)));
    }
  };

  return (
    <div className="w-full space-y-1.5">
      <label htmlFor={id} className="block text-sm font-semibold text-slate-700">
        {label}
      </label>
      <div className="relative rounded-lg shadow-sm">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <span className="text-slate-500 font-semibold text-base">{currencySymbol}</span>
        </div>
        <input
          type="number"
          id={id}
          name={id}
          value={value === 0 ? '' : value}
          onChange={handleChange}
          min={min}
          max={max}
          step={step}
          placeholder={placeholder}
          disabled={disabled}
          className={`block w-full rounded-lg border pl-8 pr-4 py-2.5 text-base text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-600 transition-colors ${
            error
              ? 'border-rose-500 bg-rose-50/20 text-rose-900 focus:ring-rose-500'
              : 'border-slate-300 bg-white hover:border-slate-400'
          }`}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : helpText ? `${id}-help` : undefined}
        />
      </div>
      {error ? (
        <p id={`${id}-error`} className="text-xs font-medium text-rose-600">
          {error}
        </p>
      ) : helpText ? (
        <p id={`${id}-help`} className="text-xs text-slate-500">
          {helpText}
        </p>
      ) : null}
    </div>
  );
}
