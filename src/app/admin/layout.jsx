import { getSession } from '@/lib/auth';
import { AdminShell } from './AdminShell';

export const metadata = {
  title: 'Admin — Avala Home Concept',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

export default async function AdminLayout({ children }) {
  const authed = await getSession();

  if (!authed) {
    return <div className="min-h-screen bg-bg">{children}</div>;
  }

  return <AdminShell>{children}</AdminShell>;
}
