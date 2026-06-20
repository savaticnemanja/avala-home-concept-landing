import { createHash } from 'crypto';
import { prisma } from '@/lib/db';
import { locales } from '@/i18n/config';

const BOT_RE =
  /bot|crawl|spider|slurp|bingpreview|facebookexternalhit|whatsapp|telegram|preview|monitor|headless|lighthouse|pingdom|gtmetrix|curl|wget|python-requests|axios|node-fetch/i;

export const isBot = (ua = '') => !ua || BOT_RE.test(ua);

export const deviceFromUA = (ua = '') =>
  /mobile|android|iphone|ipad|ipod|windows phone/i.test(ua) ? 'mobile' : 'desktop';

export const clientIp = (headers) => {
  const xff = headers.get('x-forwarded-for');
  if (xff) return xff.split(',')[0].trim();
  return headers.get('x-real-ip') || '';
};

// Salt rotates daily: same visitor gets a different hash each day — cookieless, untrackable across days.
const dailySalt = () => {
  const day = new Date().toISOString().slice(0, 10);
  return `${day}:${process.env.SESSION_SECRET ?? 'ahc'}`;
};

export const visitorHash = (ip, ua) =>
  createHash('sha256').update(`${ip}|${ua}|${dailySalt()}`).digest('hex').slice(0, 32);

export const splitLocale = (rawPath = '/') => {
  const clean = (rawPath.split('?')[0].split('#')[0] || '/').replace(/\/+$/, '') || '/';
  const [, first, ...rest] = clean.split('/');
  if (locales.includes(first)) {
    return { locale: first, path: `/${rest.join('/')}`.replace(/\/+$/, '') || '/' };
  }
  return { locale: '', path: clean };
};

export const referrerHost = (ref = '', selfHost = '') => {
  if (!ref) return '';
  try {
    const { hostname } = new URL(ref);
    if (selfHost && hostname === selfHost) return '';
    return hostname.replace(/^www\./, '');
  } catch {
    return '';
  }
};

// Unique [visitorHash, type, name] DB constraint silently rejects same-day repeats;
// upsert with an empty update is the race-safe insert-once pattern.
export const recordEvent = ({ type, name = '', visitorHash, ...rest }) =>
  prisma.pageView
    .upsert({
      where: { visitorHash_type_name: { visitorHash, type, name } },
      create: { type, name, visitorHash, ...rest },
      update: {},
    })
    .catch(() => null);

const dayKey = (d) => new Date(d).toISOString().slice(0, 10);
const since = (days) => new Date(Date.now() - days * 86400_000);

const visitsInWindow = (days) =>
  prisma.pageView.count({ where: { type: 'visit', createdAt: { gte: since(days) } } });

const visitInsights = async (days) => {
  const rows = await prisma.pageView.findMany({
    where: { type: 'visit', createdAt: { gte: since(days) } },
    select: { createdAt: true },
  });

  const counts = new Map();
  const hourly = Array.from({ length: 24 }, () => 0);
  for (const r of rows) {
    const k = dayKey(r.createdAt);
    counts.set(k, (counts.get(k) ?? 0) + 1);
    hourly[new Date(r.createdAt).getHours()] += 1;
  }

  const series = [];
  for (let i = days - 1; i >= 0; i -= 1) {
    const k = dayKey(Date.now() - i * 86400_000);
    series.push({ day: k, visits: counts.get(k) ?? 0 });
  }
  return { series, hourly };
};

const topVisits = async (field, days, take = 8, where = {}) => {
  const rows = await prisma.pageView.groupBy({
    by: [field],
    where: { type: 'visit', createdAt: { gte: since(days) }, ...where },
    _count: { _all: true },
    orderBy: { _count: { [field]: 'desc' } },
    take,
  });
  return rows.map((r) => ({ key: r[field], count: r._count._all }));
};

const CONVERSION_RE = /^(email|phone)$|wa\.me|whatsapp|viber|t\.me|telegram|\/contact|\/kontakt|instagram|facebook/i;
export const isConversion = (name = '') => CONVERSION_RE.test(name);

const clickInsights = async (days, totalVisits) => {
  const rows = await prisma.pageView.findMany({
    where: { type: 'click', createdAt: { gte: since(days) } },
    select: { name: true, visitorHash: true },
  });

  const byName = new Map();
  const engaged = new Set();
  const converters = new Set();
  for (const r of rows) {
    byName.set(r.name, (byName.get(r.name) ?? 0) + 1);
    engaged.add(r.visitorHash);
    if (isConversion(r.name)) converters.add(r.visitorHash);
  }

  const ctr = [...byName.entries()]
    .map(([name, clicks]) => ({ name, clicks, ctr: totalVisits > 0 ? clicks / totalVisits : 0 }))
    .sort((a, b) => b.ctr - a.ctr);

  const rate = (n) => (totalVisits > 0 ? n / totalVisits : 0);
  return {
    ctr,
    engagement: { count: engaged.size, rate: rate(engaged.size) },
    conversions: { count: converters.size, rate: rate(converters.size) },
  };
};

const projectLeads = async (days, take = 5) => {
  const rows = await prisma.pageView.groupBy({
    by: ['name'],
    where: {
      type: 'click',
      createdAt: { gte: since(days) },
      name: { contains: 'offer' },
    },
    _count: { _all: true },
    orderBy: { _count: { name: 'desc' } },
    take,
  });
  return rows.map((r) => ({ name: r.name, leads: r._count._all }));
};

export const getMetricsOverview = async (days = 30) => {
  const [today, last7, last30, insights, entryPages, byLocale, referrers, byDevice, total, topProjects] =
    await Promise.all([
      visitsInWindow(1),
      visitsInWindow(7),
      visitsInWindow(30),
      visitInsights(days),
      topVisits('path', days),
      topVisits('locale', days),
      topVisits('referrer', days, 8, { referrer: { not: '' } }),
      topVisits('device', days),
      prisma.pageView.count({ where: { type: 'visit' } }),
      projectLeads(days),
    ]);

  const { ctr, engagement, conversions } = await clickInsights(days, last30);

  return {
    today,
    last7,
    last30,
    total,
    series: insights.series,
    hourly: insights.hourly,
    entryPages,
    byLocale,
    referrers,
    byDevice,
    ctr,
    engagement,
    conversions,
    topProjects,
  };
};
