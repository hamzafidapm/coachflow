'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { getDemoCoach } from '@/lib/demo-coach';

const NOTIFICATION_FIELDS = [
  'notifyNewBooking',
  'notifyPaymentReceived',
  'notifyLessonCompleted',
  'notifyFailedPayment',
  'notifyWeeklySummary',
] as const;
export type NotificationField = (typeof NOTIFICATION_FIELDS)[number];

const INTEGRATION_FIELDS = [
  'stripeConnected',
  'googleCalendarConnected',
  'zoomConnected',
  'mailchimpConnected',
] as const;
export type IntegrationField = (typeof INTEGRATION_FIELDS)[number];

export async function updateProfile(data: { name: string; headline: string; bookingHandle: string }) {
  const coach = await getDemoCoach();
  await prisma.user.update({ where: { id: coach.id }, data: { name: data.name } });
  await prisma.coachSettings.update({
    where: { coachId: coach.id },
    data: { headline: data.headline, bookingHandle: data.bookingHandle },
  });
  revalidatePath('/settings');
}

export async function updateAccentColor(color: string) {
  const coach = await getDemoCoach();
  await prisma.coachSettings.update({ where: { coachId: coach.id }, data: { accentColor: color } });
  revalidatePath('/settings');
}

export async function updatePortalTheme(theme: 'DARK' | 'LIGHT') {
  const coach = await getDemoCoach();
  await prisma.coachSettings.update({ where: { coachId: coach.id }, data: { portalTheme: theme } });
  revalidatePath('/settings');
}

export async function toggleNotification(field: NotificationField, value: boolean) {
  const coach = await getDemoCoach();
  await prisma.coachSettings.update({ where: { coachId: coach.id }, data: { [field]: value } });
  revalidatePath('/settings');
}

export async function toggleIntegration(field: IntegrationField, value: boolean) {
  const coach = await getDemoCoach();
  await prisma.coachSettings.update({ where: { coachId: coach.id }, data: { [field]: value } });
  revalidatePath('/settings');
}
