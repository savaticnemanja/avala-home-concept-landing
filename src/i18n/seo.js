import { getDictionary } from './getDictionary';
import { buildAlternates, SITE_URL, withLocale, hreflang, locales } from './config';

// Per-route 1200×630 share image (files live under /public/og — next/image
// bundles src/assets with hashed names, so OG images must be in /public).
const OG_IMAGE = {
  '/': '/og/home.jpg',
  '/offer': '/og/offer.jpg',
  '/gallery': '/og/gallery.jpg',
  '/about-us': '/og/about.jpg',
  '/contact': '/og/contact.jpg',
  '/thank-you': '/og/home.jpg',
};

/**
 * Build a complete metadata object (title, description, canonical + hreflang,
 * Open Graph, Twitter card) for a route. Keeps every page consistent.
 */
export async function buildPageMetadata({ locale, path, metaKey, robots }) {
  const dict = await getDictionary(locale);
  const m = dict.meta[metaKey];
  const url = `${SITE_URL}${withLocale(locale, path)}/`;
  const image = `${SITE_URL}${OG_IMAGE[path] ?? OG_IMAGE['/']}`;
  const ogTitle = path === '/' ? m.title : `${m.title} | ${dict.meta.siteName}`;

  return {
    title: m.title,
    description: m.description,
    alternates: buildAlternates(locale, path),
    openGraph: {
      siteName: dict.meta.siteName,
      locale: hreflang[locale],
      alternateLocale: locales.filter((l) => l !== locale).map((l) => hreflang[l]),
      type: 'website',
      url,
      title: ogTitle,
      description: m.description,
      images: [{ url: image, width: 1200, height: 630, alt: ogTitle }],
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description: m.description,
      images: [image],
    },
    ...(robots ? { robots } : {}),
  };
}
