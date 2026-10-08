import { MetadataRoute } from 'next';
import { ARTICLES } from '@/content/articles';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://moneypathai.vercel.app';

  const routes = [
    '',
    '/tools/debt-payoff-calculator',
    '/tools/savings-goal-calculator',
    '/tools/retirement-calculator',
    '/learn',
    '/methodology',
    '/about',
    '/editorial-policy',
    '/privacy-policy',
    '/financial-disclaimer',
    '/contact',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : route.startsWith('/tools') ? 0.9 : 0.7,
  }));

  const articleRoutes = ARTICLES.map((art) => ({
    url: `${baseUrl}/learn/${art.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [...routes, ...articleRoutes];
}
