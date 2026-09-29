'use client';

import { useRouter } from 'next/navigation';

export function LogoutButton({ className = '' }: { className?: string }) {
  const router = useRouter();

  const logout = () => {
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('crm-user');
    router.replace('/login');
  };

  return <button type="button" className={className} onClick={logout}>Sign out</button>;
}