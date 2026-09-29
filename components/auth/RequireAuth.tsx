'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    if (!token) {
      router.replace('/login');
      return;
    }

    setIsReady(true);
  }, [router]);

  if (!isReady) {
    return <div className="auth-loading">Checking your session...</div>;
  }

  return <>{children}</>;
}
