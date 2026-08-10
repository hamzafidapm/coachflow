import { prisma } from '@/lib/prisma';
import { getDemoCoach } from '@/lib/demo-coach';
import { SettingsView } from '@/components/settings-view';

export const dynamic = 'force-dynamic';

export default async function SettingsPage() {
  const coach = await getDemoCoach();
  const settings = await prisma.coachSettings.findUniqueOrThrow({ where: { coachId: coach.id } });

  return (
    <SettingsView
      name={coach.name ?? ''}
      email={coach.email}
      headline={settings.headline}
      bookingHandle={settings.bookingHandle}
      accentColor={settings.accentColor}
      portalTheme={settings.portalTheme}
      notifications={{
        notifyNewBooking: settings.notifyNewBooking,
        notifyPaymentReceived: settings.notifyPaymentReceived,
        notifyLessonCompleted: settings.notifyLessonCompleted,
        notifyFailedPayment: settings.notifyFailedPayment,
        notifyWeeklySummary: settings.notifyWeeklySummary,
      }}
      integrations={{
        stripeConnected: settings.stripeConnected,
        googleCalendarConnected: settings.googleCalendarConnected,
        zoomConnected: settings.zoomConnected,
        mailchimpConnected: settings.mailchimpConnected,
      }}
    />
  );
}
