'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCountry } from '@/lib/country/context';
import {
  Calculator,
  BookOpen,
  HelpCircle,
  Menu,
  X,
  ChevronDown,
  Globe,
  TrendingUp,
  PiggyBank,
  ShieldCheck,
} from 'lucide-react';

import Image from 'next/image';

export function Header() {
  const pathname = usePathname();
  const { country, setCountry } = useCountry();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);

  const navLinks = [
    { name: 'Learn', href: '/learn' },
    { name: 'Methodology', href: '/methodology' },
    { name: 'About', href: '/about' },
  ];

  const tools = [
    {
      name: 'Debt Payoff Planner',
      href: '/tools/debt-payoff-calculator',
      desc: 'Compare Snowball vs Avalanche strategies',
      icon: <Calculator className="w-5 h-5 text-emerald-600" />,
    },
    {
      name: 'Savings Goal Calculator',
      href: '/tools/savings-goal-calculator',
      desc: 'Plan monthly contributions and timelines',
      icon: <PiggyBank className="w-5 h-5 text-blue-600" />,
    },
    {
      name: 'Retirement Growth Estimator',
      href: '/tools/retirement-calculator',
      desc: 'Model 3-scenario long-term accumulation',
      icon: <TrendingUp className="w-5 h-5 text-teal-600" />,
    },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 font-bold text-xl text-slate-900 tracking-tight">
            <Image
              src="/logo.png"
              alt="MoneyPath AI Logo"
              width={36}
              height={36}
              className="w-9 h-9 object-contain rounded-lg shadow-sm"
            />
            <span className="flex items-center">
              MoneyPath <span className="text-emerald-700 font-semibold ml-1 text-sm bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">AI</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6">
            {/* Calculators Dropdown */}
            <div className="relative">
              <button
                onClick={() => setToolsDropdownOpen(!toolsDropdownOpen)}
                onMouseEnter={() => setToolsDropdownOpen(true)}
                className="flex items-center gap-1 text-sm font-semibold text-slate-700 hover:text-emerald-700 py-2 transition-colors focus:outline-none"
              >
                <span>Calculators</span>
                <ChevronDown className="w-4 h-4 text-slate-500" />
              </button>

              {toolsDropdownOpen && (
                <div
                  onMouseLeave={() => setToolsDropdownOpen(false)}
                  className="absolute top-full left-0 w-80 bg-white rounded-2xl shadow-xl border border-slate-200 p-3 space-y-1 animate-in fade-in slide-in-from-top-2"
                >
                  {tools.map((tool) => (
                    <Link
                      key={tool.href}
                      href={tool.href}
                      onClick={() => setToolsDropdownOpen(false)}
                      className={`flex items-start gap-3 p-2.5 rounded-xl transition-all ${
                        pathname === tool.href ? 'bg-emerald-50/80 text-emerald-900' : 'hover:bg-slate-50 text-slate-800'
                      }`}
                    >
                      <div className="p-2 rounded-lg bg-slate-100 shrink-0 mt-0.5">{tool.icon}</div>
                      <div>
                        <p className="text-sm font-bold">{tool.name}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{tool.desc}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-semibold transition-colors ${
                  pathname === link.href ? 'text-emerald-700' : 'text-slate-700 hover:text-emerald-700'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Action: Country Selector */}
          <div className="hidden sm:flex items-center gap-3">
            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
              <button
                onClick={() => setCountry('US')}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                  country === 'US'
                    ? 'bg-white text-slate-900 shadow-sm border border-slate-200'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                🇺🇸 US ($)
              </button>
              <button
                onClick={() => setCountry('UK')}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                  country === 'UK'
                    ? 'bg-white text-slate-900 shadow-sm border border-slate-200'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                🇬🇧 UK (£)
              </button>
            </div>
          </div>

          {/* Mobile menu hamburger button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-4 pb-6 space-y-4 shadow-lg">
          <div className="space-y-1">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 px-2 mb-2">Financial Tools</p>
            {tools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 text-slate-800 font-medium text-sm"
              >
                {tool.icon}
                <span>{tool.name}</span>
              </Link>
            ))}
          </div>

          <div className="border-t border-slate-100 pt-3 space-y-1">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 px-2 mb-2">Platform</p>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-2.5 py-2 text-sm font-semibold text-slate-700 hover:text-emerald-700"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Mobile Country Toggle */}
          <div className="border-t border-slate-100 pt-4 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-600">Select Market & Currency:</span>
            <div className="flex items-center bg-slate-100 p-1 rounded-xl">
              <button
                onClick={() => setCountry('US')}
                className={`px-3 py-1 text-xs font-bold rounded-lg ${
                  country === 'US' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
                }`}
              >
                🇺🇸 US ($)
              </button>
              <button
                onClick={() => setCountry('UK')}
                className={`px-3 py-1 text-xs font-bold rounded-lg ${
                  country === 'UK' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
                }`}
              >
                🇬🇧 UK (£)
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
