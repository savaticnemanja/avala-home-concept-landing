'use client';

import { useEffect } from 'react';
import { locales } from '@/i18n/config';
import { track } from './beacon';

// Strip a leading locale segment so internal links read "/contact", not "/sr/contact".
const tidyPath = (pathname) => {
  const [, first, ...rest] = pathname.split('/');
  const body = locales.includes(first) ? `/${rest.join('/')}` : pathname;
  return body.replace(/\/+$/, '') || '/';
};

// Derive a short, readable label for a clicked target.
const labelFor = (el) => {
  const explicit = el.closest('[data-track]')?.getAttribute('data-track');
  if (explicit) return explicit.trim();

  const link = el.closest('a');
  if (link) {
    const href = link.getAttribute('href') || '';
    if (href.startsWith('mailto:')) return 'email';
    if (href.startsWith('tel:')) return 'phone';
    try {
      const url = new URL(link.href, window.location.origin);
      if (url.origin !== window.location.origin) {
        return `↗ ${url.hostname.replace(/^www\./, '')}`;
      }
      return tidyPath(url.pathname);
    } catch {
      /* fall through to text */
    }
  }

  const btn = el.closest('button,[role="button"]');
  if (btn) {
    const aria = btn.getAttribute('aria-label');
    return (aria || btn.textContent || '').trim();
  }

  return '';
};

// Records clicks on links / buttons / [data-track] elements (one per visitor per
// target per day) so the dashboard can compute click-through rates.
export const ClickTracker = () => {
  useEffect(() => {
    const onClick = (e) => {
      const el = e.target instanceof Element ? e.target : null;
      if (!el) return;

      const name = labelFor(el).slice(0, 80);
      if (!name) return;

      track({ type: 'click', name, path: window.location.pathname });
    };

    // Capture phase so we still log clicks that stop propagation.
    document.addEventListener('click', onClick, { capture: true });
    return () => document.removeEventListener('click', onClick, { capture: true });
  }, []);

  return null;
};
