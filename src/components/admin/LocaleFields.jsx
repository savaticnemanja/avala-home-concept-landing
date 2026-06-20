'use client';
import { LOCALES, LOCALE_LABELS } from '@/lib/admin/constants';
import { useActiveLocale } from './LocaleContext';

const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

// Per-locale text input group. All inputs stay mounted (so the form submits
// every locale), but only the page-wide active locale is visible — driven by
// the single <LocaleSwitcher/>. Field names are `${base}_${locale}` to match
// localeFields() in actions.js.
export const LocaleFields = ({ base, label, values = {}, multiline = false, required = false, placeholder = '' }) => {
  const { activeLocale } = useActiveLocale();
  const inputClass =
    'w-full bg-bg-alt border border-border rounded-[3px] px-3 py-2 text-sm text-text placeholder-text-muted focus:outline-none focus:border-accent';

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <span className="text-xs font-medium tracking-wide uppercase text-text-muted">
          {label}
          <span className="ml-1.5 normal-case tracking-normal text-text-muted/60">
            · {LOCALE_LABELS[activeLocale]}
          </span>
        </span>
      )}

      {LOCALES.map((loc) => {
        const name = `${base}_${loc}`;
        const value = values[`${base}${cap(loc)}`] ?? '';
        const hidden = loc !== activeLocale;
        const commonProps = {
          name,
          defaultValue: value,
          placeholder,
          // Only enforce/validate the visible field to avoid hidden-required errors;
          // the server still requires SR (see actions.js).
          required: required && loc === 'sr' && !hidden,
          'aria-hidden': hidden,
          tabIndex: hidden ? -1 : undefined,
        };
        return multiline ? (
          <textarea
            key={loc}
            {...commonProps}
            rows={4}
            className={`${inputClass} resize-y ${hidden ? 'hidden' : ''}`}
          />
        ) : (
          <input key={loc} {...commonProps} className={`${inputClass} ${hidden ? 'hidden' : ''}`} />
        );
      })}
    </div>
  );
};
