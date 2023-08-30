'use client';

import * as React from 'react';

import Dialog from '~/components/Dialog';

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
      <Dialog isOpen onChange={() => {}} title="Test" description="Test">
        Test
      </Dialog>
    </>
  );
};

export default DialogProvider;
