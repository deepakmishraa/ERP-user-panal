import { useMediaQuery } from "@mui/material";
import { useTheme, Breakpoint } from "@mui/material/styles";

const useBetweenScreen = (start: Breakpoint, end: Breakpoint) => {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.up("md"));
};
export default useBetweenScreen;
