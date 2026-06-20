import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { saveUpload } from '@/lib/uploads';

export const runtime = 'nodejs';

export async function POST(request) {
  if (!(await getSession())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const form = await request.formData().catch(() => null);
  const file = form?.get('file');

  try {
    const result = await saveUpload(file);
    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json({ error: err.message ?? 'Upload failed.' }, { status: 400 });
  }
}
