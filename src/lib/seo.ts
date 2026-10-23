import type { Metadata } from 'next';

export const SITE_ORIGIN = 'https://moneypathai.vercel.app';

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