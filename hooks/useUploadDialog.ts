import { create } from 'zustand';

interface UploadDialogStore {
  isOpen: boolean;
  openDialog: () => void;
  closeDialog: () => void;
}

const useUploadDialog = create<UploadDialogStore>((set) => ({
  isOpen: false,
  openDialog: () => set({ isOpen: true }),
  closeDialog: () => set({ isOpen: false }),
}));

export default useUploadDialog;
