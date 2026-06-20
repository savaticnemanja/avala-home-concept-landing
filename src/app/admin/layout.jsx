import { getSession } from '@/lib/auth';
import { AdminShell } from './AdminShell';

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

  return <AdminShell>{children}</AdminShell>;
}
