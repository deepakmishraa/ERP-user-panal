import create from "zustand";

type Store = {
  loader: boolean;
  setLoader: (loader: boolean) => void;
};

const useIsLoaderStore = create<Store>(
  (set): Store => ({
    loader: true,
    setLoader(loader) {
      set({ loader: loader });
    },
  })
);
export default useIsLoaderStore;
