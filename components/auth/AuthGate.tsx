'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState, type ReactNode } from 'react';

const publicPaths = ['/login', '/register', '/sign-up'];

export function AuthGate({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isPublicPage = publicPaths.includes(pathname);
  const [hasSession, setHasSession] = useState(false);

  useEffect(() => {
    if (isPublicPage) return;

    if (window.localStorage.getItem('token')) {
      setHasSession(true);
    } else {
      router.replace('/login');
    }
  }, [isPublicPage, router]);

  if (isPublicPage || hasSession) return <>{children}</>;

  return <main className="auth-loading" role="status">Checking your session...</main>;
}