import { Contact } from '@/components';
import { buildPageMetadata } from '@/i18n/seo';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return buildPageMetadata({ locale, path: '/contact', metaKey: 'contact' });
}

export default function ContactPage() {
  return (
    <main className="pt-20">
      <Contact headingTag="h1" />
    </main>
  );
}
