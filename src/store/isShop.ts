import create from "zustand";

type Store = {
  active: boolean;
  setActive: (active: boolean) => void;
};

const useIsShopStore = create<Store>(
  (set): Store => ({
    active: false,
    setActive(active) {
      set({ active: active });
    },
  })
);
export default useIsShopStore;
