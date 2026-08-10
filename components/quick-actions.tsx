'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Icon } from '@/components/icon';

export function QuickActions() {
  const [copied, setCopied] = useState(false);

  async function copyBookingLink() {
    try {
      await navigator.clipboard.writeText('coachflow.co/maya/30min');
    } catch {
      // clipboard unavailable — still show confirmation, link is copyable manually
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className="p-5 bg-surface border border-border rounded-card">
      <div className="text-sm font-bold">Quick actions</div>
      <div className="mt-3.5 flex flex-col gap-2">
        <Link
          href="/clients"
          className="flex items-center gap-2.5 h-11 px-3.5 border border-border-strong rounded-control bg-[#15171A] text-[#E6E9ED] text-[13.5px] font-semibold transition-all hover:bg-[#1B1E22] hover:border-[#33373E] hover:translate-x-0.5"
        >
          <Icon name="person_add" className="text-[19px] text-accent" />
          Add client
        </Link>
        <Link
          href="/courses"
          className="flex items-center gap-2.5 h-11 px-3.5 border border-border-strong rounded-control bg-[#15171A] text-[#E6E9ED] text-[13.5px] font-semibold transition-all hover:bg-[#1B1E22] hover:border-[#33373E] hover:translate-x-0.5"
        >
          <Icon name="upload" className="text-[19px] text-accent" />
          Upload lesson
        </Link>
        <button
          type="button"
          onClick={copyBookingLink}
          className="flex items-center gap-2.5 h-11 px-3.5 border border-border-strong rounded-control bg-[#15171A] text-[#E6E9ED] text-[13.5px] font-semibold text-left transition-all hover:bg-[#1B1E22] hover:border-[#33373E] hover:translate-x-0.5"
        >
          <Icon name="link" className="text-[19px] text-accent" />
          {copied ? 'Link copied ✓' : 'Create booking link'}
        </button>
      </div>
    </div>
  );
}
