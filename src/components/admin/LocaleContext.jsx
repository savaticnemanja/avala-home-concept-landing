'use client';

import { createContext, useContext, useState } from 'react';
import { LOCALES } from '@/lib/admin/constants';

// Holds the single, page-wide editing locale. Every LocaleFields group reads
// this so one switcher flips all translatable inputs at once.
const LocaleContext = createContext(null);

export const LocaleProvider = ({ children }) => {
  const [activeLocale, setActiveLocale] = useState(LOCALES[0]);
  return (
    <LocaleContext.Provider value={{ activeLocale, setActiveLocale }}>
      {children}
    </LocaleContext.Provider>
  );
};

// Falls back to the default locale if used outside a provider.
export const useActiveLocale = () => useContext(LocaleContext) ?? { activeLocale: LOCALES[0] };
