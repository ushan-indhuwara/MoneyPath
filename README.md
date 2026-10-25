# MoneyPath AI 🚀

> **Tagline:** “See your numbers. Understand your options.”

MoneyPath AI is an educational personal-finance calculator platform built with **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS**. It empowers users in the United States 🇺🇸 and United Kingdom 🇬🇧 to model complex debt payoff, savings goals, and retirement growth scenarios using deterministic math, supplemented by optional server-side AI explanations.

---

## 💡 Core Principle

```
CALCULATOR DOES THE MATH.
AI EXPLAINS THE RESULT.
```

- Financial math is computed by deterministic TypeScript functions using the documented assumptions.
- Large Language Models (LLMs) are **never** used to calculate balances, interest rates, or payoff timelines.
- Optional server-side AI receives already-calculated numerical outputs to generate plain-language explanations.

---

## 🛠️ Tech Stack & Architecture

- **Framework:** Next.js (App Router, React 18/19)
- **Language:** TypeScript (Strict Mode)
- **Styling:** Tailwind CSS (Fintech design system)
- **Charts:** Recharts (Responsive debt decay, savings, and retirement graphs)
- **Icons:** Lucide React
- **Testing:** Vitest
- **AI Backend:** Optional server-side OpenAI explanation route (`/api/explain`)
- **Deployment:** Next.js-compatible hosting providers (pricing and runtime limits depend on provider and usage)

---

## 📂 Project Structure

```
src/
├── app/                        # App Router Pages & API Endpoints
│   ├── api/explain/            # Server-side AI explanation endpoint
│   ├── tools/
│   │   ├── debt-payoff-calculator/
│   │   ├── savings-goal-calculator/
│   │   └── retirement-calculator/
│   ├── learn/                  # 6 Educational Articles Hub & [slug]
│   ├── methodology/            # Formula transparency page
│   ├── about/                  # Mission & team page
│   ├── editorial-policy/       # Sourcing & standards
│   ├── privacy-policy/         # Data minimization statement
│   ├── financial-disclaimer/   # Regulatory boundary notice
│   ├── contact/                # Support contact page
│   ├── sitemap.ts              # Dynamic sitemap generator
│   ├── robots.ts               # Crawler instructions
│   └── not-found.tsx           # Custom 404 page
├── components/
│   └── ui/                     # Reusable UI components
│       ├── Header.tsx          # Nav & US/UK locale switcher
│       ├── Footer.tsx          # Multi-column footer
│       ├── CurrencyInput.tsx   # Accessible currency field
│       ├── PercentageInput.tsx # Accessible rate field
│       ├── CalculatorLayout.tsx# 2-column responsive layout
│       ├── ResultCard.tsx      # High impact metric cards
│       ├── ProjectionChart.tsx # Recharts visualizer wrapper
│       ├── AIExplanationBox.tsx# Optional AI trigger component
│       └── DisclaimerBox.tsx   # Reusable disclaimer alert
├── content/
│   └── articles.ts             # Educational content dataset
├── lib/
│   ├── financial/              # Deterministic Financial Engines
│   │   ├── debtEngine.ts       # Snowball vs Avalanche amortization
│   │   ├── savingsEngine.ts    # Mode A & Mode B compound growth
│   │   ├── retirementEngine.ts # 3-scenario retirement growth
│   │   └── formatters.ts       # Currency ($ / £) & date formatters
│   ├── ai/
│   │   └── explanation.ts      # Server-side AI guardrailed prompt
│   └── country/
│       └── context.tsx         # Country locale state provider
├── tests/
│   └── financial.test.ts       # Vitest calculation test suite
└── types/
    └── financial.ts            # Core TypeScript interfaces
```

---

## 🚀 Quick Start (Local Development)

### 1. Clone & Install Dependencies

```bash
npm install
```

### 2. Run Automated Calculation Tests

```bash
npm run test
```

### 3. Start Local Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production

```bash
npm run build
npm start
```

---

## 🤖 How to Enable AI Explanations

AI explanations are disabled unless explicitly enabled. The calculators work without an AI provider.

To enable optional AI explanation generation:

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
2. Set `AI_ENABLED=true` and provide your secret API key:
   ```env
   AI_ENABLED=true
   OPENAI_API_KEY=your_secret_api_key_here
   OPENAI_MODEL=gpt-4o-mini
   ```
3. Never expose `OPENAI_API_KEY` to client-side code (`NEXT_PUBLIC_`). The `/api/explain` endpoint runs strictly server-side.

---

## 🌐 Configuring US / UK Markets

The application features a market and currency preference switch for **US ($)** and **UK (£)**. It changes currency formatting and selected terminology; it does not model country-specific tax, pension, or lender rules.

- **US Mode:** Displays `$`, 401(k), IRA, CFPB reference links.
- **UK Mode:** Displays `£`, Workplace Pension, ISA, MoneyHelper/FCA reference links.

---

## 📝 How to Add Another Calculator

1. Create deterministic math logic in `src/lib/financial/newCalculatorEngine.ts`.
2. Add comprehensive unit tests in `src/tests/financial.test.ts`.
3. Create page component at `src/app/tools/new-calculator/page.tsx` using `<CalculatorLayout />`.
4. Update `src/components/ui/Header.tsx`, `Footer.tsx`, and `sitemap.ts`.

---

## 🌐 Deploy to Vercel

1. Push your repository to GitHub.
2. Sign in to [Vercel](https://vercel.com).
3. Import your GitHub repository.
4. Deploy the project. Hosting features, quotas, and pricing depend on the selected plan.

---

## 🔍 Google Search Console & Analytics Setup

1. Set `NEXT_PUBLIC_SITE_URL` to the deployed site's canonical origin in the host's environment settings.
2. Verify site ownership in [Google Search Console](https://search.google.com/search-console) and submit `<your-site-origin>/sitemap.xml`.
3. Review Search Console's query, page, and country reports to see what people find useful.
4. Optional: add `NEXT_PUBLIC_GA_MEASUREMENT_ID` to the deployment environment. The site asks visitors for consent before loading Google Analytics. Product events include scenario save/load/export and guide-to-tool clicks; no financial values are sent.

---

## 📋 Pre-Launch Production Checklist

- [ ] Confirm the public GitHub issue tracker is the feedback channel you want visitors to use.
- [ ] Configure `NEXT_PUBLIC_SITE_URL` in `.env.local` to your domain.
- [ ] Run `npm run test` and review the results.
- [ ] Run `npm run build` and resolve any build errors.
- [ ] Verify `AI_ENABLED` mode behavior.
- [ ] Submit `sitemap.xml` to Google Search Console.
- [ ] Confirm analytics consent and privacy-policy text match the deployed configuration.
