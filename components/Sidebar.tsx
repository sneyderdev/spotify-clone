'use client';

import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

import type { Route } from '~/types';

import Box from './Box';
import SidebarItem from './SidebarItem';

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

  return (
    <aside>
      <div className="hidden h-full w-[300px] flex-col gap-y-2 bg-black p-2 md:flex">
        <Box>
          <div className="flex flex-col gap-y-4 px-5 py-4">
            {routes.map((route) => (
              <SidebarItem key={route.label} {...route} />
            ))}
          </div>
        </Box>
      </div>
    </aside>
  );
};

export default Sidebar;
