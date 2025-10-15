import Navbar from '@/components/helper/Navbar';
import { NotificationProvider } from '@/contexts/NotificationContext';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Learner Dashboard',
  description:
    'Track your learning progress, manage active help sessions, and ask questions in real time with expert guidance.',
};

export default function LearnerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <NotificationProvider>
      <div>
        <Navbar />
        {children}
      </div>
    </NotificationProvider>
  );
}
