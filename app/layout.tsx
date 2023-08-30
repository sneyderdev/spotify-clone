import './globals.css';
import type { Metadata } from 'next';
import { Figtree } from 'next/font/google';

import Sidebar from '~/components/Sidebar';
import SupabaseProvider from '~/providers/SupabaseProvider';
import UserProvider from '~/providers/UserProvider';
import DialogProvider from '~/providers/DialogProvider';

const font = Figtree({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Spotify',
  description: 'Listen to music for free.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <SupabaseProvider>
          <UserProvider>
            <DialogProvider />
            <Sidebar>{children}</Sidebar>
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
