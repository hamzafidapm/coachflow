'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { Icon } from '@/components/icon';
import { registerAccount } from '@/lib/actions/auth';

export function SignupForm({ googleEnabled }: { googleEnabled: boolean }) {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      const result = await registerAccount({ name, email, password });
      if (result.error) {
        setError(result.error);
        return;
      }
      const res = await signIn('credentials', { email, password, redirect: false, callbackUrl });
      if (res?.error) setError('Account created — please sign in.');
      else if (res?.url) window.location.href = res.url;
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  function handleGoogle() {
    setError(null);
    if (!googleEnabled) {
      setError('Google sign-in isn’t configured for this workspace yet. Use email and password instead.');
      return;
    }
    setGoogleLoading(true);
    signIn('google', { callbackUrl });
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] min-h-screen bg-bg text-text">
      <div className="hidden lg:block relative overflow-hidden bg-surface-raised border-r border-[#1C1F24]">
        <div
          className="absolute -inset-[20%] blur-[30px]"
          style={{
            background:
              'radial-gradient(42% 42% at 30% 35%, rgba(47,216,166,.30), transparent 70%),radial-gradient(40% 40% at 72% 68%, rgba(56,120,255,.22), transparent 72%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(180deg,rgba(10,11,13,.15),rgba(10,11,13,.85))' }}
        />
        <div className="relative h-full flex flex-col justify-between p-11 px-13">
          <div className="flex items-center gap-2.5">
            <div className="w-[30px] h-[30px] rounded-[9px] bg-accent flex items-center justify-center text-accent-ink font-extrabold text-[15px]">
              C
            </div>
            <div className="font-bold text-[17px] tracking-tight">CoachFlow</div>
          </div>
          <div className="max-w-[420px]">
            <div className="text-[38px] leading-[1.15] font-bold tracking-tight">
              Set up your coaching workspace in minutes.
            </div>
            <div className="mt-4 text-[15px] leading-relaxed text-text-muted">
              Clients, cohorts, calendars and cash flow — one workspace, no spreadsheet archaeology.
            </div>
          </div>
          <div className="flex gap-7 font-mono text-xs text-text-faint">
            <div>
              <span className="text-accent">12,400+</span> coaches
            </div>
            <div>
              <span className="text-accent">$310M</span> processed
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center p-12">
        <div className="w-full max-w-[380px]">
          <div className="text-2xl font-bold tracking-tight">Create your account</div>
          <div className="mt-2 text-sm text-[#8A9099]">Start your coach workspace on CoachFlow.</div>

          {error && (
            <div className="mt-5 flex items-start gap-2.5 py-3 px-3.5 rounded-control border border-danger/30 bg-danger/[.10]">
              <Icon name="error" className="text-base text-danger mt-px" />
              <div className="text-[13px] leading-snug text-danger">{error}</div>
            </div>
          )}

          <button
            type="button"
            onClick={handleGoogle}
            disabled={googleLoading}
            className="mt-7 w-full h-[46px] flex items-center justify-center gap-2.5 bg-[#15171A] border border-border-strong rounded-control text-sm font-semibold transition-colors hover:bg-[#1B1E22] hover:border-[#33373E] disabled:opacity-60"
          >
            <span
              className="w-4 h-4 rounded-full"
              style={{
                background:
                  'conic-gradient(#EA4335 0 25%,#FBBC05 0 50%,#34A853 0 75%,#4285F4 0)',
              }}
            />
            {googleLoading ? 'Redirecting…' : 'Continue with Google'}
          </button>

          <div className="flex items-center gap-3 my-[22px]">
            <div className="flex-1 h-px bg-[#1E2126]" />
            <div className="text-[11px] tracking-[.12em] text-text-dim">OR</div>
            <div className="flex-1 h-px bg-[#1E2126]" />
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
            <div className="flex flex-col gap-[7px]">
              <label className="text-xs font-semibold text-text-muted">Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Maya Chen"
                className="h-[46px] px-3.5 bg-surface border border-border-strong rounded-control text-sm outline-none transition-shadow focus:border-accent focus:shadow-[0_0_0_3px_rgba(47,216,166,.14)]"
              />
            </div>
            <div className="flex flex-col gap-[7px]">
              <label className="text-xs font-semibold text-text-muted">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="maya@studio.co"
                className="h-[46px] px-3.5 bg-surface border border-border-strong rounded-control text-sm outline-none transition-shadow focus:border-accent focus:shadow-[0_0_0_3px_rgba(47,216,166,.14)]"
              />
            </div>
            <div className="flex flex-col gap-[7px]">
              <label className="text-xs font-semibold text-text-muted">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  minLength={8}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-[46px] pl-3.5 pr-11 bg-surface border border-border-strong rounded-control text-sm outline-none transition-shadow focus:border-accent focus:shadow-[0_0_0_3px_rgba(47,216,166,.14)]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-0 top-0 w-11 h-[46px] flex items-center justify-center text-text-faint transition-colors hover:text-text"
                >
                  <Icon name={showPassword ? 'visibility_off' : 'visibility'} className="text-lg" />
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-[7px]">
              <label className="text-xs font-semibold text-text-muted">Confirm password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                minLength={8}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="h-[46px] px-3.5 bg-surface border border-border-strong rounded-control text-sm outline-none transition-shadow focus:border-accent focus:shadow-[0_0_0_3px_rgba(47,216,166,.14)]"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-2.5 w-full h-[46px] bg-accent text-accent-ink rounded-control text-sm font-bold transition-all hover:bg-accent-hover hover:-translate-y-px disabled:opacity-60"
            >
              {loading ? 'Creating account…' : 'Create account'}
            </button>
          </form>

          <div className="mt-5 text-[13px] text-text-faint text-center">
            Already have an account? <a href="/login" className="text-accent">Sign in</a>
          </div>
        </div>
      </div>
    </div>
  );
}
