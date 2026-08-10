-- CreateEnum
CREATE TYPE "PortalTheme" AS ENUM ('DARK', 'LIGHT');

-- CreateTable
CREATE TABLE "coach_settings" (
    "id" TEXT NOT NULL,
    "coachId" TEXT NOT NULL,
    "headline" TEXT NOT NULL DEFAULT '',
    "bookingHandle" TEXT NOT NULL DEFAULT '',
    "accentColor" TEXT NOT NULL DEFAULT '#2FD8A6',
    "portalTheme" "PortalTheme" NOT NULL DEFAULT 'DARK',
    "notifyNewBooking" BOOLEAN NOT NULL DEFAULT true,
    "notifyPaymentReceived" BOOLEAN NOT NULL DEFAULT true,
    "notifyLessonCompleted" BOOLEAN NOT NULL DEFAULT false,
    "notifyFailedPayment" BOOLEAN NOT NULL DEFAULT true,
    "notifyWeeklySummary" BOOLEAN NOT NULL DEFAULT false,
    "stripeConnected" BOOLEAN NOT NULL DEFAULT false,
    "googleCalendarConnected" BOOLEAN NOT NULL DEFAULT false,
    "zoomConnected" BOOLEAN NOT NULL DEFAULT false,
    "mailchimpConnected" BOOLEAN NOT NULL DEFAULT false,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "coach_settings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "coach_settings_coachId_key" ON "coach_settings"("coachId");

-- AddForeignKey
ALTER TABLE "coach_settings" ADD CONSTRAINT "coach_settings_coachId_fkey" FOREIGN KEY ("coachId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

