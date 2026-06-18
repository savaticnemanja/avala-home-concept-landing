'use client';
import { useEffect } from 'react';
import { locales, defaultLocale } from '@/i18n/config';

// Browser auto-detection deliberately excludes `en` — English (and any other
// unsupported browser language) defaults to Serbian. Other locales (ru, de)
// are still matched from the browser. An explicit choice saved in localStorage
// always wins, so a visitor who picks English keeps it.
const AUTO_DETECT_LOCALES = locales.filter((l) => l !== 'en');

const pickLocale = () => {
  try {
    const stored = localStorage.getItem('locale');
    if (stored && locales.includes(stored)) return stored;
  } catch {
    /* ignore */
  }
  const candidates =
    typeof navigator !== 'undefined'
      ? navigator.languages || [navigator.language]
      : [];
  for (const lang of candidates) {
    const code = (lang || '').slice(0, 2).toLowerCase();
    if (AUTO_DETECT_LOCALES.includes(code)) return code;
  }
  return defaultLocale;
};

export default function RootRedirect() {
  useEffect(() => {
    window.location.replace(`/${pickLocale()}/`);
  }, []);

  return (
    <>
      <noscript>
        <meta httpEquiv="refresh" content={`0; url=/${defaultLocale}/`} />
      </noscript>
    </>
  );
}
