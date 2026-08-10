'use client';

import { useToast } from '@/components/toast';
import { profileFields } from '@/lib/data/settings';

export function SettingsProfileTab() {
  const toast = useToast();

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
        {profileFields.map((f) => (
          <div key={f.label} className="flex flex-col gap-[7px]">
            <label className="text-xs font-semibold text-text-muted">{f.label}</label>
            <input
              type="text"
              defaultValue={f.value}
              className="h-[42px] px-[13px] bg-[#0F1114] border border-border-strong rounded-control text-[13.5px] outline-none transition-shadow focus:border-accent focus:shadow-[0_0_0_3px_rgba(47,216,166,.12)]"
            />
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => toast('Settings saved', 'Profile updated.')}
        className="mt-[22px] h-10 px-[18px] rounded-control bg-accent text-accent-ink text-[13px] font-bold transition-colors hover:bg-accent-hover"
      >
        Save changes
      </button>
    </div>
  );
}
