import { Href } from "expo-router";
import { create } from "zustand";

export type TNavigationStore = {
  returnRoute: Href | null;
  setReturnRoute: (path: Href) => void;
  clearReturnRoute: () => void;
};

export const useNavigationStore = create<TNavigationStore>()((set) => ({
  returnRoute: null,
  setReturnRoute: (path: Href) => set({ returnRoute: path }),
  clearReturnRoute: () => set({ returnRoute: null }),
}));
