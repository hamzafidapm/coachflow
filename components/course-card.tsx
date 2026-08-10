import Link from 'next/link';
import Image from 'next/image';
import { Icon } from '@/components/icon';
import { type CourseSeed, metaLabel } from '@/lib/data/courses';

export function CourseCard({ course }: { course: CourseSeed }) {
  const isPlaylist = course.videoSourceType === 'PLAYLIST';

  return (
    <Link
      href={`/courses/${course.slug}`}
      className="block bg-surface border border-border rounded-card overflow-hidden transition-all duration-[220ms] hover:border-[#33373E] hover:-translate-y-1"
    >
      <div className="relative h-[132px] bg-surface-raised">
        <Image src={course.coverImageUrl} alt={course.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
      </div>
      <div className="p-4">
        <span className="inline-flex items-center h-[22px] px-2.5 rounded-md bg-accent/[.11] text-accent text-[11px] font-bold tracking-wide">
          {course.category}
        </span>
        <div className="mt-2.5 text-[14.5px] font-bold tracking-tight">{course.title}</div>
        <div className="mt-1.5 text-[12.5px] leading-relaxed text-text-faint">{course.description}</div>
        <div className="mt-3.5 flex gap-4 font-mono text-[11.5px] text-text-muted">
          <span>{metaLabel(course)}</span>
          <span>{course.students} enrolled</span>
        </div>
        <div className="mt-3 pt-3 border-t border-border-hair flex items-center gap-2 text-xs font-semibold text-accent whitespace-nowrap">
          <Icon name="play_circle" className="text-base" />
          {isPlaylist ? 'Watch playlist' : 'Watch lesson'}
        </div>
      </div>
    </Link>
  );
}
