// lib/middleware.ts
import { GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export async function redirectIfAuthenticated(ctx: GetServerSidePropsContext) {
  const session = await getSession(ctx);
  const router = useRouter();


  if (session) {
    if (ctx.res) {
      ctx.res.writeHead(302, { Location: '/dashboard' }); // Ganti dengan halaman
      ctx.res.end();
    } else {
      router.push('/dashboard'); // Ganti dengan halaman
    }
    return { props: {} };
  }
  return { props: {} };
}