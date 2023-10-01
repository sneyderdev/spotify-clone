import { create } from 'zustand';

interface PlayerStore {
  ids: Array<string>;
  activeId?: string;
  setId: (id: string) => void;
  setIds: (ids: Array<string>) => void;
  reset: () => void;
}

const usePlayer = create<PlayerStore>((set) => ({
  ids: [],
  activeId: undefined,
  setId: (id) => set({ activeId: id }),
  setIds: (ids) => set({ ids }),
  reset: () => set({ ids: [], activeId: undefined }),
}));

export default usePlayer;
