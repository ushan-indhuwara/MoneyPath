'use client';

import React from 'react';
import Link from 'next/link';
import { trackProductEvent } from '@/lib/analytics';

interface TrackedLinkProps {
  href: string;
  articleSlug: string;
  children: React.ReactNode;
  className?: string;
}

export function TrackedLink({ href, articleSlug, children, className }: TrackedLinkProps) {
  return (
    <Link
      href={href}
      className={className}
      onClick={() => trackProductEvent('guide_tool_click', { article_slug: articleSlug })}
    >
      {children}
    </Link>
  );
}
