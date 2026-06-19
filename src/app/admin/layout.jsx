import { getSession } from '@/lib/auth';
import { AdminNav } from './AdminNav';

export const metadata = {
  title: 'Admin — Avala Home Concept',
  robots: { index: false, follow: false },
};

// Admin pages are always rendered server-side from the DB.
export const dynamic = 'force-dynamic';

export default async function AdminLayout({ children }) {
  const authed = await getSession();

  // Not logged in (i.e. on /admin/login) — render the bare page, no shell.
  if (!authed) {
    return <div className="min-h-screen bg-bg">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-bg flex flex-col md:flex-row">
      <AdminNav />
      <main className="flex-1 min-w-0 p-4 md:p-8 max-w-5xl">{children}</main>
    </div>
  );
}
