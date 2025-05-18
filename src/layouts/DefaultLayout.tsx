import type { ReactNode } from 'react';
import Sidebar from '../components/Sidebar';

interface DefaultLayoutProps {
  children: ReactNode;
}

export default function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-400 via-cyan-300 to-purple-700">
      <Sidebar />
      <main className="flex-1 overflow-auto p-6">{children}</main>
    </div>
  );
}
