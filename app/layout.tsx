import './globals.css';
import type { Metadata } from 'next';
import { AuthGate } from '../components/auth/AuthGate';

export const metadata: Metadata = {
  title: 'Caleb CRM',
  description: 'Customer relationship dashboard',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body><AuthGate>{children}</AuthGate></body>
    </html>
  );
}
