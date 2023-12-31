'use client';

import { useRouter } from 'next/navigation';
import {
  IconChevronLeft,
  IconChevronRight,
  IconHome,
  IconSearch,
  IconUser,
} from '@tabler/icons-react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

import useAuthDialog from '~/hooks/useAuthDialog';
import { useUser } from '~/hooks/useUser';
import { useToast } from '~/hooks/useToast';
import { cn } from '~/utils';

import IconButton from './IconButton';
import Button from './Button';

interface HeaderProps {
  children: React.ReactNode;
  className?: string;
}

const Header = ({ children, className }: HeaderProps) => {
  const router = useRouter();
  const { openDialog } = useAuthDialog();
  const supabaseClient = useSupabaseClient();
  const { user } = useUser();
  const { toast } = useToast();

  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();

    //TODO: Reset any playing songs
    router.refresh();

    if (error) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });

      return;
    }

    toast({
      title: 'Success',
      description: 'You have been logged out.',
    });
  };

  return (
    <header
      className={cn('h-fit bg-gradient-to-b from-emerald-800 p-6', className)}
    >
      <div className="mb-4 flex w-full items-center justify-between">
        <div className="hidden items-center gap-x-2 md:flex">
          <IconButton onClick={() => {}}>
            <IconChevronLeft stroke={1} size={28} />
          </IconButton>
          <IconButton onClick={() => router.forward()}>
            <IconChevronRight stroke={1} size={28} />
          </IconButton>
        </div>
        <div className="flex items-center gap-x-2 md:hidden">
          <IconButton onClick={() => {}} className="bg-white text-black">
            <IconHome size={20} />
          </IconButton>
          <IconButton onClick={() => {}} className="bg-white text-black">
            <IconSearch size={20} />
          </IconButton>
        </div>
        <div className="flex items-center justify-between gap-x-4">
          {user ? (
            <div className="grid grid-cols-[1fr,auto] items-center gap-x-4">
              <Button variant="secondary" onClick={handleLogout}>
                Logout
              </Button>
              <IconButton
                variant="secondary"
                onClick={() => router.push('/account')}
              >
                <IconUser size={20} />
              </IconButton>
            </div>
          ) : (
            <>
              <div>
                <Button variant="ghost" onClick={openDialog}>
                  Sign up
                </Button>
              </div>
              <div>
                <Button
                  variant="secondary"
                  className="px-6 py-2"
                  onClick={openDialog}
                >
                  Log in
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
      {children}
    </header>
  );
};

export default Header;
