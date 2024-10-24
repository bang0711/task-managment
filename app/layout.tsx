import Providers from '@/components/layout/providers';

import { Toaster } from '@/components/ui/toaster';

import '@uploadthing/react/styles.css';
import './globals.css';

import type { Metadata } from 'next';
import NextTopLoader from 'nextjs-toploader';
import { Inter } from 'next/font/google';

import { ViewTransitions } from 'next-view-transitions';
import { auth } from '@/auth';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Task Management',
  description: 'Basic dashboard with Next.js and Shadcn',
  icons: ['/icon.png'],
  openGraph: {
    images: ['/opengraph-image.png']
  },
  metadataBase: new URL(process.env.NEXTAUTH_URL!)
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <ViewTransitions>
      <html lang="en">
        <body className={`${inter.className} overflow-hidden `}>
          <NextTopLoader showSpinner={false} />
          <Providers session={session}>
            <Toaster />
            {children}
          </Providers>
        </body>
      </html>
    </ViewTransitions>
  );
}
