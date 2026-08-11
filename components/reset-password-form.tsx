'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { Icon } from '@/components/icon';
import { resetPassword } from '@/lib/actions/password-reset';

export function ResetPasswordForm({ token }: { token: string }) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (!token) {
      setError('This reset link is missing its token. Request a new one.');
      return;
    }

    setLoading(true);
    try {
      const result = await resetPassword(token, password);
      if (result.error) {
        setError(result.error);
        return;
      }
      setDone(true);
      const res = await signIn('credentials', {
        email: result.email,
        password,
        redirect: false,
        callbackUrl: '/dashboard',
      });
      if (res?.url) window.location.href = res.url;
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg text-text p-6">
      <div className="w-full max-w-[380px]">
        <div className="flex items-center gap-2.5 mb-8">
          <div className="w-[30px] h-[30px] rounded-[9px] bg-accent flex items-center justify-center text-accent-ink font-extrabold text-[15px]">
            C
          </div>
          <div className="font-bold text-[17px] tracking-tight">CoachFlow</div>
        </div>

        {done ? (
          <div className="flex items-start gap-2.5 py-3.5 px-4 rounded-control border border-accent/30 bg-accent/[.10]">
            <Icon name="check_circle" className="text-base text-accent mt-px" />
            <div className="text-[13px] leading-snug text-text">Password updated. Signing you in…</div>
          </div>
        ) : (
          <>
            <div className="text-2xl font-bold tracking-tight">Set a new password</div>
            <div className="mt-2 text-sm text-[#8A9099]">Choose a new password for your account.</div>

            {error && (
              <div className="mt-5 flex items-start gap-2.5 py-3 px-3.5 rounded-control border border-danger/30 bg-danger/[.10]">
                <Icon name="error" className="text-base text-danger mt-px" />
                <div className="text-[13px] leading-snug text-danger">{error}</div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-7 flex flex-col gap-3.5">
              <div className="flex flex-col gap-[7px]">
                <label className="text-xs font-semibold text-text-muted">New password</label>
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
                <label className="text-xs font-semibold text-text-muted">Confirm new password</label>
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
                {loading ? 'Updating…' : 'Update password'}
              </button>
            </form>
          </>
        )}

        <div className="mt-5 text-[13px] text-text-faint text-center">
          <a href="/login" className="text-accent">
            Back to sign in
          </a>
        </div>
      </div>
    </div>
  );
}
