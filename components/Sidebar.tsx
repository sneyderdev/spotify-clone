'use client';

import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import { IconHome, IconSearch } from '@tabler/icons-react';

import type { Route } from '~/types';

import Box from './Box';
import SidebarItem from './SidebarItem';
import Library from './Library';

interface SidebarProps {
  children: React.ReactNode;
}

const Sidebar = ({ children }: SidebarProps) => {
  const pathname = usePathname();

  const routes: Array<Route> = useMemo(
    () => [
      {
        icon: IconHome,
        label: 'Home',
        active: pathname !== '/search',
        href: '/',
      },
      {
        icon: IconSearch,
        label: 'Search',
        active: pathname === '/search',
        href: '/search',
      },
    ],
    [pathname],
  );

  return (
    <div className="flex h-full">
      <aside className="hidden h-full w-[300px] flex-col gap-y-2 bg-black p-2 md:flex">
        <Box>
          <div className="flex flex-col gap-y-4 px-5 py-4">
            {routes.map((route) => (
              <SidebarItem key={route.label} {...route} />
            ))}
          </div>
        </Box>
        <Box className="h-full overflow-y-auto">
          <Library />
        </Box>
      </aside>
      <main className="h-full flex-1 overflow-y-auto py-2">{children}</main>
    </div>
  );
};

export default Sidebar;
