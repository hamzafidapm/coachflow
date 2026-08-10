'use client';

import { useState, useTransition } from 'react';
import { useToast } from '@/components/toast';
import { updateProfile } from '@/lib/actions/settings';

export function SettingsProfileTab({
  name,
  email,
  headline,
  bookingHandle,
}: {
  name: string;
  email: string;
  headline: string;
  bookingHandle: string;
}) {
  const toast = useToast();
  const [isPending, startTransition] = useTransition();
  const [form, setForm] = useState({ name, headline, bookingHandle });

  function save() {
    startTransition(async () => {
      await updateProfile(form);
      toast('Settings saved', 'Profile updated.');
    });
  }

  return (
    <div>
      <div className="text-[15px] font-bold">Profile</div>
      <div className="mt-1.5 text-[12.5px] text-text-faint">
        How you appear to clients across bookings and course pages.
      </div>

      <div className="mt-[22px] flex items-center gap-4">
        <div className="w-[66px] h-[66px] rounded-[20px] bg-accent/[.16] text-accent flex items-center justify-center text-xl font-bold">
          MC
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => toast('Photo updated', 'New avatar applied everywhere.')}
            className="h-[34px] px-[13px] border border-border-strong rounded-[10px] bg-[#15171A] text-[#C6CBD2] text-[12.5px] font-semibold transition-colors hover:bg-[#1B1E22]"
          >
            Upload photo
          </button>
          <button
            type="button"
            onClick={() => toast('Photo removed', 'Initials will be shown instead.', 'error')}
            className="h-[34px] px-[13px] rounded-[10px] bg-transparent text-text-faint text-[12.5px] font-semibold transition-colors hover:text-text"
          >
            Remove
          </button>
        </div>
      </div>

      <div className="mt-[22px] grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <div className="flex flex-col gap-[7px]">
          <label className="text-xs font-semibold text-text-muted">Display name</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            className="h-[42px] px-[13px] bg-[#0F1114] border border-border-strong rounded-control text-[13.5px] outline-none transition-shadow focus:border-accent focus:shadow-[0_0_0_3px_rgba(47,216,166,.12)]"
          />
        </div>
        <div className="flex flex-col gap-[7px]">
          <label className="text-xs font-semibold text-text-muted">Headline</label>
          <input
            type="text"
            value={form.headline}
            onChange={(e) => setForm((f) => ({ ...f, headline: e.target.value }))}
            className="h-[42px] px-[13px] bg-[#0F1114] border border-border-strong rounded-control text-[13.5px] outline-none transition-shadow focus:border-accent focus:shadow-[0_0_0_3px_rgba(47,216,166,.12)]"
          />
        </div>
        <div className="flex flex-col gap-[7px]">
          <label className="text-xs font-semibold text-text-muted">Email</label>
          <input
            type="text"
            value={email}
            disabled
            className="h-[42px] px-[13px] bg-[#0F1114] border border-border-strong rounded-control text-[13.5px] text-text-faint outline-none"
          />
        </div>
        <div className="flex flex-col gap-[7px]">
          <label className="text-xs font-semibold text-text-muted">Booking handle</label>
          <input
            type="text"
            value={form.bookingHandle}
            onChange={(e) => setForm((f) => ({ ...f, bookingHandle: e.target.value }))}
            className="h-[42px] px-[13px] bg-[#0F1114] border border-border-strong rounded-control text-[13.5px] outline-none transition-shadow focus:border-accent focus:shadow-[0_0_0_3px_rgba(47,216,166,.12)]"
          />
        </div>
      </div>

      <button
        type="button"
        onClick={save}
        disabled={isPending}
        className="mt-[22px] h-10 px-[18px] rounded-control bg-accent text-accent-ink text-[13px] font-bold transition-colors hover:bg-accent-hover disabled:opacity-60"
      >
        {isPending ? 'Saving…' : 'Save changes'}
      </button>
    </div>
  );
}
