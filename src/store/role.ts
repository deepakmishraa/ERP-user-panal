import create from "zustand";

// Define the role type directly as a union of string literals
type RoleType =
  | "purchaseManager"
  | "procurementManager"
  | "allocationManager"
  | "shopManager";

// Define the store's shape
type Store = {
  role: RoleType; // Use RoleType directly
  setRole: (role: RoleType) => void;
};

const useRoleStore = create<Store>((set) => ({
  role: "purchaseManager", // Directly assign a default role as a string
  setRole: (role: RoleType) => {
    set({ role });
  },
}));

export default useRoleStore;
