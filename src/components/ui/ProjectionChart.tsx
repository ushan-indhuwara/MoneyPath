'use client';

import React, { useState, useEffect } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { useCountry } from '@/lib/country/context';

interface DebtChartDataPoint {
  dateStr: string;
  Snowball: number;
  Avalanche: number;
}

interface SavingsChartDataPoint {
  month: number;
  Balance: number;
  Contributions: number;
  Interest: number;
}

interface RetirementChartDataPoint {
  age: number;
  Base: number;
  Conservative: number;
  Optimistic: number;
}

interface ProjectionChartProps {
  type: 'debt' | 'savings' | 'retirement';
  debtData?: DebtChartDataPoint[];
  savingsData?: SavingsChartDataPoint[];
  retirementData?: RetirementChartDataPoint[];
  height?: number;
}

export function ProjectionChart({
  type,
  debtData,
  savingsData,
  retirementData,
  height = 320,
}: ProjectionChartProps) {
  const { currencySymbol } = useCountry();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full bg-white p-4 rounded-xl border border-slate-200">
        <div style={{ height }} className="w-full bg-slate-50 animate-pulse rounded-xl" />
      </div>
    );
  }

  const formatTooltipValue = (value: number) => {
    return `${currencySymbol}${value.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
  };

  if (type === 'debt' && debtData) {
    return (
      <div className="w-full bg-white p-4 rounded-xl border border-slate-200">
        <h4 className="text-sm font-semibold text-slate-700 mb-3">Balance Remaining Over Time</h4>
        <div style={{ width: '100%', height }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={debtData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="dateStr" stroke="#64748b" fontSize={12} tickLine={false} />
              <YAxis
                stroke="#64748b"
                fontSize={12}
                tickFormatter={(v) => `${currencySymbol}${v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v}`}
                tickLine={false}
              />
              <Tooltip formatter={(value: any) => [formatTooltipValue(Number(value)), 'Remaining']} />
              <Legend verticalAlign="top" height={36} />
              <Line
                type="monotone"
                dataKey="Avalanche"
                stroke="#16a34a"
                strokeWidth={2.5}
                dot={false}
                name="Avalanche Strategy"
              />
              <Line
                type="monotone"
                dataKey="Snowball"
                stroke="#2563eb"
                strokeWidth={2}
                strokeDasharray="4 4"
                dot={false}
                name="Snowball Strategy"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }

  if (type === 'savings' && savingsData) {
    return (
      <div className="w-full bg-white p-4 rounded-xl border border-slate-200">
        <h4 className="text-sm font-semibold text-slate-700 mb-3">Savings Growth Trajectory</h4>
        <div style={{ width: '100%', height }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={savingsData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" stroke="#64748b" fontSize={12} label={{ value: 'Months', position: 'insideBottom', offset: -5 }} />
              <YAxis
                stroke="#64748b"
                fontSize={12}
                tickFormatter={(v) => `${currencySymbol}${v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v}`}
              />
              <Tooltip formatter={(value: any) => [formatTooltipValue(Number(value)), 'Value']} />
              <Legend verticalAlign="top" height={36} />
              <Area
                type="monotone"
                dataKey="Balance"
                stroke="#15803d"
                fill="#dcfce7"
                strokeWidth={2}
                name="Total Portfolio Value"
              />
              <Area
                type="monotone"
                dataKey="Contributions"
                stroke="#2563eb"
                fill="#dbeafe"
                strokeWidth={2}
                name="Personal Contributions"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }

  if (type === 'retirement' && retirementData) {
    return (
      <div className="w-full bg-white p-4 rounded-xl border border-slate-200">
        <h4 className="text-sm font-semibold text-slate-700 mb-3">Retirement Growth Scenarios by Age</h4>
        <div style={{ width: '100%', height }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={retirementData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="age" stroke="#64748b" fontSize={12} label={{ value: 'Age', position: 'insideBottom', offset: -5 }} />
              <YAxis
                stroke="#64748b"
                fontSize={12}
                tickFormatter={(v) => `${currencySymbol}${v >= 1000000 ? `${(v / 1000000).toFixed(1)}M` : v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v}`}
              />
              <Tooltip formatter={(value: any) => [formatTooltipValue(Number(value)), 'Balance']} />
              <Legend verticalAlign="top" height={36} />
              <Line type="monotone" dataKey="Optimistic" stroke="#0d9488" strokeWidth={2} dot={false} name="Optimistic (+2%)" />
              <Line type="monotone" dataKey="Base" stroke="#16a34a" strokeWidth={3} dot={false} name="Base Scenario" />
              <Line type="monotone" dataKey="Conservative" stroke="#d97706" strokeWidth={2} strokeDasharray="4 4" dot={false} name="Conservative (-2%)" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }

  return null;
}
