import Link from 'next/link';
import { LuImages, LuHouse, LuArrowRight } from 'react-icons/lu';
import { prisma } from '@/lib/db';

export default async function AdminDashboard() {
  const [categories, images, projects] = await Promise.all([
    prisma.galleryCategory.count(),
    prisma.galleryImage.count(),
    prisma.project.count(),
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
  ];

  return (
    <div>
      <h1 style={{ fontFamily: 'var(--font-heading)' }} className="text-2xl text-text mb-1">
        Pregled
      </h1>
      <p className="text-sm text-text-muted mb-8">Upravljajte galerijom i projektima sajta.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
    </div>
  );
}
