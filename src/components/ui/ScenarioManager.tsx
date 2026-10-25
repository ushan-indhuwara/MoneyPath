'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { Download, FolderOpen, Link2, Save, Trash2 } from 'lucide-react';
import { trackProductEvent } from '@/lib/analytics';

type ScenarioType = 'debt' | 'savings' | 'retirement';
interface SavedScenario {
  id: string;
  type: ScenarioType;
  name: string;
  savedAt: string;
  inputs: Record<string, unknown>;
  summary: string;
  metricLabel: string;
  metricValue: number;
  metricFormatted: string;
}

interface ScenarioManagerProps {
  type: ScenarioType;
  inputs: Record<string, unknown>;
  summary: string;
  metricLabel: string;
  metricValue: number;
  metricFormatted: string;
  formatMetric: (value: number) => string;
  onLoad: (inputs: Record<string, unknown>) => void;
}

const STORAGE_KEY = 'moneypath_saved_scenarios_v1';
const MAX_SCENARIOS = 10;

function readScenarios(): SavedScenario[] {
  try {
    const parsed: unknown = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]');
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item): item is SavedScenario =>
      item && typeof item === 'object' &&
      typeof item.id === 'string' &&
      ['debt', 'savings', 'retirement'].includes(item.type) &&
      typeof item.name === 'string' &&
      item.inputs && typeof item.inputs === 'object' &&
      typeof item.metricValue === 'number' && Number.isFinite(item.metricValue)
    ).slice(0, MAX_SCENARIOS);
  } catch {
    return [];
  }
}

