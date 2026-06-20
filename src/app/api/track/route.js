import { NextResponse } from 'next/server';
import {
  isBot,
  deviceFromUA,
  clientIp,
  visitorHash,
  splitLocale,
  referrerHost,
  recordEvent,
} from '@/lib/metrics';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Public, cookieless analytics beacon. Accepts:
//   { type: "visit", path, referrer }  — recorded once per visitor per day
//   { type: "click", path, name }      — recorded once per visitor/target per day
// Always returns 204 so the client beacon never blocks navigation or errors.
export async function POST(request) {
  const noContent = new NextResponse(null, { status: 204 });

  const ua = request.headers.get('user-agent') ?? '';
  if (isBot(ua)) return noContent;

  const body = await request.json().catch(() => null);
  if (!body) return noContent;

  const type = body.type === 'click' ? 'click' : 'visit';
  const { locale, path } = splitLocale(String(body.path ?? '/'));
  const hash = visitorHash(clientIp(request.headers), ua);
  const device = deviceFromUA(ua);

  if (type === 'click') {
    const name = String(body.name ?? '').trim().slice(0, 80);
    if (!name) return noContent;
    await recordEvent({ type: 'click', name, path, locale, device, visitorHash: hash });
    return noContent;
  }

  await recordEvent({
    type: 'visit',
    path,
    locale,
    device,
    referrer: referrerHost(body.referrer, request.nextUrl.hostname),
    visitorHash: hash,
  });

  return noContent;
}
