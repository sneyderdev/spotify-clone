'use client';

import { useRouter } from 'next/navigation';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';

import { cn } from '~/utils';

import IconButton from './IconButton';

interface HeaderProps {
  children: React.ReactNode;
  className?: string;
}

const Header = ({ children, className }: HeaderProps) => {
  const router = useRouter();

  const handleLogout = () => {
    //TODO: Handle logout
  };

  return (
    <header
      className={cn('h-fit bg-gradient-to-b from-emerald-800 p-6', className)}
    >
      <div className="mb-4 flex w-full items-center justify-between">
        <div className="hidden items-center gap-x-2 md:flex">
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-black transition hover:opacity-75"
          >
            <IconChevronLeft stroke={1} size={28} />
          </button>
          <button
            type="button"
            onClick={() => router.forward()}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-black transition hover:opacity-75"
          >
            <IconChevronRight stroke={1} size={28} />
          </button>
        </div>
      </div>
      {children}
    </header>
  );
};

export default Header;
