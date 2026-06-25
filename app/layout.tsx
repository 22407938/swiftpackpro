import type { Metadata } from 'next';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: 'SwiftPack Pro - AI Operations Platform',
  description: 'AI-powered cleaning, logistics, and operations management platform for Abuja, Nigeria',
  icons: {
    icon: '/favicon.ico',
  },
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  authors: [{ name: 'SwiftPack Pro' }],
  keywords: [
    'cleaning services',
    'logistics',
    'Abuja',
    'Nigeria',
    'AI',
    'operations management',
    'scheduling',
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#0284c7" />
      </head>
      <body className="bg-white text-secondary-900 dark:bg-secondary-950 dark:text-white antialiased">
        <div className="relative min-h-screen flex flex-col">
          {/* Background gradient effect */}
          <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
            <div className="absolute top-0 -left-4 w-72 h-72 bg-primary-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-soft" />
            <div className="absolute top-40 -right-4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-soft animation-delay-2000" />
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-soft animation-delay-4000" />
          </div>

          {/* Main content */}
          <main className="flex-1 relative z-10">{children}</main>
        </div>
      </body>
    </html>
  );
}
