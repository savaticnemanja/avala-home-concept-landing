import Link from 'next/link';
import { LuImages, LuHouse, LuChartColumn, LuArrowRight } from 'react-icons/lu';
import { prisma } from '@/lib/db';
import { getMetricsOverview } from '@/lib/metrics';
import { TrendChart } from './metrics/TrendChart';
import { HourChart } from './metrics/HourChart';

const nf = new Intl.NumberFormat('sr-RS');

export default async function AdminDashboard() {
  const [categories, images, projects, m] = await Promise.all([
    prisma.galleryCategory.count(),
    prisma.galleryImage.count(),
    prisma.project.count(),
    getMetricsOverview(30),
  ]);

  const cards = [
    {
      href: '/admin/gallery',
      icon: LuImages,
      title: 'Galerija',
      desc: `${categories} kategorija · ${images} slika`,
    },
    {
      href: '/admin/projects',
      icon: LuHouse,
      title: 'Projekti',
      desc: `${projects} projekata`,
    },
    {
      href: '/admin/metrics',
      icon: LuChartColumn,
      title: 'Posete',
      desc: `${m.last7} poseta u 7 dana`,
    },
  ];

  const quickStats = [
    { label: 'Danas', value: m.today },
    { label: '7 dana', value: m.last7 },
    { label: '30 dana', value: m.last30 },
  ];

  return (
    <div>
      <h1 style={{ fontFamily: 'var(--font-heading)' }} className="text-2xl text-text mb-1">
        Pregled
      </h1>
      <p className="text-sm text-text-muted mb-8">Upravljajte galerijom i projektima sajta.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <Link
              key={c.href}
              href={c.href}
              className="group bg-bg-alt border border-border rounded-[6px] p-6 hover:border-accent transition-colors"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="w-10 h-10 flex items-center justify-center rounded-full bg-accent/10 text-accent">
                  <Icon className="w-5 h-5" />
                </span>
                <LuArrowRight className="w-4 h-4 text-text-muted group-hover:text-accent group-hover:translate-x-1 transition-all" />
              </div>
              <h2 className="text-lg text-text mb-0.5" style={{ fontFamily: 'var(--font-heading)' }}>
                {c.title}
              </h2>
              <p className="text-sm text-text-muted">{c.desc}</p>
            </Link>
          );
        })}
      </div>

      {/* General visit metrics — a snapshot; full breakdown lives on /admin/metrics. */}
      <div className="flex items-center justify-between mt-10 mb-4">
        <h2 className="text-lg text-text" style={{ fontFamily: 'var(--font-heading)' }}>
          Posete
        </h2>
        <Link
          href="/admin/metrics"
          className="text-sm text-text-muted hover:text-accent inline-flex items-center gap-1 transition-colors"
        >
          Sve metrike <LuArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        {quickStats.map((s) => (
          <div key={s.label} className="bg-bg-alt border border-border rounded-[6px] p-5">
            <div className="text-sm text-text-muted mb-2">{s.label}</div>
            <div className="text-2xl text-text" style={{ fontFamily: 'var(--font-heading)' }}>
              {nf.format(s.value)}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
        <div className="bg-bg-alt border border-border rounded-[6px] p-5">
          <h3 className="text-sm text-text mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
            Posete u poslednjih 30 dana
          </h3>
          <TrendChart series={m.series} />
        </div>
        <div className="bg-bg-alt border border-border rounded-[6px] p-5">
          <h3 className="text-sm text-text mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
            Posete po dobu dana
          </h3>
          <HourChart hourly={m.hourly} />
        </div>
      </div>
    </div>
  );
}
