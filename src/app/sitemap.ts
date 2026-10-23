import { MetadataRoute } from 'next';
import { ARTICLES } from '@/content/articles';
import { canonicalUrl } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '/',
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
    url: canonicalUrl(route),
    changeFrequency: 'weekly' as const,
    priority: route === '/' ? 1.0 : route.startsWith('/tools') ? 0.9 : 0.7,
  }));

  const articleRoutes = ARTICLES.map((art) => ({
    url: canonicalUrl(`/learn/${art.slug}`),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [...routes, ...articleRoutes];
}
