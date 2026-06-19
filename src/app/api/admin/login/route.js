import { NextResponse } from 'next/server';
import { passwordMatches, createSession } from '@/lib/auth';

export async function POST(request) {
  let password = '';
  const contentType = request.headers.get('content-type') ?? '';

  if (contentType.includes('application/json')) {
    const body = await request.json().catch(() => ({}));
    password = body?.password ?? '';
  } else {
    const form = await request.formData().catch(() => null);
    password = form?.get('password')?.toString() ?? '';
  }

  if (!passwordMatches(password)) {
    return NextResponse.json({ error: 'Pogrešna lozinka.' }, { status: 401 });
  }

  await createSession();
  return NextResponse.json({ ok: true });
}