export function ScenarioManager(props: ScenarioManagerProps) {
  const [scenarios, setScenarios] = useState<SavedScenario[]>([]);
  const [name, setName] = useState('My scenario');
  const [compareId, setCompareId] = useState<string | null>(null);
  const [notice, setNotice] = useState('');

  useEffect(() => setScenarios(readScenarios()), []);

  const currentUrl = typeof window !== 'undefined'
    ? `${window.location.origin}${window.location.pathname}`
    : '';
  const selectedScenario = useMemo(
    () => scenarios.find((scenario) => scenario.id === compareId && scenario.type === props.type),
    [scenarios, compareId, props.type]
  );

  const persist = (next: SavedScenario[]) => {
    setScenarios(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      setNotice('Could not save in this browser. Check available storage space.');
    }
  };

  const saveCurrent = () => {
    const timestamp = new Date().toISOString();
    const record: SavedScenario = {
      id: typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : `${Date.now()}`,
      type: props.type,
      name: name.trim().slice(0, 50) || 'Saved scenario',
      savedAt: timestamp,
      inputs: props.inputs,
      summary: props.summary,
      metricLabel: props.metricLabel,
      metricValue: props.metricValue,
      metricFormatted: props.metricFormatted,
    };
    persist([record, ...scenarios].slice(0, MAX_SCENARIOS));
    setCompareId(record.id);
    setNotice('Saved on this device only.');
    trackProductEvent('scenario_saved', { calculator_type: props.type });
  };

  const loadScenario = (scenario: SavedScenario) => {
    props.onLoad(scenario.inputs);
    setCompareId(scenario.id);
    setNotice(`Loaded “${scenario.name}”.`);
    trackProductEvent('scenario_loaded', { calculator_type: props.type });
  };

  const exportScenario = (scenario: SavedScenario) => {
    const blob = new Blob([JSON.stringify(scenario, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `moneypath-${scenario.type}-scenario-${scenario.savedAt.slice(0, 10)}.json`;
    anchor.click();
    URL.revokeObjectURL(url);
    setNotice('Scenario exported as a file. The file contains your saved inputs and estimates.');
    trackProductEvent('scenario_exported', { calculator_type: props.type });
  };

  const shareCalculator = async () => {
    try {
      if (navigator.share) await navigator.share({ title: 'MoneyPath calculator', url: currentUrl });
      else {
        await navigator.clipboard.writeText(currentUrl);
        setNotice('Calculator link copied. Your saved amounts are not in the link.');
      }
    } catch {
      setNotice('Share was cancelled or unavailable. You can export a scenario file instead.');
    }
  };

  const removeScenario = (id: string) => {
    const next = scenarios.filter((scenario) => scenario.id !== id);
    persist(next);
    if (compareId === id) setCompareId(null);
    setNotice('Saved scenario removed from this device.');
  };

  const typeScenarios = scenarios.filter((scenario) => scenario.type === props.type);

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-4" aria-labelledby={`${props.type}-scenario-heading`}>
      <div>
        <h3 id={`${props.type}-scenario-heading`} className="font-bold text-slate-900">Save and compare scenarios</h3>
        <p className="mt-1 text-xs text-slate-500">Scenarios are stored in this browser only. Exported files contain your inputs and estimates; calculator links contain no scenario amounts.</p>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row">
        <input aria-label="Scenario name" value={name} onChange={(event) => setName(event.target.value)} maxLength={50} className="min-w-0 flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm" />
        <button onClick={saveCurrent} className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-700 px-3 py-2 text-xs font-bold text-white hover:bg-emerald-800"><Save className="h-4 w-4" />Save current</button>
        <button onClick={shareCalculator} className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50"><Link2 className="h-4 w-4" />Share calculator</button>
      </div>

      {notice && <p role="status" className="text-xs text-emerald-800">{notice}</p>}

      {selectedScenario && (
        <div className="overflow-x-auto rounded-xl border border-emerald-200 bg-emerald-50/50">
          <p className="px-3 pt-3 text-xs font-bold text-emerald-900">Current vs. “{selectedScenario.name}”</p>
          <table className="w-full text-left text-xs">
            <thead><tr className="text-slate-500"><th className="px-3 py-2">Metric</th><th className="px-3 py-2">Current</th><th className="px-3 py-2">Saved</th></tr></thead>
            <tbody><tr className="border-t border-emerald-100"><th className="px-3 py-2 font-semibold text-slate-700">{props.metricLabel}</th><td className="px-3 py-2 font-bold text-slate-900">{props.metricFormatted}</td><td className="px-3 py-2 font-bold text-slate-900">{selectedScenario.metricFormatted || props.formatMetric(selectedScenario.metricValue)}</td></tr></tbody>
          </table>
        </div>
      )}

      {typeScenarios.length > 0 && (
        <ul className="divide-y divide-slate-100">
          {typeScenarios.map((scenario) => (
            <li key={scenario.id} className="flex flex-wrap items-center gap-3 py-3">
              <div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold text-slate-800">{scenario.name}</p><p className="text-xs text-slate-500">{scenario.metricLabel}: {scenario.metricFormatted || props.formatMetric(scenario.metricValue)} · {new Date(scenario.savedAt).toLocaleDateString()}</p><p className="truncate text-xs text-slate-500">{scenario.summary}</p></div>
              <button onClick={() => loadScenario(scenario)} className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-semibold text-emerald-800 hover:bg-emerald-50"><FolderOpen className="h-3.5 w-3.5" />Load / compare</button>
              <button onClick={() => exportScenario(scenario)} aria-label={`Export ${scenario.name}`} className="rounded-md p-1.5 text-slate-600 hover:bg-slate-100"><Download className="h-4 w-4" /></button>
              <button onClick={() => removeScenario(scenario.id)} aria-label={`Remove ${scenario.name}`} className="rounded-md p-1.5 text-slate-500 hover:bg-rose-50 hover:text-rose-700"><Trash2 className="h-4 w-4" /></button>
            </li>
          ))}
        </ul>
      )}
      {typeScenarios.length === 0 && <p className="text-xs text-slate-500">No saved scenarios for this calculator yet. You can keep up to {MAX_SCENARIOS} scenarios on this device.</p>}
    </section>
  );
}
