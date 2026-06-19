import { cookies } from 'next/headers';
import { SignJWT, jwtVerify } from 'jose';

const COOKIE_NAME = 'ahc_admin';
const MAX_AGE = 60 * 60 * 24 * 7; // 7 days

const getSecret = () => {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 16) {
    throw new Error('SESSION_SECRET env var is missing or too short (min 16 chars).');
  }
  return new TextEncoder().encode(secret);
};

// Constant-time-ish comparison to avoid trivial timing leaks on the password.
export const passwordMatches = (input) => {
  const expected = process.env.ADMIN_PASSWORD ?? '';
  if (typeof input !== 'string' || input.length !== expected.length) return false;
  let mismatch = 0;
  for (let i = 0; i < expected.length; i += 1) {
    mismatch |= input.charCodeAt(i) ^ expected.charCodeAt(i);
  }
  return mismatch === 0 && expected.length > 0;
};

export const createSession = async () => {
  const token = await new SignJWT({ role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${MAX_AGE}s`)
    .sign(getSecret());

  const store = await cookies();
  store.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: MAX_AGE,
  });
};

export const destroySession = async () => {
  const store = await cookies();
  store.delete(COOKIE_NAME);
};

// Verify a raw token string (used by middleware and server components).
export const verifyToken = async (token) => {
  if (!token) return false;
  try {
    await jwtVerify(token, getSecret());
    return true;
  } catch {
    return false;
  }
};

// Read + verify the session from the cookie store (server components / actions).
export const getSession = async () => {
  const store = await cookies();
  const token = store.get(COOKIE_NAME)?.value;
  return verifyToken(token);
};

export const requireSession = async () => {
  const ok = await getSession();
  if (!ok) throw new Error('Unauthorized');
};

export const SESSION_COOKIE = COOKIE_NAME;
