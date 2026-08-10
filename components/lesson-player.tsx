'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Icon } from '@/components/icon';
import { type CourseSeed, playlistTitles, chapters, metaLabel } from '@/lib/data/courses';

type Entry = { title: string; meta: string; startSeconds: number };

export function LessonPlayer({ course }: { course: CourseSeed }) {
  const isPlaylist = course.videoSourceType === 'PLAYLIST';
  const [selectedIndex, setSelectedIndex] = useState(0);

  const entries: Entry[] = useMemo(() => {
    if (isPlaylist) {
      const named = playlistTitles[course.slug] ?? [];
      return Array.from({ length: course.moduleCount }, (_, i) => {
        const [title, duration] = named[i] ?? [`Lesson ${i + 1}`, 'From the playlist'];
        return { title, meta: `${String(i + 1).padStart(2, '0')} · ${duration}`, startSeconds: 0 };
      });
    }
    return (chapters[course.slug] ?? []).map(([title, timestamp, seconds]) => ({
      title,
      meta: timestamp,
      startSeconds: seconds,
    }));
  }, [course, isPlaylist]);

  const clampedIndex = Math.min(selectedIndex, Math.max(0, entries.length - 1));

  // selectedVideoId drives the iframe src: for single-video courses it's the fixed
  // YouTube video id; for playlist courses the "id" is the playlist plus the index
  // of the chosen video, since we don't have individual video ids without the
  // YouTube Data API (see README in the design bundle — same fallback it specifies).
  const embedSrc = useMemo(() => {
    if (isPlaylist) {
      const listId = course.videoSourceUrl.split('list=')[1];
      return `https://www.youtube.com/embed/videoseries?list=${listId}&index=${clampedIndex + 1}&rel=0`;
    }
    const videoId = course.videoSourceUrl.split('youtu.be/')[1];
    const start = entries[clampedIndex]?.startSeconds ?? 0;
    return `https://www.youtube.com/embed/${videoId}?rel=0&start=${start}`;
  }, [course, isPlaylist, clampedIndex, entries]);

  return (
    <div>
      <div className="flex items-center gap-3">
        <Link
          href="/courses"
          className="flex items-center gap-1.5 h-[34px] px-3 border border-border-strong rounded-[10px] bg-[#15171A] text-[#C6CBD2] text-[12.5px] font-semibold whitespace-nowrap transition-colors hover:bg-[#1B1E22]"
        >
          <Icon name="arrow_back" className="text-[17px]" />
          All courses
        </Link>
      </div>

      <div className="mt-[18px] grid gap-4 items-start lg:grid-cols-[minmax(0,1fr)_340px]">
        <div>
          <div className="relative w-full aspect-video bg-black border border-border rounded-card overflow-hidden">
            <iframe
              key={embedSrc}
              src={embedSrc}
              title={course.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
              className="absolute inset-0 w-full h-full border-0"
            />
          </div>
          <div className="mt-[18px] p-[22px] bg-surface border border-border rounded-card">
            <span className="inline-flex items-center h-[22px] px-2.5 rounded-md bg-accent/[.11] text-accent text-[11px] font-bold">
              {course.category}
            </span>
            <div className="mt-2.5 text-xl font-bold tracking-tight">{course.title}</div>
            <div className="mt-2 text-[13.5px] leading-relaxed text-text-muted max-w-[640px]">
              {course.description}
            </div>
            <div className="mt-4 flex flex-wrap gap-[18px] font-mono text-[11.5px] text-text-faint">
              <span>{metaLabel(course)}</span>
              <span>{course.students} enrolled</span>
              <span>{isPlaylist ? 'YouTube playlist' : 'Single YouTube lesson'}</span>
            </div>
          </div>
        </div>

        {entries.length > 0 && (
          <div className="bg-surface border border-border rounded-card overflow-hidden lg:sticky lg:top-[94px]">
            <div className="px-[18px] pt-[18px] pb-3.5 border-b border-border-hair">
              <div className="text-sm font-bold">{isPlaylist ? 'Course content' : 'Chapters'}</div>
              <div className="mt-1 text-xs text-text-faint">
                {isPlaylist
                  ? `${entries.length} videos · streamed from the playlist`
                  : `${entries.length} timestamps in this lesson`}
              </div>
            </div>
            <div className="max-h-[520px] overflow-auto p-2">
              {entries.map((entry, i) => {
                const active = i === clampedIndex;
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setSelectedIndex(i)}
                    className="w-full flex items-center gap-3 px-3 py-[11px] rounded-[11px] text-left transition-colors"
                    style={{ background: active ? 'rgba(47,216,166,.10)' : 'transparent' }}
                  >
                    <Icon
                      name={active ? 'play_circle' : 'play_arrow'}
                      className="text-[19px]"
                      style={{ color: active ? '#2FD8A6' : '#5E656E' }}
                    />
                    <div className="min-w-0 flex-1">
                      <div
                        className="text-[13px] font-semibold whitespace-nowrap overflow-hidden text-ellipsis"
                        style={{ color: active ? '#F2F4F7' : '#C6CBD2' }}
                      >
                        {entry.title}
                      </div>
                      <div className="mt-0.5 font-mono text-[10.5px] text-text-dim">{entry.meta}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
