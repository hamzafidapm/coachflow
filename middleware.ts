import { withAuth } from 'next-auth/middleware';

// Gates every app screen behind a session. Uses next-auth's JWT-only check
// (no Prisma/DB call), so it's safe to run on the Edge runtime middleware
// uses by default.
export default withAuth({
  pages: {
    signIn: '/login',
  },
});

export const config = {
  matcher: [
    '/',
    '/dashboard/:path*',
    '/clients/:path*',
    '/courses/:path*',
    '/calendar/:path*',
    '/payments/:path*',
    '/settings/:path*',
  ],
};
