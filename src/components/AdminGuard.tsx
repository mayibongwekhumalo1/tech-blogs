'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    } else if (status === 'authenticated' && session?.user?.role !== 'admin') {
      router.push('/unauthorized');
    }
  }, [status, session, router]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!session || session.user?.role !== 'admin') {
    return null;
  }

  return <>{children}</>;
}