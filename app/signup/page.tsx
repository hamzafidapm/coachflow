import { Suspense } from 'react';
import { SignupForm } from '@/components/signup-form';

export default function SignupPage() {
  const googleEnabled = Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET);

  return (
    <Suspense>
      <SignupForm googleEnabled={googleEnabled} />
    </Suspense>
  );
}
