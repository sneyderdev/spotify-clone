'use client';

import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

import type { Route } from '~/types';

interface SidebarProps {
  children: React.ReactNode;
}

const Sidebar = ({ children }: SidebarProps) => {
  const pathname = usePathname();

  const routes: Array<Route> = useMemo(
    () => [
      {
        label: 'Home',
        active: pathname !== '/search',
        href: '/',
      },
      {
        label: 'Search',
        active: pathname === '/search',
        href: '/search',
      },
    ],
    [pathname],
  );

  return <div>{children}</div>;
};

export default Sidebar;
