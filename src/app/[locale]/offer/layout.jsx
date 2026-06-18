import { getDictionary } from '@/i18n/getDictionary';
import { buildAlternates, SITE_URL, withLocale } from '@/i18n/config';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  return {
    title: dict.meta.offer.title,
    description: dict.meta.offer.description,
    alternates: buildAlternates(locale, '/offer'),
    openGraph: {
      title: `${dict.meta.offer.title} | ${dict.meta.siteName}`,
      description: dict.meta.offer.description,
      url: `${SITE_URL}${withLocale(locale, '/offer')}/`,
    },
  };
}

export default function Layout({ children }) {
  return children;
}
