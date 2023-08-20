import type { Icon } from '@tabler/icons-react';

export interface Route {
  icon: Icon;
  label: string;
  active: boolean;
  href: string;
}
