'use server';

import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { resend } from '@/lib/resend';

const RESET_TOKEN_TTL_MS = 60 * 60 * 1000;

export async function requestPasswordReset(email: string) {
  const normalizedEmail = email.trim().toLowerCase();
  const user = await prisma.user.findUnique({
    where: { email: normalizedEmail },
    select: { id: true, name: true },
  });

  // Always report success so this endpoint can't be used to enumerate accounts.
  if (!user) return { ok: true };

  const token = crypto.randomBytes(32).toString('hex');
  await prisma.passwordResetToken.create({
    data: { userId: user.id, token, expiresAt: new Date(Date.now() + RESET_TOKEN_TTL_MS) },
  });

  const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password?token=${token}`;

  await resend.emails.send({
    from: process.env.EMAIL_FROM ?? 'CoachFlow <onboarding@resend.dev>',
    to: normalizedEmail,
    subject: 'Reset your CoachFlow password',
    html: `<p>Hi ${user.name ?? 'there'},</p><p>Click the link below to reset your CoachFlow password. This link expires in 1 hour.</p><p><a href="${resetUrl}">${resetUrl}</a></p><p>If you didn't request this, you can safely ignore this email.</p>`,
  });

  return { ok: true };
}

export async function resetPassword(token: string, password: string) {
  if (password.length < 8) return { error: 'Password must be at least 8 characters.' };

  const record = await prisma.passwordResetToken.findUnique({ where: { token } });
  if (!record || record.usedAt || record.expiresAt < new Date()) {
    return { error: 'This reset link is invalid or has expired. Request a new one.' };
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await prisma.user.findUniqueOrThrow({ where: { id: record.userId }, select: { email: true } });

  await prisma.$transaction([
    prisma.user.update({ where: { id: record.userId }, data: { passwordHash } }),
    prisma.passwordResetToken.update({ where: { id: record.id }, data: { usedAt: new Date() } }),
  ]);

  return { error: null, email: user.email };
}
