import create from "zustand";
import { IUserData } from "../models/IUserData";

type Store = {
  data: IUserData | undefined;
  setData: (data: IUserData | undefined) => void;
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
