import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'InkTracker',
  description: 'A dog-walk logger for a retired racer who hates the rain.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-sage-50 text-sage-900">
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
