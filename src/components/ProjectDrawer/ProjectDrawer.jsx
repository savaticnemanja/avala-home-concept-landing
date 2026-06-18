'use client';
import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { LuArrowUpRight, LuBed, LuMaximize2, LuSunrise, LuX } from 'react-icons/lu';
import { useI18n } from '@/i18n/I18nProvider';

// Full-screen image zoom layered above the drawer panel.
const ZoomViewer = ({ images, index, onClose, onSetIndex }) => {
  const prev = useCallback(
    () => onSetIndex((i) => (i - 1 + images.length) % images.length),
    [images.length, onSetIndex]
  );
  const next = useCallback(
    () => onSetIndex((i) => (i + 1) % images.length),
    [images.length, onSetIndex]
  );

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, prev, next]);

  if (index === null) return null;
  const { src, alt } = images[index];
  const imgSrc = typeof src === 'string' ? src : src.src;

  return (
    <div
      className="fixed inset-0 z-[80] bg-bg-dark/95 flex items-center justify-center"
      onClick={onClose}
    >
      <button
        className="absolute top-4 right-4 text-text-light text-3xl leading-none hover:text-accent transition-colors"
        onClick={onClose}
        aria-label="Zatvori"
      >
        &#x2715;
      </button>
      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 text-text-light text-5xl leading-none hover:text-accent transition-colors p-2"
        onClick={(e) => { e.stopPropagation(); prev(); }}
        aria-label="Prethodna"
      >
        &#8249;
      </button>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imgSrc}
        alt={alt}
        className="max-h-[90vh] max-w-[90vw] object-contain rounded-[4px]"
        onClick={(e) => e.stopPropagation()}
      />
      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 text-text-light text-5xl leading-none hover:text-accent transition-colors p-2"
        onClick={(e) => { e.stopPropagation(); next(); }}
        aria-label="Sledeća"
      >
        &#8250;
      </button>
    </div>
  );
};

