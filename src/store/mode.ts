import create from "zustand";
import { PaletteMode } from "@mui/material";

type mode = {
  mode: PaletteMode;
  setMode: (mode: PaletteMode) => void;
};

const useModeStore = create<mode>(
  (set): mode => ({
    mode: "light" as PaletteMode,
    setMode(mode) {
      set({ mode: mode });
    },
  })
);
export default useModeStore;
