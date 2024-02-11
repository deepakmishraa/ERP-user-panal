import create from "zustand";
import { UserData } from "../models/IUserDetail";

type Store = {
  data: UserData | undefined;
  setData: (data: UserData | undefined) => void;
};

const useUserStore = create<Store>(
  (set): Store => ({
    data: undefined,
    setData(data) {
      set({ data: data });
    },
  })
);
export default useUserStore;
