'use client';

import { LuLanguages } from 'react-icons/lu';
import { LOCALES, LOCALE_LABELS } from '@/lib/admin/constants';
import { useActiveLocale } from './LocaleContext';

// One control that switches the editing language for every field on the page.
export const LocaleSwitcher = () => {
  const { activeLocale, setActiveLocale } = useActiveLocale();
  if (!setActiveLocale) return null;

  return (
    <div className="flex items-center gap-2">
      <LuLanguages className="w-4 h-4 text-text-muted" aria-hidden />
      <span className="sr-only">Jezik unosa</span>
      <div className="flex gap-1" role="group" aria-label="Jezik unosa">
        {LOCALES.map((loc) => (
          <button
            key={loc}
            type="button"
            onClick={() => setActiveLocale(loc)}
            aria-pressed={activeLocale === loc}
            title={LOCALE_LABELS[loc]}
            className={[
              'px-2.5 py-1 text-xs uppercase tracking-wide rounded-[3px] border transition-colors',
              activeLocale === loc
                ? 'bg-accent text-white border-accent'
                : 'bg-transparent text-text-muted border-border hover:text-text',
            ].join(' ')}
          >
            {loc}
          </button>
        ))}
      </div>
    </div>
  );
};
