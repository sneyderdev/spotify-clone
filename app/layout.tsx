import './globals.css';
import type { Metadata } from 'next';
import { Figtree } from 'next/font/google';

import getSongsByUserId from '~/actions/getSongsByUserId';

import SupabaseProvider from '~/providers/SupabaseProvider';
import UserProvider from '~/providers/UserProvider';
import DialogProvider from '~/providers/DialogProvider';
import Sidebar from '~/components/Sidebar';
import Toaster from '~/components/Toaster';

const font = Figtree({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Spotify',
  description: 'Listen to music for free.',
};

export const revalidate = 0;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const songs = await getSongsByUserId();

  return (
    <html lang="en">
      <body className={font.className}>
        <Toaster />
        <SupabaseProvider>
          <UserProvider>
            <DialogProvider />
            <Sidebar songs={songs}>{children}</Sidebar>
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
