
import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ARTICLES } from '@/content/articles';
import { Breadcrumbs, DisclaimerBox } from '@/components/ui/DisclaimerBox';
import {
  ExternalLink,
  Calendar,
  Clock,
  User,
  ArrowLeft,
} from 'lucide-react';
import type { Metadata } from 'next';
import { canonicalUrl, SITE_ORIGIN } from '@/lib/seo';
import { ArticleContent } from '@/components/ui/ArticleContent';
import { TrackedLink } from '@/components/ui/TrackedLink';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return ARTICLES.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = ARTICLES.find((item) => item.slug === slug);

  if (!article) {
    return {
      alternates: { canonical: null },
      robots: { index: false, follow: false },
    };
  }

  const articleCanonical = canonicalUrl(`/learn/${article.slug}`);

  return {
    title: article.seoTitle
      ? { absolute: article.seoTitle }
      : `${article.title} | MoneyPath Learn`,
    description: article.excerpt,

    alternates: {
      canonical: articleCanonical,
    },

    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      url: articleCanonical,
      authors: [article.author],
      siteName: 'MoneyPath AI',
    },

    twitter: {
      card: 'summary',
      title: article.title,
      description: article.excerpt,
    },

    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function ArticleDetailPage({ params }: Props) {
  const { slug } = await params;
  const article = ARTICLES.find((item) => item.slug === slug);

  if (!article) {
    notFound();
  }

  const articleCanonical = canonicalUrl(`/learn/${article.slug}`);

  const jsonLdArticle = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    url: articleCanonical,
    ...(article.datePublished ? { datePublished: article.datePublished } : {}),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': articleCanonical,
    },
    author: {
      '@type': 'Organization',
      name: article.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'MoneyPath AI',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_ORIGIN}/logo.png`,
      },
    },
  };

  return (
    <article className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdArticle).replace(/</g, '\\u003c'),
        }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Breadcrumbs
          items={[
            { label: 'Learning Hub', href: '/learn' },
            { label: article.title },
          ]}
        />

        <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200/90 shadow-sm space-y-8">
          {/* Article Header */}
          <div className="space-y-4 border-b border-slate-100 pb-6">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800">
              {article.category}
            </span>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {article.title}
            </h1>

            <p className="text-lg text-slate-600 leading-relaxed">
              {article.excerpt}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-2 font-medium">
              <span className="flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-slate-400" />
                {article.author}
              </span>

              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                {article.date}
              </span>

              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                {article.readTime}
              </span>
            </div>
          </div>

          {/* Article Body */}
          <div className="prose prose-slate max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-a:text-emerald-700 hover:prose-a:underline leading-relaxed space-y-4 text-slate-800 text-base">
            <ArticleContent content={article.content} />
          </div>

          {/* Authoritative Sources */}
          {article.sources && article.sources.length > 0 && (
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Sources and Further Reading
              </h4>

              <ul className="space-y-2 text-xs">
                {article.sources.map((source, sourceIdx) => (
                  <li key={sourceIdx}>
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-emerald-700 font-semibold hover:underline"
                    >
                      <span>{source.title}</span>
                      <span className="text-slate-400 font-normal">
                        ({source.org})
                      </span>
                      <ExternalLink className="w-3 h-3 text-slate-400" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <DisclaimerBox compact />

          {/* Bottom Navigation */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
            <Link
              href="/learn"
              className="inline-flex items-center gap-1 text-sm font-semibold text-slate-600 hover:text-slate-900"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Learning Hub
            </Link>

            <TrackedLink
              href={article.calculatorHref || '/tools/debt-payoff-calculator'}
              articleSlug={article.slug}
              className="inline-flex items-center gap-1 text-sm font-bold text-emerald-700 hover:text-emerald-800"
            >
              {article.calculatorLabel || 'Try a MoneyPath calculator'} →
            </TrackedLink>
          </div>
        </div>
      </div>
    </article>
  );
}
