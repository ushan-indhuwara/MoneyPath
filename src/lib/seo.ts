import type { Metadata } from 'next';

export const SITE_ORIGIN = (process.env.NEXT_PUBLIC_SITE_URL || 'https://moneypathai.vercel.app').replace(/\/+$/, '');

export function canonicalUrl(path: string): string {
  const pathname = path.startsWith('/') ? path : `/${path}`;
  return new URL(pathname || '/', `${SITE_ORIGIN}/`).toString();
}

export function createPageMetadata(
  title: string,
  description: string,
  path: string
): Metadata {
  const canonical = canonicalUrl(path);

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { url: canonical },
  };
}
