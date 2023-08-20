import Link from 'next/link';

import { cn } from '~/utils';
import type { Route as SidebarItemProps } from '~/types';

const SidebarItem = ({ label, active, href }: SidebarItemProps) => {
  return (
    <Link
      href={href}
      className={cn(
        'text-md flex h-auto w-full cursor-pointer flex-row items-center gap-x-4 py-1 font-medium text-neutral-400 transition hover:text-white',
        active && 'text-white',
      )}
    >
      {label}
    </Link>
  );
};

export default SidebarItem;
