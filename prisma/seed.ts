import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { courses } from '../lib/data/courses';
import { clients } from '../lib/data/clients';
import { events } from '../lib/data/calendar';
import { transactions } from '../lib/data/payments';

const prisma = new PrismaClient();

const COACH_EMAIL = 'maya@studio.co';
const COACH_PASSWORD = 'coachflow-demo'; // dev-only seed login, change in production

function dollarsToCents(amount: string) {
  return Math.round(parseFloat(amount.replace(/[^0-9.]/g, '')) * 100);
}

function bookingDate(day: number, startHour: number) {
  // Week of Sun Aug 9 – Sat Aug 15, 2026, matching the UI's hardcoded "this week".
  const hours = Math.floor(startHour);
  const minutes = Math.round((startHour - hours) * 60);
  return new Date(Date.UTC(2026, 7, 9 + day, hours, minutes));
}

const paymentStatusMap = {
  Paid: 'SUCCEEDED',
  Pending: 'PENDING',
  Failed: 'FAILED',
  Refunded: 'REFUNDED',
} as const;

// Deterministic-but-varied progress percentages for the enrollment seeding below.
const PROGRESS_CYCLE = [92, 68, 45, 100, 30, 77, 15, 60, 88];
const SECOND_PROGRESS_CYCLE = [10, 55, 40];

async function main() {
  console.log('Clearing existing demo data...');
  await prisma.payment.deleteMany();
  await prisma.subscription.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.enrollment.deleteMany();
  await prisma.client.deleteMany();
  await prisma.course.deleteMany();
  await prisma.coachSettings.deleteMany();
  await prisma.user.deleteMany();

  console.log('Creating coach...');
  const coach = await prisma.user.create({
    data: {
      name: 'Maya Chen',
      email: COACH_EMAIL,
      passwordHash: await bcrypt.hash(COACH_PASSWORD, 10),
      role: 'COACH',
    },
  });

  console.log('Creating coach settings...');
  await prisma.coachSettings.create({
    data: {
      coachId: coach.id,
      headline: 'Business coach for solo consultants',
      bookingHandle: 'coachflow.co/maya',
      accentColor: '#2FD8A6',
      portalTheme: 'DARK',
      notifyNewBooking: true,
      notifyPaymentReceived: true,
      notifyLessonCompleted: false,
      notifyFailedPayment: true,
      notifyWeeklySummary: false,
      stripeConnected: true,
      googleCalendarConnected: true,
      zoomConnected: false,
      mailchimpConnected: false,
    },
  });

  console.log(`Creating ${courses.length} courses...`);
  const createdCourses = await Promise.all(
    courses.map((c) =>
      prisma.course.create({
        data: {
          title: c.title,
          description: c.description,
          category: c.category,
          coverImageUrl: c.coverImageUrl,
          videoSourceUrl: c.videoSourceUrl,
          videoSourceType: c.videoSourceType,
          moduleCount: c.moduleCount,
          coachId: coach.id,
        },
      }),
    ),
  );

  console.log(`Creating ${clients.length} clients...`);
  const createdClients = await Promise.all(
    clients.map((c) =>
      prisma.client.create({
        data: {
          coachId: coach.id,
          name: c.name,
          email: c.email,
          status: c.status.toUpperCase() as 'ACTIVE' | 'TRIAL' | 'PAUSED' | 'CHURNED',
          lastActivityAt: new Date(),
        },
      }),
    ),
  );
  const clientByName = new Map(createdClients.map((c) => [c.name, c]));

  console.log('Creating bookings...');
  // "Cohort office hours" isn't a 1:1 client session, so it's skipped — Booking.clientId
  // is required and there's no client record it reasonably maps to.
  const bookingEvents = events.filter((e) => e.title !== 'Cohort office hours');
  for (const e of bookingEvents) {
    const clientName = e.title === 'Discovery — J. Berg' ? 'Jonas Berg' : e.title;
    const client = clientByName.get(clientName);
    if (!client) {
      console.warn(`  Skipping "${e.title}" — no matching client named "${clientName}"`);
      continue;
    }
    await prisma.booking.create({
      data: {
        coachId: coach.id,
        clientId: client.id,
        scheduledAt: bookingDate(e.day, e.start),
        duration: Math.round(e.dur * 60),
        status: 'SCHEDULED',
        notes: e.notes,
      },
    });
  }

  console.log(`Creating ${transactions.length} payments...`);
  const payerStudents: { id: string }[] = [];
  const seenPayerEmails = new Set<string>();
  for (const [i, t] of transactions.entries()) {
    const client = clientByName.get(t.name);
    if (!client) {
      console.warn(`  Skipping payment for "${t.name}" — no matching client`);
      continue;
    }
    // Payments belong to a User (platform login), not a Client (CRM contact) — create
    // a lightweight student account per payer so the FK has somewhere real to point.
    const payerUser = await prisma.user.upsert({
      where: { email: client.email },
      update: {},
      create: { name: client.name, email: client.email, role: 'STUDENT' },
    });
    if (!seenPayerEmails.has(payerUser.email)) {
      seenPayerEmails.add(payerUser.email);
      payerStudents.push({ id: payerUser.id });
    }
    await prisma.payment.create({
      data: {
        userId: payerUser.id,
        amount: dollarsToCents(t.amount),
        currency: 'usd',
        status: paymentStatusMap[t.status],
        stripePaymentId: `pi_seed_${i}`,
        createdAt: new Date(t.date),
      },
    });
  }

  console.log('Creating enrollments...');
  // Spreads the payer-students across courses so course cards show real (if
  // modest — there are only 9 seeded students) enrollment counts instead of 0.
  for (const [i, student] of payerStudents.entries()) {
    const primaryCourse = createdCourses[i % createdCourses.length];
    await prisma.enrollment.create({
      data: { userId: student.id, courseId: primaryCourse.id, progressPercent: PROGRESS_CYCLE[i % PROGRESS_CYCLE.length] },
    });
    if (i % 2 === 0) {
      const secondaryCourse = createdCourses[(i + 3) % createdCourses.length];
      await prisma.enrollment.create({
        data: {
          userId: student.id,
          courseId: secondaryCourse.id,
          progressPercent: SECOND_PROGRESS_CYCLE[Math.floor(i / 2) % SECOND_PROGRESS_CYCLE.length],
        },
      });
    }
  }

  console.log('Done.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
