import * as React from 'react';

import type { User } from '@supabase/auth-helpers-nextjs';
import {
  useSessionContext,
  useUser as useSupabaseUser,
} from '@supabase/auth-helpers-react';

import type { Subscription, UserDetails } from '~/types';

type UserContextData = {
  accessToken: string | null;
  user: User | null;
  userDetails: UserDetails | null;
  isLoading: boolean;
  subscription: Subscription | null;
};

export const UserContext = React.createContext<UserContextData | null>(null);

export const UserContextProvider = (props: Record<string, any>) => {
  const {
    session,
    isLoading: isLoadingUser,
    supabaseClient: supabase,
  } = useSessionContext();
  const user = useSupabaseUser();
  const accessToken = session?.access_token ?? null;

  const [isLoadingData, setIsLoadingData] = React.useState(false);
  const [userDetails, setUserDetails] = React.useState<UserDetails | null>(
    null,
  );
  const [subscription, setSubscription] = React.useState<Subscription | null>(
    null,
  );

  const getUserDetails = () => supabase.from('users').select('*').single();

  const getSubscription = () =>
    supabase
      .from('subscriptions')
      .select('*, prices(*, products(*))')
      .in('status', ['trialing', 'active'])
      .single();

  React.useEffect(() => {
    if (user && !isLoadingData && !userDetails && !subscription) {
      setIsLoadingData(true);

      Promise.all([getUserDetails(), getSubscription()])
        .then(([userDetails, subscription]) => {
          setUserDetails(userDetails.data);
          setSubscription(subscription.data);
        })
        .finally(() => setIsLoadingData(false));
    } else if (!user && !isLoadingUser && !isLoadingData) {
      setUserDetails(null);
      setSubscription(null);
    }
  }, [user, isLoadingUser]);

  const value = {
    accessToken,
    user,
    userDetails,
    isLoading: isLoadingUser || isLoadingData,
    subscription,
  };

  return <UserContext.Provider value={value} {...props} />;
};

export const useUser = () => {
  const context = React.useContext(UserContext);

  if (!context) {
    throw new Error('useUser must be used within a UserContextProvider');
  }

  return context;
};
