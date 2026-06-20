'use client';

import { useEffect } from 'react';
import { track } from './beacon';

// Fires a visit beacon on page load. It runs once per mount — the [locale]
// layout persists across in-app navigation, so this does not re-fire when
// moving between pages. The server dedupes to one visit per visitor per day,
// so refreshes and repeat visits never inflate the count.
export const PageTracker = () => {
  useEffect(() => {
    track({
      type: 'visit',
      path: window.location.pathname,
      referrer: document.referrer || '',
    });
  }, []);

  return null;
};
