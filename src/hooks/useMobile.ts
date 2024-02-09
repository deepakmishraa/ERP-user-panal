import {useMediaQuery} from "@mui/material";
import { useTheme,Breakpoint } from "@mui/material/styles";

const useMobile=(size:Breakpoint="sm")=>{
    const theme=useTheme();
    return useMediaQuery(theme.breakpoints.down(size));
}
export default useMobile