'use client';

import * as React from 'react';

import AuthDialog from '~/components/AuthDialog';
import UploadDialog from '~/components/UploadDialog';

const DialogProvider = () => {
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <AuthDialog />
      <UploadDialog />
    </>
  );
};

export default DialogProvider;
