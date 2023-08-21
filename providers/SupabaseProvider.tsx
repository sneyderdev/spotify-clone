'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@supabase/auth-helpers-react';

import type { Database } from '~/types/db';

interface SupabaseProviderProps {
  children: React.ReactNode;
}

const SupabaseProvider = ({ children }: SupabaseProviderProps) => {
  const supabaseClient = createClientComponentClient<Database>();

  return (
    <SessionContextProvider supabaseClient={supabaseClient}>
      {children}
    </SessionContextProvider>
  );
};

export default SupabaseProvider;
