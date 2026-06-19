'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LuLock, LuLoader } from 'react-icons/lu';

export default function LoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Greška.');
      router.push('/admin');
      router.refresh();
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form
        onSubmit={submit}
        className="w-full max-w-sm bg-bg-alt border border-border rounded-[6px] p-8 shadow-[0_12px_40px_rgba(26,25,21,0.10)]"
      >
        <div className="flex flex-col items-center gap-2 mb-6 text-center">
          <span className="w-11 h-11 flex items-center justify-center rounded-full bg-accent/10 text-accent">
            <LuLock className="w-5 h-5" />
          </span>
          <h1 style={{ fontFamily: 'var(--font-heading)' }} className="text-xl text-text">
            Avala Admin
          </h1>
          <p className="text-sm text-text-muted font-light">Unesite lozinku za pristup.</p>
        </div>

        <label className="block text-xs font-medium uppercase tracking-wide text-text-muted mb-1.5">
          Lozinka
        </label>
        <input
          type="password"
          autoFocus
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-bg border border-border rounded-[3px] px-3 py-2.5 text-sm text-text focus:outline-none focus:border-accent"
        />

        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={loading || !password}
          className="mt-5 w-full flex items-center justify-center gap-2 bg-accent text-white py-2.5 rounded-[3px] hover:bg-accent-hover disabled:opacity-50 transition-colors"
        >
          {loading && <LuLoader className="w-4 h-4 animate-spin" />}
          Prijava
        </button>
      </form>
    </div>
  );
}
