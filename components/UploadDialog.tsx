'use client';

import useUploadDialog from '~/hooks/useUploadDialog';

import Dialog from './Dialog';

const UploadDialog = () => {
  const { closeDialog, isOpen } = useUploadDialog();

  const onChange = (open: boolean) => {
    if (!open) {
      //TODO: Clear form
      closeDialog();
    }
  };

  return (
    <Dialog
      title="Add a song"
      description="Upload an .mp3 file to add it to your library."
      isOpen={isOpen}
      onChange={onChange}
    >
      Form
    </Dialog>
  );
};

export default UploadDialog;