export const ProjectDrawer = ({ project, onClose }) => {
  const { t, dict, href } = useI18n();
  // Keep the last project mounted while the panel animates out.
  const [active, setActive] = useState(project);
  const [visible, setVisible] = useState(false);
  const [zoom, setZoom] = useState(null);

  useEffect(() => {
    if (project) {
      setActive(project);
      const id = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(id);
    }
    setVisible(false);
    setZoom(null);
  }, [project]);

  useEffect(() => {
    document.body.style.overflow = project ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [project]);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape' && zoom === null) onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, zoom]);

  const detail = active ? dict.projects[active.dictKey] : null;
  const title = detail?.title ?? '';
  const rooms = active?.netAreas
    ? detail.rooms.map((name, i) => ({ name, area: active.netAreas[i] }))
    : null;

  // Zoomable set: hero render → plan → render gallery.
  const zoomImages = active
    ? [
        { src: active.heroImage, alt: title },
        { src: active.planImage, alt: `${title} — ${t('offer.drawer.plan')}` },
        ...active.renderImages.map((src, i) => ({ src, alt: `${title} ${i + 1}` })),
      ]
    : [];

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[60] bg-bg-dark/50 backdrop-blur-[2px] transition-opacity duration-300"
        style={{ opacity: visible ? 1 : 0, pointerEvents: project ? 'auto' : 'none' }}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <aside
        className="fixed top-0 right-0 bottom-0 z-[60] w-full max-w-[640px] bg-bg flex flex-col shadow-[-8px_0_40px_rgba(26,25,21,0.18)]"
        style={{
          transform: visible ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
        }}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        aria-hidden={!project}
      >
        {active && (
          <>
            {/* Sticky header */}
            <div className="flex items-center justify-between gap-4 px-5 md:px-8 h-16 md:h-20 border-b border-border flex-shrink-0 bg-bg/95 backdrop-blur-md">
              <div className="min-w-0">
                <span className="overline mt-0 block truncate">{t('offer.eyebrow')}</span>
                <h2
                  className="text-text truncate"
                  style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.2rem,2.5vw,1.7rem)', fontWeight: 400, lineHeight: 1.1 }}
                >
                  {title}
                </h2>
              </div>
              <button
                onClick={onClose}
                aria-label={t('offer.drawer.close')}
                className="flex-shrink-0 w-10 h-10 flex items-center justify-center border border-border rounded-full text-text-muted hover:text-accent hover:border-accent transition-colors duration-200"
              >
                <LuX className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable body */}
            <div className="flex-1 overflow-y-auto">
              {/* Hero render */}
              <button
                className="relative block w-full h-[34vh] min-h-[220px] overflow-hidden group"
                onClick={() => setZoom(0)}
                aria-label={title}
              >
                <Image
                  src={active.heroImage}
                  alt={title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span
                  className="absolute top-4 right-4 px-3 py-1 text-[0.68rem] font-medium tracking-[0.15em] uppercase text-white"
                  style={{ backgroundColor: 'rgba(196,151,90,0.92)', fontFamily: 'var(--font-body)', backdropFilter: 'blur(4px)' }}
                >
                  {t(`offer.cards.${active.cardIndex}.badge`)}
                </span>
              </button>

              <div className="px-5 md:px-8 py-7 md:py-9 flex flex-col gap-9">
                {/* Quick stats */}
                <div className="flex flex-wrap items-end justify-between gap-4 -mt-1">
                  <p
                    className="text-text-muted text-[0.7rem] font-medium tracking-[0.15em] uppercase"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    {t(`offer.cards.${active.cardIndex}.subtitle`)}
                  </p>
                  <div className="text-right">
                    <span
                      className="text-accent"
                      style={{ fontFamily: 'var(--font-heading)', fontSize: '2.4rem', fontWeight: 400, lineHeight: 1 }}
                    >
                      {active.area}
                    </span>
                    <span className="text-text-muted text-sm"> m²</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-5 py-4 border-y border-border">
                  <span className="flex items-center gap-2 text-sm font-light text-text-muted">
                    <LuBed className="w-4 h-4 text-accent" />
                    {active.beds} {t('offer.rooms')}
                  </span>
                  {active.terrace && (
                    <span className="flex items-center gap-2 text-sm font-light text-text-muted">
                      <LuSunrise className="w-4 h-4 text-accent" />
                      {t('offer.terrace')} {active.terrace}
                    </span>
                  )}
                  <span className="flex items-center gap-2 text-sm font-light text-text-muted">
                    <LuMaximize2 className="w-4 h-4 text-accent" />
                    {active.area} m²
                  </span>
                </div>

                {/* Description */}
                {detail?.description && (
                  <p className="text-text-muted font-light leading-relaxed">{detail.description}</p>
                )}

                {/* Plan */}
                <div className="flex flex-col gap-4">
                  <p className="text-[0.72rem] font-medium tracking-[0.18em] uppercase text-accent">
                    {t('offer.drawer.plan')}
                  </p>
                  <button
                    className="block w-full rounded-[4px] overflow-hidden border border-border bg-bg-alt hover:shadow-lg transition-shadow duration-200"
                    onClick={() => setZoom(1)}
                  >
                    <Image
                      src={active.planImage}
                      alt={`${title} — ${t('offer.drawer.plan')}`}
                      width={700}
                      height={500}
                      className="w-full h-auto"
                      loading="lazy"
                    />
                  </button>
                </div>

                {/* Square footage */}
                {rooms && (
                  <div className="flex flex-col gap-4">
                    <p className="text-[0.72rem] font-medium tracking-[0.18em] uppercase text-accent">
                      {t('projectPage.netSurfaceLabel')}
                    </p>
                    <table className="w-full text-sm border-collapse">
                      <tbody>
                        {rooms.map((row, i) => (
                          <tr key={i} className="border-b border-border/50 last:border-0">
                            <td className="py-2 font-light text-text">{row.name}</td>
                            <td className="py-2 text-right text-text-muted font-light">{row.area}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="pt-3 border-t border-border flex justify-between items-center">
                      <span className="text-sm font-medium text-text">{t('projectPage.total')}</span>
                      <span className="text-accent font-medium">{active.surfaceArea} m²</span>
                    </div>
                  </div>
                )}

                {/* 3D renders */}
                <div className="flex flex-col gap-4">
                  <p className="text-[0.72rem] font-medium tracking-[0.18em] uppercase text-accent">
                    {t('offer.drawer.renders')}
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {active.renderImages.map((img, i) => (
                      <button
                        key={i}
                        className="rounded-[4px] overflow-hidden border border-border hover:-translate-y-[2px] hover:shadow-md transition-all duration-200"
                        onClick={() => setZoom(i + 2)}
                      >
                        <Image
                          src={img}
                          alt={`${title} ${i + 1}`}
                          width={400}
                          height={300}
                          className="w-full h-40 object-cover"
                          loading="lazy"
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="flex flex-col sm:flex-row gap-3 pt-1">
                  <Link href={href('/contact')} className="btn-primary justify-center flex-1" onClick={onClose}>
                    {t('offer.drawer.requestOffer')}
                    <LuArrowUpRight className="w-4 h-4" />
                  </Link>
                  <a href="tel:+38163383393" className="btn-ghost justify-center">
                    +381 63 383 393
                  </a>
                </div>
              </div>
            </div>
          </>
        )}
      </aside>

      <ZoomViewer images={zoomImages} index={zoom} onClose={() => setZoom(null)} onSetIndex={setZoom} />
    </>
  );
};
