import { prisma } from '@/lib/prisma';
import { getDemoCoach } from '@/lib/demo-coach';
import { slugify } from '@/lib/slug';
import { type CourseSeed } from '@/lib/data/courses';
import { CourseCard } from '@/components/course-card';

export const dynamic = 'force-dynamic';

export default async function CoursesPage() {
  const coach = await getDemoCoach();
  const dbCourses = await prisma.course.findMany({
    where: { coachId: coach.id },
    orderBy: { createdAt: 'asc' },
    include: { _count: { select: { enrollments: true } } },
  });

  const courses: CourseSeed[] = dbCourses.map((c) => ({
    slug: slugify(c.title),
    title: c.title,
    category: c.category,
    description: c.description,
    coverImageUrl: c.coverImageUrl,
    videoSourceUrl: c.videoSourceUrl,
    videoSourceType: c.videoSourceType,
    moduleCount: c.moduleCount,
    students: c._count.enrollments,
  }));

  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <div className="text-sm text-text-faint">
          {courses.length} published · {courses.reduce((sum, c) => sum + c.students, 0)} total enrollments
        </div>
      </div>

      <div
        className="mt-[18px] grid gap-4"
        style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))' }}
      >
        {courses.map((course) => (
          <CourseCard key={course.slug} course={course} />
        ))}
      </div>
    </div>
  );
}
