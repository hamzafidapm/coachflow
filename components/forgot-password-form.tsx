'use client';

import { useState } from 'react';
import { Icon } from '@/components/icon';
import { requestPasswordReset } from '@/lib/actions/password-reset';

export function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await requestPasswordReset(email);
      setSent(true);
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

        {sent ? (
          <div className="flex items-start gap-2.5 py-3.5 px-4 rounded-control border border-accent/30 bg-accent/[.10]">
            <Icon name="check_circle" className="text-base text-accent mt-px" />
            <div className="text-[13px] leading-snug text-text">
              If an account exists for <span className="font-semibold">{email}</span>, we've sent a link to reset
              your password. It expires in 1 hour.
            </div>
          </div>
        ) : (
          <>
            <div className="text-2xl font-bold tracking-tight">Reset your password</div>
            <div className="mt-2 text-sm text-[#8A9099]">
              Enter your email and we'll send you a link to reset your password.
            </div>

            {error && (
              <div className="mt-5 flex items-start gap-2.5 py-3 px-3.5 rounded-control border border-danger/30 bg-danger/[.10]">
                <Icon name="error" className="text-base text-danger mt-px" />
                <div className="text-[13px] leading-snug text-danger">{error}</div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-7 flex flex-col gap-3.5">
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
              <button
                type="submit"
                disabled={loading}
                className="mt-2.5 w-full h-[46px] bg-accent text-accent-ink rounded-control text-sm font-bold transition-all hover:bg-accent-hover hover:-translate-y-px disabled:opacity-60"
              >
                {loading ? 'Sending…' : 'Send reset link'}
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
