'use client';

import { createContext, useContext, useState } from 'react';
import { LOCALES } from '@/lib/admin/constants';

const LocaleContext = createContext(null);

export const LocaleProvider = ({ children }) => {
  const [activeLocale, setActiveLocale] = useState(LOCALES[0]);
  return (
    <LocaleContext.Provider value={{ activeLocale, setActiveLocale }}>
      {children}
    </LocaleContext.Provider>
  );
};

export const useActiveLocale = () => useContext(LocaleContext) ?? { activeLocale: LOCALES[0] };
