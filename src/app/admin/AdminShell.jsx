'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  LuLayoutDashboard,
  LuImages,
  LuHouse,
  LuChartColumn,
  LuLogOut,
  LuExternalLink,
  LuMenu,
  LuX,
} from 'react-icons/lu';
import { LocaleProvider } from '@/components/admin/LocaleContext';
import { LocaleSwitcher } from '@/components/admin/LocaleSwitcher';

const LINKS = [
  { href: '/admin', label: 'Pregled', icon: LuLayoutDashboard, exact: true },
  { href: '/admin/gallery', label: 'Galerija', icon: LuImages },
  { href: '/admin/projects', label: 'Projekti', icon: LuHouse },
  { href: '/admin/metrics', label: 'Posete', icon: LuChartColumn },
];

const LOCALIZED = ['/admin/gallery', '/admin/projects'];

const Brand = () => (
  <span style={{ fontFamily: 'var(--font-heading)' }} className="text-lg text-text">
    Avala <span className="text-accent">Admin</span>
  </span>
);

export const AdminShell = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => setMenuOpen(false), [pathname]);

  const isActive = (link) => (link.exact ? pathname === link.href : pathname.startsWith(link.href));
  const showSwitcher = LOCALIZED.some((p) => pathname.startsWith(p));

  const logout = async () => {
    setLoading(true);
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  };

  const NavLinks = ({ onNavigate }) => (
    <nav className="flex flex-col gap-1">
      {LINKS.map((link) => {
        const Icon = link.icon;
        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={onNavigate}
            aria-current={isActive(link) ? 'page' : undefined}
            className={[
              'flex items-center gap-3 px-3 py-2.5 rounded-[4px] text-sm transition-colors',
              isActive(link)
                ? 'bg-accent text-white'
                : 'text-text-muted hover:bg-bg hover:text-text',
            ].join(' ')}
          >
            <Icon className="w-4 h-4 flex-shrink-0" />
            {link.label}
          </Link>
        );
      })}
    </nav>
  );

  const FooterActions = ({ onNavigate }) => (
    <div className="flex flex-col gap-1">
      <a
        href="/"
        target="_blank"
        rel="noreferrer"
        onClick={onNavigate}
        className="flex items-center gap-3 px-3 py-2.5 rounded-[4px] text-sm text-text-muted hover:bg-bg hover:text-text transition-colors"
      >
        <LuExternalLink className="w-4 h-4" />
        Sajt
      </a>
      <button
        onClick={logout}
        disabled={loading}
        className="flex items-center gap-3 px-3 py-2.5 rounded-[4px] text-sm text-text-muted hover:bg-bg hover:text-text transition-colors disabled:opacity-50"
      >
        <LuLogOut className="w-4 h-4" />
        Odjava
      </button>
    </div>
  );

  return (
    <LocaleProvider>
      <div className="min-h-screen bg-bg md:flex">
        {/* Desktop sidebar — fixed full height, content scrolls independently. */}
        <aside className="hidden md:flex md:flex-col md:w-60 md:h-screen md:sticky md:top-0 border-r border-border bg-bg-alt">
          <div className="px-5 py-5 border-b border-border flex items-center">
            <Brand />
          </div>
          <div className="flex-1 overflow-y-auto p-3">
            <NavLinks />
          </div>
          <div className="p-3 border-t border-border">
            <FooterActions />
          </div>
        </aside>

        {/* Mobile top bar */}
        <header className="md:hidden sticky top-0 z-40 flex items-center justify-between px-4 py-3 border-b border-border bg-bg-alt">
          <Brand />
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="admin-mobile-menu"
            aria-label={menuOpen ? 'Zatvori meni' : 'Otvori meni'}
            className="w-10 h-10 flex items-center justify-center rounded-[4px] border border-border text-text"
          >
            {menuOpen ? <LuX className="w-5 h-5" /> : <LuMenu className="w-5 h-5" />}
          </button>
        </header>

        {/* Mobile drawer */}
        {menuOpen && (
          <>
            <div
              className="md:hidden fixed inset-0 top-[57px] z-30 bg-black/40"
              onClick={() => setMenuOpen(false)}
              aria-hidden
            />
            <div
              id="admin-mobile-menu"
              className="md:hidden fixed top-[57px] inset-x-0 z-40 bg-bg-alt border-b border-border p-3 flex flex-col gap-3 max-h-[calc(100vh-57px)] overflow-y-auto"
            >
              <NavLinks onNavigate={() => setMenuOpen(false)} />
              <div className="border-t border-border pt-3">
                <FooterActions onNavigate={() => setMenuOpen(false)} />
              </div>
            </div>
          </>
        )}

        {/* Main content */}
        <div className="flex-1 min-w-0 flex flex-col">
          {showSwitcher && (
            <div className="sticky top-[57px] md:top-0 z-20 flex items-center justify-end gap-3 px-4 md:px-8 py-2.5 border-b border-border bg-bg/95 backdrop-blur">
              <span className="text-xs text-text-muted hidden sm:inline">Jezik unosa:</span>
              <LocaleSwitcher />
            </div>
          )}
          <main className="flex-1 p-4 md:p-8 max-w-[1200px] w-full">{children}</main>
        </div>
      </div>
    </LocaleProvider>
  );
};
