'use client';
import { useState } from 'react';
import { LOCALES, LOCALE_LABELS } from '@/lib/admin/constants';

const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

// Per-locale text input group. Renders one set of inputs (sr/en/ru/de) behind tabs.
// All inputs stay mounted so the whole form submits every locale.
// Field names are `${base}_${locale}` to match localeFields() in actions.js.
export const LocaleFields = ({ base, label, values = {}, multiline = false, required = false, placeholder = '' }) => {
  const [active, setActive] = useState('sr');
  const inputClass =
    'w-full bg-bg-alt border border-border rounded-[3px] px-3 py-2 text-sm text-text placeholder-text-muted focus:outline-none focus:border-accent';

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        {label && <span className="text-xs font-medium tracking-wide uppercase text-text-muted">{label}</span>}
        <div className="flex gap-1">
          {LOCALES.map((loc) => (
            <button
              key={loc}
              type="button"
              onClick={() => setActive(loc)}
              className={[
                'px-2 py-0.5 text-[0.65rem] uppercase tracking-wide rounded-[2px] border transition-colors',
                active === loc
                  ? 'bg-accent text-white border-accent'
                  : 'bg-transparent text-text-muted border-border hover:text-text',
              ].join(' ')}
              title={LOCALE_LABELS[loc]}
            >
              {loc}
            </button>
          ))}
        </div>
      </div>

      {LOCALES.map((loc) => {
        const name = `${base}_${loc}`;
        const value = values[`${base}${cap(loc)}`] ?? '';
        const hidden = loc !== active;
        return multiline ? (
          <textarea
            key={loc}
            name={name}
            defaultValue={value}
            rows={4}
            placeholder={placeholder}
            required={required && loc === 'sr'}
            className={`${inputClass} resize-y ${hidden ? 'hidden' : ''}`}
          />
        ) : (
          <input
            key={loc}
            name={name}
            defaultValue={value}
            placeholder={placeholder}
            required={required && loc === 'sr'}
            className={`${inputClass} ${hidden ? 'hidden' : ''}`}
          />
        );
      })}
    </div>
  );
};
