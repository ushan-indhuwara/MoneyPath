'use client';

import React, { useEffect, useState } from 'react';
import Script from 'next/script';
import { usePathname } from 'next/navigation';

const configuredMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '';
const measurementId = /^G-[A-Z0-9]+$/.test(configuredMeasurementId) ? configuredMeasurementId : undefined;
type ConsentChoice = 'accepted' | 'declined' | null;

export function AnalyticsConsent() {
  const pathname = usePathname();
  const [choice, setChoice] = useState<ConsentChoice>(null);
  const [showChoices, setShowChoices] = useState(false);
  const [scriptReady, setScriptReady] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem('moneypath_analytics_consent');
      if (saved === 'accepted' || saved === 'declined') setChoice(saved);
    } catch {
      setChoice('declined');
    }

    const openChoices = () => setShowChoices(true);
    window.addEventListener('moneypath:open-privacy-choices', openChoices);
    return () => window.removeEventListener('moneypath:open-privacy-choices', openChoices);
  }, []);

  useEffect(() => {
    if (!scriptReady || choice !== 'accepted' || !measurementId) return;
    window.gtag?.('event', 'page_view', { page_path: pathname });
  }, [choice, scriptReady, pathname]);

  if (!measurementId) return null;

  const choose = (nextChoice: Exclude<ConsentChoice, null>) => {
    try {
      window.localStorage.setItem('moneypath_analytics_consent', nextChoice);
    } catch {
      // If consent cannot be stored, keep analytics off for this visit.
      setChoice('declined');
      setShowChoices(false);
      return;
    }
    setChoice(nextChoice);
    setShowChoices(false);
  };

  return (
    <>
      {choice === 'accepted' && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
            strategy="afterInteractive"
            onReady={() => setScriptReady(true)}
          />
          <Script id="moneypath-google-analytics" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || []; window.gtag = window.gtag || function(){window.dataLayer.push(arguments);}; window.gtag('js', new Date()); window.gtag('config', '${measurementId}', {send_page_view:false});`}
          </Script>
        </>
      )}

      {(choice === null || showChoices) && (
        <aside className="fixed inset-x-0 bottom-0 z-[70] border-t border-slate-200 bg-white p-4 shadow-2xl sm:inset-x-auto sm:bottom-5 sm:right-5 sm:max-w-md sm:rounded-2xl sm:border">
          <p className="text-sm font-bold text-slate-900">Privacy choices</p>
          <p className="mt-1 text-xs leading-relaxed text-slate-600">
            Optional Google Analytics may use cookies and browser signals to help us understand which pages and tools are useful. We do not send calculator amounts or results. Analytics stays off unless you accept; you can change this choice later.
          </p>
          <div className="mt-3 flex flex-wrap justify-end gap-2">
            <button onClick={() => choose('declined')} className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50">Decline</button>
            <button onClick={() => choose('accepted')} className="rounded-lg bg-emerald-700 px-3 py-2 text-xs font-semibold text-white hover:bg-emerald-800">Accept analytics</button>
          </div>
        </aside>
      )}
    </>
  );
}
