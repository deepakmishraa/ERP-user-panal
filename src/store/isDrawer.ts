import create from "zustand";

type Store = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const useIsDrawerStore = create<Store>(
  (set): Store => ({
    open: false,
    setOpen(open) {
      set({ open: open });
    },
  })
);
export default useIsDrawerStore;
