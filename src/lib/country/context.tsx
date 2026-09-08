'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CountryLocale } from '@/types/financial';

interface CountryContextType {
  country: CountryLocale;
  setCountry: (c: CountryLocale) => void;
  currencySymbol: string;
  currencyCode: string;
  pensionTerm: string; // 401(k) in US, Workplace Pension in UK
  taxFavoredSavingsTerm: string; // IRA/Roth in US, ISA in UK
}

const CountryContext = createContext<CountryContextType | undefined>(undefined);

export function CountryProvider({ children }: { children: React.ReactNode }) {
  const [country, setCountryState] = useState<CountryLocale>('US');

  useEffect(() => {
    const saved = localStorage.getItem('moneypath_country') as CountryLocale;
    if (saved === 'US' || saved === 'UK') {
      setCountryState(saved);
    }
  }, []);

  const setCountry = (c: CountryLocale) => {
    setCountryState(c);
    localStorage.setItem('moneypath_country', c);
  };

  const currencySymbol = country === 'UK' ? '£' : '$';
  const currencyCode = country === 'UK' ? 'GBP' : 'USD';
  const pensionTerm = country === 'UK' ? 'Workplace Pension' : '401(k) / Retirement Account';
  const taxFavoredSavingsTerm = country === 'UK' ? 'ISA' : 'IRA / High-Yield Savings';

  return (
    <CountryContext.Provider
      value={{
        country,
        setCountry,
        currencySymbol,
        currencyCode,
        pensionTerm,
        taxFavoredSavingsTerm,
      }}
    >
      {children}
    </CountryContext.Provider>
  );
}

export function useCountry() {
  const context = useContext(CountryContext);
  if (!context) {
    throw new Error('useCountry must be used within a CountryProvider');
  }
  return context;
}
