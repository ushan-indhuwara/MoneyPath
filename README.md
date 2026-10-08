# MoneyPath AI 🚀

> **Tagline:** “See your numbers. Understand your options.”

MoneyPath AI is an educational personal-finance calculator platform built with **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS**. It empowers users in the United States 🇺🇸 and United Kingdom 🇬🇧 to model complex debt payoff, savings goals, and retirement growth scenarios using deterministic math, supplemented by optional server-side AI explanations.

---

## 💡 Core Principle

```
CALCULATOR DOES THE MATH.
AI EXPLAINS THE RESULT.
```

- All financial math runs strictly via peer-reviewed, deterministic TypeScript code.
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
- **AI Backend:** Server-side Route Handler (`/api/explain`) with provider-neutral LLM abstraction
- **Deployment:** Vercel / Cloudflare Pages / Netlify (100% Free tier compatible)

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

By default, the platform operates in `AI_ENABLED=false` mode. Calculators work 100% perfectly without AI.

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

The application features a global Country Provider. Users can switch between **US ($)** and **UK (£)** via the header toggle.

- **US Mode:** Displays `$`, 401(k), IRA, CFPB reference links.
- **UK Mode:** Displays `£`, Workplace Pension, ISA, MoneyHelper/FCA reference links.

---

## 📝 How to Add Another Calculator

1. Create deterministic math logic in `src/lib/financial/newCalculatorEngine.ts`.
2. Add comprehensive unit tests in `src/tests/financial.test.ts`.
3. Create page component at `src/app/tools/new-calculator/page.tsx` using `<CalculatorLayout />`.
4. Update `src/components/ui/Header.tsx`, `Footer.tsx`, and `sitemap.ts`.

---

## 🌐 Free Deployment (Vercel)

1. Push your repository to GitHub.
2. Sign in to [Vercel](https://vercel.com) (Free Tier).
3. Import your GitHub repository.
4. Click **Deploy**. Vercel will automatically build the Next.js App Router static pages and API route.

---

## 🔍 Google Search Console & Analytics Setup

1. Verify site ownership in [Google Search Console](https://search.google.com/search-console).
2. Submit your sitemap URL: `https://moneypathai.vercel.app/sitemap.xml`.
3. (Optional) For privacy-friendly analytics, add Vercel Analytics or Google Analytics in `src/app/layout.tsx`.

---

## 📋 Pre-Launch Production Checklist

- [ ] Update `CONTACT_EMAIL` in `src/app/contact/page.tsx`.
- [ ] Configure `NEXT_PUBLIC_SITE_URL` in `.env.local` to your domain.
- [ ] Run `npm run test` (100% passing tests).
- [ ] Run `npm run build` (Clean build without compilation errors).
- [ ] Verify `AI_ENABLED` mode behavior.
- [ ] Submit `sitemap.xml` to Google Search Console.
