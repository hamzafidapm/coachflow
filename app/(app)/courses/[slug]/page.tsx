import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { getDemoCoach } from '@/lib/demo-coach';
import { slugify } from '@/lib/slug';
import { type CourseSeed } from '@/lib/data/courses';
import { LessonPlayer } from '@/components/lesson-player';

export const dynamic = 'force-dynamic';

export default async function CourseLessonPage({ params }: { params: { slug: string } }) {
  const coach = await getDemoCoach();
  const dbCourses = await prisma.course.findMany({
    where: { coachId: coach.id },
    select: {
      title: true,
      category: true,
      description: true,
      coverImageUrl: true,
      videoSourceUrl: true,
      videoSourceType: true,
      moduleCount: true,
      _count: { select: { enrollments: true } },
    },
  });

  const match = dbCourses.find((c) => slugify(c.title) === params.slug);
  if (!match) notFound();

  const course: CourseSeed = {
    slug: params.slug,
    title: match.title,
    category: match.category,
    description: match.description,
    coverImageUrl: match.coverImageUrl,
    videoSourceUrl: match.videoSourceUrl,
    videoSourceType: match.videoSourceType,
    moduleCount: match.moduleCount,
    students: match._count.enrollments,
  };

  return <LessonPlayer course={course} />;
}
