import create from "zustand";

type Store = {
  token: string | null;
  setToken: (token: string | null) => void;
};

const useTokenStore = create<Store>(
  (set): Store => ({
    token: "",
    setToken(token) {
      set({ token: token });
    },
  })
);
export default useTokenStore;
