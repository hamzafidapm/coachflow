import { notFound } from 'next/navigation';
import { getCourseBySlug, courses } from '@/lib/data/courses';
import { LessonPlayer } from '@/components/lesson-player';

export function generateStaticParams() {
  return courses.map((c) => ({ slug: c.slug }));
}

export default function CourseLessonPage({ params }: { params: { slug: string } }) {
  const course = getCourseBySlug(params.slug);
  if (!course) notFound();

  return <LessonPlayer course={course} />;
}
