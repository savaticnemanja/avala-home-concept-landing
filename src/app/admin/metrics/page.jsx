import { LuUsers, LuMousePointerClick, LuPhoneCall, LuActivity } from 'react-icons/lu';
import { getMetricsOverview } from '@/lib/metrics';
import { LOCALE_LABELS } from '@/lib/admin/constants';
import { TrendChart } from './TrendChart';
import { HourChart } from './HourChart';

const nf = new Intl.NumberFormat('sr-RS');
const pf = new Intl.NumberFormat('sr-RS', { style: 'percent', maximumFractionDigits: 1 });

const Stat = ({ icon: Icon, label, value, sub }) => (
  <div className="bg-bg-alt border border-border rounded-[6px] p-5">
    <div className="flex items-center gap-2 text-text-muted mb-3">
      <Icon className="w-4 h-4 text-accent" />
      <span className="text-sm">{label}</span>
    </div>
    <div className="text-2xl text-text" style={{ fontFamily: 'var(--font-heading)' }}>
      {nf.format(value)}
    </div>
    {sub != null && <div className="text-xs text-text-muted mt-1">{sub}</div>}
  </div>
);

// A simple horizontal bar list (entry pages / referrers / locales / devices).
const BarList = ({ title, rows, format = (k) => k, empty = 'Nema podataka.' }) => {
  const max = Math.max(1, ...rows.map((r) => r.count));
  return (
    <div className="bg-bg-alt border border-border rounded-[6px] p-5">
      <h2 className="text-sm text-text mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
        {title}
      </h2>
      {rows.length === 0 ? (
        <p className="text-xs text-text-muted">{empty}</p>
      ) : (
        <ul className="space-y-2.5">
          {rows.map((r) => (
            <li key={r.key} className="relative">
              <div className="flex items-center justify-between text-sm relative z-10 px-2 py-1">
                <span className="text-text truncate pr-3">{format(r.key)}</span>
                <span className="text-text-muted tabular-nums flex-shrink-0">
                  {nf.format(r.count)}
                </span>
              </div>
              <div
                className="absolute inset-y-0 left-0 bg-accent/10 rounded-[3px]"
                style={{ width: `${(r.count / max) * 100}%` }}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default async function AdminMetricsPage() {
  const m = await getMetricsOverview(30);

  const localeLabel = (k) => LOCALE_LABELS[k] ?? (k || 'nepoznato');
  const deviceLabel = (k) => ({ mobile: 'Mobilni', desktop: 'Desktop' }[k] ?? (k || 'nepoznato'));
  const maxCtr = Math.max(1e-9, ...m.ctr.map((c) => c.ctr));

  return (
    <div>
      <h1 style={{ fontFamily: 'var(--font-heading)' }} className="text-2xl text-text mb-1">
        Posete
      </h1>
      <p className="text-sm text-text-muted mb-8">
        Jedinstvene posete (jedan posetilac = jedna poseta dnevno, bez kolačića). Osvežavanje i
        kretanje kroz sajt ne uvećavaju broj. Ukupno: {nf.format(m.total)} poseta.
      </p>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        <Stat icon={LuUsers} label="Posete danas" value={m.today} />
        <Stat icon={LuUsers} label="Posete (7 dana)" value={m.last7} />
        <Stat icon={LuUsers} label="Posete (30 dana)" value={m.last30} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <Stat
          icon={LuPhoneCall}
          label="Kontakti (30 dana)"
          value={m.conversions.count}
          sub={`${pf.format(m.conversions.rate)} poseta ostvari kontakt`}
        />
        <Stat
          icon={LuActivity}
          label="Angažovanost"
          value={Math.round(m.engagement.rate * 100)}
          sub={`${pf.format(m.engagement.rate)} poseta klikne nešto`}
        />
        <Stat
          icon={LuMousePointerClick}
          label="Najjači CTR"
          value={m.ctr[0] ? Math.round(m.ctr[0].ctr * 100) : 0}
          sub={m.ctr[0] ? `${m.ctr[0].name} (${pf.format(m.ctr[0].ctr)})` : 'Nema klikova još'}
        />
      </div>

      <div className="bg-bg-alt border border-border rounded-[6px] p-5 mb-8">
        <h2 className="text-sm text-text mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
          Posete u poslednjih 30 dana
        </h2>
        <TrendChart series={m.series} />
      </div>

      <div className="bg-bg-alt border border-border rounded-[6px] p-5 mb-8">
        <h2 className="text-sm text-text mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
          Posete po dobu dana
        </h2>
        <p className="text-xs text-text-muted mb-4">Kada je najbolje vreme za objave i dostupnost.</p>
        <HourChart hourly={m.hourly} />
      </div>

      {/* Click-through rate per tracked target (clicks ÷ visits in last 30 days). */}
      <div className="bg-bg-alt border border-border rounded-[6px] p-5 mb-8">
        <div className="flex items-center gap-2 mb-4">
          <LuMousePointerClick className="w-4 h-4 text-accent" />
          <h2 className="text-sm text-text" style={{ fontFamily: 'var(--font-heading)' }}>
            CTR po elementima (30 dana)
          </h2>
        </div>
        {m.ctr.length === 0 ? (
          <p className="text-xs text-text-muted">
            Još nema zabeleženih klikova. Klikovi na linkove i dugmad se mere automatski.
          </p>
        ) : (
          <ul className="space-y-2.5">
            {m.ctr.map((c) => (
              <li key={c.name} className="relative">
                <div className="flex items-center justify-between text-sm relative z-10 px-2 py-1.5">
                  <span className="text-text truncate pr-3">{c.name}</span>
                  <span className="text-text-muted tabular-nums flex-shrink-0">
                    {pf.format(c.ctr)}{' '}
                    <span className="text-text-muted/60">· {nf.format(c.clicks)}</span>
                  </span>
                </div>
                <div
                  className="absolute inset-y-0 left-0 bg-accent/10 rounded-[3px]"
                  style={{ width: `${(c.ctr / maxCtr) * 100}%` }}
                />
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <BarList title="Ulazne stranice" rows={m.entryPages} format={(k) => k || '/'} />
        <BarList title="Izvori poseta" rows={m.referrers} empty="Uglavnom direktne posete." />
        <BarList title="Jezici" rows={m.byLocale} format={localeLabel} />
        <BarList title="Uređaji" rows={m.byDevice} format={deviceLabel} />
      </div>
    </div>
  );
}
