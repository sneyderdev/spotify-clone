import { create } from 'zustand';

interface AuthDialogStore {
  isOpen: boolean;
  openDialog: () => void;
  closeDialog: () => void;
}

const useAuthDialog = create<AuthDialogStore>((set) => ({
  isOpen: false,
  openDialog: () => set({ isOpen: true }),
  closeDialog: () => set({ isOpen: false }),
}));

export default useAuthDialog;
