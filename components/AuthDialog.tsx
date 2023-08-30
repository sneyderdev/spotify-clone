'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import {
  useSessionContext,
  useSupabaseClient,
} from '@supabase/auth-helpers-react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';

import useAuthDialog from '~/hooks/useAuthDialog';

import Dialog from './Dialog';

const AuthDialog = () => {
  const supabaseClient = useSupabaseClient();
  const { closeDialog, isOpen } = useAuthDialog();
  const { session } = useSessionContext();
  const router = useRouter();

  React.useEffect(() => {
    if (session) {
      router.refresh();
      closeDialog();
    }
  }, [session, router, closeDialog]);

  const onChange = (open: boolean) => {
    if (!open) {
      closeDialog();
    }
  };

  return (
    <Dialog
      title="Welcome back"
      description="Login to your account"
      isOpen={isOpen}
      onChange={onChange}
    >
      <Auth
        supabaseClient={supabaseClient}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: '#404040',
                brandAccent: '#22C55E',
              },
            },
          },
        }}
        theme="dark"
        providers={['github']}
        magicLink
      />
    </Dialog>
  );
};

export default AuthDialog;
