// Fire-and-forget analytics beacon. Honors Do Not Track and never throws.
export const track = (payload) => {
  if (typeof navigator === 'undefined') return;
  if (navigator.doNotTrack === '1' || window.doNotTrack === '1') return;

  const body = JSON.stringify(payload);
  try {
    const blob = new Blob([body], { type: 'application/json' });
    if (!navigator.sendBeacon || !navigator.sendBeacon('/api/track', blob)) {
      fetch('/api/track', { method: 'POST', body, keepalive: true }).catch(() => {});
    }
  } catch {
    /* never let analytics break the page */
  }
};
