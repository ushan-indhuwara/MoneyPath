import type { Metadata } from 'next';
import './globals.css';
import { CountryProvider } from '@/lib/country/context';
import { Header } from '@/components/ui/Header';
import { Footer } from '@/components/ui/Footer';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://moneypath.ai'),
  title: {
    default: 'MoneyPath AI — Free Financial Calculators & Scenario Engine',
    template: '%s | MoneyPath AI',
  },
  description:
    'Free educational calculators to understand debt payoff (Snowball vs Avalanche), savings goals, and retirement growth. Calculator does the math, optional AI explains the result.',
  keywords: [
    'debt payoff calculator',
    'debt snowball calculator',
    'debt avalanche calculator',
    'snowball vs avalanche',
    'savings goal calculator',
    'retirement calculator',
    'compound interest calculator',
    'US debt payoff calculator',
    'UK debt payoff calculator',
  ],
  authors: [{ name: 'MoneyPath Editorial Team' }],
  creator: 'MoneyPath AI',
  verification: {
    google: 'G9VM_6PYGSAcUVxe55U-E_H1S5VQreyzTJ8iqjIW5Ro',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://moneypath.ai',
    title: 'MoneyPath AI — See Your Numbers. Understand Your Options.',
    description:
      'Free educational personal-finance calculators for US & UK. Compare debt payoff strategies, savings timelines, and retirement scenarios.',
    siteName: 'MoneyPath AI',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MoneyPath AI — Free Financial Calculators',
    description:
      'See your numbers. Understand your options. Compare Debt Snowball vs Avalanche, savings goals, and 3-scenario retirement growth.',
  },
  icons: {
    icon: '/icon.png',
    apple: '/apple-icon.png',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLdWebsite = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'MoneyPath AI',
    url: 'https://moneypath.ai',
    description: 'Educational financial calculators for debt payoff, savings goals, and retirement planning.',
  };

  const jsonLdOrg = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'MoneyPath AI',
    url: 'https://moneypath.ai',
    logo: 'https://moneypath.ai/logo.png',
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebsite) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrg) }}
        />
      </head>
      <body>
        <CountryProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </CountryProvider>
      </body>
    </html>
  );
}
