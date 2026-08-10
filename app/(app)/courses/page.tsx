import { courses } from '@/lib/data/courses';
import { CourseCard } from '@/components/course-card';

export default function CoursesPage() {
  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <div className="text-sm text-text-faint">5 published · 1 draft · 2,600 total enrollments</div>
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
